# TCO Calculator — questions for Marketing / 3Minds

Context: the 19 Nov 2026 handoff ("Euler Motors TCO calculator logic handoff") describes the
calculator logic to rebuild. Its §7 lists open decisions. The code module (`lib/tco.ts`) is
already implemented to reproduce the handoff's §6 reference numbers exactly, with the fixes
below isolated behind small switches. **We need answers on the items marked ⚠️ before the UI
ships, because they change the headline numbers and wording.**

---

## 1. ⚠️ Five-year projection keeps deducting EMI after the loan ends (§7.1)

The handoff's projection charges all 36 EMIs across all 60 months of a 5-year ownership. This
overstates costs in years 4–5 — and because Euler's EMI is the cheaper one, it **overstates the
"Total Extra Savings" headline** in Euler's favour.

**Our recommendation:** switch to a month-by-month projection that stops EMI after loan tenure
(already implemented as the opt-in `post-emi` mode in `lib/tco.ts`). For the §6 example this
moves the 5-year extra profit from ₹8,18,775 down to roughly ₹6,24,000 — still a strong story,
but one that survives scrutiny from a CFO-type customer.

**Question:** keep the handoff's numbers (spec behaviour), or go with the corrected projection?

## 2. ⚠️ It is not really a "TCO" calculator (§7.2)

Insurance, registration, road tax, subsidies (FAME/PM E-DRIVE), resale value, battery
replacement, charging losses and driver costs are all excluded. Calling it "Total Cost of
Ownership" invites exactly that comparison.

**Our recommendation:** rename the customer-facing section to "Profit calculator" / "Savings
estimator", and add a one-line assumptions footnote on the widget (25 days/month, listed fixed
tariffs, excludes insurance/registration/resale).

**Question:** confirm the final title and whether the footnote wording is approved.

## 3. ⚠️ One flat ₹95 price for petrol, diesel and CNG (§7.3)

Real city prices differ meaningfully. Wrong fuel prices skew the competitor's running cost —
and with it every "you save X%" claim.

**Question:** provide approved price points (and the assumed city/date basis) for diesel,
petrol and CNG. Prices should live in one data file, not CMS content, so marketing updates are
code-reviewed.

## 4. ⚠️ Negative-result display loses information (§7.5)

Currently a negative extra profit renders as an absolute ₹ value in red with no minus sign, and
the percentage drops its sign. A customer dragging the daily-km slider down will see nonsense.

**Our recommendation:** signed amounts ("−₹X more profit" / "₹X less profit") and signed
percentages, plus a hint that lower daily distance doesn't suit this comparison.

**Question:** confirm signed display vs "less profit" wording.

## 5. Percentage when the competitor loses money (§7.6)

When the competitor's monthly profit is ≤ ₹0, the code forces "0%" — mathematically the uplift
is infinite/unavailable.

**Our recommendation:** display "—" with a sub-line like "competitor runs at a loss at this
usage". (Implemented: 0, ready to swap.)

**Question:** confirm.

## 6. Default competitor state (§7.4) — already handled

The handoff's code starts on an invalid competitor and corrects itself after render. Our module
initialises directly to the first mapped competitor (Diesel) for every model — no fix needed in
the UI, just don't reintroduce the old pattern.

## 7. Vehicle data validation for a future editable calculator (§7.7)

Current behaviour silently treats nonpositive mileage as zero consumption and accepts invalid
interest/distance values. Fine for a fixed slider UI; **if/when the calculator becomes
admin-editable via CMS**, we need validation rules (min/max price, mileage > 0, interest 0–100%).
Defer until that requirement is confirmed.

## 8. Efficiency field semantics (§3 caveat)

The source data field is named only `mileage`; the calculator interprets it as km/kWh for
electric, km/litre for liquid fuel, km/kg for CNG.

**Question:** confirm with the product team that the stored values follow that convention
(e.g. Turbo EV's 8.8 is km/kWh, not km/charge or Wh/km).

## 10. ⚠️ Storm EV LR 200 is missing from the handoff entirely

The calculator lists four Euler models on the homepage, but the handoff's §3
data covers only Turbo EV, Storm T1500 and HiLoad EV. Storm EV LR 200 is shown
in the UI with **placeholder values we invented** (ex-showroom ₹8,50,000,
8.2 km/kWh) and mapped against the same 4W LCV competitor set as the Storm
T1500. These are NOT approved numbers.

**Question:** provide LR200's ex-showroom price, efficiency (km/kWh) and the
correct competitor comparison — the placeholders must be replaced before launch.

## 9. Analytics scope

Euler/competitor selections fire `Tco_Calculation` events; the sliders currently do not.

**Question:** should slider stops (debounced) also fire calculation events? Useful for
conversion analysis; needs an analytics decision before launch.

---

### Already settled in the module (no input needed)

- Fixed assumptions implemented as constants: 25 days/month · ₹15/km (3W) / ₹22/km (4W) · 10%
  down payment · 12% annual interest · 36-month tenure · ₹8/kWh electricity.
- Vehicle + competitor tables from §3, competitor dropdown filtered per Euler model, Diesel
  default after every model change.
- INR formatting with Indian digit grouping, percentages to one decimal, full precision kept
  internally and rounded only for display.
- §6 reference numbers are locked in as unit tests (`node --test tests/tco.test.mjs`, 13 passing),
  so any future change to formulas/prices that silently shifts the headline numbers will fail CI.
