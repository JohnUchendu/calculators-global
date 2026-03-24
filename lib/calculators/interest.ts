// ─────────────────────────────────────────────
//  Interest calculation library
//  Simple Interest, Compound Interest
// ─────────────────────────────────────────────

// ── Simple Interest ───────────────────────────
//
//  I  = P × R × T
//  A  = P + I
//
//  P = principal, R = rate/100, T = time in years

export interface SimpleInterestInputs {
  principal: number;   // starting amount
  annualRate: number;  // annual rate as percentage e.g. 8
  years: number;       // time period in years
}

export interface SimpleInterestResult {
  interest: number;
  totalAmount: number;
  principal: number;
  annualRate: number;
  years: number;
}

export function calculateSimpleInterest(
  inputs: SimpleInterestInputs
): SimpleInterestResult {
  const { principal, annualRate, years } = inputs;
  const interest = principal * (annualRate / 100) * years;
  return {
    interest,
    totalAmount: principal + interest,
    principal,
    annualRate,
    years,
  };
}

// ── Compound Interest ─────────────────────────
//
//  A = P × (1 + r/n)^(n×t)
//
//  P = principal
//  r = annual rate as decimal
//  n = compounding frequency per year
//  t = time in years

export type CompoundFrequency =
  | "annually"
  | "semi-annually"
  | "quarterly"
  | "monthly"
  | "weekly"
  | "daily";

export const COMPOUND_FREQUENCY_OPTIONS = [
  { value: "annually",      label: "Annually (1×/year)"       },
  { value: "semi-annually", label: "Semi-annually (2×/year)"  },
  { value: "quarterly",     label: "Quarterly (4×/year)"      },
  { value: "monthly",       label: "Monthly (12×/year)"       },
  { value: "weekly",        label: "Weekly (52×/year)"        },
  { value: "daily",         label: "Daily (365×/year)"        },
];

export const FREQUENCY_MAP: Record<CompoundFrequency, number> = {
  annually:       1,
  "semi-annually": 2,
  quarterly:      4,
  monthly:        12,
  weekly:         52,
  daily:          365,
};

export interface CompoundInterestInputs {
  principal: number;
  annualRate: number;
  years: number;
  frequency: CompoundFrequency;
  monthlyContribution?: number;  // optional regular top-up
}

export interface CompoundInterestResult {
  totalAmount: number;
  totalInterest: number;
  principal: number;
  totalContributions: number;
  effectiveAnnualRate: number;   // EAR / APY
}

export interface CompoundGrowthRow {
  year: number;
  balance: number;
  interest: number;
  contributions: number;
  totalContributed: number;
}

export function calculateCompoundInterest(
  inputs: CompoundInterestInputs
): CompoundInterestResult {
  const { principal, annualRate, years, frequency, monthlyContribution = 0 } = inputs;

  if (principal <= 0 && monthlyContribution <= 0) {
    return {
      totalAmount: 0,
      totalInterest: 0,
      principal: 0,
      totalContributions: 0,
      effectiveAnnualRate: 0,
    };
  }

  const r = annualRate / 100;
  const n = FREQUENCY_MAP[frequency];

  // Future value of lump sum
  const fvLump = principal * Math.pow(1 + r / n, n * years);

  // Future value of regular monthly contributions (if any)
  // Convert monthly contribution to per-period contribution
  const periodsTotal = n * years;
  const ratePerPeriod = r / n;
  const contributionPerPeriod = (monthlyContribution * 12) / n;

  let fvContributions = 0;
  if (monthlyContribution > 0 && ratePerPeriod > 0) {
    fvContributions =
      contributionPerPeriod *
      ((Math.pow(1 + ratePerPeriod, periodsTotal) - 1) / ratePerPeriod);
  } else if (monthlyContribution > 0) {
    fvContributions = contributionPerPeriod * periodsTotal;
  }

  const totalAmount = fvLump + fvContributions;
  const totalContributions = monthlyContribution * 12 * years;
  const totalInterest = totalAmount - principal - totalContributions;

  // Effective Annual Rate (APY)
  const effectiveAnnualRate = (Math.pow(1 + r / n, n) - 1) * 100;

  return {
    totalAmount,
    totalInterest,
    principal,
    totalContributions,
    effectiveAnnualRate,
  };
}

export function generateCompoundGrowthTable(
  inputs: CompoundInterestInputs
): CompoundGrowthRow[] {
  const { principal, annualRate, years, frequency, monthlyContribution = 0 } = inputs;

  const r = annualRate / 100;
  const n = FREQUENCY_MAP[frequency];
  const ratePerPeriod = r / n;
  const contributionPerPeriod = (monthlyContribution * 12) / n;

  const rows: CompoundGrowthRow[] = [];
  let balance = principal;
  let totalContributed = principal;

  for (let year = 1; year <= years; year++) {
    const periodsThisYear = n;
    let interestThisYear = 0;
    const contributionsThisYear = monthlyContribution * 12;

    for (let p = 0; p < periodsThisYear; p++) {
      const interest = balance * ratePerPeriod;
      interestThisYear += interest;
      balance += interest + contributionPerPeriod;
    }

    totalContributed += contributionsThisYear;

    rows.push({
      year,
      balance,
      interest: interestThisYear,
      contributions: contributionsThisYear,
      totalContributed,
    });
  }

  return rows;
}