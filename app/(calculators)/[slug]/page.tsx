"use client";

import { useParams, notFound } from "next/navigation";
import { getGeoBySlug, type GeoKey } from "@/lib/geo";
import { TOOLS } from "@/lib/constants";

// ── Calculator components ─────────────────────
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

// ── Calculator registry ───────────────────────
// Add new calculators here as you build them.
// slug → component function

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

// ── Page ──────────────────────────────────────

export default function CalculatorPage() {
  const params = useParams();
  const slug   = typeof params.slug === "string" ? params.slug : "";

  // Detect geo from slug suffix
  const geo      = getGeoBySlug(slug);
  const baseSlug = geo.key !== "global"
    ? slug.replace(geo.urlSuffix, "")
    : slug;

  // Look up calculator component
  const Calculator = CALCULATOR_REGISTRY[baseSlug];

  if (!Calculator) {
    // Unknown slug — Next.js will show 404
    return null;
  }

  return <Calculator geoKey={geo.key} />;
}