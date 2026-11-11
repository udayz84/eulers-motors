import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import CareersClientView from "@/components/sections/careers/CareersClientView";
import { getCareersPageData, getCareerPositions } from "@/lib/strapi/client";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCareersPageData();
  const seo = data?.seo;
  return {
    title: seo?.metaTitle || "Euler Motors Careers",
    description: seo?.metaDescription || "",
    keywords: seo?.keywords || "",
  };
}

export default async function CareersPage() {
  const [data, positions] = await Promise.all([
    getCareersPageData(),
    getCareerPositions(),
  ]);

  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <CareersClientView data={data} positions={positions} />
      </main>
      <Footer />
    </>
  );
}
