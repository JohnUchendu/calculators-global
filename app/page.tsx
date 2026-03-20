import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ToolCard from "@/components/ui/ToolCard";
import { CATEGORIES, TOOLS_BY_CATEGORY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Finance Calculators — Free Money & Everyday Calculators",
  description:
    "20 free finance and everyday money calculators. Loan, mortgage, EMI, compound interest, savings, budget planner, ROI, and more. No sign-up required.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
              <span>✓</span> Free · No sign-up · No ads
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-balance">
              Finance & Money Calculators
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto text-balance">
              20 free calculators for loans, savings, investments, budgeting,
              and everyday money decisions. Fast, accurate, and easy to use.
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-8 mt-8">
              {[
                { value: "20", label: "Calculators" },
                { value: "6",  label: "Categories"  },
                { value: "0",  label: "Sign-ups"    },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{value}</div>
                  <div className="text-sm text-gray-400">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tool grid by category */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {CATEGORIES.map((category) => {
            const tools = TOOLS_BY_CATEGORY[category];
            return (
              <div key={category}>
                {/* Category heading */}
                <div className="flex items-center gap-3 mb-5">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {category}
                  </h2>
                  <span className="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    {tools.length} tools
                  </span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Tool cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {tools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </main>

      <Footer />
    </div>
  );
}