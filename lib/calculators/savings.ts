// ─────────────────────────────────────────────
//  Savings & Retirement calculation library
// ─────────────────────────────────────────────

// ── Savings Calculator ────────────────────────
//
// Projects future balance with:
//   - Initial deposit
//   - Regular monthly contributions
//   - Annual interest rate (compounded monthly)

export interface SavingsInputs {
  initialDeposit: number;      // starting balance
  monthlyContribution: number; // added each month
  annualRate: number;          // interest rate %
  years: number;               // savings period
}

export interface SavingsResult {
  futureValue: number;
  totalDeposited: number;      // initial + all contributions
  totalInterestEarned: number;
  initialDeposit: number;
  totalContributions: number;  // monthly × months (excluding initial)
}

export interface SavingsGrowthRow {
  year: number;
  balance: number;
  yearlyContributions: number;
  yearlyInterest: number;
  totalDeposited: number;
}

export function calculateSavings(inputs: SavingsInputs): SavingsResult {
  const { initialDeposit, monthlyContribution, annualRate, years } = inputs;

  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;

  // Future value of initial lump sum
  const fvInitial =
    annualRate === 0
      ? initialDeposit
      : initialDeposit * Math.pow(1 + monthlyRate, months);

  // Future value of monthly contributions (annuity)
  let fvContributions = 0;
  if (monthlyContribution > 0) {
    fvContributions =
      annualRate === 0
        ? monthlyContribution * months
        : monthlyContribution *
          ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  }

  const futureValue = fvInitial + fvContributions;
  const totalContributions = monthlyContribution * months;
  const totalDeposited = initialDeposit + totalContributions;
  const totalInterestEarned = futureValue - totalDeposited;

  return {
    futureValue,
    totalDeposited,
    totalInterestEarned,
    initialDeposit,
    totalContributions,
  };
}

export function generateSavingsGrowthTable(
  inputs: SavingsInputs
): SavingsGrowthRow[] {
  const { initialDeposit, monthlyContribution, annualRate, years } = inputs;
  const monthlyRate = annualRate / 100 / 12;

  const rows: SavingsGrowthRow[] = [];
  let balance = initialDeposit;
  let totalDeposited = initialDeposit;

  for (let year = 1; year <= years; year++) {
    let yearlyInterest = 0;
    const yearlyContributions = monthlyContribution * 12;

    for (let m = 0; m < 12; m++) {
      const interest = balance * monthlyRate;
      yearlyInterest += interest;
      balance += interest + monthlyContribution;
    }

    totalDeposited += yearlyContributions;

    rows.push({
      year,
      balance,
      yearlyContributions,
      yearlyInterest,
      totalDeposited,
    });
  }

  return rows;
}

// ── Retirement Savings Calculator ─────────────
//
// Two modes:
// 1. "How much will I have?" — project savings to retirement age
// 2. "How much do I need to save?" — back-calculate monthly contribution

export interface RetirementInputs {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;        // existing retirement savings
  monthlyContribution: number;   // planned monthly saving
  annualReturn: number;          // expected annual return %
  inflationRate: number;         // expected inflation %
  desiredMonthlyIncome: number;  // monthly income needed in retirement
  retirementDuration: number;    // years expected to live in retirement
}

export interface RetirementResult {
  projectedNestEgg: number;         // what you'll have at retirement
  requiredNestEgg: number;          // what you need at retirement
  shortfall: number;                // gap (negative = surplus)
  requiredMonthlyContribution: number; // what you'd need to save monthly
  yearsToRetirement: number;
  inflationAdjustedIncome: number;  // desired income in today's money
  totalContributions: number;
  totalInterestEarned: number;
}

export interface RetirementGrowthRow {
  age: number;
  year: number;
  balance: number;
  yearlyContribution: number;
  yearlyGrowth: number;
}

export function calculateRetirement(inputs: RetirementInputs): RetirementResult {
  const {
    currentAge,
    retirementAge,
    currentSavings,
    monthlyContribution,
    annualReturn,
    inflationRate,
    desiredMonthlyIncome,
    retirementDuration,
  } = inputs;

  const yearsToRetirement = retirementAge - currentAge;
  const monthlyRate = annualReturn / 100 / 12;
  const months = yearsToRetirement * 12;

  // Project current savings + contributions to retirement
  const fvSavings =
    annualReturn === 0
      ? currentSavings
      : currentSavings * Math.pow(1 + monthlyRate, months);

  const fvContributions =
    monthlyContribution > 0 && annualReturn > 0
      ? monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
      : monthlyContribution * months;

  const projectedNestEgg = fvSavings + fvContributions;
  const totalContributions = monthlyContribution * months;
  const totalInterestEarned = projectedNestEgg - currentSavings - totalContributions;

  // Inflation-adjust the desired monthly income to retirement date
  const inflationAdjustedIncome =
    desiredMonthlyIncome * Math.pow(1 + inflationRate / 100, yearsToRetirement);

  // Required nest egg to fund retirement (present value of annuity at retirement)
  const annualIncomeNeeded = inflationAdjustedIncome * 12;
  const retirementRate = (annualReturn - inflationRate) / 100;

  let requiredNestEgg = 0;
  if (retirementRate > 0) {
    requiredNestEgg =
      annualIncomeNeeded * ((1 - Math.pow(1 + retirementRate, -retirementDuration)) / retirementRate);
  } else {
    requiredNestEgg = annualIncomeNeeded * retirementDuration;
  }

  const shortfall = requiredNestEgg - projectedNestEgg;

  // Required monthly contribution to hit the target
  let requiredMonthlyContribution = 0;
  if (months > 0) {
    const targetFv = requiredNestEgg - fvSavings;
    if (targetFv > 0) {
      requiredMonthlyContribution =
        annualReturn > 0
          ? targetFv / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
          : targetFv / months;
    }
  }

  return {
    projectedNestEgg,
    requiredNestEgg,
    shortfall,
    requiredMonthlyContribution: Math.max(requiredMonthlyContribution, 0),
    yearsToRetirement,
    inflationAdjustedIncome,
    totalContributions,
    totalInterestEarned,
  };
}

export function generateRetirementGrowthTable(
  inputs: RetirementInputs
): RetirementGrowthRow[] {
  const { currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn } = inputs;
  const monthlyRate = annualReturn / 100 / 12;

  const rows: RetirementGrowthRow[] = [];
  let balance = currentSavings;

  for (let year = 1; year <= retirementAge - currentAge; year++) {
    let yearlyGrowth = 0;
    const yearlyContribution = monthlyContribution * 12;

    for (let m = 0; m < 12; m++) {
      const growth = balance * monthlyRate;
      yearlyGrowth += growth;
      balance += growth + monthlyContribution;
    }

    rows.push({
      age: currentAge + year,
      year,
      balance,
      yearlyContribution,
      yearlyGrowth,
    });
  }

  return rows;
}