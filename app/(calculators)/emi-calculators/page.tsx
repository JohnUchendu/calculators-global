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
  calculateLoanSummary,
  generateAmortization,
} from "@/lib/calculators/loan";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/formatters";
import { getToolBySlug } from "@/lib/constants";

const tool = getToolBySlug("emi-calculator")!;

const DEFAULTS = { principal: "500000", rate: "9", termMonths: "60" };

const COLS: TableColumn[] = [
  { key: "month",          label: "Month",      align: "left"  },
  { key: "emi",            label: "EMI",        align: "right" },
  { key: "principalShare", label: "Principal",  align: "right" },
  { key: "interestShare",  label: "Interest",   align: "right" },
  { key: "balance",        label: "Balance",    align: "right" },
];

export default function EmiCalculatorPage() {
  const [principal, setPrincipal] = useState(DEFAULTS.principal);
  const [rate,      setRate]      = useState(DEFAULTS.rate);
  const [termMonths, setTermMonths] = useState(DEFAULTS.termMonths);

  const inputs = useMemo(() => ({
    principal:  parseFloat(principal) || 0,
    annualRate: parseFloat(rate)      || 0,
    termMonths: parseInt(termMonths)  || 0,
  }), [principal, rate, termMonths]);

  const summary = useMemo(() => calculateLoanSummary(inputs), [inputs]);
  const rows    = useMemo(() => generateAmortization(inputs), [inputs]);

  const tableRows = rows.map((r) => ({
    month:          r.month,
    emi:            formatCurrency(r.payment),
    principalShare: formatCurrency(r.principal),
    interestShare:  formatCurrency(r.interest),
    balance:        formatCurrency(r.balance),
  }));

  // Principal vs interest breakdown percentages
  const principalPct = summary.totalPayment > 0
    ? ((summary.totalPrincipal / summary.totalPayment) * 100).toFixed(1)
    : "0";
  const interestPct = summary.totalPayment > 0
    ? ((summary.totalInterest / summary.totalPayment) * 100).toFixed(1)
    : "0";

  const reset = () => {
    setPrincipal(DEFAULTS.principal);
    setRate(DEFAULTS.rate);
    setTermMonths(DEFAULTS.termMonths);
  };

  return (
    <CalculatorShell tool={tool}>
      <CalculatorLayout
        inputs={
          <>
            <InputField
              label="Loan / principal amount"
              value={principal}
              onChange={setPrincipal}
              prefix="$"
              min={0}
              placeholder="500,000"
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
              label="Loan tenure"
              value={parseInt(termMonths) || 0}
              onChange={(v) => setTermMonths(String(v))}
              min={6}
              max={360}
              step={6}
              formatValue={(v) => {
                const yrs = Math.floor(v / 12);
                const mos = v % 12;
                if (yrs === 0) return `${mos}mo`;
                if (mos === 0) return `${yrs}yr`;
                return `${yrs}yr ${mos}mo`;
              }}
              hint="Drag to set tenure in months"
            />
            <div className="pt-1 flex justify-end">
              <ResetButton onReset={reset} />
            </div>
          </>
        }
        results={
          <>
            <ResultCard
              title="EMI Breakdown"
              items={[
                {
                  label:     "Monthly EMI",
                  value:     formatCurrency(summary.monthlyPayment),
                  highlight: true,
                  sublabel:  `× ${termMonths} months`,
                },
                {
                  label: "Principal amount",
                  value: formatCurrency(summary.totalPrincipal),
                  sublabel: `${principalPct}% of total`,
                },
                {
                  label: "Total interest",
                  value: formatCurrency(summary.totalInterest),
                  sublabel: `${interestPct}% of total`,
                },
                {
                  label: "Total amount payable",
                  value: formatCurrency(summary.totalPayment),
                },
              ]}
            />
            <InfoBox variant="tip" title="Principal vs interest split">
              Of every EMI payment, <strong>{principalPct}%</strong> goes toward reducing
              your principal and <strong>{interestPct}%</strong> is interest. Early payments
              are mostly interest — this shifts over time.
            </InfoBox>
          </>
        }
        below={
          inputs.principal > 0 && inputs.termMonths > 0 ? (
            <ResultTable
              title="Monthly EMI Schedule"
              columns={COLS}
              rows={tableRows}
              maxRows={12}
              caption="EMI amortization schedule"
            />
          ) : null
        }
      />
    </CalculatorShell>
  );
}