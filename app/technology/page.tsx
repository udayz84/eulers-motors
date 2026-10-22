import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import CustomerReviews from "@/components/sections/CustomerReviews";
import ContactSection from "@/components/sections/ContactSection";
import TechFaq from "@/components/sections/technology/TechFaq";
import TechHero from "@/components/sections/technology/TechHero";
import TechLoad from "@/components/sections/technology/TechLoad";
import TechIndianRoads from "@/components/sections/technology/TechIndianRoads";
import TechManufacturing from "@/components/sections/technology/TechManufacturing";
import TechKnowVehicle from "@/components/sections/technology/TechKnowVehicle";
import TechCharging from "@/components/sections/technology/TechCharging";
import TechShepherd from "@/components/sections/technology/TechShepherd";
import TechProof from "@/components/sections/technology/TechProof";

/**
 * TECHNOLOGY page (Figma 2968:6642, 393×9109.33) — mobile-first build.
 * Sections: hero + philosophy · load · built for Indian roads · manufacturing ·
 * know your vehicle · charging · FAQ · Shepherd app · proof · reviews · contact.
 */
export default function TechnologyPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <TechHero />
        <TechLoad />
        <TechIndianRoads />
        <TechManufacturing />
        <TechKnowVehicle />
        <TechCharging />
        <TechFaq />
        <TechShepherd />
        <TechProof />
        <CustomerReviews autoScrollOnMobile={false} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
