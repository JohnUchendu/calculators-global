import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact — MoneyToolsLab",
  description:
    "Get in touch with the MoneyToolsLab team. Report a bug, suggest a calculator, or ask a question.",
  alternates: { canonical: "https://www.moneytoolslab.com/contact" },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Contact us
            </h1>
            <p className="text-gray-500 text-lg">
              We read every message. Typical response time is 1–2 business days.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">

          {/* Contact info */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Company
              </p>
              <p className="text-sm font-medium text-gray-800">JKTL LLC</p>
            </div>

            <div className="h-px bg-gray-100" />

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Email
              </p>
              <a
                href="mailto:info@jktl.com.ng"
                className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
              >
               info@jktl.com.ng
              </a>
            </div>

            <div className="h-px bg-gray-100" />

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Website
              </p>
              <p className="text-sm text-gray-600">www.moneytoolslab.com</p>
            </div>
          </div>

          {/* What to contact us about */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              What can we help with?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "Bug report",         desc: "Found a calculation error or broken page?" },
                { title: "Calculator request", desc: "Need a calculator we don't have yet?" },
                { title: "Content feedback",   desc: "Spotted an error in an article?" },
                { title: "Business inquiry",   desc: "Partnerships, sponsorships, or affiliate programs." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-gray-200 rounded-xl p-4"
                >
                  <p className="text-sm font-semibold text-gray-800 mb-0.5">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="text-sm text-amber-700 leading-relaxed">
              <strong>Please note:</strong> MoneyToolsLab does not provide
              financial, legal, or tax advice. Our calculators are for
              informational purposes only. For personalised financial guidance,
              please consult a qualified professional.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}