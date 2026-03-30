// import type { Metadata } from "next";
// import Link from "next/link";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import BlogCard from "@/components/blog/BlogCard";
// import {
//   BLOG_POSTS,
//   BLOG_CATEGORY_COLORS,
//   type BlogCategory,
// } from "@/lib/blog";

// export const metadata: Metadata = {
//   title:       "Finance Blog — CalcNest",
//   description: "Practical personal finance articles covering mortgages, savings, loans, and retirement — with real numbers and free calculator tools.",
//   alternates:  { canonical: "https://www.moneytoolslab.com/blog" },
//   openGraph: {
//     title:       "Finance Blog — CalcNest",
//     description: "Practical finance guides with real numbers and free calculator tools.",
//     url:         "https://www.moneytoolslab.com/blog",
//     siteName:    "CalcNest",
//     type:        "website",
//   },
// };

// // Group posts by category for the listing
// const CATEGORIES = [...new Set(BLOG_POSTS.map((p) => p.category))] as BlogCategory[];

// export default function BlogIndexPage() {
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Header />

//       <main className="flex-1">
//         {/* Hero */}
//         <section className="bg-white border-b border-gray-200">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
//             <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
//               Finance guides with real numbers
//             </div>
//             <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
//               CalcNest Blog
//             </h1>
//             <p className="text-gray-500 max-w-xl mx-auto">
//               Practical personal finance articles. Every post includes free
//               calculator tools so you can run your own numbers.
//             </p>
//           </div>
//         </section>

//         {/* Posts */}
//         <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
//           {CATEGORIES.map((category) => {
//             const posts = BLOG_POSTS.filter((p) => p.category === category);
//             if (posts.length === 0) return null;
//             const colors = BLOG_CATEGORY_COLORS[category];

//             return (
//               <div key={category}>
//                 <div className="flex items-center gap-3 mb-5">
//                   <h2 className="text-base font-semibold text-gray-900">
//                     {category}
//                   </h2>
//                   <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
//                     {posts.length} {posts.length === 1 ? "article" : "articles"}
//                   </span>
//                   <div className="flex-1 h-px bg-gray-200" />
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {posts.map((post) => (
//                     <BlogCard key={post.slug} post={post} />
//                   ))}
//                 </div>
//               </div>
//             );
//           })}
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// }



import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import {
  BLOG_POSTS,
  BLOG_CATEGORY_COLORS,
  type BlogCategory,
} from "@/lib/blog";

export const metadata: Metadata = {
  title: "Finance Blog — Money Tools Lab",
  description: "Practical personal finance articles covering mortgages, savings, loans, and retirement — with real numbers and free calculator tools.",
  alternates: { canonical: "https://www.moneytoolslab.com/blog" },
  openGraph: {
    title: "Finance Blog — Money Tools Lab",
    description: "Practical finance guides with real numbers and free calculator tools.",
    url: "https://www.moneytoolslab.com/blog",
    siteName: "Money Tools Lab",
    type: "website",
  },
};

// ✅ Fixed: Better way to get unique categories (no Set spread)
const CATEGORIES: BlogCategory[] = Array.from(
  new Set(BLOG_POSTS.map((p) => p.category))
) as BlogCategory[];

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
              Finance guides with real numbers
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Finance Blog
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto">
              Practical personal finance articles. Every post includes free
              calculator tools so you can run your own numbers.
            </p>
          </div>
        </section>

        {/* Posts grouped by category */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
          {CATEGORIES.map((category) => {
            const posts = BLOG_POSTS.filter((p) => p.category === category);
            if (posts.length === 0) return null;

            const colors = BLOG_CATEGORY_COLORS[category];

            return (
              <div key={category}>
                <div className="flex items-center gap-3 mb-5">
                  <h2 className="text-base font-semibold text-gray-900">
                    {category}
                  </h2>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}
                  >
                    {posts.length} {posts.length === 1 ? "article" : "articles"}
                  </span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {posts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
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