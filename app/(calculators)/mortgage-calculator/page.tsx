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
  calculateMortgage,
  generateYearlyAmortization,
  MORTGAGE_TERM_OPTIONS,
} from "@/lib/calculators/loan";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/formatters";
import { getToolBySlug } from "@/lib/constants";

const tool = getToolBySlug("mortgage-calculator")!;

const DEFAULTS = {
  propertyValue: "350000",
  downPayment:   "70000",
  rate:          "6.5",
  termMonths:    "360",
};

const COLS: TableColumn[] = [
  { key: "year",           label: "Year",      align: "left"  },
  { key: "totalPayment",   label: "Payment",   align: "right" },
  { key: "totalPrincipal", label: "Principal", align: "right" },
  { key: "totalInterest",  label: "Interest",  align: "right" },
  { key: "closingBalance", label: "Balance",   align: "right" },
];

export default function MortgageCalculatorPage() {
  const [propertyValue, setPropertyValue] = useState(DEFAULTS.propertyValue);
  const [downPayment,   setDownPayment]   = useState(DEFAULTS.downPayment);
  const [rate,          setRate]          = useState(DEFAULTS.rate);
  const [termMonths,    setTermMonths]    = useState(DEFAULTS.termMonths);

  const loanAmount = useMemo(() => {
    const pv   = parseFloat(propertyValue) || 0;
    const down = parseFloat(downPayment)   || 0;
    return Math.max(pv - down, 0);
  }, [propertyValue, downPayment]);

  const downPaymentPct = useMemo(() => {
    const pv   = parseFloat(propertyValue) || 0;
    const down = parseFloat(downPayment)   || 0;
    return pv > 0 ? ((down / pv) * 100).toFixed(1) : "0";
  }, [propertyValue, downPayment]);

  const mortgageInputs = useMemo(() => ({
    principal:     loanAmount,
    annualRate:    parseFloat(rate)     || 0,
    termMonths:    parseInt(termMonths) || 0,
    propertyValue: parseFloat(propertyValue) || 0,
    downPayment:   parseFloat(downPayment)   || 0,
  }), [loanAmount, rate, termMonths, propertyValue, downPayment]);

  const summary    = useMemo(() => calculateMortgage(mortgageInputs),        [mortgageInputs]);
  const yearlyRows = useMemo(() => generateYearlyAmortization(mortgageInputs), [mortgageInputs]);

  const tableRows = yearlyRows.map((r) => ({
    year:           `Year ${r.year}`,
    totalPayment:   formatCurrency(r.totalPayment),
    totalPrincipal: formatCurrency(r.totalPrincipal),
    totalInterest:  formatCurrency(r.totalInterest),
    closingBalance: formatCurrency(r.closingBalance),
  }));

  const ltvColor = summary.loanToValue > 80 ? "text-amber-600" : "text-green-600";

  const reset = () => {
    setPropertyValue(DEFAULTS.propertyValue);
    setDownPayment(DEFAULTS.downPayment);
    setRate(DEFAULTS.rate);
    setTermMonths(DEFAULTS.termMonths);
  };

  return (
    <CalculatorShell tool={tool}>
      <CalculatorLayout
        inputs={
          <>
            <InputField
              label="Property value"
              value={propertyValue}
              onChange={setPropertyValue}
              prefix="$"
              min={0}
              placeholder="350,000"
            />
            <InputField
              label="Down payment"
              value={downPayment}
              onChange={setDownPayment}
              prefix="$"
              min={0}
              placeholder="70,000"
              hint={`${downPaymentPct}% of property value`}
            />
            {/* Read-only mortgage amount */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
              <p className="text-xs text-gray-400 mb-0.5">Mortgage amount</p>
              <p className="text-sm font-semibold text-gray-800">
                {formatCurrency(loanAmount)}
              </p>
            </div>
            <SliderInput
              label="Annual interest rate"
              value={parseFloat(rate) || 0}
              onChange={(v) => setRate(String(v))}
              min={0.5}
              max={15}
              step={0.05}
              suffix="%"
            />
            <SelectField
              label="Mortgage term"
              value={termMonths}
              onChange={setTermMonths}
              options={MORTGAGE_TERM_OPTIONS}
            />
            <div className="pt-1 flex justify-end">
              <ResetButton onReset={reset} />
            </div>
          </>
        }
        results={
          <>
            <ResultCard
              title="Mortgage Summary"
              items={[
                {
                  label:     "Monthly payment",
                  value:     formatCurrency(summary.monthlyPayment),
                  highlight: true,
                  sublabel:  `over ${parseInt(termMonths) / 12} years`,
                },
                {
                  label: "Total payment",
                  value: formatCurrency(summary.totalPayment),
                },
                {
                  label: "Total interest",
                  value: formatCurrency(summary.totalInterest),
                },
                {
                  label: "Loan-to-value (LTV)",
                  value: `${summary.loanToValue.toFixed(1)}%`,
                  sublabel: summary.loanToValue > 80 ? "PMI may apply" : "Good LTV ratio",
                },
              ]}
            />

            {/* LTV indicator */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Loan-to-value ratio
              </p>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full transition-all ${
                    summary.loanToValue > 80 ? "bg-amber-400" : "bg-green-500"
                  }`}
                  style={{ width: `${Math.min(summary.loanToValue, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>0%</span>
                <span className={`font-semibold ${ltvColor}`}>
                  {summary.loanToValue.toFixed(1)}% LTV
                </span>
                <span>100%</span>
              </div>
              {summary.loanToValue > 80 && (
                <p className="text-xs text-amber-600 mt-2">
                  ⚠️ LTV above 80% — lenders may require Private Mortgage Insurance (PMI).
                </p>
              )}
            </div>

            <InfoBox variant="info" title="About this calculator">
              This calculator computes principal and interest only. It does not include
              property taxes, homeowner&apos;s insurance, HOA fees, or PMI — which can
              significantly affect your actual monthly payment.
            </InfoBox>
          </>
        }
        below={
          loanAmount > 0 ? (
            <ResultTable
              title="Mortgage amortization by year"
              columns={COLS}
              rows={tableRows}
              caption="Mortgage yearly amortization schedule"
            />
          ) : null
        }
      />
    </CalculatorShell>
  );
}