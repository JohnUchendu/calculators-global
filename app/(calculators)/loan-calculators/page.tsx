"use client";

import { useState, useMemo } from "react";
import type { Metadata } from "next";
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
  generateAmortization,
  generateYearlyAmortization,
  LOAN_TERM_OPTIONS,
} from "@/lib/calculators/loan";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/formatters";
import { getToolBySlug } from "@/lib/constants";

const tool = getToolBySlug("loan-calculator")!;

const DEFAULTS = {
  principal: "10000",
  rate:      "7.5",
  termMonths: "36",
};

type TableView = "monthly" | "yearly";

const MONTHLY_COLS: TableColumn[] = [
  { key: "month",     label: "Month",     align: "left"  },
  { key: "payment",   label: "Payment",   align: "right" },
  { key: "principal", label: "Principal", align: "right" },
  { key: "interest",  label: "Interest",  align: "right" },
  { key: "balance",   label: "Balance",   align: "right" },
];

const YEARLY_COLS: TableColumn[] = [
  { key: "year",           label: "Year",      align: "left"  },
  { key: "totalPayment",   label: "Payment",   align: "right" },
  { key: "totalPrincipal", label: "Principal", align: "right" },
  { key: "totalInterest",  label: "Interest",  align: "right" },
  { key: "closingBalance", label: "Balance",   align: "right" },
];

export default function LoanCalculatorPage() {
  const [principal, setPrincipal] = useState(DEFAULTS.principal);
  const [rate,      setRate]      = useState(DEFAULTS.rate);
  const [termMonths, setTermMonths] = useState(DEFAULTS.termMonths);
  const [tableView, setTableView] = useState<TableView>("yearly");

  const inputs = useMemo(() => ({
    principal:  parseFloat(principal) || 0,
    annualRate: parseFloat(rate)      || 0,
    termMonths: parseInt(termMonths)  || 0,
  }), [principal, rate, termMonths]);

  const summary      = useMemo(() => calculateLoanSummary(inputs),        [inputs]);
  const monthlyRows  = useMemo(() => generateAmortization(inputs),        [inputs]);
  const yearlyRows   = useMemo(() => generateYearlyAmortization(inputs),  [inputs]);

  const fmtRow = (v: number) => formatCurrency(v);

  const tableRows = tableView === "monthly"
    ? monthlyRows.map((r) => ({
        month:     r.month,
        payment:   fmtRow(r.payment),
        principal: fmtRow(r.principal),
        interest:  fmtRow(r.interest),
        balance:   fmtRow(r.balance),
      }))
    : yearlyRows.map((r) => ({
        year:           `Year ${r.year}`,
        totalPayment:   fmtRow(r.totalPayment),
        totalPrincipal: fmtRow(r.totalPrincipal),
        totalInterest:  fmtRow(r.totalInterest),
        closingBalance: fmtRow(r.closingBalance),
      }));

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
              label="Loan amount"
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
              max={30}
              step={0.1}
              suffix="%"
            />
            <SelectField
              label="Loan term"
              value={termMonths}
              onChange={setTermMonths}
              options={LOAN_TERM_OPTIONS}
            />
            <div className="pt-1 flex justify-end">
              <ResetButton onReset={reset} />
            </div>
          </>
        }
        results={
          <>
            <ResultCard
              title="Loan Summary"
              items={[
                {
                  label:     "Monthly payment",
                  value:     formatCurrency(summary.monthlyPayment),
                  highlight: true,
                  sublabel:  `for ${termMonths} months`,
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
                  label: "Interest rate",
                  value: formatPercent(parseFloat(rate) || 0),
                },
              ]}
            />
            <InfoBox variant="info" title="How this is calculated">
              Uses the standard EMI formula: monthly payment = P × r(1+r)ⁿ / ((1+r)ⁿ−1),
              where P is principal, r is monthly rate, and n is term in months.
            </InfoBox>
          </>
        }
        below={
          inputs.principal > 0 && inputs.termMonths > 0 ? (
            <div className="space-y-3">
              {/* Toggle monthly / yearly */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Amortization schedule</span>
                <div className="flex rounded-lg border border-gray-200 overflow-hidden ml-auto">
                  {(["yearly", "monthly"] as TableView[]).map((v) => (
                    <button
                      key={v}
                      onClick={() => setTableView(v)}
                      className={`px-3 py-1.5 text-xs font-medium transition-colors capitalize ${
                        tableView === v
                          ? "bg-green-600 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <ResultTable
                columns={tableView === "monthly" ? MONTHLY_COLS : YEARLY_COLS}
                rows={tableRows}
                maxRows={tableView === "monthly" ? 12 : 30}
                caption="Loan amortization schedule"
              />
            </div>
          ) : null
        }
      />
    </CalculatorShell>
  );
}