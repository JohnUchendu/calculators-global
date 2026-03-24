// ─────────────────────────────────────────────
//  SEO utilities
//  generateMetadata, structured content blocks,
//  FAQ data, internal links — all in one place.
// ─────────────────────────────────────────────

import type { Metadata } from "next";
import { type Tool } from "@/lib/constants";
import { type GeoConfig, GEO_CONFIGS } from "@/lib/geo";

const SITE_NAME = "CalcNest";
const SITE_URL  = "https://www.calcnest.com";
const SITE_DESC = "Free finance and everyday money calculators — no sign-up required.";

// ── generateMetadata ─────────────────────────

export function buildMetadata(tool: Tool, geo?: GeoConfig): Metadata {
  const g         = geo ?? GEO_CONFIGS.global;
  const geoLabel  = g.key !== "global" ? ` in ${g.label}` : "";
  const geoSuffix = g.key !== "global" ? ` (${g.currencySymbol})` : "";

  const title       = `${tool.title}${geoLabel} — Free Online Calculator${geoSuffix}`;
  const description = buildMetaDescription(tool, g);
  const canonical   = `${SITE_URL}/${tool.slug}${g.urlSuffix}`;

  return {
    title,
    description,
    keywords: [
      ...tool.keywords,
      ...(g.key !== "global" ? [g.label, g.seo.countryAdj ?? g.label, g.currency] : []),
      "free calculator",
      "online calculator",
      SITE_NAME.toLowerCase(),
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: g.locale,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function buildMetaDescription(tool: Tool, geo: GeoConfig): string {
  const geo_   = geo.key !== "global" ? ` in ${geo.label} (${geo.currency})` : "";
  const prefix = geo.key !== "global" ? `${geo.flag} ` : "";
  return `${prefix}Free ${tool.title}${geo_}. ${tool.description} No sign-up needed.`;
}

// ── SEO content block data ────────────────────
// Used below each calculator to feed Google content.

export interface FaqItem {
  q: string;
  a: string;
}

export interface SeoContent {
  intro: string;          // 1 paragraph — what it is
  howItWorks: string;     // 1 paragraph — how to use it
  example: string;        // 1 paragraph — worked example
  faqs: FaqItem[];        // 2–4 FAQs
  relatedSlugs: string[]; // internal links to show
}

// Master content map — keyed by tool slug
// Geo variants extend/override the base content
export function getSeoContent(toolSlug: string, geo: GeoConfig): SeoContent {
  const base = BASE_SEO_CONTENT[toolSlug];
  if (!base) return FALLBACK_CONTENT;

  // Geo-specific overrides where relevant
  if (geo.key === "global") return base;

  return {
    ...base,
    intro: base.intro.replace(/\[GEO\]/g, geo.label).replace(/\[CURR\]/g, geo.currency),
    howItWorks: base.howItWorks.replace(/\[GEO\]/g, geo.label),
    example: buildGeoExample(toolSlug, geo),
    faqs: buildGeoFaqs(toolSlug, geo, base.faqs),
  };
}

// ── Related tools map ─────────────────────────

export const RELATED_TOOLS: Record<string, string[]> = {
  "loan-calculator":               ["emi-calculator", "mortgage-calculator", "compound-interest-calculator", "savings-calculator"],
  "emi-calculator":                ["loan-calculator", "personal-loan-calculator", "car-loan-calculator", "simple-interest-calculator"],
  "mortgage-calculator":           ["loan-calculator", "compound-interest-calculator", "savings-calculator", "retirement-savings-calculator"],
  "personal-loan-calculator":      ["loan-calculator", "emi-calculator", "net-salary-calculator", "budget-planner"],
  "car-loan-calculator":           ["loan-calculator", "emi-calculator", "personal-loan-calculator", "savings-calculator"],
  "compound-interest-calculator":  ["simple-interest-calculator", "savings-calculator", "retirement-savings-calculator", "roi-calculator"],
  "simple-interest-calculator":    ["compound-interest-calculator", "loan-calculator", "savings-calculator"],
  "savings-calculator":            ["compound-interest-calculator", "retirement-savings-calculator", "budget-planner", "roi-calculator"],
  "retirement-savings-calculator": ["savings-calculator", "compound-interest-calculator", "net-salary-calculator", "roi-calculator"],
};

// ── Base SEO content ──────────────────────────

const BASE_SEO_CONTENT: Record<string, SeoContent> = {
  "loan-calculator": {
    intro: `A loan calculator helps you quickly determine your monthly repayment amount, total interest paid, and the full cost of borrowing — before you sign any agreement. Whether you are taking out a personal loan, auto loan, or any other type of instalment credit in [GEO], this free tool gives you an instant, accurate breakdown using the standard EMI formula.`,
    howItWorks: `Enter the loan amount, annual interest rate, and loan term in months or years. The calculator instantly computes your fixed monthly payment using the standard amortisation formula. You can also view a full amortisation schedule showing exactly how much of each payment goes toward principal versus interest over the life of the loan.`,
    example: `For example, a loan of $10,000 at 7.5% interest over 36 months results in a monthly payment of approximately $311. Over the full term you will pay around $1,196 in interest, making the total cost of the loan $11,196.`,
    faqs: [
      { q: "What is the EMI formula used?", a: "Monthly payment = P × r(1+r)ⁿ / ((1+r)ⁿ−1), where P is the principal, r is the monthly interest rate, and n is the number of monthly payments." },
      { q: "Can I use this for any type of loan?", a: "Yes — this calculator works for personal loans, auto loans, student loans, and any other fixed-rate instalment loan." },
      { q: "Does the calculator include fees?", a: "No — it calculates principal and interest only. Add any origination fees or insurance costs on top of the result for a full cost picture." },
      { q: "What happens if I make extra payments?", a: "Extra payments reduce your outstanding principal faster, meaning you pay less interest overall. Use the result as your baseline and subtract your extra payments from the balance manually." },
    ],
    relatedSlugs: RELATED_TOOLS["loan-calculator"],
  },

  "emi-calculator": {
    intro: `An EMI (Equated Monthly Instalment) calculator tells you exactly how much you will pay every month on a loan. It is one of the most widely used financial tools in [GEO] because it removes the guesswork from borrowing — you know your exact commitment before you commit.`,
    howItWorks: `Enter your loan principal, the annual interest rate offered by your lender, and the repayment tenure. The calculator outputs your monthly EMI, the total amount payable, and the total interest charged. A month-by-month schedule shows how your balance reduces with each payment.`,
    example: `A loan of $500,000 at 9% per annum for 60 months gives an EMI of roughly $10,379. Over 5 years you will pay approximately $122,748 in interest on top of the principal.`,
    faqs: [
      { q: "What does EMI stand for?", a: "EMI stands for Equated Monthly Instalment — a fixed payment made every month that covers both principal repayment and interest charges." },
      { q: "Is EMI the same as a monthly loan payment?", a: "Yes, functionally. EMI is the term commonly used in South Asia, the Middle East, and parts of Africa, while 'monthly payment' is more common in the US and UK." },
      { q: "How can I reduce my EMI?", a: "You can reduce your EMI by increasing the loan tenure, negotiating a lower interest rate, or making a larger down payment to reduce the principal." },
      { q: "Does a longer tenure mean lower EMI?", a: "Yes — but a longer tenure also means you pay more total interest. Always balance the EMI comfort with the total cost of the loan." },
    ],
    relatedSlugs: RELATED_TOOLS["emi-calculator"],
  },

  "mortgage-calculator": {
    intro: `A mortgage calculator helps you estimate your monthly home loan repayment based on the property value, your down payment, the interest rate, and the mortgage term. It is an essential first step for any home buyer in [GEO] planning their finances before approaching a bank or lender.`,
    howItWorks: `Enter the property price and your planned down payment — the calculator automatically derives the loan amount. Then enter the interest rate and mortgage term. You will see your monthly repayment, total interest over the life of the loan, the loan-to-value (LTV) ratio, and a full yearly amortisation schedule.`,
    example: `On a $350,000 home with a $70,000 down payment (20%), at 6.5% over 30 years, your monthly mortgage payment would be approximately $1,770. Total interest paid over the life of the loan would be around $277,000.`,
    faqs: [
      { q: "What is loan-to-value (LTV) ratio?", a: "LTV is the loan amount as a percentage of the property value. A lower LTV means less risk for the lender — most banks prefer LTV below 80%. Above 80%, lenders may require mortgage insurance." },
      { q: "Does this include property taxes and insurance?", a: "No — this calculator computes principal and interest only. Your actual monthly payment from the bank will include property taxes, insurance, and possibly HOA fees." },
      { q: "How much deposit do I need for a mortgage?", a: "Most lenders require a minimum 10%–20% deposit. A 20% or more deposit typically gives you the best interest rates and avoids mortgage insurance requirements." },
      { q: "What is the difference between fixed and variable mortgage rates?", a: "A fixed rate stays constant for the entire term. A variable rate changes with the market. Fixed rates offer certainty; variable rates can be lower initially but carry more risk." },
    ],
    relatedSlugs: RELATED_TOOLS["mortgage-calculator"],
  },

  "personal-loan-calculator": {
    intro: `A personal loan calculator helps you understand the true cost of borrowing before you sign. Whether you need funds for medical bills, education, home improvement, or a major purchase in [GEO], this tool shows your exact monthly repayment and total interest cost in seconds.`,
    howItWorks: `Select your loan purpose, enter the loan amount and interest rate, and choose your repayment period. The calculator shows your monthly repayment and full cost breakdown. A yearly amortisation table helps you visualise how the balance decreases over time.`,
    example: `A personal loan of $5,000 at 12% per annum over 24 months results in a monthly payment of approximately $235, with total interest of around $647 over the loan period.`,
    faqs: [
      { q: "What is a typical personal loan interest rate?", a: "Rates vary widely — typically 6%–36% depending on your credit score, income, lender, and country. Always compare multiple lenders before accepting an offer." },
      { q: "Is a personal loan better than a credit card?", a: "For large purchases, personal loans often have lower interest rates than credit cards and offer fixed repayment terms. Credit cards are more flexible but can be expensive if you carry a balance." },
      { q: "Can I pay off a personal loan early?", a: "Most lenders allow early repayment, but some charge prepayment penalties. Check your loan agreement before making extra payments." },
      { q: "How does my credit score affect my rate?", a: "A higher credit score typically earns a lower interest rate. Borrowers with excellent credit may qualify for rates as low as 6%, while those with poor credit may face rates above 25%." },
    ],
    relatedSlugs: RELATED_TOOLS["personal-loan-calculator"],
  },

  "car-loan-calculator": {
    intro: `A car loan calculator lets you work out your monthly auto finance payment before setting foot in a dealership. By entering the vehicle price, your down payment, interest rate, and loan term, you can see your exact monthly commitment and the total cost of financing — keeping you in control of the negotiation in [GEO].`,
    howItWorks: `Enter the vehicle price and your down payment — the difference is your loan amount. Then input the interest rate and loan term. The calculator shows your monthly payment, total interest, and the total cost of the vehicle including financing. A yearly breakdown helps you track balance reduction.`,
    example: `Financing a $25,000 car with a $5,000 down payment at 6.5% over 60 months gives a monthly payment of about $388. Total interest paid is approximately $3,294, making the total vehicle cost around $28,294.`,
    faqs: [
      { q: "How much down payment should I put on a car?", a: "Aim for at least 10%–20% of the car price as a down payment. A larger deposit reduces your monthly payments and total interest, and helps avoid being 'underwater' on the loan." },
      { q: "Should I get dealer financing or a bank loan?", a: "Always compare both. Dealers sometimes offer promotional rates (e.g. 0% for 24 months) but may inflate the vehicle price. Get pre-approved from a bank first so you know your baseline rate." },
      { q: "What is a good interest rate for a car loan?", a: "Rates vary by country and credit score. In the US, rates for new cars average 5%–7% for good credit. In Nigeria, car finance rates from banks typically range from 20%–28%." },
      { q: "Is a longer car loan term better?", a: "A longer term lowers monthly payments but increases total interest paid. Most financial advisors recommend keeping car loan terms to 60 months or less." },
    ],
    relatedSlugs: RELATED_TOOLS["car-loan-calculator"],
  },

  "compound-interest-calculator": {
    intro: `A compound interest calculator shows you the remarkable power of letting your money grow on itself over time. Unlike simple interest, compound interest earns returns on both your original principal and the interest already accumulated — making it the engine behind long-term wealth building in [GEO] and everywhere else.`,
    howItWorks: `Enter your initial deposit, optional monthly contributions, annual interest rate, the compounding frequency, and the investment period. The calculator shows your final balance, total interest earned, and a year-by-year breakdown of how your money grows. A visual bar shows what portion of your final balance is original deposit versus earned interest.`,
    example: `$10,000 invested at 8% compounded monthly for 10 years, with $100 added monthly, grows to approximately $26,765. Of that, $12,000 is your total deposits and $14,765 is pure interest — more than your original investment.`,
    faqs: [
      { q: "What is the difference between APR and APY?", a: "APR (Annual Percentage Rate) is the stated interest rate. APY (Annual Percentage Yield) accounts for compounding frequency — it shows your actual effective return. More frequent compounding means a higher APY than APR." },
      { q: "How often should interest compound?", a: "The more frequently interest compounds, the faster your money grows. Daily compounding yields slightly more than monthly, which yields more than annually. For most savings accounts, monthly compounding is standard." },
      { q: "What is the Rule of 72?", a: "Divide 72 by your annual interest rate to estimate how many years it takes to double your money. At 8% annual return, your investment doubles roughly every 9 years (72 ÷ 8 = 9)." },
      { q: "Does compound interest work against me on debt?", a: "Yes — compound interest works for you on investments but against you on debt. Credit cards and loans compound interest on your balance, which is why carrying debt is expensive." },
    ],
    relatedSlugs: RELATED_TOOLS["compound-interest-calculator"],
  },

  "simple-interest-calculator": {
    intro: `A simple interest calculator computes the interest earned or owed on a principal amount using a flat rate applied to the original sum — not to accumulated interest. It is the most straightforward interest model and is commonly used for short-term loans, fixed deposits, and treasury bills in [GEO].`,
    howItWorks: `Enter the principal amount, the annual interest rate, and the time period in years. The calculator returns the total interest, the final amount (principal + interest), and a breakdown of interest per year, month, and day.`,
    example: `$10,000 at 8% simple interest over 3 years earns $2,400 in interest, giving a total maturity amount of $12,400. The interest is $800 per year, $66.67 per month, or $2.19 per day.`,
    faqs: [
      { q: "When is simple interest used?", a: "Simple interest is used for short-term loans, car loans in some markets, savings bonds, and treasury bills. It is also used to calculate daily interest on some current accounts and mortgages." },
      { q: "Simple vs compound interest — which is better?", a: "For savings, compound interest is better because interest builds on itself. For borrowing, simple interest is cheaper because you only pay interest on the original principal." },
      { q: "Can I calculate simple interest for months or days?", a: "Yes — convert the period to a fraction of a year. 6 months = 0.5 years; 90 days = 90/365 years. Enter the decimal into the time field." },
      { q: "Is simple interest the same as flat rate interest?", a: "Yes — in many markets, 'flat rate' and 'simple interest' are used interchangeably. They both calculate interest on the original principal for the full term." },
    ],
    relatedSlugs: RELATED_TOOLS["simple-interest-calculator"],
  },

  "savings-calculator": {
    intro: `A savings calculator projects how much your money will grow over time when you combine an initial deposit with regular monthly contributions and a fixed interest rate. It is one of the most motivating financial tools available — watching your future balance grow encourages consistent saving habits in [GEO] and beyond.`,
    howItWorks: `Enter your starting deposit, how much you can save each month, the interest rate your savings will earn, and the number of years. The calculator projects your final balance and shows a year-by-year growth table — breaking down how much of your wealth comes from contributions versus interest earned.`,
    example: `Starting with $5,000, saving $200 per month at 6% interest for 10 years results in a final balance of approximately $38,000. Your total contributions are $29,000 — the remaining $9,000 is pure interest earned.`,
    faqs: [
      { q: "What interest rate should I use?", a: "Use the actual rate offered by your savings account or investment product. High-yield savings accounts currently offer 4%–5% in the US. Fixed deposits in Nigeria can offer 10%–15%. Check your provider for current rates." },
      { q: "How much should I save each month?", a: "A common guideline is to save at least 20% of your income (the 50/30/20 rule). Even small amounts compound significantly over time — the key is consistency." },
      { q: "What if I miss a month of contributions?", a: "Missing occasional contributions has a smaller impact than stopping entirely. The most important factor is staying in the habit. Use this calculator to see the long-term cost of a contribution gap." },
      { q: "What is the difference between savings and investment?", a: "Savings accounts are low-risk with guaranteed (but lower) returns. Investments like stocks or mutual funds carry more risk but typically offer higher long-term returns. This calculator models guaranteed-rate savings." },
    ],
    relatedSlugs: RELATED_TOOLS["savings-calculator"],
  },

  "retirement-savings-calculator": {
    intro: `A retirement savings calculator helps you answer the most important financial question of your life — will I have enough money to retire comfortably? By projecting your current savings forward and comparing it against your target nest egg, this tool tells you exactly whether you are on track and how much you need to save each month in [GEO].`,
    howItWorks: `Enter your current age and target retirement age, your existing retirement savings, monthly contribution, expected annual return, inflation rate, and how much monthly income you want in retirement. The calculator projects your nest egg at retirement, compares it to your required amount, and tells you the monthly saving needed to close any gap.`,
    example: `A 30-year-old with $10,000 saved, contributing $500 per month at 7% annual return, retiring at 65 with a desired monthly income of $3,000, would accumulate approximately $1.1 million — sufficient to fund a 25-year retirement with inflation factored in.`,
    faqs: [
      { q: "What rate of return should I assume?", a: "Historically, a diversified stock portfolio has returned 7%–10% annually before inflation. A more conservative mixed portfolio of stocks and bonds may return 5%–7%. Use 6%–7% as a realistic long-term assumption." },
      { q: "How much do I need to retire?", a: "A common rule of thumb is to save 25× your annual retirement expenses (the '4% rule'). If you need $3,000/month ($36,000/year), target a nest egg of $900,000. This calculator does this math for you automatically." },
      { q: "What does inflation do to my retirement?", a: "Inflation erodes purchasing power over time. $3,000/month today might require $5,000+/month in 35 years at 3% inflation. This calculator adjusts your target income for inflation automatically." },
      { q: "When should I start saving for retirement?", a: "The earlier the better — compounding is exponential. A 25-year-old saving $300/month will accumulate far more than a 35-year-old saving $600/month, due to the extra decade of compound growth." },
    ],
    relatedSlugs: RELATED_TOOLS["retirement-savings-calculator"],
  },
};

const FALLBACK_CONTENT: SeoContent = {
  intro: "Use this free online calculator for instant, accurate results.",
  howItWorks: "Enter your values in the fields above to get your result instantly.",
  example: "Try entering your own numbers to see a personalised result.",
  faqs: [
    { q: "Is this calculator free?", a: "Yes — completely free, no sign-up required." },
    { q: "How accurate are the results?", a: "Results are mathematically accurate based on standard financial formulas." },
  ],
  relatedSlugs: [],
};

// ── Geo example builder ───────────────────────

function buildGeoExample(slug: string, geo: GeoConfig): string {
  const s  = geo.currencySymbol;
  const d  = geo.defaults;
  const la = d.loanAmount.toLocaleString();
  const pv = d.propertyValue.toLocaleString();
  const dp = d.downPayment.toLocaleString();

  const examples: Partial<Record<string, string>> = {
    "loan-calculator":
      `For example, a ${geo.label} loan of ${s}${la} at ${d.annualRate}% per annum over 36 months results in a monthly repayment that you can calculate instantly using the tool above. Interest rates at ${geo.seo.popularLenders.slice(0, 2).join(" and ")} vary, so always compare before borrowing.`,
    "emi-calculator":
      `In ${geo.label}, a loan of ${s}${la} at ${d.annualRate}% per annum for 60 months gives an EMI you can calculate above. Lenders such as ${geo.seo.popularLenders.slice(0, 2).join(" and ")} offer varying rates — use this tool to compare scenarios.`,
    "mortgage-calculator":
      `For a ${geo.label} property worth ${s}${pv} with a ${s}${dp} deposit at ${d.mortgageRate}% over 25 years, you can see the exact monthly payment and total interest cost using this calculator. ${geo.seo.rateNote}`,
    "personal-loan-calculator":
      `In ${geo.label}, a personal loan of ${s}${la} at ${d.personalLoanRate}% per annum over 24 months will have a monthly repayment you can compute instantly above. ${geo.seo.rateNote}`,
    "car-loan-calculator":
      `Financing a car in ${geo.label} worth ${s}${la} with a 20% deposit at ${d.carLoanRate}% over 60 months — use the calculator above for your exact monthly payment. ${geo.seo.rateNote}`,
    "compound-interest-calculator":
      `Investing ${s}${d.savings.toLocaleString()} at ${d.annualRate}% compounded monthly for 10 years in ${geo.label} shows how powerfully your money can grow. Use the tool above to run your own scenario.`,
    "simple-interest-calculator":
      `A ${geo.label} fixed deposit of ${s}${d.savings.toLocaleString()} at ${d.annualRate}% simple interest over 3 years earns ${s}${(d.savings * d.annualRate / 100 * 3).toLocaleString()} in interest. Enter your own figures above.`,
    "savings-calculator":
      `Starting with ${s}${d.savings.toLocaleString()} and saving ${s}${d.monthlyContribution.toLocaleString()} monthly at ${d.annualRate}% for 10 years in ${geo.label} — the results above show how your balance grows year by year.`,
    "retirement-savings-calculator":
      `Planning retirement in ${geo.label} with ${s}${d.savings.toLocaleString()} saved and contributing ${s}${d.monthlyContribution.toLocaleString()} monthly at ${d.annualRate}% return — use the tool above to see if you are on track for your desired retirement income.`,
  };

  return examples[slug] ?? FALLBACK_CONTENT.example;
}

// ── Geo FAQ builder ───────────────────────────

function buildGeoFaqs(slug: string, geo: GeoConfig, baseFaqs: FaqItem[]): FaqItem[] {
  const geoFaq: FaqItem = {
    q: `What are typical ${slug.replace(/-/g, " ")} rates in ${geo.label}?`,
    a: geo.seo.rateNote,
  };

  const lenderFaq: FaqItem = {
    q: `Which lenders offer this in ${geo.label}?`,
    a: `Popular lenders in ${geo.label} include ${geo.seo.popularLenders.join(", ")}. Always compare rates from multiple providers before committing.`,
  };

  // Replace last two FAQs with geo-specific ones
  return [...baseFaqs.slice(0, 2), geoFaq, lenderFaq];
}