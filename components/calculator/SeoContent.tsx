import Link from "next/link";
import { type SeoContent } from "@/lib/seo";
import { TOOLS, type Tool } from "@/lib/constants";
import { type GeoConfig, GEO_CONFIGS } from "@/lib/geo";

interface SeoContentBlockProps {
  content: SeoContent;
  tool: Tool;
  geo?: GeoConfig;
}

export default function SeoContentBlock({
  content,
  tool,
  geo,
}: SeoContentBlockProps) {
  const g          = geo ?? GEO_CONFIGS.global;
  const geoSuffix  = g.key !== "global" ? g.urlSuffix : "";
  const relatedTools = content.relatedSlugs
    .map((slug) => TOOLS.find((t) => t.slug === slug))
    .filter(Boolean) as Tool[];

  return (
    <div className="mt-10 space-y-10 border-t border-gray-200 pt-10">

      {/* Geo switcher — show other variants */}
      <GeoSwitcher tool={tool} currentGeo={g} />

      {/* Written content */}
      <div className="max-w-3xl space-y-6">

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            What is a {tool.title}?
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">{content.intro}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            How to use this calculator
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">{content.howItWorks}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Example</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-600 leading-relaxed">{content.example}</p>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {content.faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl p-4"
              >
                <h3 className="text-sm font-semibold text-gray-800 mb-1.5">
                  {faq.q}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related calculators */}
      {relatedTools.length > 0 && (
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Related calculators
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {relatedTools.map((related) => (
              <Link
                key={related.slug}
                href={`/${related.slug}${geoSuffix}`}
                className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-sm transition-all text-sm group"
              >
                <span className="text-lg">{related.icon}</span>
                <span className="text-gray-700 group-hover:text-green-700 font-medium text-xs leading-tight">
                  {related.shortTitle}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Geo switcher ──────────────────────────────

interface GeoSwitcherProps {
  tool: Tool;
  currentGeo: GeoConfig;
}

const GEO_VARIANTS = [
  { key: "global",  flag: "🌍", label: "Global",         suffix: ""         },
  { key: "nigeria", flag: "🇳🇬", label: "Nigeria (₦)",   suffix: "-nigeria" },
  { key: "uk",      flag: "🇬🇧", label: "UK (£)",        suffix: "-uk"      },
  { key: "us",      flag: "🇺🇸", label: "US ($)",        suffix: "-us"      },
  { key: "canada",  flag: "🇨🇦", label: "Canada (CA$)",  suffix: "-canada"  },
] as const;

function GeoSwitcher({ tool, currentGeo }: GeoSwitcherProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-gray-400 mr-1">
        Also available in:
      </span>
      {GEO_VARIANTS.map((v) => {
        const isCurrent = currentGeo.urlSuffix === v.suffix;
        const href      = `/${tool.slug}${v.suffix}`;
        return (
          <Link
            key={v.key}
            href={href}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
              isCurrent
                ? "bg-green-50 border-green-300 text-green-700 cursor-default"
                : "bg-white border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-700"
            }`}
          >
            <span>{v.flag}</span>
            {v.label}
          </Link>
        );
      })}
    </div>
  );
}