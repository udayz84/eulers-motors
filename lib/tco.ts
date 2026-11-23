/**
 * Total Cost of Ownership (TCO) calculator — pure calculation module.
 *
 * Implements the formulas from the "Euler Motors TCO calculator logic
 * handoff" (Marketing / 3Minds, 19 Nov 2026). No React, no DOM: the UI
 * layer should import from here so the math stays testable in isolation
 * (see tests/tco.test.mjs for the handoff's §6 reference fixtures).
 *
 * Spec notes carried into code:
 * - "mileage" means km/kWh for electric, km/litre for petrol/diesel and
 *   km/kg for CNG (per §3).
 * - Maintenance uses per-km paisa rates (§4), not the `monthly_rm_cost`
 *   fields that also exist on vehicle records.
 * - The period projection repeats the EMI deduction across every projected
 *   month ("spec" mode) exactly like the supplied code, so the §6 reference
 *   numbers reproduce. The "post-emi" mode stops EMI after loan tenure —
 *   enable it if Marketing confirms the §7.1 decision to fix that.
 */

export type VehicleType = "3W" | "4W";
export type Fuel = "electric" | "diesel" | "petrol" | "cng";

export interface TcoVehicle {
  id: string;
  name: string;
  isEulerProduct: boolean;
  vehicleType: VehicleType;
  fuel: Fuel;
  /** Ex-showroom price in rupees. */
  exShowroomPrice: number;
  /** km/kWh (electric) · km/litre (petrol, diesel) · km/kg (CNG). */
  mileage: number;
  /** Repair & maintenance rate in paisa per km (§4 table). */
  maintenancePaisaPerKm: number;
  /** Competitor records only: id of the Euler vehicle they compare against. */
  competitorToId?: string;
}

export interface TcoInputs {
  dailyKm: number;
  ownershipYears: number;
  operatingDaysPerMonth: number;
  annualInterestPercent: number;
  loanTenureMonths: number;
  downPaymentPercent: number;
  electricityPricePerKwh: number;
  fuelPricePerLitre: number;
  cngPricePerKg: number;
  earningPerKm3w: number;
  earningPerKm4w: number;
}

export const DEFAULT_TCO_INPUTS: TcoInputs = {
  dailyKm: 100,
  ownershipYears: 5,
  operatingDaysPerMonth: 25,
  annualInterestPercent: 12,
  loanTenureMonths: 36,
  downPaymentPercent: 10,
  electricityPricePerKwh: 8,
  fuelPricePerLitre: 95,
  cngPricePerKg: 95,
  earningPerKm3w: 15,
  earningPerKm4w: 22,
};

/** §4 maintenance table: paisa per km by fuel. */
export function maintenancePaisaPerKm(fuel: Fuel): number {
  switch (fuel) {
    case "electric":
      return 30;
    case "cng":
      return 45;
    case "diesel":
    case "petrol":
      return 90;
  }
}

/** §3 Euler models (Marketing to validate prices/efficiency before launch).
 *  Storm EV LR 200 is NOT in the handoff — its price/efficiency are
 *  PLACEHOLDERS pending marketing confirmation (docs/tco-client-questions.md
 *  Q10); its competitor mapping reuses the 4W LCV set. */
export const EULER_VEHICLES: TcoVehicle[] = [
  {
    id: "turbo-ev",
    name: "Euler Turbo EV",
    isEulerProduct: true,
    vehicleType: "4W",
    fuel: "electric",
    exShowroomPrice: 600000,
    mileage: 8.8,
    maintenancePaisaPerKm: maintenancePaisaPerKm("electric"),
  },
  {
    id: "storm-t1500",
    name: "Euler Storm T1500",
    isEulerProduct: true,
    vehicleType: "4W",
    fuel: "electric",
    exShowroomPrice: 970000,
    mileage: 7.8,
    maintenancePaisaPerKm: maintenancePaisaPerKm("electric"),
  },
  {
    id: "storm-lr200",
    name: "Storm EV LR 200",
    isEulerProduct: true,
    vehicleType: "4W",
    fuel: "electric",
    // PLACEHOLDERS — not in the handoff. Validate with Marketing (Q10).
    exShowroomPrice: 850000,
    mileage: 8.2,
    maintenancePaisaPerKm: maintenancePaisaPerKm("electric"),
  },
  {
    id: "hiload-ev",
    name: "Euler HiLoad EV",
    isEulerProduct: true,
    vehicleType: "3W",
    fuel: "electric",
    exShowroomPrice: 456000,
    mileage: 10,
    maintenancePaisaPerKm: maintenancePaisaPerKm("electric"),
  },
];

/** §3 competitor mapping — order matters: the first entry per Euler model is
 *  the default selection after a vehicle change (Diesel for each model). */
export const COMPETITORS: TcoVehicle[] = [
  {
    id: "other-diesel",
    name: "Other Diesel",
    isEulerProduct: false,
    vehicleType: "4W",
    fuel: "diesel",
    exShowroomPrice: 615000,
    mileage: 17,
    maintenancePaisaPerKm: maintenancePaisaPerKm("diesel"),
    competitorToId: "turbo-ev",
  },
  {
    id: "other-petrol",
    name: "Other Petrol",
    isEulerProduct: false,
    vehicleType: "4W",
    fuel: "petrol",
    exShowroomPrice: 475000,
    mileage: 16,
    maintenancePaisaPerKm: maintenancePaisaPerKm("petrol"),
    competitorToId: "turbo-ev",
  },
  {
    id: "other-cng",
    name: "Other CNG",
    isEulerProduct: false,
    vehicleType: "4W",
    fuel: "cng",
    exShowroomPrice: 640000,
    mileage: 21,
    maintenancePaisaPerKm: maintenancePaisaPerKm("cng"),
    competitorToId: "turbo-ev",
  },
  {
    id: "other-diesel-4w-lcv",
    name: "Other Diesel - 4W LCV",
    isEulerProduct: false,
    vehicleType: "4W",
    fuel: "diesel",
    exShowroomPrice: 900000,
    mileage: 18.4,
    maintenancePaisaPerKm: maintenancePaisaPerKm("diesel"),
    competitorToId: "storm-t1500",
  },
  {
    id: "other-cng-4w-lcv",
    name: "Other CNG - 4W LCV",
    isEulerProduct: false,
    vehicleType: "4W",
    fuel: "cng",
    exShowroomPrice: 800000,
    mileage: 19.2,
    maintenancePaisaPerKm: maintenancePaisaPerKm("cng"),
    competitorToId: "storm-t1500",
  },
  // LR200 competitors — same LCV set as the Storm T1500 (PLACEHOLDER mapping
  // until Marketing confirms the right comparison vehicles, Q10).
  {
    id: "lr200-other-diesel",
    name: "Other Diesel - 4W LCV",
    isEulerProduct: false,
    vehicleType: "4W",
    fuel: "diesel",
    exShowroomPrice: 900000,
    mileage: 18.4,
    maintenancePaisaPerKm: maintenancePaisaPerKm("diesel"),
    competitorToId: "storm-lr200",
  },
  {
    id: "lr200-other-cng",
    name: "Other CNG - 4W LCV",
    isEulerProduct: false,
    vehicleType: "4W",
    fuel: "cng",
    exShowroomPrice: 800000,
    mileage: 19.2,
    maintenancePaisaPerKm: maintenancePaisaPerKm("cng"),
    competitorToId: "storm-lr200",
  },
  {
    id: "other-diesel-3w",
    name: "Other Diesel - 3W",
    isEulerProduct: false,
    vehicleType: "3W",
    fuel: "diesel",
    exShowroomPrice: 322000,
    mileage: 33,
    maintenancePaisaPerKm: maintenancePaisaPerKm("diesel"),
    competitorToId: "hiload-ev",
  },
  {
    id: "other-cng-3w",
    name: "Other CNG - 3W",
    isEulerProduct: false,
    vehicleType: "3W",
    fuel: "cng",
    exShowroomPrice: 301000,
    mileage: 35,
    maintenancePaisaPerKm: maintenancePaisaPerKm("cng"),
    competitorToId: "hiload-ev",
  },
];

/** Competitors mapped to an Euler vehicle, in dropdown order. */
export function competitorsFor(eulerId: string): TcoVehicle[] {
  return COMPETITORS.filter((c) => c.competitorToId === eulerId);
}

/** Pick the default competitor after an Euler model change: the first mapped
 *  option if the current selection is incompatible (§3). */
export function resolveCompetitor(
  eulerId: string,
  currentCompetitorId: string | undefined
): TcoVehicle | undefined {
  const mapped = competitorsFor(eulerId);
  return mapped.find((c) => c.id === currentCompetitorId) ?? mapped[0];
}

/**
 * Equated monthly instalment (§4). Zero principal/tenure → 0; zero interest
 * → straight-line principal / n; the supplied code also guards a zero
 * denominator (e.g. rate of −100%).
 */
export function emi(
  principal: number,
  annualInterestPercent: number,
  tenureMonths: number
): number {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  const r = annualInterestPercent / 100 / 12;
  if (r === 0) return principal / tenureMonths;
  const growth = Math.pow(1 + r, tenureMonths);
  const denominator = growth - 1;
  if (denominator === 0) return 0;
  return (principal * r * growth) / denominator;
}

export interface VehicleMonthly {
  monthlyKm: number;
  monthlyEarnings: number;
  earningPerKm: number;
  downPayment: number;
  loanPrincipal: number;
  monthlyEmi: number;
  monthlyUnits: number;
  pricePerUnit: number;
  monthlyEnergyCost: number;
  monthlyMaintenance: number;
  totalMonthlyCost: number;
  netMonthlyProfit: number;
}

/** One vehicle's monthly economics (§4), independent of the comparison. */
export function monthlyBreakdown(
  vehicle: TcoVehicle,
  inputs: TcoInputs
): VehicleMonthly {
  const monthlyKm = inputs.dailyKm * inputs.operatingDaysPerMonth;
  const earningPerKm =
    vehicle.vehicleType === "3W" ? inputs.earningPerKm3w : inputs.earningPerKm4w;
  const monthlyEarnings = monthlyKm * earningPerKm;

  const downPayment =
    (vehicle.exShowroomPrice * inputs.downPaymentPercent) / 100;
  const loanPrincipal = vehicle.exShowroomPrice - downPayment;
  const monthlyEmi = emi(
    loanPrincipal,
    inputs.annualInterestPercent,
    inputs.loanTenureMonths
  );

  const pricePerUnit =
    vehicle.fuel === "electric"
      ? inputs.electricityPricePerKwh
      : vehicle.fuel === "cng"
        ? inputs.cngPricePerKg
        : inputs.fuelPricePerLitre;
  // Nonpositive mileage → zero consumption (supplied helper's behavior).
  const monthlyUnits = vehicle.mileage > 0 ? monthlyKm / vehicle.mileage : 0;
  const monthlyEnergyCost = monthlyUnits * pricePerUnit;

  const monthlyMaintenance =
    (monthlyKm * vehicle.maintenancePaisaPerKm) / 100;

  const totalMonthlyCost =
    monthlyEmi + monthlyEnergyCost + monthlyMaintenance;

  return {
    monthlyKm,
    monthlyEarnings,
    earningPerKm,
    downPayment,
    loanPrincipal,
    monthlyEmi,
    monthlyUnits,
    pricePerUnit,
    monthlyEnergyCost,
    monthlyMaintenance,
    totalMonthlyCost,
    netMonthlyProfit: monthlyEarnings - totalMonthlyCost,
  };
}

/** Ownership-period profit (§4). "spec" repeats the EMI every projected
 *  month like the supplied code (reproduces the §6 reference numbers);
 *  "post-emi" stops the EMI deduction once the loan tenure ends. */
export function periodProfit(
  breakdown: VehicleMonthly,
  inputs: TcoInputs,
  mode: "spec" | "post-emi" = "spec"
): number {
  const months = inputs.ownershipYears * 12;
  if (mode === "spec") {
    return breakdown.netMonthlyProfit * months;
  }
  const monthsWithEmi = Math.min(inputs.loanTenureMonths, months);
  const nonEmiMonthly =
    breakdown.monthlyEarnings -
    breakdown.monthlyEnergyCost -
    breakdown.monthlyMaintenance;
  return nonEmiMonthly * months - breakdown.monthlyEmi * monthsWithEmi;
}

export interface TcoChartSlice {
  /** Whole percentage of the sum of clamped profits, as drawn on the doughnut. */
  sharePercent: number;
}

export interface TcoComparison {
  euler: VehicleMonthly;
  competitor: VehicleMonthly;
  extraMonthlyProfit: number;
  /** 0 when the competitor's monthly profit is zero or negative (supplied behavior). */
  profitDifferencePercent: number;
  eulerPeriodProfit: number;
  competitorPeriodProfit: number;
  periodExtraProfit: number;
  /** Doughnut slices: each profit clamped at 0 (§5). */
  chart: { euler: TcoChartSlice; competitor: TcoChartSlice };
  projectionMode: "spec" | "post-emi";
}

/** Full Euler-vs-competitor comparison (§4). */
export function compareTco(
  eulerVehicle: TcoVehicle,
  competitorVehicle: TcoVehicle,
  inputs: TcoInputs = DEFAULT_TCO_INPUTS,
  projectionMode: "spec" | "post-emi" = "spec"
): TcoComparison {
  const euler = monthlyBreakdown(eulerVehicle, inputs);
  const competitor = monthlyBreakdown(competitorVehicle, inputs);

  const extraMonthlyProfit = euler.netMonthlyProfit - competitor.netMonthlyProfit;
  const profitDifferencePercent =
    competitor.netMonthlyProfit > 0
      ? (extraMonthlyProfit / competitor.netMonthlyProfit) * 100
      : 0;

  const eulerPeriodProfit = periodProfit(euler, inputs, projectionMode);
  const competitorPeriodProfit = periodProfit(competitor, inputs, projectionMode);

  const eulerClamped = Math.max(euler.netMonthlyProfit, 0);
  const competitorClamped = Math.max(competitor.netMonthlyProfit, 0);
  const sliceSum = eulerClamped + competitorClamped;

  return {
    euler,
    competitor,
    extraMonthlyProfit,
    profitDifferencePercent,
    eulerPeriodProfit,
    competitorPeriodProfit,
    periodExtraProfit: eulerPeriodProfit - competitorPeriodProfit,
    chart: {
      euler: {
        sharePercent: sliceSum > 0 ? Math.round((eulerClamped / sliceSum) * 100) : 0,
      },
      competitor: {
        sharePercent:
          sliceSum > 0 ? Math.round((competitorClamped / sliceSum) * 100) : 0,
      },
    },
    projectionMode,
  };
}

/** INR with Indian digit grouping, whole rupees (§5). */
export function formatInr(value: number): string {
  return "₹" + Math.round(value).toLocaleString("en-IN");
}

/** Profit difference percentage to one decimal (§5). */
export function formatPercent1dp(value: number): string {
  return `${value.toFixed(1)}%`;
}
