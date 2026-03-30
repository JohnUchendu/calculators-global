// ─────────────────────────────────────────────
//  AffiliateBox
//  Renders a "recommended products" section.
//  Add your actual affiliate links in the
//  AFFILIATE_PRODUCTS map below.
//
//  Usage in MDX:
//  <AffiliateBox type="mortgage" country="uk" />
// ─────────────────────────────────────────────

interface AffiliateProduct {
  name:        string;
  description: string;
  cta:         string;
  href:        string;   // your affiliate link
  badge?:      string;   // e.g. "Best rate", "Most popular"
}

type AffiliateType =
  | "mortgage"
  | "personal-loan"
  | "car-loan"
  | "savings"
  | "investment"
  | "general";

interface AffiliateBoxProps {
  type:      AffiliateType;
  country?:  string;
  title?:    string;
  disclaimer?: string;
}

// ── Affiliate products registry ───────────────
// Replace hrefs with your actual affiliate links.
// Add more products per type/country as needed.

const AFFILIATE_PRODUCTS: Record<AffiliateType, AffiliateProduct[]> = {
  mortgage: [
    {
      name:        "Compare Mortgage Rates",
      description: "See current rates from multiple lenders side by side.",
      cta:         "Compare rates",
      href:        "#",   // replace with affiliate link
      badge:       "Most popular",
    },
    {
      name:        "Mortgage Broker Service",
      description: "A broker searches the market to find you the best deal.",
      cta:         "Get a quote",
      href:        "#",
    },
  ],
  "personal-loan": [
    {
      name:        "Personal Loan Comparison",
      description: "Compare personal loan rates from top lenders in minutes.",
      cta:         "Check your rate",
      href:        "#",
      badge:       "No credit impact",
    },
  ],
  "car-loan": [
    {
      name:        "Car Finance Comparison",
      description: "Compare auto loan and hire purchase deals in one place.",
      cta:         "Compare deals",
      href:        "#",
    },
  ],
  savings: [
    {
      name:        "High-Yield Savings Accounts",
      description: "Find the best savings rates available right now.",
      cta:         "See top rates",
      href:        "#",
      badge:       "Updated daily",
    },
  ],
  investment: [
    {
      name:        "Investment Platforms",
      description: "Start investing with as little as $1. Compare platforms.",
      cta:         "Start investing",
      href:        "#",
    },
  ],
  general: [
    {
      name:        "Financial Comparison Tool",
      description: "Compare financial products across categories.",
      cta:         "Compare now",
      href:        "#",
    },
  ],
};

export default function AffiliateBox({
  type,
  country,
  title,
  disclaimer,
}: AffiliateBoxProps) {
  const products = AFFILIATE_PRODUCTS[type] ?? AFFILIATE_PRODUCTS.general;
  const heading  = title ?? "Recommended options";

  return (
    <div className="my-8 rounded-2xl border border-gray-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-800">{heading}</p>
        {country && (
          <span className="text-xs text-gray-400">{country}</span>
        )}
      </div>

      {/* Products */}
      <div className="divide-y divide-gray-100">
        {products.map((product) => (
          <div
            key={product.name}
            className="flex items-center gap-4 px-5 py-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-medium text-gray-900">
                  {product.name}
                </p>
                {product.badge && (
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                    {product.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 truncate">
                {product.description}
              </p>
            </div>
            <a
              href={product.href}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="shrink-0 text-sm font-medium text-green-600 hover:text-green-700 border border-green-200 hover:border-green-400 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
            >
              {product.cta} →
            </a>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="px-5 py-2.5 border-t border-gray-100 bg-gray-50">
        <p className="text-xs text-gray-400">
          {disclaimer ??
            "CalcNest may earn a commission from these links at no cost to you. We only recommend products we believe are genuinely useful."}
        </p>
      </div>
    </div>
  );
}