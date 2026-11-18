import type { Metadata } from "next";
import InsightsArticleView from "@/components/sections/insights/InsightsArticleView";
import {
  collectInsightArticles,
  type MappedInsightArticle,
} from "@/components/sections/insights/mapArticle";
import { getInsightsPageData } from "@/lib/strapi/client";
import SiteNavbar from "@/components/sections/chrome/SiteNavbar";
import SiteFooter from "@/components/sections/chrome/SiteFooter";

export const revalidate = 60;

async function resolveArticle(slug: string): Promise<{
  article: MappedInsightArticle;
  related: MappedInsightArticle[];
}> {
  const data = await getInsightsPageData();
  const articles = collectInsightArticles({
    featured: data?.featuredSection?.articles,
    listing: data?.listingSection?.articles,
  });

  const article = articles.find((a) => a.slug === slug) ?? articles[0];
  const related = articles.filter((a) => a.slug !== (article?.slug ?? slug));

  return { article, related };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { article } = await resolveArticle(slug);

  return {
    title: article ? `${article.title} | Euler Motors` : "Insights | Euler Motors",
    description:
      article?.excerpt ||
      "Practical thinking about electric commercial mobility, from technology and operations to the business of running a fleet.",
  };
}

export async function generateStaticParams() {
  const data = await getInsightsPageData();
  const articles = collectInsightArticles({
    featured: data?.featuredSection?.articles,
    listing: data?.listingSection?.articles,
  });

  return articles.map((article) => ({ slug: article.slug }));
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { article, related } = await resolveArticle(slug);

  return (
    <>
      <SiteNavbar />
      <InsightsArticleView article={article} related={related} />
      <SiteFooter />
    </>
  );
}
