import Navbar from "@/components/Navbar";
import DealerLocatorHero from "@/components/sections/DealerLocatorHero";
import PartnersInvestors from "@/components/sections/PartnersInvestors";
import ChargingStationFaq from "@/components/sections/ChargingStationFaq";
import ChargingStationNextStep from "@/components/sections/ChargingStationNextStep";
import Footer from "@/components/sections/Footer";

export default function ChargingStationsPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <DealerLocatorHero variant="charging" />
        <PartnersInvestors />
        <ChargingStationFaq />
        <ChargingStationNextStep />
      </main>
      <Footer />
    </>
  );
}
