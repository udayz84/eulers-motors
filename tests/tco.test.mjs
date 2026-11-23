import { test } from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_TCO_INPUTS,
  EULER_VEHICLES,
  compareTco,
  competitorsFor,
  emi,
  formatInr,
  formatPercent1dp,
  maintenancePaisaPerKm,
  monthlyBreakdown,
  resolveCompetitor,
} from "../lib/tco.ts";

const turbo = EULER_VEHICLES.find((v) => v.id === "turbo-ev");
const diesel = competitorsFor("turbo-ev")[0];

/* ------------------------------------------------------------------ EMI */

test("emi: zero principal or tenure returns 0", () => {
  assert.equal(emi(0, 12, 36), 0);
  assert.equal(emi(540000, 12, 0), 0);
  assert.equal(emi(-1, 12, 36), 0);
});

test("emi: zero interest is straight-line principal / n", () => {
  assert.equal(emi(540000, 0, 36), 540000 / 36);
});

test("emi: §6 reference values", () => {
  // Turbo EV: principal 5,40,000 → ₹17,936; Other Diesel: 5,53,500 → ₹18,384
  assert.ok(Math.abs(emi(540000, 12, 36) - 17936) <= 1);
  assert.ok(Math.abs(emi(553500, 12, 36) - 18384) <= 1);
});

/* ------------------------------------------------------- data + mapping */

test("maintenance paisa/km table (§4)", () => {
  assert.equal(maintenancePaisaPerKm("electric"), 30);
  assert.equal(maintenancePaisaPerKm("cng"), 45);
  assert.equal(maintenancePaisaPerKm("diesel"), 90);
  assert.equal(maintenancePaisaPerKm("petrol"), 90);
});

test("competitor mapping: 3/2/2 options, Diesel first for every model (§3)", () => {
  const turboOptions = competitorsFor("turbo-ev");
  const stormOptions = competitorsFor("storm-t1500");
  const hiloadOptions = competitorsFor("hiload-ev");

  assert.equal(turboOptions.length, 3);
  assert.equal(stormOptions.length, 2);
  assert.equal(hiloadOptions.length, 2);
  for (const options of [turboOptions, stormOptions, hiloadOptions]) {
    assert.equal(options[0].fuel, "diesel");
    assert.ok(options.every((c) => c.isEulerProduct === false));
  }
});

test("storm-lr200 (placeholder model) has its own LCV competitor set", () => {
  const options = competitorsFor("storm-lr200");
  assert.equal(options.length, 2);
  assert.equal(options[0].fuel, "diesel");
  assert.equal(options[0].id, "lr200-other-diesel");
  assert.ok(options.every((c) => c.competitorToId === "storm-lr200"));
});

test("resolveCompetitor keeps a valid selection, otherwise picks the first mapped (§3)", () => {
  assert.equal(resolveCompetitor("turbo-ev", "other-cng").id, "other-cng");
  // HiLoad competitor is incompatible with Turbo EV → falls back to Diesel.
  assert.equal(resolveCompetitor("turbo-ev", "other-cng-3w").id, "other-diesel");
  assert.equal(resolveCompetitor("storm-t1500", undefined).id, "other-diesel-4w-lcv");
});

/* --------------------------------------------- §6 reference calculation */

test("§6 reference: Turbo EV vs Other Diesel at defaults", () => {
  const result = compareTco(turbo, diesel, DEFAULT_TCO_INPUTS);
  const e = result.euler;
  const c = result.competitor;

  // Monthly distance and earnings (shared).
  assert.equal(e.monthlyKm, 2500);
  assert.equal(e.monthlyEarnings, 55000);
  assert.equal(c.monthlyEarnings, 55000);

  // Loan side.
  assert.equal(e.downPayment, 60000);
  assert.equal(e.loanPrincipal, 540000);
  assert.equal(c.loanPrincipal, 553500);

  // Monthly components (±₹1 display rounding per §6).
  assert.ok(Math.abs(e.monthlyEmi - 17936) <= 1);
  assert.ok(Math.abs(c.monthlyEmi - 18384) <= 1);
  assert.ok(Math.abs(e.monthlyEnergyCost - 2273) <= 1); // 2500/8.8 kWh × ₹8
  assert.ok(Math.abs(c.monthlyEnergyCost - 13971) <= 1); // 2500/17 L × ₹95
  assert.equal(e.monthlyMaintenance, 750); // 2500 × ₹0.30
  assert.equal(c.monthlyMaintenance, 2250); // 2500 × ₹0.90

  // Totals and profit.
  assert.ok(Math.abs(e.totalMonthlyCost - 20958) <= 1);
  assert.ok(Math.abs(c.totalMonthlyCost - 34605) <= 1);
  assert.ok(Math.abs(e.netMonthlyProfit - 34042) <= 1);
  assert.ok(Math.abs(c.netMonthlyProfit - 20395) <= 1);
  assert.ok(Math.abs(result.extraMonthlyProfit - 13646) <= 1);

  // Percentage uplift.
  assert.ok(Math.abs(result.profitDifferencePercent - 66.9) < 0.05);

  // Five-year projections (spec mode: EMI deducted every projected month).
  assert.ok(Math.abs(result.eulerPeriodProfit - 2042493) <= 5);
  assert.ok(Math.abs(result.competitorPeriodProfit - 1223717) <= 5);
  assert.ok(Math.abs(result.periodExtraProfit - 818775) <= 5);

  // Doughnut slices: 63% Euler / 37% competitor.
  assert.equal(result.chart.euler.sharePercent, 63);
  assert.equal(result.chart.competitor.sharePercent, 37);
});

/* ------------------------------------------------------- edge behaviors */

test("nonpositive mileage → zero energy consumption (supplied helper behavior)", () => {
  const broken = { ...turbo, mileage: 0 };
  const b = monthlyBreakdown(broken, DEFAULT_TCO_INPUTS);
  assert.equal(b.monthlyUnits, 0);
  assert.equal(b.monthlyEnergyCost, 0);
});

test("competitor profit ≤ 0 → percentage forced to 0 and chart clamps (§5)", () => {
  // 40 km/day: Euler stays positive (~₹2.9k) while the diesel side turns
  // negative (~−₹2.9k; it breaks even around 47 km/day).
  const result = compareTco(turbo, diesel, { ...DEFAULT_TCO_INPUTS, dailyKm: 40 });
  assert.ok(result.euler.netMonthlyProfit > 0);
  assert.ok(result.competitor.netMonthlyProfit < 0);
  assert.equal(result.profitDifferencePercent, 0);
  assert.equal(result.chart.competitor.sharePercent, 0);
  assert.equal(result.chart.euler.sharePercent, 100);
});

test("both profits ≤ 0 → doughnut labels read 0% (§5)", () => {
  const result = compareTco(turbo, diesel, { ...DEFAULT_TCO_INPUTS, dailyKm: 25 });
  // At 25 km/day both sides are negative (Euler's EMI alone is ₹17,936).
  assert.ok(result.euler.netMonthlyProfit < 0);
  assert.ok(result.competitor.netMonthlyProfit < 0);
  assert.equal(result.chart.euler.sharePercent, 0);
  assert.equal(result.chart.competitor.sharePercent, 0);
});

test("post-emi projection stops EMI after tenure (§7.1 fix, opt-in)", () => {
  const spec = compareTco(turbo, diesel, DEFAULT_TCO_INPUTS, "spec");
  const fixed = compareTco(turbo, diesel, DEFAULT_TCO_INPUTS, "post-emi");

  // Spec charges 60 EMIs; post-emi charges 36 — so post-emi must be higher.
  assert.ok(fixed.eulerPeriodProfit > spec.eulerPeriodProfit);
  // And it must equal the month-by-month formula.
  const b = spec.euler;
  const nonEmiMonthly = b.monthlyEarnings - b.monthlyEnergyCost - b.monthlyMaintenance;
  const expected = nonEmiMonthly * 60 - b.monthlyEmi * 36;
  assert.ok(Math.abs(fixed.eulerPeriodProfit - expected) < 1);
});

/* ----------------------------------------------------------- formatting */

test("INR formatting uses Indian digit grouping (§5)", () => {
  assert.equal(formatInr(2042493), "₹20,42,493");
  assert.equal(formatInr(13646.3), "₹13,646");
  assert.equal(formatInr(0), "₹0");
});

test("percentage formatting shows one decimal (§5)", () => {
  assert.equal(formatPercent1dp(66.8987), "66.9%");
  assert.equal(formatPercent1dp(0), "0.0%");
});
