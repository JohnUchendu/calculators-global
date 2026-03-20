import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Finance Calculators — Free Money & Everyday Calculators",
    template: "%s | Finance Calculators",
  },
  description:
    "Free, fast, and easy-to-use finance and everyday money calculators. Loan, mortgage, EMI, compound interest, savings, budget planner, and more.",
  keywords: [
    "finance calculator",
    "loan calculator",
    "mortgage calculator",
    "EMI calculator",
    "compound interest",
    "budget planner",
    "savings calculator",
    "free calculators",
  ],
  authors: [{ name: "Finance Calculators" }],
  creator: "Finance Calculators",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Finance Calculators — Free Money & Everyday Calculators",
    description:
      "Free, fast finance and everyday calculators. Loan, mortgage, savings, budgeting, and more — no sign-up required.",
    siteName: "Finance Calculators",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finance Calculators",
    description: "Free finance and everyday money calculators.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
