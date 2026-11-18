import type { Metadata } from "next";
import SiteNavbar from "@/components/sections/chrome/SiteNavbar";
import SiteFooter from "@/components/sections/chrome/SiteFooter";
import InPressClientView from "@/components/sections/press/InPressClientView";
import { getInPressPageData } from "@/lib/strapi/client";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getInPressPageData();
  const seo = data?.seo;
  const title = seo?.metaTitle || "In the News | Euler Motors";
  const description =
    seo?.metaDescription ||
    "See the latest media coverage, company announcements and industry updates from Euler Motors.";

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

export default async function InPressPage() {
  const data = await getInPressPageData();

  return (
    <>
      <SiteNavbar />
      <InPressClientView data={data} />
      <SiteFooter />
    </>
  );
}
