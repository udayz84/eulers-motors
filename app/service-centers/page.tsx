import Navbar from "@/components/Navbar";
import DealerLocatorHero from "@/components/sections/DealerLocatorHero";
import ServiceNextStep from "@/components/sections/ServiceNextStep";
import ServicePreventiveAdvice from "@/components/sections/ServicePreventiveAdvice";
import ServiceInstantChat from "@/components/sections/ServiceInstantChat";
import ServiceGuidelines from "@/components/sections/ServiceGuidelines";
import Footer from "@/components/sections/Footer";
import ChargingStationFaq from "@/components/sections/ChargingStationFaq";
import PrimeBanner from "@/components/sections/PrimeBanner";

export default function ServiceCentersPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <DealerLocatorHero variant="service" />
        <ServiceNextStep />
        <ServicePreventiveAdvice />
        <PrimeBanner isServicePage={true} />

        <ServiceInstantChat />
        <ChargingStationFaq />
        <ServiceGuidelines />

      </main>
      <Footer />
    </>
  );
}
