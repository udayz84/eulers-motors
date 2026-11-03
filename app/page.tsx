import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import StatsBanner, { Stat } from "@/components/sections/StatsBanner";
import ProductShowcase, { VehicleData } from "@/components/sections/ProductShowcase";
import PromoCard from "@/components/sections/PromoCard";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import CompareSection from "@/components/sections/CompareSection";
import Technology from "@/components/sections/Technology";
import CustomerReviews, { ReviewItem } from "@/components/sections/CustomerReviews";
import PrimeBanner from "@/components/sections/PrimeBanner";
import Insights, { InsightsArticleItem } from "@/components/sections/Insights";
import EnterpriseDealer from "@/components/sections/EnterpriseDealer";
import ContactSection from "@/components/sections/ContactSection";
import SocialWall from "@/components/sections/SocialWall";
import Footer from "@/components/sections/Footer";
import { getHomePageData, mediaUrl } from "@/lib/strapi/client";
import { ProductItem } from "@/types/strapi";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePageData();
  const seo = data?.seo;
  return {
    title: seo?.metaTitle || "Euler Motors — Commercial Electric Vehicles for India's Future",
    description:
      seo?.metaDescription ||
      "Euler Motors manufactures high-performance commercial electric vehicles designed for tough Indian roads and maximum fleet profitability.",
    keywords: seo?.keywords || "electric vehicles, commercial ev, euler storm, euler turbo, cargo ev",
  };
}

function mapStrapiVehicles(products?: ProductItem[]): VehicleData[] | undefined {
  if (!products || products.length === 0) return undefined;

  const baseVehicles = [
    {
      id: "storm-ev-t1500",
      tabLabel: "Storm EV T1500",
      title: "Storm EV T1500",
      image: "/assets/products/vehicle-storm-t1500-clean.webp",
      crop: [-228.13, -145.73, 335.27, 237.35] as [number, number, number, number],
      specs: { range: "140+ km", capacity: "1,500 kg", chargeTime: "15 min fast charge" },
    },
    {
      id: "storm-ev-lr-200",
      tabLabel: "Storm EV LR 200",
      title: "Storm EV LongRange 200",
      image: "/assets/products/vehicle-storm-lr200-clean.webp",
      crop: [-4.46, -140.4, 325.69, 230.57] as [number, number, number, number],
      specs: { range: "200+ km", capacity: "1,500 kg", chargeTime: "15 min fast charge" },
    },
    {
      id: "turbo-ev-1000",
      tabLabel: "Turbo EV 1000",
      title: "Turbo EV 1000",
      image: "/assets/products/vehicle-turbo-1000-clean.webp",
      crop: [-2.9, -6.56, 322.07, 228] as [number, number, number, number],
      specs: { range: "180+ km", capacity: "1,000 kg", chargeTime: "15 min fast charge" },
    },
    {
      id: "hiload-ev",
      tabLabel: "HiLoad EV",
      title: "HiLoad EV",
      image: "/assets/products/vehicle-hiload-ev-clean.webp",
      crop: [-295.3, -19.56, 415.35, 294.03] as [number, number, number, number],
      specs: { range: "170 km", capacity: "688 kg", chargeTime: "15 min fast charge" },
    },
  ];

  return baseVehicles.map((base) => {
    const normBase = base.id.replace(/[^a-z0-9]/g, "");
    const match = products.find(
      (p) => p.slug && p.slug.toLowerCase().replace(/[^a-z0-9]/g, "") === normBase
    );
    if (!match) return base;

    return {
      ...base,
      tabLabel: match.tabLabel || base.tabLabel,
      title: match.title || base.title,
      image: match.image ? mediaUrl(match.image, base.image) : base.image,
      specs: {
        range: match.specsRange || base.specs.range,
        capacity: match.specsCapacity || base.specs.capacity,
        chargeTime: match.specsChargeTime || base.specs.chargeTime,
      },
    };
  });
}

export default async function Home() {
  const data = await getHomePageData();

  // 1. Hero Slides
  const heroSlides = data.hero?.slides?.map((slide) => ({
    tag: slide.tag,
    headline: slide.headline,
    subheading: slide.subheading,
    desktopImage: mediaUrl(slide.desktopImage, "/images/hero_desktop_clean.webp"),
    mobileImage: mediaUrl(slide.mobileImage, "/images/hero_mobile_clean.webp"),
    primaryCta:
      slide.primaryCta?.label && slide.primaryCta?.href
        ? { label: slide.primaryCta.label, href: slide.primaryCta.href }
        : { label: "Explore our Vehicles", href: "/products" },
    secondaryCta:
      slide.secondaryCta?.label && slide.secondaryCta?.href
        ? { label: slide.secondaryCta.label, href: slide.secondaryCta.href }
        : undefined,
  }));

  // 2. Stats Banner
  const stats: Stat[] | undefined = data.statsBanner?.stats?.map((stat) => ({
    value: stat.value,
    unit: stat.unit || undefined,
    valueMobile: stat.valueMobile || undefined,
    unitMobile: stat.unitMobile || undefined,
    label: stat.label,
  }));

  // 3. Product Showcase
  const vehicles = mapStrapiVehicles(data.productShowcase?.products);

  // 4. Customer Reviews
  const reviews: ReviewItem[] | undefined = data.reviewsSection?.reviews?.map((r) => ({
    id: r.id,
    documentId: r.documentId,
    customerName: r.customerName,
    roleOrCompany: r.roleOrCompany,
    location: r.location,
    quote: r.quote,
    rating: r.rating ?? 4.9,
    savingsMonthly: r.savingsMonthly ?? "₹41,000 saved a month",
    videoDuration: r.videoDuration ?? "02:32",
    storyImage: r.storyImage ? mediaUrl(r.storyImage as any) : "/assets/reviews/story-a.webp",
    overlayImage: r.overlayImage ? mediaUrl(r.overlayImage as any) : undefined,
    avatarImage: r.avatarImage ? mediaUrl(r.avatarImage as any) : "/assets/reviews/avatar.png",
    video: r.video ? mediaUrl(r.video as any) : undefined,
    videoUrl: r.videoUrl || undefined,
  }));

  // 5. Insights Articles
  const articles: InsightsArticleItem[] | undefined = data.insightsSection?.articles?.map((a) => ({
    id: a.id,
    documentId: a.documentId,
    title: a.title,
    slug: a.slug,
    desc: a.description,
    description: a.description,
    category: a.category,
    readingTime: a.readingTime,
    date: a.publishDate
      ? new Date(a.publishDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "14 July 2026",
    publishedDate: a.publishDate,
    img: a.coverImage ? mediaUrl(a.coverImage as any) : "/assets/insights/article-1.webp",
  }));

  // 6. Social Wall Posts
  const socialPosts = data.socialWall?.posts?.map((p: any, idx: number) => ({
    id: `post-${p.id || idx + 1}`,
    img: p.mediaImage
      ? mediaUrl(p.mediaImage)
      : `/assets/social/post-${["c", "d", "e", "a", "b"][idx % 5]}.png`,
    duration: p.duration || "02:14",
    author: {
      handle: p.authorHandle || "@eulermotors",
      isOfficial: p.isOfficial ?? true,
    },
    likes: p.likes || "4,820 likes",
    timeAgo: p.timeAgo || "1 day ago",
    linkTheme: (idx % 2 === 0 ? "frosted" : "dark") as "frosted" | "dark",
  }));

  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <Hero slides={heroSlides} />

        <StatsBanner stats={stats} />

        <ProductShowcase
          eyebrow={data.productShowcase?.eyebrow}
          title={data.productShowcase?.title}
          subtitle={data.productShowcase?.subtitle}
          vehicles={vehicles}
        />

        <PromoCard
          eyebrow={data.neoPromo?.eyebrow ?? "Presenting the future of Auto"}
          title={data.neoPromo?.title ?? "Neo by Euler"}
          body={
            data.neoPromo?.body ??
            "Smaller three wheelers for city delivery. HiRange and HiCity. Sold and serviced by the same 112 dealers."
          }
          cta={data.neoPromo?.ctaLabel ?? "Explore Neo"}
          image={mediaUrl(data.neoPromo?.image, "/assets/neo/product.webp")}
          imageAlt={data.neoPromo?.imageAlt ?? "Neo by Euler three-wheelers"}
          wash="blue"
          cardH="413"
          frame="neo"
          /* Figma 1:1443 crop: left -14.13% · top -52.08% · 114.13% × 178.14% */
          crop={[-14.13, -52.08, 114.13, 178.14]}
          /* Figma 1:4671 mobile crop: left -116.95% · top 14.1% · 243.08% × 102.25% */
          cropMobile={[-116.95, 14.1, 243.08, 102.25]}
          mobilePosition="62% 100%"
          href={data.neoPromo?.ctaHref ?? "/products"}
        />

        <SavingsCalculator
          eyebrow={data.savingsCalculator?.eyebrow}
          title={data.savingsCalculator?.title}
          defaultDailyKm={data.savingsCalculator?.defaultDailyKm}
          defaultYears={data.savingsCalculator?.defaultYears}
          chartImage={
            data.savingsCalculator?.chartImage
              ? mediaUrl(data.savingsCalculator.chartImage as any)
              : undefined
          }
          chartImageAlt={data.savingsCalculator?.chartImageAlt}
        />

        <PromoCard
          eyebrow={data.talkPromo?.eyebrow}
          title={data.talkPromo?.title ?? "Talk to an expert "}
          body={
            data.talkPromo?.body ??
            "Need assistance? Request a callback, and our team will get in touch with you in just a few minutes!"
          }
          cta={data.talkPromo?.ctaLabel ?? "Request a call back"}
          image={mediaUrl(data.talkPromo?.image, "/assets/talk/desktop-bg.webp")}
          imageAlt={data.talkPromo?.imageAlt ?? "Euler expert with a customer"}
          wash="mobile-blue"
          align="right"
          icon="phone"
          cardH="450"
          frame="talk"
          /* Figma 1:1473 crop: left -5.58% · top -11.78% · 76.19% × 126% */
          crop={[-5.58, -11.78, 76.19, 126]}
          /* Figma 1:4691 mobile layers: desktop-bg low + talk-3 on top */
          mobileLayers={[
            { src: "/assets/talk/desktop-bg.png", box: [-27.67, 114.9, 211.03, 100] },
            { src: "/assets/mobile/talk-3.png", box: [-17.49, 0.09, 165.27, 106.26] },
          ]}
          mobilePosition="78% 40%"
          href={data.talkPromo?.ctaHref ?? "#contact"}
        />

        <CompareSection
          eyebrow={data.compareSection?.eyebrow}
          title={data.compareSection?.title}
          quizTitle={data.compareSection?.quizTitle}
          quizSubtitle={data.compareSection?.quizSubtitle}
          quizCtaLabel={data.compareSection?.quizCta?.label}
          withoutEulerPoints={data.compareSection?.withoutEulerPoints}
          withEulerPoints={data.compareSection?.withEulerPoints}
        />

        <Technology
          eyebrow={data.technology?.eyebrow}
          title={data.technology?.title}
          subheading={data.technology?.subheading}
          description={data.technology?.description}
          ctaLabel={data.technology?.cta?.label}
          ctaHref={data.technology?.cta?.href}
          cards={data.technology?.cards}
        />

        <CustomerReviews
          eyebrow={data.reviewsSection?.eyebrow}
          title={data.reviewsSection?.title}
          description={data.reviewsSection?.description}
          reviews={reviews}
        />

        <PrimeBanner
          eyebrow={data.primeBanner?.eyebrow}
          title={data.primeBanner?.title}
          ctaLabel={data.primeBanner?.cta?.label}
          ctaHref={data.primeBanner?.cta?.href}
          features={data.primeBanner?.features}
        />

        <Insights
          eyebrow={data.insightsSection?.eyebrow}
          title={data.insightsSection?.title}
          buttonLabel={data.insightsSection?.viewAllCta?.label}
          buttonHref={data.insightsSection?.viewAllCta?.href}
          articles={articles}
        />

        <EnterpriseDealer
          enterpriseEyebrow={data.enterpriseDealer?.enterpriseEyebrow}
          enterpriseTitle={data.enterpriseDealer?.enterpriseTitle}
          enterpriseDesc={data.enterpriseDealer?.enterpriseDesc}
          enterpriseCtaLabel={
            data.enterpriseDealer?.enterpriseCta?.label || data.enterpriseDealer?.enterpriseCtaLabel
          }
          enterpriseCtaHref={
            data.enterpriseDealer?.enterpriseCta?.href || data.enterpriseDealer?.enterpriseCtaHref
          }
          enterpriseBullets={data.enterpriseDealer?.enterpriseBullets}
          dealerEyebrow={data.enterpriseDealer?.dealerEyebrow}
          dealerTitle={data.enterpriseDealer?.dealerTitle}
          dealerDesc={data.enterpriseDealer?.dealerDesc}
          dealerPrimaryCtaLabel={
            data.enterpriseDealer?.dealerPrimaryCta?.label || data.enterpriseDealer?.dealerPrimaryCtaLabel
          }
          dealerPrimaryCtaHref={
            data.enterpriseDealer?.dealerPrimaryCta?.href || data.enterpriseDealer?.dealerPrimaryCtaHref
          }
          dealerSecondaryCtaLabel={
            data.enterpriseDealer?.dealerSecondaryCta?.label ||
            data.enterpriseDealer?.dealerSecondaryCtaLabel
          }
          dealerSecondaryCtaHref={
            data.enterpriseDealer?.dealerSecondaryCta?.href ||
            data.enterpriseDealer?.dealerSecondaryCtaHref
          }
        />

        <ContactSection
          eyebrow={data.contactSection?.eyebrow}
          title={data.contactSection?.title}
          description={data.contactSection?.description}
          phone={data.contactSection?.phone}
          email={data.contactSection?.email}
          form={data.contactSection?.form}
        />

        <SocialWall
          eyebrow={data.socialWall?.eyebrow}
          title={data.socialWall?.title}
          description={data.socialWall?.description || data.socialWall?.subtitle}
          posts={socialPosts && socialPosts.length > 0 ? socialPosts : undefined}
        />
      </main>
      <Footer />
    </>
  );
}
