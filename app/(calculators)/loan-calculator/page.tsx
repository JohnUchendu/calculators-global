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
  SeoContent,
  type TableColumn,
} from "@/components/calculator";
import {
  calculateLoanSummary,
  generateAmortization,
  generateYearlyAmortization,
  LOAN_TERM_OPTIONS,
} from "@/lib/calculators/loan";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { getToolBySlug } from "@/lib/constants";
import { GEO_CONFIGS } from "@/lib/geo";
import { getSeoContent } from "@/lib/seo";

const tool = getToolBySlug("loan-calculator")!;
const geo  = GEO_CONFIGS.global;

const DEFAULTS = {
  principal:  String(geo.defaults.loanAmount),
  rate:       String(geo.defaults.annualRate),
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
  const [principal,  setPrincipal]  = useState(DEFAULTS.principal);
  const [rate,       setRate]       = useState(DEFAULTS.rate);
  const [termMonths, setTermMonths] = useState(DEFAULTS.termMonths);
  const [tableView,  setTableView]  = useState<TableView>("yearly");

  const inputs = useMemo(() => ({
    principal:  parseFloat(principal) || 0,
    annualRate: parseFloat(rate)      || 0,
    termMonths: parseInt(termMonths)  || 0,
  }), [principal, rate, termMonths]);

  const summary     = useMemo(() => calculateLoanSummary(inputs),       [inputs]);
  const monthlyRows = useMemo(() => generateAmortization(inputs),       [inputs]);
  const yearlyRows  = useMemo(() => generateYearlyAmortization(inputs), [inputs]);

  const fmt = (v: number) => formatCurrency(v, geo.locale, geo.currency);

  const tableRows = tableView === "monthly"
    ? monthlyRows.map((r) => ({
        month:     r.month,
        payment:   fmt(r.payment),
        principal: fmt(r.principal),
        interest:  fmt(r.interest),
        balance:   fmt(r.balance),
      }))
    : yearlyRows.map((r) => ({
        year:           `Year ${r.year}`,
        totalPayment:   fmt(r.totalPayment),
        totalPrincipal: fmt(r.totalPrincipal),
        totalInterest:  fmt(r.totalInterest),
        closingBalance: fmt(r.closingBalance),
      }));

  const reset = () => {
    setPrincipal(DEFAULTS.principal);
    setRate(DEFAULTS.rate);
    setTermMonths(DEFAULTS.termMonths);
  };

  const seoContent = getSeoContent("loan-calculator", geo);

  return (
    <CalculatorShell tool={tool}>
      <CalculatorLayout
        inputs={
          <>
            <InputField
              label="Loan amount"
              value={principal}
              onChange={setPrincipal}
              prefix={geo.currencySymbol}
              min={0}
              placeholder="10,000"
            />
            <SliderInput
              label="Annual interest rate"
              value={parseFloat(rate) || 0}
              onChange={(v) => setRate(String(v))}
              min={0.1} max={30} step={0.1} suffix="%"
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
                { label: "Monthly payment",  value: fmt(summary.monthlyPayment),  highlight: true, sublabel: `for ${termMonths} months` },
                { label: "Total payment",    value: fmt(summary.totalPayment)    },
                { label: "Total interest",   value: fmt(summary.totalInterest)   },
                { label: "Interest rate",    value: formatPercent(parseFloat(rate) || 0) },
              ]}
            />
            <InfoBox variant="info" title="How this is calculated">
              Uses the standard EMI formula: monthly payment = P × r(1+r)ⁿ /
              ((1+r)ⁿ−1), where P is principal, r is monthly rate, n is term in months.
            </InfoBox>
          </>
        }
        below={
          inputs.principal > 0 && inputs.termMonths > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Amortization schedule</span>
                <div className="flex rounded-lg border border-gray-200 overflow-hidden ml-auto">
                  {(["yearly", "monthly"] as TableView[]).map((v) => (
                    <button key={v} onClick={() => setTableView(v)}
                      className={`px-3 py-1.5 text-xs font-medium transition-colors capitalize ${
                        tableView === v ? "bg-green-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >{v}</button>
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
      <SeoContent content={seoContent} tool={tool} geo={geo} />
    </CalculatorShell>
  );
}