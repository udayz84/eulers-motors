import Navbar from "@/components/Navbar";
import { getNavbarData } from "@/lib/strapi/client";

/**
 * Server wrapper for the site navbar — fetches the Strapi `navbar` single type
 * and hands it to the client component (hardcoded fallbacks apply offline).
 */
export default async function SiteNavbar() {
  const data = await getNavbarData();
  return <Navbar data={data} />;
}
