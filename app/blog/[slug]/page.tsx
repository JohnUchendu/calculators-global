"use client";

import { useParams } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import BlogLayout from "@/components/blog/BlogLayout";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CalculatorCTA from "@/components/blog/CalculatorCTA";
import AffiliateBox from "@/components/blog/AffiliateBox";

import Post_RisingRates from "@/content/blog/how-rising-interest-rates-affect-mortgages-2026.mdx";
import Post_CompoundVsSimple from "@/content/blog/compound-interest-vs-simple-interest.mdx";
import Post_5030Rule from "@/content/blog/how-much-should-you-save-each-month-50-30-20-rule.mdx";
import Post_PersonalVsMortgage from "@/content/blog/personal-loan-vs-mortgage-which-to-choose.mdx";
import Post_CarVsPersonal from "@/content/blog/car-loan-vs-personal-loan-buying-a-car.mdx";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const POST_COMPONENTS: Record<string, React.ComponentType<any>> = {
  "how-rising-interest-rates-affect-mortgages-2026":     Post_RisingRates,
  "compound-interest-vs-simple-interest":                Post_CompoundVsSimple,
  "how-much-should-you-save-each-month-50-30-20-rule":   Post_5030Rule,
  "personal-loan-vs-mortgage-which-to-choose":           Post_PersonalVsMortgage,
  "car-loan-vs-personal-loan-buying-a-car":              Post_CarVsPersonal,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mdxComponents: Record<string, React.ComponentType<any>> = {
  CalculatorCTA,
  AffiliateBox,
};

export default function BlogPostPage() {
  const params = useParams();
  const slug   = typeof params.slug === "string" ? params.slug : "";
  const post   = getPostBySlug(slug);
  const PostContent = POST_COMPONENTS[slug];

  if (!post || !PostContent) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h1>
            <p className="text-gray-500">This article does not exist.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <BlogLayout post={post}>
        <PostContent components={mdxComponents} />
      </BlogLayout>
      <Footer />
    </>
  );
}