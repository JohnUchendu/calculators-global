import { CATEGORY_COLORS, type Category } from "@/lib/constants";

interface BadgeProps {
  category: Category;
  className?: string;
}

export default function Badge({ category, className = "" }: BadgeProps) {
  const colors = CATEGORY_COLORS[category];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text} ${className}`}
    >
      {category}
    </span>
  );
}