import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FaqHero from "@/components/sections/faq/FaqHero";
import FaqContent from "@/components/sections/faq/FaqContent";
import FaqQuickHelp from "@/components/sections/faq/FaqQuickHelp";
import FaqContact from "@/components/sections/faq/FaqContact";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Euler Motors",
  description:
    "Find answers to the most common questions about Euler Motors electric vehicles, charging, service, warranty, and privacy policies.",
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <FaqHero />
        <FaqContent />
        <FaqQuickHelp />
        <FaqContact />
      </main>
      <Footer />
    </>
  );
}
