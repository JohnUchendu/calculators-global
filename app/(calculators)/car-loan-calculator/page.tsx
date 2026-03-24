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
  calculateLoanSummary,
  generateYearlyAmortization,
} from "@/lib/calculators/loan";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { getToolBySlug } from "@/lib/constants";

const tool = getToolBySlug("car-loan-calculator")!;

const DEFAULTS = {
  vehiclePrice: "25000",
  downPayment:  "5000",
  rate:         "6.5",
  termMonths:   "60",
};

const TERM_OPTIONS = [
  { value: "24",  label: "24 months (2 years)" },
  { value: "36",  label: "36 months (3 years)" },
  { value: "48",  label: "48 months (4 years)" },
  { value: "60",  label: "60 months (5 years)" },
  { value: "72",  label: "72 months (6 years)" },
  { value: "84",  label: "84 months (7 years)" },
];

const COLS: TableColumn[] = [
  { key: "year",           label: "Year",      align: "left"  },
  { key: "totalPayment",   label: "Payment",   align: "right" },
  { key: "totalPrincipal", label: "Principal", align: "right" },
  { key: "totalInterest",  label: "Interest",  align: "right" },
  { key: "closingBalance", label: "Balance",   align: "right" },
];

export default function CarLoanCalculatorPage() {
  const [vehiclePrice, setVehiclePrice] = useState(DEFAULTS.vehiclePrice);
  const [downPayment,  setDownPayment]  = useState(DEFAULTS.downPayment);
  const [rate,         setRate]         = useState(DEFAULTS.rate);
  const [termMonths,   setTermMonths]   = useState(DEFAULTS.termMonths);

  // Loan amount = vehicle price − down payment
  const loanAmount = useMemo(() => {
    const price = parseFloat(vehiclePrice) || 0;
    const down  = parseFloat(downPayment)  || 0;
    return Math.max(price - down, 0);
  }, [vehiclePrice, downPayment]);

  const downPaymentPct = useMemo(() => {
    const price = parseFloat(vehiclePrice) || 0;
    const down  = parseFloat(downPayment)  || 0;
    return price > 0 ? ((down / price) * 100).toFixed(1) : "0";
  }, [vehiclePrice, downPayment]);

  const inputs = useMemo(() => ({
    principal:  loanAmount,
    annualRate: parseFloat(rate)     || 0,
    termMonths: parseInt(termMonths) || 0,
  }), [loanAmount, rate, termMonths]);

  const summary    = useMemo(() => calculateLoanSummary(inputs),       [inputs]);
  const yearlyRows = useMemo(() => generateYearlyAmortization(inputs), [inputs]);

  const tableRows = yearlyRows.map((r) => ({
    year:           `Year ${r.year}`,
    totalPayment:   formatCurrency(r.totalPayment),
    totalPrincipal: formatCurrency(r.totalPrincipal),
    totalInterest:  formatCurrency(r.totalInterest),
    closingBalance: formatCurrency(r.closingBalance),
  }));

  const reset = () => {
    setVehiclePrice(DEFAULTS.vehiclePrice);
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
              label="Vehicle price"
              value={vehiclePrice}
              onChange={setVehiclePrice}
              prefix="$"
              min={0}
              placeholder="25,000"
            />
            <InputField
              label="Down payment"
              value={downPayment}
              onChange={setDownPayment}
              prefix="$"
              min={0}
              placeholder="5,000"
              hint={`${downPaymentPct}% of vehicle price`}
            />
            {/* Read-only loan amount */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
              <p className="text-xs text-gray-400 mb-0.5">Loan amount</p>
              <p className="text-sm font-semibold text-gray-800">
                {formatCurrency(loanAmount)}
              </p>
            </div>
            <SliderInput
              label="Annual interest rate"
              value={parseFloat(rate) || 0}
              onChange={(v) => setRate(String(v))}
              min={0.5}
              max={25}
              step={0.1}
              suffix="%"
            />
            <SelectField
              label="Loan term"
              value={termMonths}
              onChange={setTermMonths}
              options={TERM_OPTIONS}
            />
            <div className="pt-1 flex justify-end">
              <ResetButton onReset={reset} />
            </div>
          </>
        }
        results={
          <>
            <ResultCard
              title="Car Loan Summary"
              items={[
                {
                  label:     "Monthly payment",
                  value:     formatCurrency(summary.monthlyPayment),
                  highlight: true,
                  sublabel:  `for ${termMonths} months`,
                },
                {
                  label: "Loan amount",
                  value: formatCurrency(loanAmount),
                },
                {
                  label: "Total interest",
                  value: formatCurrency(summary.totalInterest),
                },
                {
                  label: "Total cost of car",
                  value: formatCurrency(summary.totalPayment + (parseFloat(downPayment) || 0)),
                },
              ]}
            />
            <InfoBox variant="tip" title="Down payment tip">
              A higher down payment reduces your loan amount, monthly payment, and total
              interest paid. Aim for at least 10–20% of the vehicle price if possible.
            </InfoBox>
          </>
        }
        below={
          loanAmount > 0 ? (
            <ResultTable
              title="Repayment schedule by year"
              columns={COLS}
              rows={tableRows}
              caption="Car loan yearly amortization"
            />
          ) : null
        }
      />
    </CalculatorShell>
  );
}