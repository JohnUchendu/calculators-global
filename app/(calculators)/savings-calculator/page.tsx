"use client";

import { useState, useMemo } from "react";
import {
  CalculatorShell,
  CalculatorLayout,
  InputField,
  SliderInput,
  ResultCard,
  ResultTable,
  ResetButton,
  InfoBox,
  type TableColumn,
} from "@/components/calculator";
import {
  calculateSavings,
  generateSavingsGrowthTable,
} from "@/lib/calculators/savings";
import { formatCurrency } from "@/lib/formatters";
import { getToolBySlug } from "@/lib/constants";

const tool = getToolBySlug("savings-calculator")!;

const DEFAULTS = {
  initialDeposit:      "5000",
  monthlyContribution: "200",
  rate:                "6",
  years:               "10",
};

const COLS: TableColumn[] = [
  { key: "year",                label: "Year",          align: "left"  },
  { key: "balance",             label: "Balance",       align: "right" },
  { key: "yearlyContributions", label: "Contributed",   align: "right" },
  { key: "yearlyInterest",      label: "Interest",      align: "right" },
  { key: "totalDeposited",      label: "Total In",      align: "right" },
];

export default function SavingsCalculatorPage() {
  const [initialDeposit,      setInitialDeposit]      = useState(DEFAULTS.initialDeposit);
  const [monthlyContribution, setMonthlyContribution] = useState(DEFAULTS.monthlyContribution);
  const [rate,                setRate]                = useState(DEFAULTS.rate);
  const [years,               setYears]               = useState(DEFAULTS.years);

  const inputs = useMemo(() => ({
    initialDeposit:      parseFloat(initialDeposit)      || 0,
    monthlyContribution: parseFloat(monthlyContribution) || 0,
    annualRate:          parseFloat(rate)                || 0,
    years:               parseInt(years)                 || 0,
  }), [initialDeposit, monthlyContribution, rate, years]);

  const result    = useMemo(() => calculateSavings(inputs),            [inputs]);
  const tableData = useMemo(() => generateSavingsGrowthTable(inputs),  [inputs]);

  const rows = tableData.map((r) => ({
    year:                 `Year ${r.year}`,
    balance:              formatCurrency(r.balance),
    yearlyContributions:  formatCurrency(r.yearlyContributions),
    yearlyInterest:       formatCurrency(r.yearlyInterest),
    totalDeposited:       formatCurrency(r.totalDeposited),
  }));

  // Interest percentage of final balance
  const interestPct = result.futureValue > 0
    ? ((result.totalInterestEarned / result.futureValue) * 100).toFixed(1)
    : "0";
  const depositedPct = result.futureValue > 0
    ? ((result.totalDeposited / result.futureValue) * 100).toFixed(1)
    : "0";

  const reset = () => {
    setInitialDeposit(DEFAULTS.initialDeposit);
    setMonthlyContribution(DEFAULTS.monthlyContribution);
    setRate(DEFAULTS.rate);
    setYears(DEFAULTS.years);
  };

  return (
    <CalculatorShell tool={tool}>
      <CalculatorLayout
        inputs={
          <>
            <InputField
              label="Initial deposit"
              value={initialDeposit}
              onChange={setInitialDeposit}
              prefix="$"
              min={0}
              placeholder="5,000"
            />
            <InputField
              label="Monthly contribution"
              value={monthlyContribution}
              onChange={setMonthlyContribution}
              prefix="$"
              min={0}
              placeholder="200"
              hint="Amount added every month"
            />
            <SliderInput
              label="Annual interest rate"
              value={parseFloat(rate) || 0}
              onChange={(v) => setRate(String(v))}
              min={0.1}
              max={20}
              step={0.1}
              suffix="%"
            />
            <SliderInput
              label="Savings period"
              value={parseInt(years) || 0}
              onChange={(v) => setYears(String(v))}
              min={1}
              max={40}
              step={1}
              formatValue={(v) => `${v} yr${v !== 1 ? "s" : ""}`}
            />
            <div className="pt-1 flex justify-end">
              <ResetButton onReset={reset} />
            </div>
          </>
        }
        results={
          <>
            <ResultCard
              title="Savings Projection"
              items={[
                {
                  label:     "Future balance",
                  value:     formatCurrency(result.futureValue),
                  highlight: true,
                  sublabel:  `after ${years} years`,
                },
                {
                  label: "Total deposited",
                  value: formatCurrency(result.totalDeposited),
                  sublabel: `${depositedPct}% of total`,
                },
                {
                  label: "Interest earned",
                  value: formatCurrency(result.totalInterestEarned),
                  sublabel: `${interestPct}% of total`,
                },
                {
                  label: "Monthly contribution",
                  value: formatCurrency(parseFloat(monthlyContribution) || 0),
                },
              ]}
            />

            {/* Visual stacked bar */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Balance composition
              </p>
              <div className="flex h-4 rounded-full overflow-hidden mb-3 gap-0.5">
                <div
                  className="bg-blue-400"
                  style={{ width: `${depositedPct}%` }}
                />
                <div
                  className="bg-emerald-500"
                  style={{ width: `${interestPct}%` }}
                />
              </div>
              <div className="flex gap-5 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-blue-400 inline-block" />
                  Deposited {depositedPct}%
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
                  Interest {interestPct}%
                </span>
              </div>
            </div>

            <InfoBox variant="tip" title="Consistency beats amount">
              Small regular deposits grow significantly over time. Adding just
              {" "}{formatCurrency(parseFloat(monthlyContribution) || 0)} monthly
              contributes {formatCurrency(result.totalContributions)} over {years} years —
              before interest.
            </InfoBox>
          </>
        }
        below={
          inputs.years > 0 ? (
            <ResultTable
              title="Year-by-year savings growth"
              columns={COLS}
              rows={rows}
              maxRows={10}
              caption="Savings growth table"
            />
          ) : null
        }
      />
    </CalculatorShell>
  );
}