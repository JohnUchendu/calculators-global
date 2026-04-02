import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Use — MoneyToolsLab",
  description: "Terms of use for MoneyToolsLab, operated by JKTL LLC.",
  alternates: { canonical: "https://www.moneytoolslab.com/terms" },
};

const LAST_UPDATED = "April 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Terms of Use
            </h1>
            <p className="text-gray-400 text-sm">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-8 text-sm text-gray-600 leading-relaxed">

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-3">1. Acceptance of terms</h2>
              <p>
                By accessing and using MoneyToolsLab (<strong>www.moneytoolslab.com</strong>),
                you accept and agree to be bound by these Terms of Use. If you do not
                agree to these terms, please do not use this site. MoneyToolsLab is
                operated by <strong className="text-gray-800">JKTL LLC</strong>.
              </p>
            </section>

            <div className="h-px bg-gray-100" />

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-3">2. Use of calculators</h2>
              <p className="mb-3">
                The calculators and tools provided on MoneyToolsLab are for{" "}
                <strong className="text-gray-800">informational and educational purposes only</strong>.
                They are designed to help you understand and estimate financial
                figures — they do not constitute financial, legal, tax, or
                investment advice.
              </p>
              <p>
                Results produced by our calculators are estimates based on the
                inputs you provide and standard financial formulas. Actual figures
                from lenders, banks, or financial institutions may differ. Always
                verify important financial decisions with a qualified professional
                and the relevant institution directly.
              </p>
            </section>

            <div className="h-px bg-gray-100" />

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-3">3. No financial advice</h2>
              <p>
                Nothing on this website should be construed as financial advice.
                JKTL LLC is not a financial advisor, broker, or lender. We do not
                recommend any specific financial product, lender, or investment.
                Any affiliate recommendations on the site are clearly disclosed and
                are for informational purposes only.
              </p>
            </section>

            <div className="h-px bg-gray-100" />

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-3">4. Accuracy of information</h2>
              <p>
                We make every effort to ensure the accuracy of our calculators and
                content. However, JKTL LLC makes no warranties or representations
                regarding the accuracy, completeness, or suitability of any
                information on this site. We reserve the right to correct errors
                and update content at any time without notice.
              </p>
            </section>

            <div className="h-px bg-gray-100" />

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-3">5. Affiliate links</h2>
              <p>
                MoneyToolsLab contains affiliate links to third-party products and
                services. When you click an affiliate link and complete a purchase or
                registration, we may receive a commission. This does not affect the
                price you pay. Affiliate relationships do not influence our editorial
                content or calculator results.
              </p>
            </section>

            <div className="h-px bg-gray-100" />

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-3">6. Intellectual property</h2>
              <p>
                All content on MoneyToolsLab — including text, calculators, code,
                design, and graphics — is the property of JKTL LLC and is protected
                by applicable copyright and intellectual property laws. You may not
                reproduce, distribute, or create derivative works without prior
                written permission.
              </p>
            </section>

            <div className="h-px bg-gray-100" />

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-3">7. Limitation of liability</h2>
              <p>
                To the fullest extent permitted by law, JKTL LLC shall not be liable
                for any direct, indirect, incidental, or consequential damages arising
                from your use of, or inability to use, this site or its calculators.
                Your use of this site is at your own risk.
              </p>
            </section>

            <div className="h-px bg-gray-100" />

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-3">8. Third-party sites</h2>
              <p>
                Our site contains links to third-party websites. JKTL LLC is not
                responsible for the content, accuracy, or practices of any
                third-party site. Linking to a site does not constitute an
                endorsement.
              </p>
            </section>

            <div className="h-px bg-gray-100" />

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-3">9. Changes to terms</h2>
              <p>
                We reserve the right to update these Terms of Use at any time.
                Changes are effective immediately upon posting. Continued use of
                the site after any changes constitutes your acceptance of the
                updated terms.
              </p>
            </section>

            <div className="h-px bg-gray-100" />

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-3">10. Governing law</h2>
              <p>
                These terms are governed by and construed in accordance with
                applicable law. Any disputes arising from these terms or your use
                of this site shall be resolved in the appropriate jurisdiction.
              </p>
            </section>

            <div className="h-px bg-gray-100" />

            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-3">11. Contact</h2>
              <p>
                For questions about these terms, contact us at{" "}
                {/* <a
                  href="mailto:hello@moneytoolslab.com"
                  className="text-green-600 hover:text-green-700 transition-colors"
                >
                  hello@moneytoolslab.com
                </a> */}
                .
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}