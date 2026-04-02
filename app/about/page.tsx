import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About — MoneyToolsLab",
  description:
    "MoneyToolsLab is a free financial calculator platform built by JKTL LLC. Learn about our mission to make personal finance tools accessible to everyone.",
  alternates: { canonical: "https://www.moneytoolslab.com/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              About MoneyToolsLab
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Free, accurate financial calculators for everyone.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">

          {/* Who we are */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Who we are
            </h2>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 text-gray-600 leading-relaxed">
              <p>
                MoneyToolsLab is built and maintained by{" "}
                <strong className="text-gray-800">JKTL LLC</strong>, a digital
                products company focused on building useful, accessible tools
                for everyday financial decisions.
              </p>
              <p>
                We started MoneyToolsLab because most financial calculators
                online are either buried inside complicated banking apps,
                surrounded by intrusive ads, or require you to create an
                account before you can use them. We wanted something simpler —
                open the page, enter your numbers, get your answer.
              </p>
              <p>
                Every calculator on this site is free to use, requires no
                registration, and works instantly in your browser. No data is
                stored or transmitted.
              </p>
            </div>
          </section>

          {/* Our mission */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Our mission
            </h2>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-gray-600 leading-relaxed">
              <p>
                Financial decisions — whether you are taking out a mortgage,
                planning for retirement, or figuring out how much interest you
                are paying on a loan — should be based on accurate numbers, not
                guesswork. Our mission is to put those numbers in front of
                anyone, anywhere, instantly.
              </p>
              <p className="mt-4">
                We specifically build for global audiences. Our calculators
                include geo-specific defaults and currency formatting for
                Nigeria, the United Kingdom, the United States, and Canada —
                because financial tools should work for the people using them,
                not just for one country.
              </p>
            </div>
          </section>

          {/* What we build */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              What we build
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Loan calculators",     desc: "EMI, mortgage, personal loan, car loan — with full amortization schedules." },
                { title: "Savings tools",        desc: "Compound interest, savings projections, retirement planning." },
                { title: "Everyday math",        desc: "Tip, discount, percentage, BMI, age and date calculators." },
                { title: "Income tools",         desc: "Salary increment, net pay, budget planner, ROI calculator." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-gray-200 rounded-xl p-4"
                >
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <section className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
            <p className="text-sm font-semibold text-green-800 mb-1">
              Questions or feedback?
            </p>
            <p className="text-sm text-green-600 mb-4">
              We would love to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              Get in touch →
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}