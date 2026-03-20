"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CATEGORIES,
  TOOLS_BY_CATEGORY,
  CATEGORY_COLORS,
  type Category,
} from "@/lib/constants";

export default function Sidebar() {
  const pathname = usePathname();

  // Derive the active category from the current route
  const activeCategory = CATEGORIES.find((cat) =>
    TOOLS_BY_CATEGORY[cat].some((t) => pathname === `/${t.slug}`)
  );

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0">
      <div className="sticky top-20 overflow-y-auto max-h-[calc(100vh-5rem)] pr-1 pb-8">

        {/* "All tools" link */}
        <Link
          href="/"
          className={`flex items-center gap-2 px-3 py-2 mb-4 rounded-lg text-sm font-medium transition-colors ${
            pathname === "/"
              ? "bg-green-50 text-green-700"
              : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          }`}
        >
          <span>🏠</span> All calculators
        </Link>

        {/* Category sections */}
        <nav className="space-y-5">
          {CATEGORIES.map((cat) => {
            const colors = CATEGORY_COLORS[cat];
            const isActiveCategory = cat === activeCategory;
            const tools = TOOLS_BY_CATEGORY[cat];

            return (
              <div key={cat}>
                {/* Category label */}
                <div className="flex items-center gap-2 px-3 mb-1">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${colors.dot}`}
                  />
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {cat}
                  </span>
                </div>

                {/* Tool links */}
                <ul className="space-y-0.5">
                  {tools.map((tool) => {
                    const isActive = pathname === `/${tool.slug}`;
                    return (
                      <li key={tool.slug}>
                        <Link
                          href={`/${tool.slug}`}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors group ${
                            isActive
                              ? `${colors.bg} ${colors.text} font-medium`
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          {/* Vertical active bar */}
                          <span
                            className={`w-0.5 h-4 rounded-full transition-all ${
                              isActive ? colors.dot : "bg-transparent"
                            }`}
                          />
                          <span className="text-base leading-none">
                            {tool.icon}
                          </span>
                          <span className="truncate">{tool.shortTitle}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>

        {/* Bottom promo / note */}
        <div className="mt-8 mx-3 p-3 bg-green-50 border border-green-100 rounded-xl">
          <p className="text-xs text-green-700 font-medium mb-0.5">
            20 free calculators
          </p>
          <p className="text-xs text-green-600">
            No sign-up. No ads. Just maths.
          </p>
        </div>
      </div>
    </aside>
  );
}