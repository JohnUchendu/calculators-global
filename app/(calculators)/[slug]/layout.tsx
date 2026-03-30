import type { Metadata } from "next";
import { generateToolMetadata, buildFaqJsonLd } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { TOOLS } from "@/lib/constants";
import { getGeoBySlug } from "@/lib/geo";

type Props = {
  children:  React.ReactNode;
  params:    Promise<{ slug: string }>;
};

// ── Metadata ──────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  return generateToolMetadata({ params });
}

// ── Static params — pre-render all 45 slugs ───
// Add new slugs here any time — they auto-render
export { buildStaticParams as generateStaticParams } from "@/lib/metadata";

// ── Layout ────────────────────────────────────
export default async function ToolLayout({ children, params }: Props) {
  const { slug } = await params;

  // Validate — 404 if slug matches no known tool
  const geo      = getGeoBySlug(slug);
  const baseSlug = geo.key !== "global"
    ? slug.replace(geo.urlSuffix, "")
    : slug;

  const toolExists = TOOLS.some((t) => t.slug === baseSlug);
  if (!toolExists) notFound();

  // FAQ JSON-LD structured data for rich results
  const faqJsonLd = buildFaqJsonLd(slug);

  return (
    <>
      {/* FAQ structured data — triggers rich snippets in Google */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqJsonLd }}
        />
      )}
      {children}
    </>
  );
}