import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllBlogSlugs } from "@/lib/blog";

const SITE_URL  = "https://www.moneytoolslab.com";
const SITE_NAME = "MoneyToolsLab";

type Props = {
  params:   Promise<{ slug: string }>;
  children: React.ReactNode;
};

// ── Pre-render all blog post slugs ────────────
export async function generateStaticParams() {
  return getAllBlogSlugs();
}

// ── Metadata ──────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post     = getPostBySlug(slug);

  if (!post) return { title: `Article not found | ${SITE_NAME}` };

  const canonical = `${SITE_URL}/blog/${slug}`;

  return {
    title:           `${post.title} | ${SITE_NAME}`,
    description:     post.excerpt,
    keywords:        post.keywords,
    authors:         [{ name: post.author, url: SITE_URL }],
    creator:         SITE_NAME,
    publisher:       SITE_NAME,
    generator:       "Next.js",
    applicationName: SITE_NAME,
    referrer:        "origin-when-cross-origin",
    formatDetection: { email: false, address: false, telephone: false },
    metadataBase:    new URL(SITE_URL),
    alternates:      { canonical },
    openGraph: {
      type:      "article",
      url:       canonical,
      siteName:  SITE_NAME,
      title:     post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      modifiedTime:  post.updatedAt ?? post.publishedAt,
      authors:   [post.author],
      images: [{
        url:    `/og/blog-${slug}.png`,
        width:  1200,
        height: 630,
        alt:    post.title,
      }],
    },
    twitter: {
      card:        "summary_large_image",
      title:       post.title,
      description: post.excerpt,
    },
    robots: {
      index:  true,
      follow: true,
      googleBot: {
        index:               true,
        follow:              true,
        "max-image-preview": "large",
        "max-snippet":       -1,
      },
    },
  };
}

// ── Layout ────────────────────────────────────
export default async function BlogPostLayout({ children, params }: Props) {
  const { slug } = await params;
  const post     = getPostBySlug(slug);

  if (!post) notFound();

  // Article + FAQ JSON-LD structured data
  const articleJsonLd = {
    "@context":         "https://schema.org",
    "@type":            "Article",
    headline:           post.title,
    description:        post.excerpt,
    author:             { "@type": "Organization", name: post.author },
    publisher:          { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    datePublished:      post.publishedAt,
    dateModified:       post.updatedAt ?? post.publishedAt,
    url:                `${SITE_URL}/blog/${slug}`,
    mainEntityOfPage:   { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {children}
    </>
  );
}