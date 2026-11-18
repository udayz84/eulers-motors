import type { Metadata } from "next";
import SiteNavbar from "@/components/sections/chrome/SiteNavbar";
import SiteFooter from "@/components/sections/chrome/SiteFooter";
import InsightsClientView from "@/components/sections/insights/InsightsClientView";
import { getInsightsPageData } from "@/lib/strapi/client";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getInsightsPageData();
  const seo = data?.seo;
  const title = seo?.metaTitle || "Insights | Euler Motors";
  const description =
    seo?.metaDescription ||
    "Practical thinking about electric commercial mobility, from technology and operations to the business of running a fleet.";

  return {
    title,
    description,
    keywords: seo?.keywords || "",
    ...(seo?.preventIndexing
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
  };
}

export default async function InsightsPage() {
  const data = await getInsightsPageData();

  return (
    <>
      <SiteNavbar />
      <InsightsClientView data={data} />
      <SiteFooter />
    </>
  );
}
