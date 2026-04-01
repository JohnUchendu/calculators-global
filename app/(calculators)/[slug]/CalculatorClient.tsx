// app/(calculators)/[slug]/CalculatorClient.tsx
"use client";

import { useParams } from "next/navigation"; // optional if you still need it
import {
  LoanCalculatorGeo,
  EmiCalculatorGeo,
  MortgageCalculatorGeo,
  PersonalLoanCalculatorGeo,
  CarLoanCalculatorGeo,
  CompoundInterestCalculatorGeo,
  SimpleInterestCalculatorGeo,
  SavingsCalculatorGeo,
  RetirementSavingsCalculatorGeo,
} from "@/components/calculator/GeoCalculatorPage";
import { GeoKey } from "@/lib/geo";

type CalcComponent = React.ComponentType<{ geoKey: GeoKey }>;

const CALCULATOR_REGISTRY: Record<string, CalcComponent> = {
  "loan-calculator":               LoanCalculatorGeo,
  "emi-calculator":                EmiCalculatorGeo,
  "mortgage-calculator":           MortgageCalculatorGeo,
  "personal-loan-calculator":      PersonalLoanCalculatorGeo,
  "car-loan-calculator":           CarLoanCalculatorGeo,
  "compound-interest-calculator":  CompoundInterestCalculatorGeo,
  "simple-interest-calculator":    SimpleInterestCalculatorGeo,
  "savings-calculator":            SavingsCalculatorGeo,
  "retirement-savings-calculator": RetirementSavingsCalculatorGeo,
};

export default function CalculatorClient({ 
  baseSlug, 
  geoKey 
}: { 
  baseSlug: string; 
  geoKey: GeoKey;
}) {
  const Calculator = CALCULATOR_REGISTRY[baseSlug];

  if (!Calculator) {
    return <div>Calculator not found</div>; // or throw notFound() but since it's client, better to handle gracefully
  }

  return <Calculator geoKey={geoKey} />;
}