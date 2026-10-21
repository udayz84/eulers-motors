export type LoanTerms = {
  downPaymentPct: number;
  annualInterestRate: number;
  months: number;
};

export const DEFAULT_LOAN_TERMS = {
  downPaymentPct: 15,
  annualInterestRate: 10.5,
  months: 48,
} satisfies LoanTerms;

/** Returns the estimated monthly EMI using the site's standard loan terms. */
export function calculateMonthlyEmi(
  price: number,
  terms: LoanTerms = DEFAULT_LOAN_TERMS,
) {
  const principal = price * (1 - terms.downPaymentPct / 100);
  const monthlyRate = terms.annualInterestRate / 100 / 12;
  return Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, terms.months)) /
      (Math.pow(1 + monthlyRate, terms.months) - 1),
  );
}
