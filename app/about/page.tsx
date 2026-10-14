import Navbar from "@/components/Navbar";
import AboutHero from "@/components/sections/AboutHero";
import AboutEuler from "@/components/sections/AboutEuler";
import AboutBelief from "@/components/sections/AboutBelief";
import Timeline from "@/components/sections/Timeline";
import AboutAwards from "@/components/sections/AboutAwards";
import Leadership from "@/components/sections/Leadership";
import Factory from "@/components/sections/Factory";
import AboutEsG from "@/components/sections/AboutEsG";
import AboutReports from "@/components/sections/AboutReports";
import AboutInvestors from "@/components/sections/AboutInvestors";
import FAQ from "@/components/sections/FAQ";
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
        <AboutAwards />
        <Leadership />
        <Factory />
        <AboutEsG />
        <AboutReports />
        <AboutInvestors />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
