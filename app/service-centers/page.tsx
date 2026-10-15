import Navbar from "@/components/Navbar";
import DealerLocatorHero from "@/components/sections/DealerLocatorHero";
import Footer from "@/components/sections/Footer";
import DealerContactSection from "@/components/sections/DealerContactSection";

export default function ServiceCentersPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <DealerLocatorHero variant="service" />
        <DealerContactSection />
      </main>
      <Footer />
    </>
  );
}
