import { RetirementSavingsCalculatorGeo } from "@/components/calculator/GeoCalculatorPage";
import { buildMetadata } from "@/lib/seo";
import { getToolBySlug } from "@/lib/constants";
import { GEO_CONFIGS } from "@/lib/geo";

const tool = getToolBySlug("retirement-savings-calculator")!;
const geo  = GEO_CONFIGS["nigeria"];

export const metadata = buildMetadata(tool, geo);

export default function Page() {
  return <RetirementSavingsCalculatorGeo geoKey="nigeria" />;
}
