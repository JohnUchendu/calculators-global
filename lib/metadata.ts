// ─────────────────────────────────────────────
//  Dynamic metadata generator
//  Used by app/(calculators)/[slug]/layout.tsx
//  Handles ALL tool pages — base + geo variants
//  + any future SEO variant pages you add later
// ─────────────────────────────────────────────

import type { Metadata } from "next";
import { TOOLS, getAllSlugs } from "@/lib/constants";
import { GEO_CONFIGS, getGeoBySlug } from "@/lib/geo";
import { getSeoContent } from "@/lib/seo";

const SITE_URL   = "https://www.calcnest.com";
const SITE_NAME  = "CalcNest";
const AUTHOR     = "CalcNest";

type SlugParams = { params: Promise<{ slug: string }> };

// ── Main export: used in layout.tsx ──────────

export async function generateToolMetadata(
  { params }: SlugParams
): Promise<Metadata> {
  const { slug } = await params;

  // Resolve the base tool slug — strip any geo suffix
  // e.g. "loan-calculator-nigeria" → base = "loan-calculator", geo = nigeria config
  const geo  = getGeoBySlug(slug);
  const baseSlug = geo.key !== "global"
    ? slug.replace(geo.urlSuffix, "")
    : slug;

  const tool = TOOLS.find((t) => t.slug === baseSlug);

  // Graceful fallback for unknown slugs
  if (!tool) {
    return {
      title:       `Calculator | ${SITE_NAME}`,
      description: "Free online financial calculator.",
    };
  }

  const geoLabel  = geo.key !== "global" ? ` in ${geo.label}` : "";
  const geoSymbol = geo.key !== "global" ? ` (${geo.currencySymbol})` : "";
  const geoFlag   = geo.key !== "global" ? `${geo.flag} ` : "";

  const title       = `${tool.title}${geoLabel} — Free Online Calculator${geoSymbol}`;
  const description = `${geoFlag}Free ${tool.title}${geoLabel}. ${tool.description} No sign-up required. Instant results.`;
  const canonical   = `${SITE_URL}/${slug}`;

  // Pull FAQ content for keyword enrichment
  const seoContent = getSeoContent(baseSlug, geo);
  const faqKeywords = seoContent.faqs
    .map((f) => f.q)
    .slice(0, 4);

  const keywords = [
    ...tool.keywords,
    ...(geo.key !== "global"
      ? [
          geo.label,
          geo.seo.countryAdj,
          geo.currency,
          `${tool.shortTitle} ${geo.label}`,
          `free ${tool.shortTitle.toLowerCase()} ${geo.label}`,
          `${tool.shortTitle.toLowerCase()} ${geo.label} calculator`,
        ]
      : []),
    `free ${tool.shortTitle.toLowerCase()} calculator`,
    "online calculator",
    "free calculator",
    SITE_NAME.toLowerCase(),
    ...faqKeywords,
  ];

  return {
    // ── Core ──────────────────────────────────
    title,
    description,
    generator:       "Next.js",
    applicationName: SITE_NAME,
    referrer:        "origin-when-cross-origin",
    keywords,

    // ── Authorship ────────────────────────────
    authors:   [{ name: AUTHOR, url: SITE_URL }],
    creator:   AUTHOR,
    publisher: AUTHOR,

    // ── Format detection ──────────────────────
    formatDetection: {
      email:     false,
      address:   false,
      telephone: false,
    },

    // ── Canonical + hreflang alternates ───────
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
      languages: {
        "x-default": `${SITE_URL}/${tool.slug}`,
        "en-US":     `${SITE_URL}/${tool.slug}-us`,
        "en-GB":     `${SITE_URL}/${tool.slug}-uk`,
        "en-NG":     `${SITE_URL}/${tool.slug}-nigeria`,
        "en-CA":     `${SITE_URL}/${tool.slug}-canada`,
      },
    },

    // ── OpenGraph ─────────────────────────────
    openGraph: {
      type:        "website",
      url:         canonical,
      siteName:    SITE_NAME,
      title,
      description,
      locale:      geo.locale,
      images: [
        {
          url:    `/og/${tool.slug}.png`,   // generate per-tool OG images later
          width:  1200,
          height: 630,
          alt:    `${tool.title}${geoLabel} — ${SITE_NAME}`,
        },
      ],
    },

    // ── Twitter / X ───────────────────────────
    twitter: {
      card:        "summary_large_image",
      title,
      description,
      images:      [`${SITE_URL}/og/${tool.slug}.png`],
    },

    // ── Robots ────────────────────────────────
    robots: {
      index:  true,
      follow: true,
      googleBot: {
        index:                  true,
        follow:                 true,
        "max-image-preview":    "large",
        "max-snippet":          -1,
        "max-video-preview":    -1,
      },
    },
  };
}

// ── FAQ JSON-LD structured data ───────────────
// Returns a <script> tag string for FAQ rich results.
// Drop this into the layout's <head> via next/head or
// as a dangerouslySetInnerHTML script in the layout.

export function buildFaqJsonLd(slug: string): string {
  const geo       = getGeoBySlug(slug);
  const baseSlug  = geo.key !== "global" ? slug.replace(geo.urlSuffix, "") : slug;
  const tool      = TOOLS.find((t) => t.slug === baseSlug);
  if (!tool) return "";

  const seoContent = getSeoContent(baseSlug, geo);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    mainEntity: seoContent.faqs.map((faq) => ({
      "@type":          "Question",
      name:             faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text:    faq.a,
      },
    })),
  };

  return JSON.stringify(faqSchema);
}

// ── generateStaticParams ──────────────────────
// Tells Next.js which slugs to pre-render at build time.
// This is what makes the [slug] route work for ALL pages.

export function buildStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}