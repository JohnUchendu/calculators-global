// ─────────────────────────────────────────────
//  GeoCalculatorPage factory
//
//  Every geo variant page (e.g. /loan-calculator-nigeria)
//  renders its base calculator with geo-specific:
//    - currency symbol & locale
//    - default input values
//    - SEO metadata
//    - SEO content block
//    - geo switcher
//
//  Usage in a geo page file:
//
//  import { LoanCalculatorGeo } from "@/components/calculator/GeoCalculatorPage"
//  export default function Page() {
//    return <LoanCalculatorGeo geoKey="nigeria" />
//  }
//  export { generateMetadata } from "@/components/calculator/GeoCalculatorPage"
// ─────────────────────────────────────────────

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
  calculateMortgage,
  LOAN_TERM_OPTIONS,
  MORTGAGE_TERM_OPTIONS,
} from "@/lib/calculators/loan";
import {
  calculateSimpleInterest,
  calculateCompoundInterest,
  generateCompoundGrowthTable,
  COMPOUND_FREQUENCY_OPTIONS,
  type CompoundFrequency,
} from "@/lib/calculators/interest";
import {
  calculateSavings,
  generateSavingsGrowthTable,
  calculateRetirement,
  generateRetirementGrowthTable,
} from "@/lib/calculators/savings";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { getToolBySlug } from "@/lib/constants";
import { GEO_CONFIGS, formatGeo, type GeoKey } from "@/lib/geo";
import { getSeoContent } from "@/lib/seo";

// ── Loan Calculator Geo ───────────────────────

export function LoanCalculatorGeo({ geoKey }: { geoKey: GeoKey }) {
  const tool = getToolBySlug("loan-calculator")!;
  const geo  = GEO_CONFIGS[geoKey];
  const d    = geo.defaults;

  const [principal,  setPrincipal]  = useState(String(d.loanAmount));
  const [rate,       setRate]       = useState(String(d.annualRate));
  const [termMonths, setTermMonths] = useState("36");

  const inputs = useMemo(() => ({
    principal:  parseFloat(principal) || 0,
    annualRate: parseFloat(rate)      || 0,
    termMonths: parseInt(termMonths)  || 0,
  }), [principal, rate, termMonths]);

  const summary    = useMemo(() => calculateLoanSummary(inputs),       [inputs]);
  const yearlyRows = useMemo(() => generateYearlyAmortization(inputs), [inputs]);
  const fmt = (v: number) => formatGeo(v, geo);

  const YEARLY_COLS: TableColumn[] = [
    { key: "year",           label: "Year",      align: "left"  },
    { key: "totalPayment",   label: "Payment",   align: "right" },
    { key: "totalPrincipal", label: "Principal", align: "right" },
    { key: "totalInterest",  label: "Interest",  align: "right" },
    { key: "closingBalance", label: "Balance",   align: "right" },
  ];

  const tableRows = yearlyRows.map((r) => ({
    year:           `Year ${r.year}`,
    totalPayment:   fmt(r.totalPayment),
    totalPrincipal: fmt(r.totalPrincipal),
    totalInterest:  fmt(r.totalInterest),
    closingBalance: fmt(r.closingBalance),
  }));

  return (
    <CalculatorShell tool={tool}>
      <CalculatorLayout
        inputs={
          <>
            <InputField label="Loan amount" value={principal} onChange={setPrincipal} prefix={geo.currencySymbol} min={0} />
            <SliderInput label="Annual interest rate" value={parseFloat(rate)||0} onChange={(v)=>setRate(String(v))} min={0.1} max={50} step={0.1} suffix="%" />
            <SelectField label="Loan term" value={termMonths} onChange={setTermMonths} options={LOAN_TERM_OPTIONS} />
            <div className="flex justify-end"><ResetButton onReset={() => { setPrincipal(String(d.loanAmount)); setRate(String(d.annualRate)); setTermMonths("36"); }} /></div>
          </>
        }
        results={
          <>
            <ResultCard title={`${geo.flag} ${geo.label} Loan Summary`} items={[
              { label: "Monthly payment", value: fmt(summary.monthlyPayment), highlight: true, sublabel: `for ${termMonths} months` },
              { label: "Total payment",   value: fmt(summary.totalPayment)   },
              { label: "Total interest",  value: fmt(summary.totalInterest)  },
              { label: "Interest rate",   value: formatPercent(parseFloat(rate)||0) },
            ]} />
            <InfoBox variant="info" title={`Rates in ${geo.label}`}>{geo.seo.rateNote}</InfoBox>
          </>
        }
        below={inputs.principal > 0 ? <ResultTable title="Yearly breakdown" columns={YEARLY_COLS} rows={tableRows} /> : null}
      />
      <SeoContent content={getSeoContent("loan-calculator", geo)} tool={tool} geo={geo} />
    </CalculatorShell>
  );
}

// ── EMI Calculator Geo ────────────────────────

export function EmiCalculatorGeo({ geoKey }: { geoKey: GeoKey }) {
  const tool = getToolBySlug("emi-calculator")!;
  const geo  = GEO_CONFIGS[geoKey];
  const d    = geo.defaults;

  const [principal,  setPrincipal]  = useState(String(d.loanAmount));
  const [rate,       setRate]       = useState(String(d.annualRate));
  const [termMonths, setTermMonths] = useState("60");

  const inputs = useMemo(() => ({ principal: parseFloat(principal)||0, annualRate: parseFloat(rate)||0, termMonths: parseInt(termMonths)||0 }), [principal, rate, termMonths]);
  const summary = useMemo(() => calculateLoanSummary(inputs), [inputs]);
  const fmt = (v: number) => formatGeo(v, geo);

  return (
    <CalculatorShell tool={tool}>
      <CalculatorLayout
        inputs={
          <>
            <InputField label="Loan / principal amount" value={principal} onChange={setPrincipal} prefix={geo.currencySymbol} min={0} />
            <SliderInput label="Annual interest rate" value={parseFloat(rate)||0} onChange={(v)=>setRate(String(v))} min={0.1} max={50} step={0.1} suffix="%" />
            <SliderInput label="Loan tenure (months)" value={parseInt(termMonths)||0} onChange={(v)=>setTermMonths(String(v))} min={6} max={360} step={6} formatValue={(v)=>{const y=Math.floor(v/12);const m=v%12;return y===0?`${m}mo`:m===0?`${y}yr`:`${y}yr ${m}mo`;}} />
            <div className="flex justify-end"><ResetButton onReset={() => { setPrincipal(String(d.loanAmount)); setRate(String(d.annualRate)); setTermMonths("60"); }} /></div>
          </>
        }
        results={
          <>
            <ResultCard title={`${geo.flag} EMI Summary`} items={[
              { label: "Monthly EMI",         value: fmt(summary.monthlyPayment), highlight: true },
              { label: "Principal amount",    value: fmt(summary.totalPrincipal)  },
              { label: "Total interest",      value: fmt(summary.totalInterest)   },
              { label: "Total amount payable",value: fmt(summary.totalPayment)    },
            ]} />
            <InfoBox variant="info" title={`Rates in ${geo.label}`}>{geo.seo.rateNote}</InfoBox>
          </>
        }
      />
      <SeoContent content={getSeoContent("emi-calculator", geo)} tool={tool} geo={geo} />
    </CalculatorShell>
  );
}

// ── Mortgage Calculator Geo ───────────────────

export function MortgageCalculatorGeo({ geoKey }: { geoKey: GeoKey }) {
  const tool = getToolBySlug("mortgage-calculator")!;
  const geo  = GEO_CONFIGS[geoKey];
  const d    = geo.defaults;

  const [propertyValue, setPropertyValue] = useState(String(d.propertyValue));
  const [downPayment,   setDownPayment]   = useState(String(d.downPayment));
  const [rate,          setRate]          = useState(String(d.mortgageRate));
  const [termMonths,    setTermMonths]    = useState("360");

  const loanAmount = useMemo(() => Math.max((parseFloat(propertyValue)||0)-(parseFloat(downPayment)||0),0), [propertyValue, downPayment]);
  const mortgageInputs = useMemo(() => ({ principal: loanAmount, annualRate: parseFloat(rate)||0, termMonths: parseInt(termMonths)||0, propertyValue: parseFloat(propertyValue)||0, downPayment: parseFloat(downPayment)||0 }), [loanAmount, rate, termMonths, propertyValue, downPayment]);
  const summary = useMemo(() => calculateMortgage(mortgageInputs), [mortgageInputs]);
  const fmt = (v: number) => formatGeo(v, geo);

  return (
    <CalculatorShell tool={tool}>
      <CalculatorLayout
        inputs={
          <>
            <InputField label="Property value"  value={propertyValue} onChange={setPropertyValue} prefix={geo.currencySymbol} />
            <InputField label="Down payment"    value={downPayment}   onChange={setDownPayment}   prefix={geo.currencySymbol} />
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
              <p className="text-xs text-gray-400 mb-0.5">Mortgage amount</p>
              <p className="text-sm font-semibold text-gray-800">{fmt(loanAmount)}</p>
            </div>
            <SliderInput label="Annual interest rate" value={parseFloat(rate)||0} onChange={(v)=>setRate(String(v))} min={0.5} max={30} step={0.05} suffix="%" />
            <SelectField label="Mortgage term" value={termMonths} onChange={setTermMonths} options={MORTGAGE_TERM_OPTIONS} />
            <div className="flex justify-end"><ResetButton onReset={() => { setPropertyValue(String(d.propertyValue)); setDownPayment(String(d.downPayment)); setRate(String(d.mortgageRate)); setTermMonths("360"); }} /></div>
          </>
        }
        results={
          <>
            <ResultCard title={`${geo.flag} Mortgage Summary`} items={[
              { label: "Monthly payment", value: fmt(summary.monthlyPayment), highlight: true },
              { label: "Total payment",   value: fmt(summary.totalPayment)   },
              { label: "Total interest",  value: fmt(summary.totalInterest)  },
              { label: "LTV ratio",       value: `${summary.loanToValue.toFixed(1)}%` },
            ]} />
            <InfoBox variant="info" title={`Mortgage rates in ${geo.label}`}>{geo.seo.rateNote}</InfoBox>
          </>
        }
      />
      <SeoContent content={getSeoContent("mortgage-calculator", geo)} tool={tool} geo={geo} />
    </CalculatorShell>
  );
}

// ── Compound Interest Calculator Geo ──────────

export function CompoundInterestCalculatorGeo({ geoKey }: { geoKey: GeoKey }) {
  const tool = getToolBySlug("compound-interest-calculator")!;
  const geo  = GEO_CONFIGS[geoKey];
  const d    = geo.defaults;

  const [principal,    setPrincipal]    = useState(String(d.savings));
  const [rate,         setRate]         = useState(String(d.annualRate));
  const [years,        setYears]        = useState("10");
  const [frequency,    setFrequency]    = useState<CompoundFrequency>("monthly");
  const [contribution, setContribution] = useState(String(d.monthlyContribution));

  const inputs = useMemo(() => ({ principal: parseFloat(principal)||0, annualRate: parseFloat(rate)||0, years: parseInt(years)||0, frequency, monthlyContribution: parseFloat(contribution)||0 }), [principal, rate, years, frequency, contribution]);
  const result = useMemo(() => calculateCompoundInterest(inputs), [inputs]);
  const fmt = (v: number) => formatGeo(v, geo);

  return (
    <CalculatorShell tool={tool}>
      <CalculatorLayout
        inputs={
          <>
            <InputField label="Initial deposit"       value={principal}    onChange={setPrincipal}    prefix={geo.currencySymbol} />
            <InputField label="Monthly contribution"  value={contribution} onChange={setContribution} prefix={geo.currencySymbol} />
            <SliderInput label="Annual interest rate" value={parseFloat(rate)||0} onChange={(v)=>setRate(String(v))} min={0.1} max={30} step={0.1} suffix="%" />
            <SliderInput label="Time period"          value={parseInt(years)||0} onChange={(v)=>setYears(String(v))} min={1} max={50} step={1} formatValue={(v)=>`${v}yr`} />
            <SelectField label="Compounding frequency" value={frequency} onChange={(v)=>setFrequency(v as CompoundFrequency)} options={COMPOUND_FREQUENCY_OPTIONS} />
            <div className="flex justify-end"><ResetButton onReset={()=>{ setPrincipal(String(d.savings)); setRate(String(d.annualRate)); setYears("10"); setFrequency("monthly"); setContribution(String(d.monthlyContribution)); }} /></div>
          </>
        }
        results={
          <>
            <ResultCard title={`${geo.flag} Growth Summary`} items={[
              { label: "Future value",         value: fmt(result.totalAmount),       highlight: true, sublabel: `after ${years} years` },
              { label: "Total interest earned",value: fmt(result.totalInterest)      },
              { label: "Total contributions",  value: fmt(result.totalContributions) },
              { label: "Effective annual rate",value: `${result.effectiveAnnualRate.toFixed(3)}%` },
            ]} />
          </>
        }
      />
      <SeoContent content={getSeoContent("compound-interest-calculator", geo)} tool={tool} geo={geo} />
    </CalculatorShell>
  );
}

// ── Savings Calculator Geo ────────────────────

export function SavingsCalculatorGeo({ geoKey }: { geoKey: GeoKey }) {
  const tool = getToolBySlug("savings-calculator")!;
  const geo  = GEO_CONFIGS[geoKey];
  const d    = geo.defaults;

  const [initialDeposit,      setInitialDeposit]      = useState(String(d.savings));
  const [monthlyContribution, setMonthlyContribution] = useState(String(d.monthlyContribution));
  const [rate,                setRate]                = useState(String(d.annualRate));
  const [years,               setYears]               = useState("10");

  const inputs = useMemo(() => ({ initialDeposit: parseFloat(initialDeposit)||0, monthlyContribution: parseFloat(monthlyContribution)||0, annualRate: parseFloat(rate)||0, years: parseInt(years)||0 }), [initialDeposit, monthlyContribution, rate, years]);
  const result = useMemo(() => calculateSavings(inputs), [inputs]);
  const fmt = (v: number) => formatGeo(v, geo);

  return (
    <CalculatorShell tool={tool}>
      <CalculatorLayout
        inputs={
          <>
            <InputField label="Initial deposit"       value={initialDeposit}      onChange={setInitialDeposit}      prefix={geo.currencySymbol} />
            <InputField label="Monthly contribution"  value={monthlyContribution} onChange={setMonthlyContribution} prefix={geo.currencySymbol} />
            <SliderInput label="Annual interest rate" value={parseFloat(rate)||0} onChange={(v)=>setRate(String(v))} min={0.1} max={20} step={0.1} suffix="%" />
            <SliderInput label="Savings period"       value={parseInt(years)||0}  onChange={(v)=>setYears(String(v))} min={1} max={40} step={1} formatValue={(v)=>`${v}yr`} />
            <div className="flex justify-end"><ResetButton onReset={()=>{ setInitialDeposit(String(d.savings)); setMonthlyContribution(String(d.monthlyContribution)); setRate(String(d.annualRate)); setYears("10"); }} /></div>
          </>
        }
        results={
          <>
            <ResultCard title={`${geo.flag} Savings Projection`} items={[
              { label: "Future balance",    value: fmt(result.futureValue),          highlight: true, sublabel: `after ${years} years` },
              { label: "Total deposited",   value: fmt(result.totalDeposited)        },
              { label: "Interest earned",   value: fmt(result.totalInterestEarned)   },
            ]} />
          </>
        }
      />
      <SeoContent content={getSeoContent("savings-calculator", geo)} tool={tool} geo={geo} />
    </CalculatorShell>
  );
}

// ── Retirement Savings Calculator Geo ─────────

export function RetirementSavingsCalculatorGeo({ geoKey }: { geoKey: GeoKey }) {
  const tool = getToolBySlug("retirement-savings-calculator")!;
  const geo  = GEO_CONFIGS[geoKey];
  const d    = geo.defaults;

  const [currentAge,           setCurrentAge]           = useState("30");
  const [retirementAge,        setRetirementAge]        = useState("65");
  const [currentSavings,       setCurrentSavings]       = useState(String(d.savings));
  const [monthlyContribution,  setMonthlyContribution]  = useState(String(d.monthlyContribution));
  const [annualReturn,         setAnnualReturn]         = useState("7");
  const [inflationRate,        setInflationRate]        = useState("3");
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState(String(d.retirementMonthlyIncome));
  const [retirementDuration,   setRetirementDuration]   = useState("25");

  const inputs = useMemo(() => ({
    currentAge: parseInt(currentAge)||0, retirementAge: parseInt(retirementAge)||0,
    currentSavings: parseFloat(currentSavings)||0, monthlyContribution: parseFloat(monthlyContribution)||0,
    annualReturn: parseFloat(annualReturn)||0, inflationRate: parseFloat(inflationRate)||0,
    desiredMonthlyIncome: parseFloat(desiredMonthlyIncome)||0, retirementDuration: parseInt(retirementDuration)||0,
  }), [currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn, inflationRate, desiredMonthlyIncome, retirementDuration]);

  const result   = useMemo(() => calculateRetirement(inputs), [inputs]);
  const fmt = (v: number) => formatGeo(v, geo);
  const onTrack  = result.shortfall <= 0;

  return (
    <CalculatorShell tool={tool}>
      <CalculatorLayout
        inputs={
          <>
            <div className="grid grid-cols-2 gap-3">
              <SliderInput label="Current age"    value={parseInt(currentAge)||0}    onChange={(v)=>setCurrentAge(String(v))}    min={18} max={70} step={1} formatValue={(v)=>`${v}yrs`} />
              <SliderInput label="Retirement age" value={parseInt(retirementAge)||0} onChange={(v)=>setRetirementAge(String(v))} min={40} max={80} step={1} formatValue={(v)=>`${v}yrs`} />
            </div>
            <InputField label="Current savings"                  value={currentSavings}       onChange={setCurrentSavings}       prefix={geo.currencySymbol} />
            <InputField label="Monthly contribution"             value={monthlyContribution}  onChange={setMonthlyContribution}  prefix={geo.currencySymbol} />
            <InputField label="Desired monthly retirement income" value={desiredMonthlyIncome} onChange={setDesiredMonthlyIncome} prefix={geo.currencySymbol} />
            <div className="grid grid-cols-2 gap-3">
              <SliderInput label="Annual return"  value={parseFloat(annualReturn)||0}  onChange={(v)=>setAnnualReturn(String(v))}  min={1} max={15} step={0.5} suffix="%" />
              <SliderInput label="Inflation rate" value={parseFloat(inflationRate)||0} onChange={(v)=>setInflationRate(String(v))} min={0} max={10} step={0.5} suffix="%" />
            </div>
            <div className="flex justify-end"><ResetButton onReset={()=>{ setCurrentSavings(String(d.savings)); setMonthlyContribution(String(d.monthlyContribution)); setDesiredMonthlyIncome(String(d.retirementMonthlyIncome)); }} /></div>
          </>
        }
        results={
          <>
            <div className={`rounded-xl px-4 py-3 border text-sm font-medium flex items-center gap-2 ${onTrack ? "bg-green-50 border-green-200 text-green-700" : "bg-amber-50 border-amber-200 text-amber-700"}`}>
              <span>{onTrack ? "✅" : "⚠️"}</span>
              {onTrack ? `On track! Surplus of ${fmt(Math.abs(result.shortfall))}` : `Shortfall of ${fmt(Math.abs(result.shortfall))}`}
            </div>
            <ResultCard title={`${geo.flag} Retirement Projection`} items={[
              { label: "Projected nest egg",          value: fmt(result.projectedNestEgg),              highlight: true, sublabel: `at age ${retirementAge}` },
              { label: "Required nest egg",           value: fmt(result.requiredNestEgg)                },
              { label: "Required monthly saving",     value: fmt(result.requiredMonthlyContribution),   sublabel: "to hit target" },
              { label: "Inflation-adjusted income",   value: fmt(result.inflationAdjustedIncome)        },
            ]} />
          </>
        }
      />
      <SeoContent content={getSeoContent("retirement-savings-calculator", geo)} tool={tool} geo={geo} />
    </CalculatorShell>
  );
}

// ── Personal Loan + Car Loan Geo ──────────────

export function PersonalLoanCalculatorGeo({ geoKey }: { geoKey: GeoKey }) {
  const tool = getToolBySlug("personal-loan-calculator")!;
  const geo  = GEO_CONFIGS[geoKey];
  const d    = geo.defaults;

  const [principal,  setPrincipal]  = useState(String(d.loanAmount));
  const [rate,       setRate]       = useState(String(d.personalLoanRate));
  const [termMonths, setTermMonths] = useState("24");

  const inputs  = useMemo(() => ({ principal: parseFloat(principal)||0, annualRate: parseFloat(rate)||0, termMonths: parseInt(termMonths)||0 }), [principal, rate, termMonths]);
  const summary = useMemo(() => calculateLoanSummary(inputs), [inputs]);
  const fmt = (v: number) => formatGeo(v, geo);

  return (
    <CalculatorShell tool={tool}>
      <CalculatorLayout
        inputs={
          <>
            <InputField label="Loan amount"          value={principal}  onChange={setPrincipal}  prefix={geo.currencySymbol} />
            <SliderInput label="Annual interest rate" value={parseFloat(rate)||0} onChange={(v)=>setRate(String(v))} min={1} max={50} step={0.1} suffix="%" hint={`Typical range in ${geo.label}: ${d.personalLoanRate-5}%–${d.personalLoanRate+5}%`} />
            <SelectField label="Loan term" value={termMonths} onChange={setTermMonths} options={LOAN_TERM_OPTIONS.filter(o=>parseInt(o.value)<=84)} />
            <div className="flex justify-end"><ResetButton onReset={()=>{ setPrincipal(String(d.loanAmount)); setRate(String(d.personalLoanRate)); setTermMonths("24"); }} /></div>
          </>
        }
        results={
          <>
            <ResultCard title={`${geo.flag} Personal Loan Summary`} items={[
              { label: "Monthly repayment", value: fmt(summary.monthlyPayment), highlight: true },
              { label: "Total repayment",   value: fmt(summary.totalPayment)   },
              { label: "Total interest",    value: fmt(summary.totalInterest)  },
            ]} />
            <InfoBox variant="warning" title={`Rates in ${geo.label}`}>{geo.seo.rateNote}</InfoBox>
          </>
        }
      />
      <SeoContent content={getSeoContent("personal-loan-calculator", geo)} tool={tool} geo={geo} />
    </CalculatorShell>
  );
}

export function CarLoanCalculatorGeo({ geoKey }: { geoKey: GeoKey }) {
  const tool = getToolBySlug("car-loan-calculator")!;
  const geo  = GEO_CONFIGS[geoKey];
  const d    = geo.defaults;

  const [vehiclePrice, setVehiclePrice] = useState(String(d.loanAmount * 2.5));
  const [downPayment,  setDownPayment]  = useState(String(d.loanAmount * 0.5));
  const [rate,         setRate]         = useState(String(d.carLoanRate));
  const [termMonths,   setTermMonths]   = useState("60");

  const loanAmount = useMemo(() => Math.max((parseFloat(vehiclePrice)||0)-(parseFloat(downPayment)||0), 0), [vehiclePrice, downPayment]);
  const inputs  = useMemo(() => ({ principal: loanAmount, annualRate: parseFloat(rate)||0, termMonths: parseInt(termMonths)||0 }), [loanAmount, rate, termMonths]);
  const summary = useMemo(() => calculateLoanSummary(inputs), [inputs]);
  const fmt = (v: number) => formatGeo(v, geo);

  const CAR_TERMS = [
    { value: "24", label: "24 months" }, { value: "36", label: "36 months" },
    { value: "48", label: "48 months" }, { value: "60", label: "60 months" },
    { value: "72", label: "72 months" }, { value: "84", label: "84 months" },
  ];

  return (
    <CalculatorShell tool={tool}>
      <CalculatorLayout
        inputs={
          <>
            <InputField label="Vehicle price"  value={vehiclePrice} onChange={setVehiclePrice} prefix={geo.currencySymbol} />
            <InputField label="Down payment"   value={downPayment}  onChange={setDownPayment}  prefix={geo.currencySymbol} />
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
              <p className="text-xs text-gray-400 mb-0.5">Loan amount</p>
              <p className="text-sm font-semibold text-gray-800">{fmt(loanAmount)}</p>
            </div>
            <SliderInput label="Annual interest rate" value={parseFloat(rate)||0} onChange={(v)=>setRate(String(v))} min={0.5} max={40} step={0.1} suffix="%" />
            <SelectField label="Loan term" value={termMonths} onChange={setTermMonths} options={CAR_TERMS} />
            <div className="flex justify-end"><ResetButton onReset={()=>{ setVehiclePrice(String(d.loanAmount*2.5)); setDownPayment(String(d.loanAmount*0.5)); setRate(String(d.carLoanRate)); setTermMonths("60"); }} /></div>
          </>
        }
        results={
          <>
            <ResultCard title={`${geo.flag} Car Loan Summary`} items={[
              { label: "Monthly payment",   value: fmt(summary.monthlyPayment), highlight: true },
              { label: "Loan amount",       value: fmt(loanAmount)              },
              { label: "Total interest",    value: fmt(summary.totalInterest)   },
              { label: "Total cost of car", value: fmt(summary.totalPayment + (parseFloat(downPayment)||0)) },
            ]} />
            <InfoBox variant="tip" title={`Car finance in ${geo.label}`}>{geo.seo.rateNote}</InfoBox>
          </>
        }
      />
      <SeoContent content={getSeoContent("car-loan-calculator", geo)} tool={tool} geo={geo} />
    </CalculatorShell>
  );
}

// ── Simple Interest Calculator Geo ────────────

export function SimpleInterestCalculatorGeo({ geoKey }: { geoKey: GeoKey }) {
  const tool = getToolBySlug("simple-interest-calculator")!;
  const geo  = GEO_CONFIGS[geoKey];
  const d    = geo.defaults;

  const [principal, setPrincipal] = useState(String(d.savings));
  const [rate,      setRate]      = useState(String(d.annualRate));
  const [years,     setYears]     = useState("3");

  const result = useMemo(() => calculateSimpleInterest({ principal: parseFloat(principal)||0, annualRate: parseFloat(rate)||0, years: parseFloat(years)||0 }), [principal, rate, years]);
  const fmt = (v: number) => formatGeo(v, geo);

  return (
    <CalculatorShell tool={tool}>
      <CalculatorLayout
        inputs={
          <>
            <InputField  label="Principal amount"     value={principal} onChange={setPrincipal} prefix={geo.currencySymbol} />
            <SliderInput label="Annual interest rate" value={parseFloat(rate)||0} onChange={(v)=>setRate(String(v))} min={0.1} max={50} step={0.1} suffix="%" />
            <SliderInput label="Time period"          value={parseFloat(years)||0} onChange={(v)=>setYears(String(v))} min={0.5} max={30} step={0.5} formatValue={(v)=>`${v}yr`} />
            <div className="flex justify-end"><ResetButton onReset={()=>{ setPrincipal(String(d.savings)); setRate(String(d.annualRate)); setYears("3"); }} /></div>
          </>
        }
        results={
          <ResultCard title={`${geo.flag} Simple Interest Result`} items={[
            { label: "Total interest",      value: fmt(result.interest),     highlight: true },
            { label: "Total amount (P + I)",value: fmt(result.totalAmount)   },
            { label: "Principal",           value: fmt(result.principal)     },
            { label: "Rate applied",        value: formatPercent(parseFloat(rate)||0) },
          ]} />
        }
      />
      <SeoContent content={getSeoContent("simple-interest-calculator", geo)} tool={tool} geo={geo} />
    </CalculatorShell>
  );
}