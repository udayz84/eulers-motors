import { Metadata } from "next";
import SiteNavbar from "@/components/sections/chrome/SiteNavbar";
import SiteFooter from "@/components/sections/chrome/SiteFooter";
import CareersClientView from "@/components/sections/careers/CareersClientView";
import { getCareersPageData, getCareerPositions, mediaUrl } from "@/lib/strapi/client";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCareersPageData();
  const seo = data?.seo;
  const title = seo?.metaTitle || "Euler Motors Careers";
  const description = seo?.metaDescription || "";
  const shareImageUrl = seo?.shareImage ? mediaUrl(seo.shareImage) : "";

  return {
    title,
    description,
    keywords: seo?.keywords || "",
    openGraph: {
      title,
      description,
      ...(shareImageUrl
        ? {
            images: [
              {
                url: shareImageUrl,
                ...(seo?.shareImage?.alternativeText ? { alt: seo.shareImage.alternativeText } : {}),
                ...(seo?.shareImage?.width ? { width: seo.shareImage.width } : {}),
                ...(seo?.shareImage?.height ? { height: seo.shareImage.height } : {}),
              },
            ],
          }
        : {}),
    },
    ...(shareImageUrl
      ? {
          twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [shareImageUrl],
          },
        }
      : {}),
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

export default async function CareersPage() {
  const [data, positions] = await Promise.all([
    getCareersPageData(),
    getCareerPositions(),
  ]);

  return (
    <>
      <SiteNavbar />
      <main className="overflow-clip">
        <CareersClientView data={data} positions={positions} />
      </main>
      <SiteFooter />
    </>
  );
}
