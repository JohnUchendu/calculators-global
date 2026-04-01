// // "use client";

// // import { useParams, notFound } from "next/navigation";
// // import { getGeoBySlug, type GeoKey } from "@/lib/geo";
// // import { TOOLS } from "@/lib/constants";

// // // ── Calculator components ─────────────────────
// // import {
// //   LoanCalculatorGeo,
// //   EmiCalculatorGeo,
// //   MortgageCalculatorGeo,
// //   PersonalLoanCalculatorGeo,
// //   CarLoanCalculatorGeo,
// //   CompoundInterestCalculatorGeo,
// //   SimpleInterestCalculatorGeo,
// //   SavingsCalculatorGeo,
// //   RetirementSavingsCalculatorGeo,
// // } from "@/components/calculator/GeoCalculatorPage";

// // // ── Calculator registry ───────────────────────
// // // Add new calculators here as you build them.
// // // slug → component function

// // type CalcComponent = React.ComponentType<{ geoKey: GeoKey }>;

// // const CALCULATOR_REGISTRY: Record<string, CalcComponent> = {
// //   "loan-calculator":               LoanCalculatorGeo,
// //   "emi-calculator":                EmiCalculatorGeo,
// //   "mortgage-calculator":           MortgageCalculatorGeo,
// //   "personal-loan-calculator":      PersonalLoanCalculatorGeo,
// //   "car-loan-calculator":           CarLoanCalculatorGeo,
// //   "compound-interest-calculator":  CompoundInterestCalculatorGeo,
// //   "simple-interest-calculator":    SimpleInterestCalculatorGeo,
// //   "savings-calculator":            SavingsCalculatorGeo,
// //   "retirement-savings-calculator": RetirementSavingsCalculatorGeo,
// // };

// // // ── Page ──────────────────────────────────────

// // export default function CalculatorPage() {
// //   const params = useParams();
// //   const slug   = typeof params.slug === "string" ? params.slug : "";

// //   // Detect geo from slug suffix
// //   const geo      = getGeoBySlug(slug);
// //   const baseSlug = geo.key !== "global"
// //     ? slug.replace(geo.urlSuffix, "")
// //     : slug;

// //   // Look up calculator component
// //   const Calculator = CALCULATOR_REGISTRY[baseSlug];

// //   if (!Calculator) {
// //     // Unknown slug — Next.js will show 404
// //     return null;
// //   }

// //   return <Calculator geoKey={geo.key} />;
// // }




// // Next.js 14: generateStaticParams CAN be exported from a "use client" page
// // when it's a simple synchronous function. This makes the route static (●)
// // so all slugs appear in the sitemap.

// "use client";

// import { useParams } from "next/navigation";
// import { getAllSlugs } from "@/lib/constants";
// import { getGeoBySlug, type GeoKey } from "@/lib/geo";
// import {
//   LoanCalculatorGeo,
//   EmiCalculatorGeo,
//   MortgageCalculatorGeo,
//   PersonalLoanCalculatorGeo,
//   CarLoanCalculatorGeo,
//   CompoundInterestCalculatorGeo,
//   SimpleInterestCalculatorGeo,
//   SavingsCalculatorGeo,
//   RetirementSavingsCalculatorGeo,
// } from "@/components/calculator/GeoCalculatorPage";

// // ── Static params ─────────────────────────────
// // Exported from the page (not just layout) so Next.js
// // pre-renders all 45 slugs at build time → sitemap picks them up
// export function generateStaticParams() {
//   return getAllSlugs().map((slug) => ({ slug }));
// }

// // ── Calculator registry ───────────────────────
// type CalcComponent = React.ComponentType<{ geoKey: GeoKey }>;

// const CALCULATOR_REGISTRY: Record<string, CalcComponent> = {
//   "loan-calculator":               LoanCalculatorGeo,
//   "emi-calculator":                EmiCalculatorGeo,
//   "mortgage-calculator":           MortgageCalculatorGeo,
//   "personal-loan-calculator":      PersonalLoanCalculatorGeo,
//   "car-loan-calculator":           CarLoanCalculatorGeo,
//   "compound-interest-calculator":  CompoundInterestCalculatorGeo,
//   "simple-interest-calculator":    SimpleInterestCalculatorGeo,
//   "savings-calculator":            SavingsCalculatorGeo,
//   "retirement-savings-calculator": RetirementSavingsCalculatorGeo,
// };

// // ── Page ──────────────────────────────────────
// export default function CalculatorPage() {
//   const params = useParams();
//   const slug   = typeof params.slug === "string" ? params.slug : "";

//   const geo      = getGeoBySlug(slug);
//   const baseSlug = geo.key !== "global"
//     ? slug.replace(geo.urlSuffix, "")
//     : slug;

//   const Calculator = CALCULATOR_REGISTRY[baseSlug];

//   if (!Calculator) return null;

//   return <Calculator geoKey={geo.key} />;
// }











// app/(calculators)/[slug]/page.tsx
// ← This file stays as a SERVER COMPONENT (no "use client")

import { notFound } from "next/navigation";
import { getGeoBySlug, type GeoKey } from "@/lib/geo";
import { getAllSlugs } from "@/lib/constants";

import CalculatorClient from "./CalculatorClient";   // ← New client wrapper

// Generate all static routes at build time (for SEO + sitemap)
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Optional: Make it fully static
export const dynamicParams = false;   // or true if you want fallback

export default function CalculatorPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const geo = getGeoBySlug(slug);
  const baseSlug = geo.key !== "global"
    ? slug.replace(geo.urlSuffix, "")
    : slug;

  // Registry moved to client side (or keep simple lookup here)
  if (!baseSlug) {
    notFound();
  }

  return <CalculatorClient baseSlug={baseSlug} geoKey={geo.key} />;
}