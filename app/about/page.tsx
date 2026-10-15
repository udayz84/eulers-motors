import Navbar from "@/components/Navbar";
import AboutHero from "@/components/sections/AboutHero";
import AboutEuler from "@/components/sections/AboutEuler";
import AboutBelief from "@/components/sections/AboutBelief";
import Timeline from "@/components/sections/Timeline";
import Factory from "@/components/sections/Factory";
import Leadership from "@/components/sections/Leadership";
import PartnersInvestors from "@/components/sections/PartnersInvestors";
import Recognition from "@/components/sections/Recognition";
import AboutEsG from "@/components/sections/AboutEsG";
import AboutReports from "@/components/sections/AboutReports";
import Hiring from "@/components/sections/Hiring";
import AboutInvestors from "@/components/sections/AboutInvestors";
import ChargingStationFaq from "@/components/sections/ChargingStationFaq";
import Footer from "@/components/sections/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <AboutHero />
        <AboutEuler />
        <AboutBelief />
        <Timeline />
        <Factory />
        <Leadership />
        <PartnersInvestors />
        <Recognition />
        <AboutEsG />
        <AboutReports />
        <Hiring />
        <AboutInvestors />
        <ChargingStationFaq />
      </main>
      <Footer />
    </>
  );
}
