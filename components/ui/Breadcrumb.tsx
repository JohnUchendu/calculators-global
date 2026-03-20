import Link from "next/link";
import { type Category } from "@/lib/constants";

interface BreadcrumbProps {
  toolTitle: string;
  category: Category;
}

export default function Breadcrumb({ toolTitle, category }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-400 mb-5">
      <Link href="/" className="hover:text-green-600 transition-colors">
        Home
      </Link>
      <span>›</span>
      <span className="text-gray-400">{category}</span>
      <span>›</span>
      <span className="text-gray-700 font-medium truncate">{toolTitle}</span>
    </nav>
  );
}