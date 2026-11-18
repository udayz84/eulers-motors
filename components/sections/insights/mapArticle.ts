import type { StrapiInsightsArticle } from "@/types/strapi";
import { mediaUrl } from "@/lib/strapi/client";

const FALLBACK_IMAGE = "/assets/insights/article-featured-1.png";
const FALLBACK_AUTHOR_IMAGE = "/assets/insights/figma-mobile-author.png";

export type MappedInsightArticle = {
  id: number | string;
  img: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  slug: string;
  author: string;
  authorImage: string;
};

export function mapInsightArticle(
  article: StrapiInsightsArticle,
  index = 0
): MappedInsightArticle {
  return {
    id: article.id ?? index,
    img: article.image ? mediaUrl(article.image, FALLBACK_IMAGE) : FALLBACK_IMAGE,
    category: article.category || "",
    title: article.title,
    date: article.date || "",
    readTime: article.readTime || "",
    excerpt: article.excerpt || "",
    slug: article.slug,
    author: article.author || "",
    authorImage: article.authorImage
      ? mediaUrl(article.authorImage, FALLBACK_AUTHOR_IMAGE)
      : FALLBACK_AUTHOR_IMAGE,
  };
}

export function collectInsightArticles({
  featured,
  listing,
}: {
  featured?: StrapiInsightsArticle[];
  listing?: StrapiInsightsArticle[];
}): MappedInsightArticle[] {
  const seen = new Set<string>();
  const collected: MappedInsightArticle[] = [];

  for (const [index, article] of [...(featured || []), ...(listing || [])].entries()) {
    if (!article?.slug || seen.has(article.slug)) continue;
    seen.add(article.slug);
    collected.push(mapInsightArticle(article, index));
  }

  return collected;
}
