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
  LOAN_TERM_OPTIONS,
} from "@/lib/calculators/loan";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { getToolBySlug } from "@/lib/constants";

const tool = getToolBySlug("personal-loan-calculator")!;

const DEFAULTS = { principal: "5000", rate: "12", termMonths: "24" };

// Purpose options — cosmetic only (no effect on calculation, no country rules)
const PURPOSE_OPTIONS = [
  { value: "general",     label: "General purpose"     },
  { value: "medical",     label: "Medical expenses"    },
  { value: "education",   label: "Education"           },
  { value: "travel",      label: "Travel"              },
  { value: "renovation",  label: "Home renovation"     },
  { value: "wedding",     label: "Wedding"             },
  { value: "debt",        label: "Debt consolidation"  },
  { value: "other",       label: "Other"               },
];

const COLS: TableColumn[] = [
  { key: "year",           label: "Year",      align: "left"  },
  { key: "totalPayment",   label: "Payment",   align: "right" },
  { key: "totalPrincipal", label: "Principal", align: "right" },
  { key: "totalInterest",  label: "Interest",  align: "right" },
  { key: "closingBalance", label: "Balance",   align: "right" },
];

export default function PersonalLoanCalculatorPage() {
  const [principal, setPrincipal] = useState(DEFAULTS.principal);
  const [rate,      setRate]      = useState(DEFAULTS.rate);
  const [termMonths, setTermMonths] = useState(DEFAULTS.termMonths);
  const [purpose,   setPurpose]   = useState("general");

  const inputs = useMemo(() => ({
    principal:  parseFloat(principal) || 0,
    annualRate: parseFloat(rate)      || 0,
    termMonths: parseInt(termMonths)  || 0,
  }), [principal, rate, termMonths]);

  const summary     = useMemo(() => calculateLoanSummary(inputs),       [inputs]);
  const yearlyRows  = useMemo(() => generateYearlyAmortization(inputs), [inputs]);

  const tableRows = yearlyRows.map((r) => ({
    year:           `Year ${r.year}`,
    totalPayment:   formatCurrency(r.totalPayment),
    totalPrincipal: formatCurrency(r.totalPrincipal),
    totalInterest:  formatCurrency(r.totalInterest),
    closingBalance: formatCurrency(r.closingBalance),
  }));

  const reset = () => {
    setPrincipal(DEFAULTS.principal);
    setRate(DEFAULTS.rate);
    setTermMonths(DEFAULTS.termMonths);
    setPurpose("general");
  };

  return (
    <CalculatorShell tool={tool}>
      <CalculatorLayout
        inputs={
          <>
            <SelectField
              label="Loan purpose"
              value={purpose}
              onChange={setPurpose}
              options={PURPOSE_OPTIONS}
              hint="For reference only — does not affect calculation"
            />
            <InputField
              label="Loan amount"
              value={principal}
              onChange={setPrincipal}
              prefix="$"
              min={0}
              placeholder="5,000"
            />
            <SliderInput
              label="Annual interest rate"
              value={parseFloat(rate) || 0}
              onChange={(v) => setRate(String(v))}
              min={1}
              max={36}
              step={0.1}
              suffix="%"
              hint="Personal loan rates typically range from 6%–36%"
            />
            <SelectField
              label="Loan term"
              value={termMonths}
              onChange={setTermMonths}
              options={LOAN_TERM_OPTIONS.filter((o) => parseInt(o.value) <= 84)}
            />
            <div className="pt-1 flex justify-end">
              <ResetButton onReset={reset} />
            </div>
          </>
        }
        results={
          <>
            <ResultCard
              title="Personal Loan Summary"
              items={[
                {
                  label:     "Monthly repayment",
                  value:     formatCurrency(summary.monthlyPayment),
                  highlight: true,
                },
                {
                  label: "Total repayment",
                  value: formatCurrency(summary.totalPayment),
                },
                {
                  label: "Total interest cost",
                  value: formatCurrency(summary.totalInterest),
                },
                {
                  label: "Interest rate",
                  value: formatPercent(parseFloat(rate) || 0),
                },
              ]}
            />
            <InfoBox variant="warning" title="Disclaimer">
              Personal loan rates vary by lender and credit score. This calculator
              uses a fixed rate — actual rates may differ. Always compare offers
              before borrowing.
            </InfoBox>
          </>
        }
        below={
          inputs.principal > 0 ? (
            <ResultTable
              title="Repayment by year"
              columns={COLS}
              rows={tableRows}
              caption="Personal loan yearly breakdown"
            />
          ) : null
        }
      />
    </CalculatorShell>
  );
}