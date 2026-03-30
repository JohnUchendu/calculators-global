import Link from "next/link";
import {
  type BlogPost,
  BLOG_CATEGORY_COLORS,
  BLOG_COUNTRY_FLAGS,
  getRelatedPosts,
} from "@/lib/blog";
import { TOOLS } from "@/lib/constants";
import BlogCard from "./BlogCard";

interface BlogLayoutProps {
  post:     BlogPost;
  children: React.ReactNode;
}

export default function BlogLayout({ post, children }: BlogLayoutProps) {
  const colors       = BLOG_CATEGORY_COLORS[post.category];
  const relatedPosts = getRelatedPosts(post.slug);
  const relatedCalcs = TOOLS.filter((t) => post.relatedCalcs.includes(t.slug));

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Post header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-green-600 transition-colors">Blog</Link>
            <span>›</span>
            <span className="text-gray-600 truncate">{post.title}</span>
          </nav>

          {/* Category badge */}
          <span className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full mb-4 ${colors.bg} ${colors.text}`}>
            {post.category}
          </span>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-gray-500 text-base leading-relaxed mb-6">
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 pt-4 border-t border-gray-100">
            <span>By {post.author}</span>
            <span>·</span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day:   "numeric",
                year:  "numeric",
              })}
            </span>
            <span>·</span>
            <span>{post.readingTime} min read</span>
            <div className="flex items-center gap-1 ml-auto">
              {post.countries.map((c) => (
                <span key={c} title={c} className="text-base">
                  {BLOG_COUNTRY_FLAGS[c] ?? "🌍"}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content + sidebar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-10">

          {/* Main content */}
          <article className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
              {/* MDX prose styles */}
              <div className="
                prose prose-sm max-w-none
                prose-headings:font-semibold prose-headings:text-gray-900
                prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
                prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
                prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
                prose-li:text-gray-600 prose-li:leading-relaxed
                prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-800 prose-strong:font-semibold
                prose-table:text-sm prose-th:text-left prose-th:font-semibold
                prose-blockquote:border-l-4 prose-blockquote:border-green-300
                prose-blockquote:bg-green-50 prose-blockquote:rounded-r-lg
                prose-blockquote:px-4 prose-blockquote:py-1
                prose-blockquote:text-green-700 prose-blockquote:not-italic
              ">
                {children}
              </div>
            </div>

            {/* Trust + disclaimer */}
            <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-5">
              <p className="text-xs text-gray-400 leading-relaxed">
                <strong className="text-gray-500">Disclaimer:</strong> The
                information in this article is for educational purposes only
                and does not constitute financial advice. Calculator results
                are estimates based on the inputs provided. Always consult a
                qualified financial advisor before making financial decisions.
                {post.updatedAt && (
                  <> Last updated:{" "}
                    {new Date(post.updatedAt).toLocaleDateString("en-US", {
                      month: "long", year: "numeric"
                    })}.
                  </>
                )}
              </p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col gap-6 w-64 shrink-0">

            {/* Related calculators */}
            {relatedCalcs.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Related calculators
                </p>
                <div className="space-y-2">
                  {relatedCalcs.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/${tool.slug}`}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <span className="text-lg">{tool.icon}</span>
                      <div>
                        <p className="text-xs font-medium text-gray-700 group-hover:text-green-700 transition-colors">
                          {tool.shortTitle}
                        </p>
                        <p className="text-xs text-gray-400">Free calculator</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* All tools CTA */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <p className="text-xs font-semibold text-green-800 mb-1">
                20 free calculators
              </p>
              <p className="text-xs text-green-600 mb-3">
                Loan, mortgage, savings, retirement and more.
              </p>
              <Link
                href="/"
                className="text-xs font-medium text-green-700 hover:text-green-800 transition-colors"
              >
                Browse all tools →
              </Link>
            </div>
          </aside>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Related articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedPosts.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}