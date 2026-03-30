import Link from "next/link";
import { TOOLS } from "@/lib/constants";

interface CalculatorCTAProps {
  slug:     string;   // tool slug e.g. "mortgage-calculator"
  geoSlug?: string;   // optional e.g. "mortgage-calculator-nigeria"
  label?:   string;   // custom CTA label
  context?: string;   // optional sentence above the CTA box
}

export default function CalculatorCTA({
  slug,
  geoSlug,
  label,
  context,
}: CalculatorCTAProps) {
  const tool     = TOOLS.find((t) => t.slug === slug);
  const href     = `/${geoSlug ?? slug}`;
  const ctaLabel = label ?? `Use the free ${tool?.title ?? "calculator"}`;

  if (!tool) return null;

  return (
    <div className="my-8 rounded-2xl border border-green-200 bg-green-50 p-5">
      {context && (
        <p className="text-sm text-green-700 mb-3">{context}</p>
      )}
      <div className="flex items-center gap-3">
        <span className="text-2xl">{tool.icon}</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-green-800">{tool.title}</p>
          <p className="text-xs text-green-600 mt-0.5 line-clamp-1">{tool.description}</p>
        </div>
        <Link
          href={href}
          className="shrink-0 inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          {ctaLabel} →
        </Link>
      </div>
    </div>
  );
}