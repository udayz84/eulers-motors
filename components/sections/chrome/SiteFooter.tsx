import Footer from "@/components/sections/Footer";
import { getFooterData } from "@/lib/strapi/client";

/**
 * Server wrapper for the site footer — fetches the Strapi `footer` single type
 * and hands it to the client component (hardcoded fallbacks apply offline).
 */
export default async function SiteFooter() {
  const data = await getFooterData();
  return <Footer data={data} />;
}
