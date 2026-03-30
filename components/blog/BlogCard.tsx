import Link from "next/link";
import {
  type BlogPost,
  BLOG_CATEGORY_COLORS,
  BLOG_COUNTRY_FLAGS,
} from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const colors = BLOG_CATEGORY_COLORS[post.category];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-green-300 hover:shadow-md transition-all duration-200"
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full ${colors.bg.replace("50", "400")}`} />

      <div className="p-5 flex flex-col flex-1">
        {/* Category + reading time */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
            {post.category}
          </span>
          <span className="text-xs text-gray-400">{post.readingTime} min read</span>
        </div>

        {/* Title */}
        <h2 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors leading-snug">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          {/* Country flags */}
          <div className="flex items-center gap-1">
            {post.countries.slice(0, 4).map((country) => (
              <span key={country} className="text-sm" title={country}>
                {BLOG_COUNTRY_FLAGS[country] ?? "🌍"}
              </span>
            ))}
            {post.countries.length > 4 && (
              <span className="text-xs text-gray-400">
                +{post.countries.length - 4}
              </span>
            )}
          </div>

          {/* Date */}
          <span className="text-xs text-gray-400">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              year:  "numeric",
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}