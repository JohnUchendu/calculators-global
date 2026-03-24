"use client";

import { useState, useMemo } from "react";
import {
  CalculatorShell,
  CalculatorLayout,
  InputField,
  SliderInput,
  ResultCard,
  ResetButton,
  InfoBox,
} from "@/components/calculator";
import { calculateSimpleInterest } from "@/lib/calculators/interest";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { getToolBySlug } from "@/lib/constants";

const tool = getToolBySlug("simple-interest-calculator")!;

const DEFAULTS = { principal: "10000", rate: "8", years: "3" };

export default function SimpleInterestPage() {
  const [principal, setPrincipal] = useState(DEFAULTS.principal);
  const [rate,      setRate]      = useState(DEFAULTS.rate);
  const [years,     setYears]     = useState(DEFAULTS.years);

  const result = useMemo(() =>
    calculateSimpleInterest({
      principal:  parseFloat(principal) || 0,
      annualRate: parseFloat(rate)      || 0,
      years:      parseFloat(years)     || 0,
    }),
    [principal, rate, years]
  );

  // Breakdown: interest per year / month / day
  const perYear  = result.years > 0 ? result.interest / result.years : 0;
  const perMonth = perYear / 12;
  const perDay   = perYear / 365;

  const reset = () => {
    setPrincipal(DEFAULTS.principal);
    setRate(DEFAULTS.rate);
    setYears(DEFAULTS.years);
  };

  return (
    <CalculatorShell tool={tool}>
      <CalculatorLayout
        inputs={
          <>
            <InputField
              label="Principal amount"
              value={principal}
              onChange={setPrincipal}
              prefix="$"
              min={0}
              placeholder="10,000"
            />
            <SliderInput
              label="Annual interest rate"
              value={parseFloat(rate) || 0}
              onChange={(v) => setRate(String(v))}
              min={0.1}
              max={50}
              step={0.1}
              suffix="%"
            />
            <SliderInput
              label="Time period"
              value={parseFloat(years) || 0}
              onChange={(v) => setYears(String(v))}
              min={0.5}
              max={30}
              step={0.5}
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
              title="Simple Interest Result"
              items={[
                {
                  label:     "Total interest earned",
                  value:     formatCurrency(result.interest),
                  highlight: true,
                  sublabel:  `over ${years} year${parseFloat(years) !== 1 ? "s" : ""}`,
                },
                {
                  label: "Total amount (P + I)",
                  value: formatCurrency(result.totalAmount),
                },
                {
                  label: "Principal",
                  value: formatCurrency(result.principal),
                },
                {
                  label: "Rate applied",
                  value: formatPercent(parseFloat(rate) || 0),
                },
              ]}
            />

            {/* Interest breakdown card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Interest breakdown
              </p>
              <div className="space-y-2">
                {[
                  { label: "Per year",  value: perYear  },
                  { label: "Per month", value: perMonth },
                  { label: "Per day",   value: perDay   },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-500">{label}</span>
                    <span className="text-sm font-semibold text-gray-800">
                      {formatCurrency(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <InfoBox variant="info" title="Simple interest formula">
              Interest = Principal × Rate × Time. Unlike compound interest,
              simple interest is calculated only on the original principal — it
              does not grow on accumulated interest.
            </InfoBox>
          </>
        }
      />
    </CalculatorShell>
  );
}