import Link from "next/link";
import { type Tool, CATEGORY_COLORS } from "@/lib/constants";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const colors = CATEGORY_COLORS[tool.category];

  return (
    <Link
      href={`/${tool.slug}`}
      className="group flex flex-col bg-white border border-gray-200 rounded-2xl p-5 hover:border-green-300 hover:shadow-md transition-all duration-200"
    >
      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${colors.bg} group-hover:scale-105 transition-transform duration-200`}
      >
        {tool.icon}
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">
        {tool.shortTitle}
      </h3>

      {/* Description */}
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1">
        {tool.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}
        >
          {tool.category}
        </span>
        <span className="text-xs text-gray-400 group-hover:text-green-600 transition-colors">
          Open →
        </span>
      </div>
    </Link>
  );
}