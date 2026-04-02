// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";
// import { CATEGORIES, TOOLS_BY_CATEGORY } from "@/lib/constants";

// export default function Header() {
//   const pathname = usePathname();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const isHome = pathname === "/";

//   return (
//     <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-14">

//           {/* Logo */}
//           <Link
//             href="/"
//             className="flex items-center gap-2 font-bold text-gray-900 hover:text-green-600 transition-colors"
//           >
//             <span className="text-xl"></span>
//             <span className="text-base">MoneyToolsLab</span>
          
//           </Link>

//           {/* Desktop nav */}
//           <nav className="hidden md:flex items-center gap-1">
//             <Link
//               href="/blog"
//               className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
//                 pathname.startsWith("/blog")
//                   ? "bg-green-50 text-green-700"
//                   : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//               }`}
//             >
//               Blog
//             </Link>
//             {CATEGORIES.map((cat) => (
//               <div key={cat} className="relative group">
//                 <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
//                   {cat}
//                 </button>
//                 {/* Dropdown */}
//                 <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
//                   <div className="p-2">
//                     {TOOLS_BY_CATEGORY[cat].map((tool) => (
//                       <Link
//                         key={tool.slug}
//                         href={`/${tool.slug}`}
//                         className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
//                           pathname === `/${tool.slug}`
//                             ? "bg-green-50 text-green-700 font-medium"
//                             : "text-gray-700 hover:bg-gray-50"
//                         }`}
//                       >
//                         <span className="text-base w-5 text-center">
//                           {tool.icon}
//                         </span>
//                         {tool.shortTitle}
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </nav>

//           {/* Right side */}
//           <div className="flex items-center gap-2">
//             {!isHome && (
//               <Link
//                 href="/"
//                 className="hidden sm:inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
//               >
//                 <span>←</span> All tools
//               </Link>
//             )}

//             {/* Mobile menu toggle */}
//             <button
//               className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
//               onClick={() => setMenuOpen((v) => !v)}
//               aria-label="Toggle menu"
//             >
//               {menuOpen ? (
//                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile dropdown menu */}
//       {menuOpen && (
//         <div className="md:hidden border-t border-gray-100 bg-white">
//           <div className="px-4 py-3 space-y-4 max-h-[70vh] overflow-y-auto">
//             {CATEGORIES.map((cat) => (
//               <div key={cat}>
//                 <p className="text-xs font-600 text-gray-400 uppercase tracking-wider mb-1.5 px-1">
//                   {cat}
//                 </p>
//                 <div className="space-y-0.5">
//                   {TOOLS_BY_CATEGORY[cat].map((tool) => (
//                     <Link
//                       key={tool.slug}
//                       href={`/${tool.slug}`}
//                       onClick={() => setMenuOpen(false)}
//                       className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
//                         pathname === `/${tool.slug}`
//                           ? "bg-green-50 text-green-700 font-medium"
//                           : "text-gray-700 hover:bg-gray-50"
//                       }`}
//                     >
//                       <span className="text-base w-5 text-center">{tool.icon}</span>
//                       {tool.shortTitle}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CATEGORIES, TOOLS_BY_CATEGORY } from "@/lib/constants";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === "/";

  // Only show categories that have at least one ready tool
  const readyCategories = CATEGORIES.filter((cat) =>
    TOOLS_BY_CATEGORY[cat].some((t) => t.ready !== false)
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-gray-900 hover:text-green-600 transition-colors"
          >
            <span className="text-xl">🧮</span>
            <span className="text-base">MoneyToolsLab</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/blog"
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                pathname.startsWith("/blog")
                  ? "bg-green-50 text-green-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Blog
            </Link>
            {readyCategories.map((cat) => (
              <div key={cat} className="relative group">
                <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                  {cat}
                </button>
                {/* Dropdown */}
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <div className="p-2">
                    {TOOLS_BY_CATEGORY[cat]
                      .filter((t) => t.ready !== false)
                      .map((tool) => (
                        <Link
                          key={tool.slug}
                          href={`/${tool.slug}`}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                            pathname === `/${tool.slug}`
                              ? "bg-green-50 text-green-700 font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span className="text-xs font-bold text-gray-400 w-8 shrink-0">
                            {tool.icon}
                          </span>
                          {tool.shortTitle}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {!isHome && (
              <Link
                href="/"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                ← All tools
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-4 max-h-[70vh] overflow-y-auto">
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Blog
            </Link>
            {readyCategories.map((cat) => (
              <div key={cat}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 px-1">
                  {cat}
                </p>
                <div className="space-y-0.5">
                  {TOOLS_BY_CATEGORY[cat]
                    .filter((t) => t.ready !== false)
                    .map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/${tool.slug}`}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                          pathname === `/${tool.slug}`
                            ? "bg-green-50 text-green-700 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-xs font-bold text-gray-400 w-8 shrink-0">
                          {tool.icon}
                        </span>
                        {tool.shortTitle}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}