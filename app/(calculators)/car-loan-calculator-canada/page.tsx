import { CarLoanCalculatorGeo } from "@/components/calculator/GeoCalculatorPage";
import { buildMetadata } from "@/lib/seo";
import { getToolBySlug } from "@/lib/constants";
import { GEO_CONFIGS } from "@/lib/geo";

const tool = getToolBySlug("car-loan-calculator")!;
const geo  = GEO_CONFIGS["canada"];

export const metadata = buildMetadata(tool, geo);

export default function Page() {
  return <CarLoanCalculatorGeo geoKey="canada" />;
}
