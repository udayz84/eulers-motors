import Navbar from "@/components/Navbar";
import FloatingWidget from "@/components/FloatingWidget";
import Hero from "@/components/sections/Hero";
import StatsBanner from "@/components/sections/StatsBanner";
import ProductShowcase from "@/components/sections/ProductShowcase";
import PromoCard from "@/components/sections/PromoCard";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import CompareSection from "@/components/sections/CompareSection";
import Technology from "@/components/sections/Technology";
import CustomerReviews from "@/components/sections/CustomerReviews";
import PrimeBanner from "@/components/sections/PrimeBanner";
import Insights from "@/components/sections/Insights";
import EnterpriseDealer from "@/components/sections/EnterpriseDealer";
import ContactSection from "@/components/sections/ContactSection";
import SocialWall from "@/components/sections/SocialWall";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <Hero />
        <StatsBanner />
        <ProductShowcase />
        <PromoCard
          eyebrow="Presenting the future of Auto"
          title="Neo by Euler"
          body="Smaller three wheelers for city delivery. HiRange and HiCity. Sold and serviced by the same 112 dealers."
          cta="Explore Neo"
          image="/assets/neo/product.png"
          imageAlt="Neo by Euler three-wheelers"
          wash="blue"
          pad="80"
          /* Figma 1:1443 crop: left -14.13% · top -52.08% · 114.13% × 178.14% */
          crop={[-14.13, -52.08, 114.13, 178.14]}
          mobilePosition="62% 100%"
        />
        <SavingsCalculator />
        <PromoCard
          title="Talk to an expert "
          body="Need assistance? Request a callback, and our team will get in touch with you in just a few minutes!"
          cta="Request a call back"
          image="/assets/talk/desktop-bg.png"
          imageAlt="Euler expert with a customer"
          wash="mobile-blue"
          align="right"
          icon="phone"
          pad="60"
          /* Figma 1:1473 crop: left -5.58% · top -11.78% · 76.19% × 126% */
          crop={[-5.58, -11.78, 76.19, 126]}
          mobilePosition="78% 40%"
        />
        <CompareSection />
        <Technology />
        <CustomerReviews />
        <PrimeBanner />
        <Insights />
        <EnterpriseDealer />
        <ContactSection />
        <SocialWall />
      </main>
      <Footer />
      <FloatingWidget />
    </>
  );
}
