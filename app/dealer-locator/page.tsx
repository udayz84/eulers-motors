import Navbar from "@/components/Navbar";
import DealerLocatorHero from "@/components/sections/DealerLocatorHero";
import Footer from "@/components/sections/Footer";
import DealerContactSection from "@/components/sections/DealerContactSection";

export default function DealerLocatorPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <DealerLocatorHero />
        <DealerContactSection />
      </main>
      <Footer />
    </>
  );
}
