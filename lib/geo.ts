// ─────────────────────────────────────────────
//  Geo / Locale configuration
//  Single source of truth for all currency,
//  locale, and region-specific defaults used
//  across geo variant calculator pages.
// ─────────────────────────────────────────────

export type GeoKey = "global" | "nigeria" | "uk" | "us" | "canada";

export interface GeoConfig {
  key: GeoKey;
  label: string;           // "Nigeria"
  flag: string;            // emoji flag
  currency: string;        // ISO code — "NGN"
  currencySymbol: string;  // "₦"
  locale: string;          // "en-NG"
  urlSuffix: string;       // "-nigeria"  (appended to base slug)
  // Realistic local defaults for calculator inputs
  defaults: {
    loanAmount: number;
    propertyValue: number;
    downPayment: number;
    annualRate: number;
    personalLoanRate: number;
    carLoanRate: number;
    mortgageRate: number;
    salary: number;
    savings: number;
    monthlyContribution: number;
    retirementMonthlyIncome: number;
  };
  // SEO copy snippets used in metadata + content blocks
  seo: {
    countryAdj: string;        // "Nigerian"
    rateNote: string;          // shown in InfoBox
    popularLenders: string[];  // named in SEO content
  };
}

export const GEO_CONFIGS: Record<GeoKey, GeoConfig> = {
  global: {
    key: "global",
    label: "Global",
    flag: "🌍",
    currency: "USD",
    currencySymbol: "$",
    locale: "en-US",
    urlSuffix: "",
    defaults: {
      loanAmount:              10000,
      propertyValue:          350000,
      downPayment:             70000,
      annualRate:                7.5,
      personalLoanRate:         12,
      carLoanRate:               6.5,
      mortgageRate:              6.5,
      salary:                 60000,
      savings:                 5000,
      monthlyContribution:      200,
      retirementMonthlyIncome: 3000,
    },
    seo: {
      countryAdj: "Global",
      rateNote: "Rates vary by lender and credit score.",
      popularLenders: ["banks", "credit unions", "online lenders"],
    },
  },

  nigeria: {
    key: "nigeria",
    label: "Nigeria",
    flag: "🇳🇬",
    currency: "NGN",
    currencySymbol: "₦",
    locale: "en-NG",
    urlSuffix: "-nigeria",
    defaults: {
      loanAmount:            5000000,
      propertyValue:       50000000,
      downPayment:         10000000,
      annualRate:              22,
      personalLoanRate:        28,
      carLoanRate:             24,
      mortgageRate:            22,
      salary:                300000,
      savings:               500000,
      monthlyContribution:    50000,
      retirementMonthlyIncome:200000,
    },
    seo: {
      countryAdj: "Nigerian",
      rateNote:
        "Nigerian lending rates are set by commercial banks and are influenced by the CBN Monetary Policy Rate (MPR). Rates typically range from 18%–30% per annum.",
      popularLenders: ["Access Bank", "GTBank", "First Bank", "Zenith Bank", "UBA"],
    },
  },

  uk: {
    key: "uk",
    label: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    currencySymbol: "£",
    locale: "en-GB",
    urlSuffix: "-uk",
    defaults: {
      loanAmount:              10000,
      propertyValue:          300000,
      downPayment:             30000,
      annualRate:                6.5,
      personalLoanRate:          8,
      carLoanRate:               7,
      mortgageRate:              5.5,
      salary:                 35000,
      savings:                 5000,
      monthlyContribution:      300,
      retirementMonthlyIncome: 2000,
    },
    seo: {
      countryAdj: "UK",
      rateNote:
        "UK interest rates are influenced by the Bank of England base rate. Personal loan rates typically range from 3%–30% APR depending on your credit score.",
      popularLenders: ["Barclays", "Lloyds", "NatWest", "HSBC", "Santander"],
    },
  },

  us: {
    key: "us",
    label: "United States",
    flag: "🇺🇸",
    currency: "USD",
    currencySymbol: "$",
    locale: "en-US",
    urlSuffix: "-us",
    defaults: {
      loanAmount:              15000,
      propertyValue:          400000,
      downPayment:             80000,
      annualRate:                7,
      personalLoanRate:         11,
      carLoanRate:               6.5,
      mortgageRate:              7,
      salary:                 65000,
      savings:                10000,
      monthlyContribution:      400,
      retirementMonthlyIncome: 4000,
    },
    seo: {
      countryAdj: "American",
      rateNote:
        "US interest rates are influenced by the Federal Reserve federal funds rate. Mortgage rates and personal loan rates vary significantly by lender and credit score.",
      popularLenders: ["Chase", "Bank of America", "Wells Fargo", "Citibank", "US Bank"],
    },
  },

  canada: {
    key: "canada",
    label: "Canada",
    flag: "🇨🇦",
    currency: "CAD",
    currencySymbol: "$",
    locale: "en-CA",
    urlSuffix: "-canada",
    defaults: {
      loanAmount:              12000,
      propertyValue:          600000,
      downPayment:             60000,
      annualRate:                7,
      personalLoanRate:         10,
      carLoanRate:               7,
      mortgageRate:              5.5,
      salary:                 55000,
      savings:                 8000,
      monthlyContribution:      350,
      retirementMonthlyIncome: 3000,
    },
    seo: {
      countryAdj: "Canadian",
      rateNote:
        "Canadian rates are influenced by the Bank of Canada overnight rate. Mortgage rates are typically fixed for 5-year terms and vary by lender.",
      popularLenders: ["RBC", "TD Bank", "Scotiabank", "BMO", "CIBC"],
    },
  },
};

// ── Helper: get config by URL suffix ─────────
export function getGeoBySlug(slug: string): GeoConfig {
  const found = Object.values(GEO_CONFIGS).find(
    (g) => g.urlSuffix !== "" && slug.endsWith(g.urlSuffix)
  );
  return found ?? GEO_CONFIGS.global;
}

// ── Format currency using geo config ─────────
export function formatGeo(value: number, geo: GeoConfig): string {
  if (!isFinite(value)) return "—";
  return new Intl.NumberFormat(geo.locale, {
    style: "currency",
    currency: geo.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// ── All geo variant slugs for a base tool ────
// e.g. "loan-calculator" → ["loan-calculator-nigeria", ...]
export function getGeoSlugs(baseSlug: string): string[] {
  return (["nigeria", "uk", "us", "canada"] as GeoKey[]).map(
    (key) => `${baseSlug}${GEO_CONFIGS[key].urlSuffix}`
  );
}

// ── Geo selector options for UI ──────────────
export const GEO_OPTIONS = (["nigeria", "uk", "us", "canada"] as GeoKey[]).map(
  (key) => ({
    key,
    label: `${GEO_CONFIGS[key].flag} ${GEO_CONFIGS[key].label}`,
    currency: GEO_CONFIGS[key].currencySymbol,
  })
);