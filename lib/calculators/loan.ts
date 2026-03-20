// ─────────────────────────────────────────────
//  Loan calculation library
//  All 5 loan tools (Loan, EMI, Personal, Car,
//  Mortgage) import from this file.
// ─────────────────────────────────────────────

// ── Core types ───────────────────────────────

export interface LoanInputs {
  principal: number;      // loan amount
  annualRate: number;     // annual interest rate as a percentage, e.g. 7.5
  termMonths: number;     // loan duration in months
}

export interface LoanSummary {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  totalPrincipal: number;
  effectiveRate: number;  // monthly rate used
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface MortgageInputs extends LoanInputs {
  propertyValue: number;
  downPayment: number;    // as a dollar amount
}

export interface MortgageSummary extends LoanSummary {
  loanToValue: number;    // LTV percentage
  downPaymentPct: number;
}

// ── Core EMI formula ─────────────────────────
//
//        P × r × (1 + r)^n
// EMI = ─────────────────────
//         (1 + r)^n − 1
//
// Where:
//   P = principal
//   r = monthly interest rate (annual / 12 / 100)
//   n = number of months

export function calculateMonthlyPayment(inputs: LoanInputs): number {
  const { principal, annualRate, termMonths } = inputs;

  if (principal <= 0 || termMonths <= 0) return 0;

  // Zero-interest loan — just divide principal evenly
  if (annualRate === 0) return principal / termMonths;

  const r = annualRate / 12 / 100;
  const n = termMonths;
  const payment = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  return payment;
}

// ── Full loan summary ─────────────────────────

export function calculateLoanSummary(inputs: LoanInputs): LoanSummary {
  const { principal, annualRate, termMonths } = inputs;
  const monthlyPayment = calculateMonthlyPayment(inputs);
  const totalPayment = monthlyPayment * termMonths;
  const totalInterest = totalPayment - principal;

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    totalPrincipal: principal,
    effectiveRate: annualRate / 12 / 100,
  };
}

// ── Amortization schedule ─────────────────────

export function generateAmortization(inputs: LoanInputs): AmortizationRow[] {
  const { principal, annualRate, termMonths } = inputs;

  if (principal <= 0 || termMonths <= 0) return [];

  const r = annualRate === 0 ? 0 : annualRate / 12 / 100;
  const monthlyPayment = calculateMonthlyPayment(inputs);
  const rows: AmortizationRow[] = [];
  let balance = principal;

  for (let month = 1; month <= termMonths; month++) {
    const interestPayment = balance * r;
    const principalPayment = Math.min(monthlyPayment - interestPayment, balance);
    balance = Math.max(balance - principalPayment, 0);

    rows.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance,
    });

    // Safety: if balance is effectively zero, stop
    if (balance < 0.01) break;
  }

  return rows;
}

// ── Yearly amortization summary ───────────────
// Collapses monthly rows into annual totals for
// a shorter "by year" breakdown table.

export interface YearlyAmortizationRow {
  year: number;
  totalPayment: number;
  totalPrincipal: number;
  totalInterest: number;
  closingBalance: number;
}

export function generateYearlyAmortization(inputs: LoanInputs): YearlyAmortizationRow[] {
  const monthly = generateAmortization(inputs);
  const yearly: YearlyAmortizationRow[] = [];

  for (let yearIdx = 0; ; yearIdx++) {
    const start = yearIdx * 12;
    const end   = start + 12;
    const slice = monthly.slice(start, end);
    if (slice.length === 0) break;

    yearly.push({
      year:           yearIdx + 1,
      totalPayment:   slice.reduce((s, r) => s + r.payment, 0),
      totalPrincipal: slice.reduce((s, r) => s + r.principal, 0),
      totalInterest:  slice.reduce((s, r) => s + r.interest, 0),
      closingBalance: slice[slice.length - 1].balance,
    });
  }

  return yearly;
}

// ── Mortgage-specific ─────────────────────────

export function calculateMortgage(inputs: MortgageInputs): MortgageSummary {
  const { propertyValue, downPayment } = inputs;
  const loanInputs: LoanInputs = {
    principal: inputs.principal,
    annualRate: inputs.annualRate,
    termMonths: inputs.termMonths,
  };

  const base = calculateLoanSummary(loanInputs);
  const ltv  = propertyValue > 0 ? (inputs.principal / propertyValue) * 100 : 0;
  const dpPct = propertyValue > 0 ? (downPayment / propertyValue) * 100 : 0;

  return {
    ...base,
    loanToValue:    ltv,
    downPaymentPct: dpPct,
  };
}

// ── Helper: convert years ↔ months ───────────

export function yearsToMonths(years: number): number {
  return Math.round(years * 12);
}

export function monthsToYears(months: number): number {
  return months / 12;
}

// ── Common select options ─────────────────────

export const LOAN_TERM_OPTIONS = [
  { value: "12",  label: "1 year"   },
  { value: "24",  label: "2 years"  },
  { value: "36",  label: "3 years"  },
  { value: "48",  label: "4 years"  },
  { value: "60",  label: "5 years"  },
  { value: "72",  label: "6 years"  },
  { value: "84",  label: "7 years"  },
  { value: "96",  label: "8 years"  },
  { value: "108", label: "9 years"  },
  { value: "120", label: "10 years" },
  { value: "180", label: "15 years" },
  { value: "240", label: "20 years" },
  { value: "300", label: "25 years" },
  { value: "360", label: "30 years" },
];

export const MORTGAGE_TERM_OPTIONS = [
  { value: "60",  label: "5 years"  },
  { value: "120", label: "10 years" },
  { value: "180", label: "15 years" },
  { value: "240", label: "20 years" },
  { value: "300", label: "25 years" },
  { value: "360", label: "30 years" },
];