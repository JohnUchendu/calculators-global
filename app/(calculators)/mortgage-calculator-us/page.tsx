import { MortgageCalculatorGeo } from "@/components/calculator/GeoCalculatorPage";
import { buildMetadata } from "@/lib/seo";
import { getToolBySlug } from "@/lib/constants";
import { GEO_CONFIGS } from "@/lib/geo";

const tool = getToolBySlug("mortgage-calculator")!;
const geo  = GEO_CONFIGS["us"];

export const metadata = buildMetadata(tool, geo);

export default function Page() {
  return <MortgageCalculatorGeo geoKey="us" />;
}
