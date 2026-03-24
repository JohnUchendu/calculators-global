"use client";

import { useState, useMemo } from "react";
import {
  CalculatorShell,
  CalculatorLayout,
  InputField,
  SliderInput,
  SelectField,
  ResultCard,
  ResultTable,
  ResetButton,
  InfoBox,
  type TableColumn,
} from "@/components/calculator";
import {
  calculateCompoundInterest,
  generateCompoundGrowthTable,
  COMPOUND_FREQUENCY_OPTIONS,
  type CompoundFrequency,
} from "@/lib/calculators/interest";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/formatters";
import { getToolBySlug } from "@/lib/constants";

const tool = getToolBySlug("compound-interest-calculator")!;

const DEFAULTS = {
  principal:    "10000",
  rate:         "8",
  years:        "10",
  frequency:    "monthly" as CompoundFrequency,
  contribution: "100",
};

const COLS: TableColumn[] = [
  { key: "year",         label: "Year",         align: "left"  },
  { key: "balance",      label: "Balance",      align: "right" },
  { key: "interest",     label: "Interest",     align: "right" },
  { key: "contributions",label: "Contributions",align: "right" },
  { key: "totalDeposited",label: "Total In",   align: "right" },
];

export default function CompoundInterestPage() {
  const [principal,    setPrincipal]    = useState(DEFAULTS.principal);
  const [rate,         setRate]         = useState(DEFAULTS.rate);
  const [years,        setYears]        = useState(DEFAULTS.years);
  const [frequency,    setFrequency]    = useState<CompoundFrequency>(DEFAULTS.frequency);
  const [contribution, setContribution] = useState(DEFAULTS.contribution);

  const inputs = useMemo(() => ({
    principal:           parseFloat(principal)    || 0,
    annualRate:          parseFloat(rate)         || 0,
    years:               parseInt(years)          || 0,
    frequency,
    monthlyContribution: parseFloat(contribution) || 0,
  }), [principal, rate, years, frequency, contribution]);

  const result    = useMemo(() => calculateCompoundInterest(inputs),     [inputs]);
  const tableRows = useMemo(() => generateCompoundGrowthTable(inputs),   [inputs]);

  const rows = tableRows.map((r) => ({
    year:          `Year ${r.year}`,
    balance:       formatCurrency(r.balance),
    interest:      formatCurrency(r.interest),
    contributions: formatCurrency(r.contributions),
    totalDeposited:formatCurrency(r.totalContributed),
  }));

  // Pie-style breakdown percentages
  const principalPct     = result.totalAmount > 0 ? ((inputs.principal / result.totalAmount) * 100).toFixed(1) : "0";
  const contributionsPct = result.totalAmount > 0 ? ((result.totalContributions / result.totalAmount) * 100).toFixed(1) : "0";
  const interestPct      = result.totalAmount > 0 ? ((result.totalInterest / result.totalAmount) * 100).toFixed(1) : "0";

  const reset = () => {
    setPrincipal(DEFAULTS.principal);
    setRate(DEFAULTS.rate);
    setYears(DEFAULTS.years);
    setFrequency(DEFAULTS.frequency);
    setContribution(DEFAULTS.contribution);
  };

  return (
    <CalculatorShell tool={tool}>
      <CalculatorLayout
        inputs={
          <>
            <InputField
              label="Initial deposit"
              value={principal}
              onChange={setPrincipal}
              prefix="$"
              min={0}
              placeholder="10,000"
            />
            <InputField
              label="Monthly contribution"
              value={contribution}
              onChange={setContribution}
              prefix="$"
              min={0}
              placeholder="100"
              hint="Optional — leave 0 for lump sum only"
            />
            <SliderInput
              label="Annual interest rate"
              value={parseFloat(rate) || 0}
              onChange={(v) => setRate(String(v))}
              min={0.1}
              max={30}
              step={0.1}
              suffix="%"
            />
            <SliderInput
              label="Time period"
              value={parseInt(years) || 0}
              onChange={(v) => setYears(String(v))}
              min={1}
              max={50}
              step={1}
              formatValue={(v) => `${v} yr${v !== 1 ? "s" : ""}`}
            />
            <SelectField
              label="Compounding frequency"
              value={frequency}
              onChange={(v) => setFrequency(v as CompoundFrequency)}
              options={COMPOUND_FREQUENCY_OPTIONS}
            />
            <div className="pt-1 flex justify-end">
              <ResetButton onReset={reset} />
            </div>
          </>
        }
        results={
          <>
            <ResultCard
              title="Growth Summary"
              items={[
                {
                  label:     "Future value",
                  value:     formatCurrency(result.totalAmount),
                  highlight: true,
                  sublabel:  `after ${years} years`,
                },
                {
                  label: "Total interest earned",
                  value: formatCurrency(result.totalInterest),
                },
                {
                  label: "Total contributions",
                  value: formatCurrency(result.totalContributions),
                },
                {
                  label: "Effective annual rate",
                  value: `${result.effectiveAnnualRate.toFixed(3)}%`,
                  sublabel: "APY",
                },
              ]}
            />

            {/* Visual breakdown bar */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                What makes up your total
              </p>
              {/* Stacked bar */}
              <div className="flex h-4 rounded-full overflow-hidden mb-3 gap-0.5">
                <div
                  className="bg-blue-400 transition-all"
                  style={{ width: `${principalPct}%` }}
                  title={`Principal ${principalPct}%`}
                />
                <div
                  className="bg-green-400 transition-all"
                  style={{ width: `${contributionsPct}%` }}
                  title={`Contributions ${contributionsPct}%`}
                />
                <div
                  className="bg-emerald-600 transition-all"
                  style={{ width: `${interestPct}%` }}
                  title={`Interest ${interestPct}%`}
                />
              </div>
              <div className="flex gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-blue-400 inline-block" />
                  Initial {principalPct}%
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-green-400 inline-block" />
                  Contributions {contributionsPct}%
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 inline-block" />
                  Interest {interestPct}%
                </span>
              </div>
            </div>

            <InfoBox variant="tip" title="The power of compounding">
              Compounding more frequently (monthly vs annually) increases your
              effective rate. At 8% compounded monthly, the effective annual
              rate is actually {result.effectiveAnnualRate.toFixed(3)}% — your
              money grows faster than the stated rate.
            </InfoBox>
          </>
        }
        below={
          inputs.principal > 0 && inputs.years > 0 ? (
            <ResultTable
              title="Year-by-year growth"
              columns={COLS}
              rows={rows}
              maxRows={10}
              caption="Compound interest yearly breakdown"
            />
          ) : null
        }
      />
    </CalculatorShell>
  );
}