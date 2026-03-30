import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import BlogLayout from "@/components/blog/BlogLayout";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// MDX component imports — available inside every .mdx file
import CalculatorCTA from "@/components/blog/CalculatorCTA";
import AffiliateBox  from "@/components/blog/AffiliateBox";

// MDX components map — makes these available without importing in MDX
const components = { CalculatorCTA, AffiliateBox };

type Props = { params: Promise<{ slug: string }> };

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post     = getPostBySlug(slug);

  if (!post) notFound();

  // Dynamically import the MDX file for this slug
  let PostContent: React.ComponentType<{ components?: Record<string, unknown> }>;

  try {
    const mod = await import(`@/content/blog/${slug}.mdx`);
    PostContent = mod.default;
  } catch {
    notFound();
  }

  return (
    <>
      <Header />
      <BlogLayout post={post}>
        <PostContent components={components} />
      </BlogLayout>
      <Footer />
    </>
  );
}




// import { notFound } from "next/navigation";
// import { getPostBySlug, getAllBlogSlugs } from "@/lib/blog";
// import BlogLayout from "@/components/blog/BlogLayout";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import CalculatorCTA from "@/components/blog/CalculatorCTA";
// import AffiliateBox from "@/components/blog/AffiliateBox";

// // ── Static MDX import map ─────────────────────
// // Next.js requires static import paths — no dynamic
// // template literals. Add a new entry here every time
// // you create a new .mdx file in /content/blog/.

// import Post_RisingRates from "@/content/blog/how-rising-interest-rates-affect-mortgages-2026.mdx";
// import Post_CompoundVsSimple from "@/content/blog/compound-interest-vs-simple-interest.mdx";
// import Post_5030Rule from "@/content/blog/how-much-should-you-save-each-month-50-30-20-rule.mdx";
// import Post_PersonalVsMortgage from "@/content/blog/personal-loan-vs-mortgage-which-to-choose.mdx";
// import Post_CarVsPersonal from "@/content/blog/car-loan-vs-personal-loan-buying-a-car.mdx";

// // Maps slug → MDX component
// // Add new entries here as you write more posts.
// const POST_COMPONENTS: Record<string, React.ComponentType<{ components?: Record<string, React.ComponentType> }>> = {
//   "how-rising-interest-rates-affect-mortgages-2026": Post_RisingRates,
//   "compound-interest-vs-simple-interest":            Post_CompoundVsSimple,
//   "how-much-should-you-save-each-month-50-30-20-rule": Post_5030Rule,
//   "personal-loan-vs-mortgage-which-to-choose":       Post_PersonalVsMortgage,
//   "car-loan-vs-personal-loan-buying-a-car":          Post_CarVsPersonal,
// };

// // MDX components available in every post without importing
// const mdxComponents = { CalculatorCTA, AffiliateBox };

// // ── Static params ─────────────────────────────
// export function generateStaticParams() {
//   return getAllBlogSlugs();
// }

// // ── Page ──────────────────────────────────────
// type Props = { params: Promise<{ slug: string }> };

// export default async function BlogPostPage({ params }: Props) {
//   const { slug } = await params;
//   const post     = getPostBySlug(slug);

//   if (!post) notFound();

//   const PostContent = POST_COMPONENTS[slug];

//   if (!PostContent) notFound();

//   return (
//     <>
//       <Header />
//       <BlogLayout post={post!}>
//         <PostContent components={mdxComponents} />
//       </BlogLayout>
//       <Footer />
//     </>
//   );
// }