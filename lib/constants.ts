// // ─────────────────────────────────────────────
// //  Master tool registry
// //  Every page, sidebar, homepage card, and SEO
// //  title is generated from this single source.
// // ─────────────────────────────────────────────

// export type Category =
//   | "Loan & Credit"
//   | "Interest & Savings"
//   | "Everyday Math"
//   | "Date & Time"
//   | "Income & Career"
//   | "Investment";

// export interface Tool {
//   slug: string;        // matches the URL exactly
//   title: string;
//   shortTitle: string;  // used in sidebar / cards
//   description: string; // used in meta + page intro
//   category: Category;
//   icon: string;        // emoji — swap for SVG later if needed
//   keywords: string[];  // for SEO meta keywords
// }

// export const TOOLS: Tool[] = [
//   // ── Loan & Credit ──────────────────────────
//   {
//     slug: "loan-calculator",
//     title: "Loan Calculator",
//     shortTitle: "Loan",
//     description:
//       "Calculate your monthly loan payments, total interest paid, and full amortization schedule for any loan amount, interest rate, and term.",
//     category: "Loan & Credit",
//     icon: "🏦",
//     keywords: ["loan calculator", "monthly payment", "amortization", "interest rate"],
//   },
//   {
//     slug: "mortgage-calculator",
//     title: "Mortgage Calculator",
//     shortTitle: "Mortgage",
//     description:
//       "Estimate your monthly mortgage payment including principal, interest, and see a full repayment breakdown for your home loan.",
//     category: "Loan & Credit",
//     icon: "🏠",
//     keywords: ["mortgage calculator", "home loan", "monthly mortgage payment", "house loan"],
//   },
//   {
//     slug: "personal-loan-calculator",
//     title: "Personal Loan Calculator",
//     shortTitle: "Personal Loan",
//     description:
//       "Find out your monthly repayment and total cost for a personal loan based on amount, interest rate, and loan duration.",
//     category: "Loan & Credit",
//     icon: "👤",
//     keywords: ["personal loan calculator", "unsecured loan", "loan repayment"],
//   },
//   {
//     slug: "car-loan-calculator",
//     title: "Car Loan Calculator",
//     shortTitle: "Car Loan",
//     description:
//       "Calculate monthly car loan payments and total financing cost. Factor in loan amount, interest rate, and loan term for auto financing.",
//     category: "Loan & Credit",
//     icon: "🚗",
//     keywords: ["car loan calculator", "auto financing", "vehicle loan", "car payment"],
//   },
//   {
//     slug: "emi-calculator",
//     title: "EMI Calculator",
//     shortTitle: "EMI",
//     description:
//       "Calculate your Equated Monthly Installment (EMI) for any loan. See principal vs interest split and total repayment amount.",
//     category: "Loan & Credit",
//     icon: "📅",
//     keywords: ["EMI calculator", "equated monthly installment", "loan EMI", "monthly installment"],
//   },

//   // ── Interest & Savings ──────────────────────
//   {
//     slug: "compound-interest-calculator",
//     title: "Compound Interest Calculator",
//     shortTitle: "Compound Interest",
//     description:
//       "See how your savings or investments grow over time with compound interest. Adjust compounding frequency to compare scenarios.",
//     category: "Interest & Savings",
//     icon: "📈",
//     keywords: ["compound interest calculator", "investment growth", "compounding", "savings growth"],
//   },
//   {
//     slug: "simple-interest-calculator",
//     title: "Simple Interest Calculator",
//     shortTitle: "Simple Interest",
//     description:
//       "Quickly calculate simple interest earned or owed on a principal amount over a given period at a fixed interest rate.",
//     category: "Interest & Savings",
//     icon: "💹",
//     keywords: ["simple interest calculator", "interest formula", "principal interest rate time"],
//   },
//   {
//     slug: "savings-calculator",
//     title: "Savings Calculator",
//     shortTitle: "Savings",
//     description:
//       "Project your future savings balance with regular contributions. See how time, rate, and monthly deposits affect your total.",
//     category: "Interest & Savings",
//     icon: "🐖",
//     keywords: ["savings calculator", "future savings", "savings goal", "monthly savings"],
//   },
//   {
//     slug: "retirement-savings-calculator",
//     title: "Retirement Savings Calculator",
//     shortTitle: "Retirement",
//     description:
//       "Plan for retirement by estimating how much you need to save each month to reach your target nest egg by your retirement age.",
//     category: "Interest & Savings",
//     icon: "🌅",
//     keywords: ["retirement calculator", "retirement savings", "pension planning", "nest egg"],
//   },

//   // ── Everyday Math ───────────────────────────
//   {
//     slug: "tip-calculator",
//     title: "Tip Calculator",
//     shortTitle: "Tip",
//     description:
//       "Calculate the tip amount and total bill for any percentage. Easily split the bill among multiple people.",
//     category: "Everyday Math",
//     icon: "🧾",
//     keywords: ["tip calculator", "restaurant tip", "bill split", "gratuity calculator"],
//   },
//   {
//     slug: "discount-calculator",
//     title: "Discount Calculator",
//     shortTitle: "Discount",
//     description:
//       "Find the final price after a discount. Enter the original price and discount percentage to see how much you save.",
//     category: "Everyday Math",
//     icon: "🏷️",
//     keywords: ["discount calculator", "sale price", "percent off", "savings calculator"],
//   },
//   {
//     slug: "percentage-calculator",
//     title: "Percentage Calculator",
//     shortTitle: "Percentage",
//     description:
//       "Solve any percentage problem — what is X% of Y, what percentage is X of Y, or calculate percentage increase and decrease.",
//     category: "Everyday Math",
//     icon: "%",
//     keywords: ["percentage calculator", "percent of", "percentage increase", "percentage decrease"],
//   },
//   {
//     slug: "bmi-calculator",
//     title: "BMI Calculator",
//     shortTitle: "BMI",
//     description:
//       "Calculate your Body Mass Index (BMI) using your height and weight. Supports both metric and imperial units.",
//     category: "Everyday Math",
//     icon: "⚖️",
//     keywords: ["BMI calculator", "body mass index", "healthy weight", "overweight calculator"],
//   },

//   // ── Date & Time ─────────────────────────────
//   {
//     slug: "age-calculator",
//     title: "Age Calculator",
//     shortTitle: "Age",
//     description:
//       "Calculate your exact age in years, months, and days from your date of birth to today or any custom date.",
//     category: "Date & Time",
//     icon: "🎂",
//     keywords: ["age calculator", "date of birth calculator", "how old am I", "exact age"],
//   },
//   {
//     slug: "time-duration-calculator",
//     title: "Time Duration Calculator",
//     shortTitle: "Time Duration",
//     description:
//       "Calculate the exact duration between two times or dates in hours, minutes, seconds, days, and weeks.",
//     category: "Date & Time",
//     icon: "⏱️",
//     keywords: ["time duration calculator", "time between dates", "hours calculator", "elapsed time"],
//   },
//   {
//     slug: "date-calculator",
//     title: "Date Calculator",
//     shortTitle: "Date",
//     description:
//       "Add or subtract days, weeks, months, or years from any date. Find what date falls X days from now.",
//     category: "Date & Time",
//     icon: "📆",
//     keywords: ["date calculator", "add days to date", "date difference", "days from today"],
//   },

//   // ── Income & Career ─────────────────────────
//   {
//     slug: "salary-increment-calculator",
//     title: "Salary Increment Calculator",
//     shortTitle: "Salary Increment",
//     description:
//       "Calculate your new salary after a raise or promotion. See the exact increase amount and new monthly take-home.",
//     category: "Income & Career",
//     icon: "💼",
//     keywords: ["salary increment calculator", "raise calculator", "pay increase", "promotion salary"],
//   },
//   {
//     slug: "net-salary-calculator",
//     title: "Net Salary Calculator",
//     shortTitle: "Net Salary",
//     description:
//       "Estimate your take-home pay after standard deductions. Enter your gross salary and deduction percentages to see your net income.",
//     category: "Income & Career",
//     icon: "💰",
//     keywords: ["net salary calculator", "take home pay", "after tax salary", "gross to net"],
//   },
//   {
//     slug: "budget-planner",
//     title: "Budget Planner",
//     shortTitle: "Budget Planner",
//     description:
//       "Plan your monthly budget by entering your income and expenses. See your surplus or deficit at a glance.",
//     category: "Income & Career",
//     icon: "📊",
//     keywords: ["budget planner", "monthly budget", "income vs expenses", "budget calculator"],
//   },

//   // ── Investment ──────────────────────────────
//   {
//     slug: "roi-calculator",
//     title: "ROI Calculator",
//     shortTitle: "ROI",
//     description:
//       "Calculate Return on Investment (ROI) as a percentage. Compare the gain or loss relative to the cost of an investment.",
//     category: "Investment",
//     icon: "📉",
//     keywords: ["ROI calculator", "return on investment", "investment return", "profit calculator"],
//   },
// ];

// // ─── Helper utilities ────────────────────────

// /** All unique categories in display order */
// export const CATEGORIES: Category[] = [
//   "Loan & Credit",
//   "Interest & Savings",
//   "Everyday Math",
//   "Date & Time",
//   "Income & Career",
//   "Investment",
// ];

// /** Tools grouped by category */
// export const TOOLS_BY_CATEGORY: Record<Category, Tool[]> = CATEGORIES.reduce(
//   (acc, cat) => {
//     acc[cat] = TOOLS.filter((t) => t.category === cat);
//     return acc;
//   },
//   {} as Record<Category, Tool[]>
// );

// /** Look up a single tool by slug — returns undefined if not found */
// export function getToolBySlug(slug: string): Tool | undefined {
//   return TOOLS.find((t) => t.slug === slug);
// }

// /** Category accent colors — used in badges, cards, sidebar dots */
// export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; dot: string }> = {
//   "Loan & Credit":      { bg: "bg-blue-50",   text: "text-blue-700",   dot: "bg-blue-500"   },
//   "Interest & Savings": { bg: "bg-green-50",  text: "text-green-700",  dot: "bg-green-500"  },
//   "Everyday Math":      { bg: "bg-amber-50",  text: "text-amber-700",  dot: "bg-amber-500"  },
//   "Date & Time":        { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
//   "Income & Career":    { bg: "bg-rose-50",   text: "text-rose-700",   dot: "bg-rose-500"   },
//   "Investment":         { bg: "bg-teal-50",   text: "text-teal-700",   dot: "bg-teal-500"   },
// };

// /**
//  * Returns ALL valid slugs — base + geo variants.
//  * Used by generateStaticParams to pre-render every page.
//  * When you add a new tool to TOOLS array, it auto-appears here.
//  */
// export function getAllSlugs(): string[] {
//   const geoSuffixes = ["", "-nigeria", "-uk", "-us", "-canada"];
//   return TOOLS.flatMap((tool) =>
//     geoSuffixes.map((suffix) => `${tool.slug}${suffix}`)
//   );
// }



// ─────────────────────────────────────────────
//  Master tool registry
//  Every page, sidebar, homepage card, and SEO
//  title is generated from this single source.
// ─────────────────────────────────────────────

export type Category =
  | "Loan & Credit"
  | "Interest & Savings"
  | "Everyday Math"
  | "Date & Time"
  | "Income & Career"
  | "Investment";

export interface Tool {
  slug: string;        // matches the URL exactly
  title: string;
  shortTitle: string;  // used in sidebar / cards
  description: string; // used in meta + page intro
  category: Category;
  icon: string;        // emoji — swap for SVG later if needed
  keywords: string[];  // for SEO meta keywords
  ready?:      boolean;  // ← add this line ADDED 2 april
}

export const TOOLS: Tool[] = [
  // ── Loan & Credit ──────────────────────────
  {
    slug: "loan-calculator",
    title: "Loan Calculator",
    shortTitle: "Loan",
    description:
      "Calculate your monthly loan payments, total interest paid, and full amortization schedule for any loan amount, interest rate, and term.",
    category: "Loan & Credit",
    icon: "LOAN",
    keywords: ["loan calculator", "monthly payment", "amortization", "interest rate"],
  },
  {
    slug: "mortgage-calculator",
    title: "Mortgage Calculator",
    shortTitle: "Mortgage",
    description:
      "Estimate your monthly mortgage payment including principal, interest, and see a full repayment breakdown for your home loan.",
    category: "Loan & Credit",
    icon: "MORT",
    keywords: ["mortgage calculator", "home loan", "monthly mortgage payment", "house loan"],
  },
  {
    slug: "personal-loan-calculator",
    title: "Personal Loan Calculator",
    shortTitle: "Personal Loan",
    description:
      "Find out your monthly repayment and total cost for a personal loan based on amount, interest rate, and loan duration.",
    category: "Loan & Credit",
    icon: "PL",
    keywords: ["personal loan calculator", "unsecured loan", "loan repayment"],
  },
  {
    slug: "car-loan-calculator",
    title: "Car Loan Calculator",
    shortTitle: "Car Loan",
    description:
      "Calculate monthly car loan payments and total financing cost. Factor in loan amount, interest rate, and loan term for auto financing.",
    category: "Loan & Credit",
    icon: "AUTO",
    keywords: ["car loan calculator", "auto financing", "vehicle loan", "car payment"],
  },
  {
    slug: "emi-calculator",
    title: "EMI Calculator",
    shortTitle: "EMI",
    description:
      "Calculate your Equated Monthly Installment (EMI) for any loan. See principal vs interest split and total repayment amount.",
    category: "Loan & Credit",
    icon: "EMI",
    keywords: ["EMI calculator", "equated monthly installment", "loan EMI", "monthly installment"],
  },

  // ── Interest & Savings ──────────────────────
  {
    slug: "compound-interest-calculator",
    title: "Compound Interest Calculator",
    shortTitle: "Compound Interest",
    description:
      "See how your savings or investments grow over time with compound interest. Adjust compounding frequency to compare scenarios.",
    category: "Interest & Savings",
    icon: "CI",
    keywords: ["compound interest calculator", "investment growth", "compounding", "savings growth"],
  },
  {
    slug: "simple-interest-calculator",
    title: "Simple Interest Calculator",
    shortTitle: "Simple Interest",
    description:
      "Quickly calculate simple interest earned or owed on a principal amount over a given period at a fixed interest rate.",
    category: "Interest & Savings",
    icon: "SI",
    keywords: ["simple interest calculator", "interest formula", "principal interest rate time"],
  },
  {
    slug: "savings-calculator",
    title: "Savings Calculator",
    shortTitle: "Savings",
    description:
      "Project your future savings balance with regular contributions. See how time, rate, and monthly deposits affect your total.",
    category: "Interest & Savings",
    icon: "SAV",
    keywords: ["savings calculator", "future savings", "savings goal", "monthly savings"],
  },
  {
    slug: "retirement-savings-calculator",
    title: "Retirement Savings Calculator",
    shortTitle: "Retirement",
    description:
      "Plan for retirement by estimating how much you need to save each month to reach your target nest egg by your retirement age.",
    category: "Interest & Savings",
    icon: "RET",
    keywords: ["retirement calculator", "retirement savings", "pension planning", "nest egg"],
  },

  // ── Everyday Math ───────────────────────────
  {
    slug: "tip-calculator",
    title: "Tip Calculator",
    shortTitle: "Tip",
    description:
      "Calculate the tip amount and total bill for any percentage. Easily split the bill among multiple people.",
    category: "Everyday Math",
    icon: "TIP",
    keywords: ["tip calculator", "restaurant tip", "bill split", "gratuity calculator"],
    ready: false, //new
  },
  {
    slug: "discount-calculator",
    title: "Discount Calculator",
    shortTitle: "Discount",
    description:
      "Find the final price after a discount. Enter the original price and discount percentage to see how much you save.",
    category: "Everyday Math",
    icon: "DISC",
    keywords: ["discount calculator", "sale price", "percent off", "savings calculator"],
    ready: false, //new
  },
  {
    slug: "percentage-calculator",
    title: "Percentage Calculator",
    shortTitle: "Percentage",
    description:
      "Solve any percentage problem — what is X% of Y, what percentage is X of Y, or calculate percentage increase and decrease.",
    category: "Everyday Math",
    icon: "PCT",
    keywords: ["percentage calculator", "percent of", "percentage increase", "percentage decrease"],
    ready: false, //new
  },
  {
    slug: "bmi-calculator",
    title: "BMI Calculator",
    shortTitle: "BMI",
    description:
      "Calculate your Body Mass Index (BMI) using your height and weight. Supports both metric and imperial units.",
    category: "Everyday Math",
    icon: "BMI",
    keywords: ["BMI calculator", "body mass index", "healthy weight", "overweight calculator"],
    ready: false, //new
  },

  // ── Date & Time ─────────────────────────────
  {
    slug: "age-calculator",
    title: "Age Calculator",
    shortTitle: "Age",
    description:
      "Calculate your exact age in years, months, and days from your date of birth to today or any custom date.",
    category: "Date & Time",
    icon: "AGE",
    keywords: ["age calculator", "date of birth calculator", "how old am I", "exact age"],
    ready: false, //new 
  },
  {
    slug: "time-duration-calculator",
    title: "Time Duration Calculator",
    shortTitle: "Time Duration",
    description:
      "Calculate the exact duration between two times or dates in hours, minutes, seconds, days, and weeks.",
    category: "Date & Time",
    icon: "DUR",
    keywords: ["time duration calculator", "time between dates", "hours calculator", "elapsed time"],
    ready: false, //new
  },
  {
    slug: "date-calculator",
    title: "Date Calculator",
    shortTitle: "Date",
    description:
      "Add or subtract days, weeks, months, or years from any date. Find what date falls X days from now.",
    category: "Date & Time",
    icon: "DATE",
    keywords: ["date calculator", "add days to date", "date difference", "days from today"],
    ready: false, //new
  },

  // ── Income & Career ─────────────────────────
  {
    slug: "salary-increment-calculator",
    title: "Salary Increment Calculator",
    shortTitle: "Salary Increment",
    description:
      "Calculate your new salary after a raise or promotion. See the exact increase amount and new monthly take-home.",
    category: "Income & Career",
    icon: "SAL",
    keywords: ["salary increment calculator", "raise calculator", "pay increase", "promotion salary"],
    ready: false, //new
  },
  {
    slug: "net-salary-calculator",
    title: "Net Salary Calculator",
    shortTitle: "Net Salary",
    description:
      "Estimate your take-home pay after standard deductions. Enter your gross salary and deduction percentages to see your net income.",
    category: "Income & Career",
    icon: "NET",
    keywords: ["net salary calculator", "take home pay", "after tax salary", "gross to net"],
    ready: false, //new
  },
  {
    slug: "budget-planner",
    title: "Budget Planner",
    shortTitle: "Budget Planner",
    description:
      "Plan your monthly budget by entering your income and expenses. See your surplus or deficit at a glance.",
    category: "Income & Career",
    icon: "BDG",
    keywords: ["budget planner", "monthly budget", "income vs expenses", "budget calculator"], 
    ready: false, //new
  },

  // ── Investment ──────────────────────────────
  {
    slug: "roi-calculator",
    title: "ROI Calculator",
    shortTitle: "ROI",
    description:
      "Calculate Return on Investment (ROI) as a percentage. Compare the gain or loss relative to the cost of an investment.",
    category: "Investment",
    icon: "ROI",
    keywords: ["ROI calculator", "return on investment", "investment return", "profit calculator"],
    ready: false, //new
  },
];

// ─── Helper utilities ────────────────────────

/** All unique categories in display order */
export const CATEGORIES: Category[] = [
  "Loan & Credit",
  "Interest & Savings",
  "Everyday Math",
  "Date & Time",
  "Income & Career",
  "Investment",
];

/** Tools grouped by category */
export const TOOLS_BY_CATEGORY: Record<Category, Tool[]> = CATEGORIES.reduce(
  (acc, cat) => {
    acc[cat] = TOOLS.filter((t) => t.category === cat);
    return acc;
  },
  {} as Record<Category, Tool[]>
);

/** Look up a single tool by slug — returns undefined if not found */
export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

/** Category accent colors — used in badges, cards, sidebar dots */
export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; dot: string }> = {
  "Loan & Credit":      { bg: "bg-blue-50",   text: "text-blue-700",   dot: "bg-blue-500"   },
  "Interest & Savings": { bg: "bg-green-50",  text: "text-green-700",  dot: "bg-green-500"  },
  "Everyday Math":      { bg: "bg-amber-50",  text: "text-amber-700",  dot: "bg-amber-500"  },
  "Date & Time":        { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
  "Income & Career":    { bg: "bg-rose-50",   text: "text-rose-700",   dot: "bg-rose-500"   },
  "Investment":         { bg: "bg-teal-50",   text: "text-teal-700",   dot: "bg-teal-500"   },
};

/**
 * Returns ALL valid slugs — base + geo variants.
 * Used by generateStaticParams to pre-render every page.
 * When you add a new tool to TOOLS array, it auto-appears here.
 */
// export function getAllSlugs(): string[] {
//   const geoSuffixes = ["", "-nigeria", "-uk", "-us", "-canada"];
//   return TOOLS.flatMap((tool) =>
//     geoSuffixes.map((suffix) => `${tool.slug}${suffix}`)
//   );
// }


export function getAllSlugs(): string[] {
  const geoSuffixes = ["", "-nigeria", "-uk", "-us", "-canada"];
  return TOOLS
    .filter((tool) => tool.ready !== false)
    .flatMap((tool) =>
      geoSuffixes.map((suffix) => `${tool.slug}${suffix}`)
    );
}