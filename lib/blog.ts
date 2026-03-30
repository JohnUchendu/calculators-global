// ─────────────────────────────────────────────
//  Blog registry
//  All post metadata lives here.
//  Content lives in /content/blog/[slug].mdx
//  Adding a new post = add entry here + create MDX file
// ─────────────────────────────────────────────

export type BlogCategory =
  | "Mortgages & Property"
  | "Savings & Interest"
  | "Loans & Debt"
  | "Retirement & Planning"
  | "Income & Salary"
  | "Everyday Finance";

export type BlogCountry =
  | "Global"
  | "Nigeria"
  | "United Kingdom"
  | "United States"
  | "Canada"
  | "Australia"
  | "Ireland"
  | "Belgium"
  | "Switzerland"
  | "Poland";

export interface BlogPost {
  slug:             string;
  title:            string;
  excerpt:          string;        // 1–2 sentences — used in cards + meta description
  category:         BlogCategory;
  countries:        BlogCountry[]; // which countries this post targets
  publishedAt:      string;        // ISO date string "2026-03-01"
  updatedAt?:       string;
  readingTime:      number;        // minutes
  keywords:         string[];
  relatedCalcs:     string[];      // tool slugs from constants.ts
  featuredImage?:   string;        // /images/blog/[slug].jpg
  author:           string;
}

// ── Post registry ─────────────────────────────
// Posts appear on the blog index in this order.

export const BLOG_POSTS: BlogPost[] = [
  {
    slug:        "how-rising-interest-rates-affect-mortgages-2026",
    title:       "How Rising Interest Rates Are Affecting Mortgages in 2026",
    excerpt:     "Interest rates have shifted significantly across the US, UK, Canada, and Nigeria in 2026. Here's what that means for your mortgage payments — with real numbers.",
    category:    "Mortgages & Property",
    countries:   ["United States", "United Kingdom", "Canada", "Nigeria", "Ireland"],
    publishedAt: "2026-03-01",
    readingTime: 7,
    keywords:    ["mortgage rates 2026", "rising interest rates mortgage", "mortgage calculator 2026", "home loan rates uk", "mortgage nigeria 2026"],
    relatedCalcs:["mortgage-calculator", "loan-calculator", "emi-calculator"],
    author:      "Moneytoolslab",
  },
  {
    slug:        "compound-interest-vs-simple-interest",
    title:       "Compound Interest vs Simple Interest: Which One Makes You Richer?",
    excerpt:     "Most people use these terms interchangeably — but the difference between them can mean thousands of dollars over 10 years. We break it down with real calculations.",
    category:    "Savings & Interest",
    countries:   ["Global"],
    publishedAt: "2026-04-01",
    readingTime: 6,
    keywords:    ["compound interest vs simple interest", "compound interest explained", "simple interest calculator", "which interest is better savings"],
    relatedCalcs:["compound-interest-calculator", "simple-interest-calculator", "savings-calculator"],
    author:      "Moneytoolslab",
  },
  {
    slug:        "how-much-should-you-save-each-month-50-30-20-rule",
    title:       "How Much Should You Save Each Month? The 50/30/20 Rule Explained",
    excerpt:     "The 50/30/20 rule is the most popular budgeting framework — but does it actually work in 2026 with rising costs? We look at real income scenarios across four countries.",
    category:    "Savings & Interest",
    countries:   ["United States", "United Kingdom", "Canada", "Nigeria"],
    publishedAt: "2026-05-01",
    readingTime: 8,
    keywords:    ["50 30 20 rule", "how much to save monthly", "savings rule 2026", "monthly savings calculator", "budget planner"],
    relatedCalcs:["savings-calculator", "retirement-savings-calculator", "budget-planner"],
    author:      "Moneytoolslab",
  },
  {
    slug:        "personal-loan-vs-mortgage-which-to-choose",
    title:       "Personal Loan vs Mortgage: When Should You Choose Which?",
    excerpt:     "They're both loans — but choosing the wrong one can cost you significantly more. Here's a clear breakdown with numbers for the UK, US, Canada, and Nigeria.",
    category:    "Loans & Debt",
    countries:   ["United Kingdom", "United States", "Canada", "Nigeria"],
    publishedAt: "2026-06-01",
    readingTime: 7,
    keywords:    ["personal loan vs mortgage", "should i get personal loan or mortgage", "loan comparison 2026"],
    relatedCalcs:["personal-loan-calculator", "mortgage-calculator", "loan-calculator"],
    author:      "Moneytoolslab",
  },
  {
    slug:        "car-loan-vs-personal-loan-buying-a-car",
    title:       "Car Loan vs Personal Loan: Which is Cheaper for Buying a Car?",
    excerpt:     "Auto financing vs a personal loan — the cheapest option isn't always obvious. We run the numbers so you don't have to.",
    category:    "Loans & Debt",
    countries:   ["United States", "United Kingdom", "Canada", "Nigeria"],
    publishedAt: "2026-07-01",
    readingTime: 6,
    keywords:    ["car loan vs personal loan", "cheapest way to finance a car 2026", "auto loan calculator"],
    relatedCalcs:["car-loan-calculator", "personal-loan-calculator", "emi-calculator"],
    author:      "Moneytoolslab",
  },
];

// ── Helpers ───────────────────────────────────

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): { slug: string }[] {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.category === category);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  return BLOG_POSTS
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit);
}

/**
 * Returns blog posts that link to a given calculator tool slug.
 * Used by SeoContent.tsx to show "Further reading" on calculator pages.
 */
export function getPostsForTool(toolSlug: string, limit = 3): BlogPost[] {
  return BLOG_POSTS
    .filter((p) => p.relatedCalcs.includes(toolSlug))
    .slice(0, limit);
}

export const BLOG_CATEGORY_COLORS: Record<BlogCategory, { bg: string; text: string }> = {
  "Mortgages & Property":    { bg: "bg-blue-50",   text: "text-blue-700"   },
  "Savings & Interest":      { bg: "bg-green-50",  text: "text-green-700"  },
  "Loans & Debt":            { bg: "bg-amber-50",  text: "text-amber-700"  },
  "Retirement & Planning":   { bg: "bg-purple-50", text: "text-purple-700" },
  "Income & Salary":         { bg: "bg-rose-50",   text: "text-rose-700"   },
  "Everyday Finance":        { bg: "bg-teal-50",   text: "text-teal-700"   },
};

export const BLOG_COUNTRY_FLAGS: Partial<Record<BlogCountry, string>> = {
  "Nigeria":        "🇳🇬",
  "United Kingdom": "🇬🇧",
  "United States":  "🇺🇸",
  "Canada":         "🇨🇦",
  "Australia":      "🇦🇺",
  "Ireland":        "🇮🇪",
  "Belgium":        "🇧🇪",
  "Switzerland":    "🇨🇭",
  "Poland":         "🇵🇱",
  "Global":         "🌍",
};