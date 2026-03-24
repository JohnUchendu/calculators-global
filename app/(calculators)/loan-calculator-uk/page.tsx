import { LoanCalculatorGeo } from "@/components/calculator/GeoCalculatorPage";
import { buildMetadata } from "@/lib/seo";
import { getToolBySlug } from "@/lib/constants";
import { GEO_CONFIGS } from "@/lib/geo";

const tool = getToolBySlug("loan-calculator")!;
const geo  = GEO_CONFIGS["uk"];

export const metadata = buildMetadata(tool, geo);

export default function Page() {
  return <LoanCalculatorGeo geoKey="uk" />;
}
