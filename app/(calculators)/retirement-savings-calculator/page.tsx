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
  calculateRetirement,
  generateRetirementGrowthTable,
} from "@/lib/calculators/savings";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { getToolBySlug } from "@/lib/constants";

const tool = getToolBySlug("retirement-savings-calculator")!;

const DEFAULTS = {
  currentAge:           "30",
  retirementAge:        "65",
  currentSavings:       "10000",
  monthlyContribution:  "500",
  annualReturn:         "7",
  inflationRate:        "3",
  desiredMonthlyIncome: "3000",
  retirementDuration:   "25",
};

const COLS: TableColumn[] = [
  { key: "age",                label: "Age",         align: "left"  },
  { key: "balance",            label: "Balance",     align: "right" },
  { key: "yearlyContribution", label: "Contributed", align: "right" },
  { key: "yearlyGrowth",       label: "Growth",      align: "right" },
];

export default function RetirementSavingsPage() {
  const [currentAge,           setCurrentAge]           = useState(DEFAULTS.currentAge);
  const [retirementAge,        setRetirementAge]        = useState(DEFAULTS.retirementAge);
  const [currentSavings,       setCurrentSavings]       = useState(DEFAULTS.currentSavings);
  const [monthlyContribution,  setMonthlyContribution]  = useState(DEFAULTS.monthlyContribution);
  const [annualReturn,         setAnnualReturn]         = useState(DEFAULTS.annualReturn);
  const [inflationRate,        setInflationRate]        = useState(DEFAULTS.inflationRate);
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState(DEFAULTS.desiredMonthlyIncome);
  const [retirementDuration,   setRetirementDuration]   = useState(DEFAULTS.retirementDuration);

  const inputs = useMemo(() => ({
    currentAge:           parseInt(currentAge)           || 0,
    retirementAge:        parseInt(retirementAge)        || 0,
    currentSavings:       parseFloat(currentSavings)    || 0,
    monthlyContribution:  parseFloat(monthlyContribution)|| 0,
    annualReturn:         parseFloat(annualReturn)       || 0,
    inflationRate:        parseFloat(inflationRate)      || 0,
    desiredMonthlyIncome: parseFloat(desiredMonthlyIncome)||0,
    retirementDuration:   parseInt(retirementDuration)  || 0,
  }), [currentAge, retirementAge, currentSavings, monthlyContribution,
       annualReturn, inflationRate, desiredMonthlyIncome, retirementDuration]);

  const result    = useMemo(() => calculateRetirement(inputs),            [inputs]);
  const tableData = useMemo(() => generateRetirementGrowthTable(inputs),  [inputs]);

  const rows = tableData.map((r) => ({
    age:                 r.age,
    balance:             formatCurrency(r.balance),
    yearlyContribution:  formatCurrency(r.yearlyContribution),
    yearlyGrowth:        formatCurrency(r.yearlyGrowth),
  }));

  const onTrack   = result.shortfall <= 0;
  const shortfall = Math.abs(result.shortfall);

  const reset = () => {
    setCurrentAge(DEFAULTS.currentAge);
    setRetirementAge(DEFAULTS.retirementAge);
    setCurrentSavings(DEFAULTS.currentSavings);
    setMonthlyContribution(DEFAULTS.monthlyContribution);
    setAnnualReturn(DEFAULTS.annualReturn);
    setInflationRate(DEFAULTS.inflationRate);
    setDesiredMonthlyIncome(DEFAULTS.desiredMonthlyIncome);
    setRetirementDuration(DEFAULTS.retirementDuration);
  };

  return (
    <CalculatorShell tool={tool}>
      <CalculatorLayout
        inputs={
          <>
            {/* Ages */}
            <div className="grid grid-cols-2 gap-3">
              <SliderInput
                label="Current age"
                value={parseInt(currentAge) || 0}
                onChange={(v) => setCurrentAge(String(v))}
                min={18}
                max={70}
                step={1}
                formatValue={(v) => `${v} yrs`}
              />
              <SliderInput
                label="Retirement age"
                value={parseInt(retirementAge) || 0}
                onChange={(v) => setRetirementAge(String(v))}
                min={40}
                max={80}
                step={1}
                formatValue={(v) => `${v} yrs`}
              />
            </div>

            <InputField
              label="Current retirement savings"
              value={currentSavings}
              onChange={setCurrentSavings}
              prefix="$"
              min={0}
              placeholder="10,000"
              hint="What you've already saved"
            />
            <InputField
              label="Monthly contribution"
              value={monthlyContribution}
              onChange={setMonthlyContribution}
              prefix="$"
              min={0}
              placeholder="500"
            />
            <InputField
              label="Desired monthly income in retirement"
              value={desiredMonthlyIncome}
              onChange={setDesiredMonthlyIncome}
              prefix="$"
              min={0}
              placeholder="3,000"
              hint="In today's dollars"
            />

            <div className="grid grid-cols-2 gap-3">
              <SliderInput
                label="Annual return"
                value={parseFloat(annualReturn) || 0}
                onChange={(v) => setAnnualReturn(String(v))}
                min={1}
                max={15}
                step={0.5}
                suffix="%"
              />
              <SliderInput
                label="Inflation rate"
                value={parseFloat(inflationRate) || 0}
                onChange={(v) => setInflationRate(String(v))}
                min={0}
                max={10}
                step={0.5}
                suffix="%"
              />
            </div>

            <SliderInput
              label="Years in retirement"
              value={parseInt(retirementDuration) || 0}
              onChange={(v) => setRetirementDuration(String(v))}
              min={5}
              max={40}
              step={1}
              formatValue={(v) => `${v} yrs`}
              hint="How long you expect retirement to last"
            />

            <div className="pt-1 flex justify-end">
              <ResetButton onReset={reset} />
            </div>
          </>
        }
        results={
          <>
            {/* On-track status banner */}
            <div className={`rounded-xl px-4 py-3 border text-sm font-medium flex items-center gap-2 ${
              onTrack
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-amber-50 border-amber-200 text-amber-700"
            }`}>
              <span className="text-base">{onTrack ? "✅" : "⚠️"}</span>
              {onTrack
                ? `On track! You'll have a surplus of ${formatCurrency(shortfall)}`
                : `Shortfall of ${formatCurrency(shortfall)} — increase contributions`}
            </div>

            <ResultCard
              title="Retirement Projection"
              items={[
                {
                  label:     "Projected nest egg",
                  value:     formatCurrency(result.projectedNestEgg),
                  highlight: true,
                  sublabel:  `at age ${retirementAge}`,
                },
                {
                  label: "Required nest egg",
                  value: formatCurrency(result.requiredNestEgg),
                },
                {
                  label: "Required monthly saving",
                  value: formatCurrency(result.requiredMonthlyContribution),
                  sublabel: "to hit your target",
                },
                {
                  label: "Inflation-adjusted income",
                  value: formatCurrency(result.inflationAdjustedIncome),
                  sublabel: `at ${retirementAge} in future $`,
                },
              ]}
            />

            <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Summary
              </p>
              {[
                { label: "Years to retirement",   value: `${result.yearsToRetirement} years` },
                { label: "Total contributions",   value: formatCurrency(result.totalContributions) },
                { label: "Total interest earned", value: formatCurrency(result.totalInterestEarned) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-500">{label}</span>
                  <span className="text-sm font-semibold text-gray-800">{value}</span>
                </div>
              ))}
            </div>

            <InfoBox variant="warning" title="Important assumptions">
              Returns and inflation are assumed constant. Real markets fluctuate.
              This projection is a guide — consult a financial advisor for
              personalised retirement planning.
            </InfoBox>
          </>
        }
        below={
          inputs.retirementAge > inputs.currentAge ? (
            <ResultTable
              title="Retirement savings growth by age"
              columns={COLS}
              rows={rows}
              maxRows={10}
              caption="Retirement savings projection table"
            />
          ) : null
        }
      />
    </CalculatorShell>
  );
}