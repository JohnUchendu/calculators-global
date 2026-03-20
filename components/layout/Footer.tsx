import Link from "next/link";
import { CATEGORIES, TOOLS_BY_CATEGORY } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Top: brand + columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 mb-3">
              <span className="text-xl">🧮</span>
              <span>FinanceCalc</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Free, fast, and accurate finance and everyday money calculators.
              No account needed.
            </p>
          </div>

          {/* Tool columns — one per first 3 categories */}
          {CATEGORIES.slice(0, 3).map((cat) => (
            <div key={cat}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {cat}
              </h3>
              <ul className="space-y-2">
                {TOOLS_BY_CATEGORY[cat].map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/${tool.slug}`}
                      className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                    >
                      {tool.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-400">
            © {currentYear} FinanceCalc. All calculators are for informational
            purposes only.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              All tools
            </Link>
            <span className="text-gray-200">|</span>
            <span className="text-sm text-gray-400">
              {new Date().getFullYear()} · Free forever
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}