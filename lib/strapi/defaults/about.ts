import type {
  StrapiAboutPageData,
  StrapiAward,
  StrapiEsgReport,
  StrapiLeadershipMember,
  StrapiTimelineMilestone,
} from "@/types/strapi";

export const DEFAULT_TIMELINE_MILESTONES: StrapiTimelineMilestone[] = [
  {
    year: 2018,
    title: "One thousand vehicles at work.",
    description: "Enough data from enough routes to design the\nnext one with confidence.",
    badges: ["CCS2", "60 kW", "4 of 6 free"],
    desktopImage: "/assets/timeline/timeline-1.png",
    mobileImage: "/assets/timeline/mobile-timeline-1.png",
    isActive: true,
    order: 1,
  },
  {
    year: 2020,
    title: "One thousand vehicles at work.",
    description: "Enough data from enough routes to design the\nnext one with confidence.",
    badges: ["CCS2", "60 kW", "4 of 6 free"],
    desktopImage: "/assets/timeline/timeline-3.png",
    mobileImage: "/assets/timeline/mobile-timeline-1.png",
    isActive: true,
    order: 2,
  },
  {
    year: 2022,
    title: "One thousand vehicles at work.",
    description: "Enough data from enough routes to design the\nnext one with confidence.",
    badges: ["CCS2", "60 kW", "4 of 6 free"],
    desktopImage: "/assets/timeline/timeline-1.png",
    mobileImage: "/assets/timeline/mobile-timeline-1.png",
    isActive: true,
    order: 3,
  },
  {
    year: 2024,
    title: "One thousand vehicles at work.",
    description: "Enough data from enough routes to design the\nnext one with confidence.",
    badges: ["CCS2", "60 kW", "4 of 6 free"],
    desktopImage: "/assets/timeline/timeline-3.png",
    mobileImage: "/assets/timeline/mobile-timeline-1.png",
    isActive: true,
    order: 4,
  },
  {
    year: 2025,
    title: "One thousand vehicles at work.",
    description: "Enough data from enough routes to design the\nnext one with confidence.",
    badges: ["CCS2", "60 kW", "4 of 6 free"],
    desktopImage: "/assets/timeline/timeline-1.png",
    mobileImage: "/assets/timeline/mobile-timeline-1.png",
    isActive: true,
    order: 5,
  },
  {
    year: 2026,
    title: "One thousand vehicles at work.",
    description: "Enough data from enough routes to design the\nnext one with confidence.",
    badges: ["CCS2", "60 kW", "4 of 6 free"],
    desktopImage: "/assets/timeline/timeline-3.png",
    mobileImage: "/assets/timeline/mobile-timeline-1.png",
    isActive: true,
    order: 6,
  },
];

export const DEFAULT_LEADERSHIP_MEMBERS: StrapiLeadershipMember[] = [
  {
    name: "Tarun",
    slug: "tarun",
    desktopPhoto: "/assets/about-euler/leader-desktop-1.png",
    mobilePhoto: "/assets/about-euler/leader-1-new.png",
    isActive: true,
    order: 1,
  },
  {
    name: "Ravneet",
    slug: "ravneet",
    desktopPhoto: "/assets/about-euler/leader-desktop-2.png",
    mobilePhoto: "/assets/about-euler/leader-3-new.png",
    isActive: true,
    order: 2,
  },
  {
    name: "Swapnil",
    slug: "swapnil",
    desktopPhoto: "/assets/about-euler/leader-desktop-3.png",
    mobilePhoto: "/assets/about-euler/leader-2-new.png",
    isActive: true,
    order: 3,
  },
  {
    name: "Sohil",
    slug: "sohil",
    desktopPhoto: "/assets/about-euler/leader-desktop-4.png",
    mobilePhoto: "/assets/about-euler/leader-4-new.png",
    isActive: true,
    order: 4,
  },
  {
    name: "Milind",
    slug: "milind",
    desktopPhoto: "/assets/about-euler/leader-desktop-5.png",
    mobilePhoto: "/assets/about-euler/leader-3-new.png",
    isActive: true,
    order: 5,
  },
  {
    name: "Sanjeev K.",
    slug: "sanjeev-k",
    desktopPhoto: "/assets/about-euler/leader-desktop-6.png",
    mobilePhoto: "/assets/about-euler/leader-1-new.png",
    isActive: true,
    order: 6,
  },
  {
    name: "Harendra",
    slug: "harendra",
    desktopPhoto: "/assets/about-euler/leader-desktop-7.png",
    mobilePhoto: "/assets/about-euler/leader-5-new.png",
    isActive: true,
    order: 7,
  },
];

export const DEFAULT_AWARDS: StrapiAward[] = [
  {
    year: "2024",
    title: "Commercial EV of the year",
    description: "For moving from one product to a network of dealers and service centres.",
    image: "/assets/awards/desktop-bg-2.png",
    isActive: true,
    order: 1,
  },
  {
    year: "2024",
    title: "Design award, commercial vehicles",
    description: "For moving from one product to a network of dealers and service centres.",
    image: "/assets/awards/desktop-bg-2.png",
    isActive: true,
    order: 2,
  },
  {
    year: "2023",
    title: "Startup of the year, mobility",
    description: "For moving from one product to a network of dealers and service centres.",
    image: "/assets/awards/desktop-bg-2.png",
    isActive: true,
    order: 3,
  },
  {
    year: "2022",
    title: "Innovation in battery engineering",
    description: "For moving from one product to a network of dealers and service centres.",
    image: "/assets/awards/desktop-bg-2.png",
    isActive: true,
    order: 4,
  },
  {
    year: "2021",
    title: "Best last mile vehicle",
    description: "For moving from one product to a network of dealers and service centres.",
    image: "/assets/awards/desktop-bg-2.png",
    isActive: true,
    order: 5,
  },
];

export const DEFAULT_ESG_REPORTS: StrapiEsgReport[] = [
  {
    title: "Annual report.pdf",
    fileSize: "2.4",
    externalUrl: "/products",
    iconVariant: "default",
    isActive: true,
    order: 1,
  },
  {
    title: "Sustainability profile.pdf",
    fileSize: "2.4",
    externalUrl: "/products",
    iconVariant: "default",
    isActive: true,
    order: 2,
  },
  {
    title: "ESG Report.pdf",
    fileSize: "5.4",
    externalUrl: "/products",
    iconVariant: "highlight",
    isActive: true,
    order: 3,
  },
  {
    title: "CSR Report.pdf",
    fileSize: "8.4",
    externalUrl: "/products",
    iconVariant: "default",
    isActive: true,
    order: 4,
  },
];

export const DEFAULT_ABOUT_PAGE: StrapiAboutPageData = {
  hero: {
    eyebrow: "About Euler Motors",
    title: "Driving India's Electric Future",
    description:
      "Euler Motors is an Indian electric vehicle company focused on building reliable commercial vehicles for businesses that move India every day.",
    desktopImage: "/assets/about-euler/desktop-bg-new.png",
    mobileImage: "/assets/about-euler/mobile-bg-new.png",
    mobileOverlayImage: "/assets/about-euler/mobile-overlay-new.png",
  },
  eulerSection: {
    eyebrow: "About Euler",
    cards: [
      {
        badge: "Purpose",
        title: "Built for Businesses",
        description:
          "We build electric commercial vehicles that help businesses move more and spend less.",
        stat: "Founded in New Delhi, 2018",
        mobileImage: "/assets/about-euler/card-1-mobile.png",
        desktopImage: "/assets/about-euler/card-1-desktop.png",
      },
      {
        badge: "Customer First",
        title: "Every Decision Starts Here",
        description: "We build around real customer needs, not assumptions.",
        stat: "1000+ Daily Business Trips",
        mobileImage: "/assets/about-euler/card-2-mobile.png",
        desktopImage: "/assets/about-euler/card-2-desktop.png",
      },
      {
        badge: "Ownership",
        title: "We Own the Outcome",
        description: "We take responsibility for every vehicle on the road, end to end.",
        stat: "24/7 Roadside Support",
        mobileImage: "/assets/about-euler/card-3-mobile.png",
        desktopImage: "/assets/about-euler/card-3-desktop.png",
      },
    ],
  },
  beliefSection: {
    eyebrow: "Customers",
    mobileEyebrow: "Our Belief",
    title: "Building More Than Electric Vehicles",
    description:
      "At Euler Motors, we believe a commercial vehicle should do more than move goods. It should help businesses grow, reduce running costs and make every working day more productive. That's why every vehicle, every technology and every decision starts with the people who use it every day.",
    cards: [
      {
        title: "Built around real business needs",
        image: "/assets/about-euler/belief-card-1.png",
      },
      {
        title: "Designed for Indian roads",
        image: "/assets/about-euler/belief-card-2.png",
      },
      {
        title: "Customer feedback drives innovation",
        image: "/assets/about-euler/belief-card-3.png",
      },
      {
        title: "Reliable performance",
        image: "/assets/about-euler/belief-card-4.png",
      },
    ],
  },
  timelineSection: {
    eyebrow: "Timeline",
    title: "Milestones That Shaped Euler",
    description:
      "Euler Motors is an Indian electric vehicle company focused on building reliable commercial vehicles for businesses that move India every day.",
  },
  factorySection: {
    eyebrow: "How we build",
    title: "Inside Our Factory",
    description: "See how every Euler vehicle is built and tested.",
    cta: {
      label: "Learn about our technology",
      href: "/technology",
      variant: "primary",
    },
    desktopImage: "/assets/factory/desktop-bg.png",
    mobileImage: "/assets/factory/mobile-bg.png",
  },
  leadershipSection: {
    eyebrow: "OUR LEADERSHIP",
    title: "The People Building What's Next",
  },
  partnersSection: {
    eyebrow: "Partners and investors",
    title: "Trusted by investors.",
    partners: [
      { name: "QRG", logoUrl: "/assets/partners-investors/qrg.webp", width: 80, desktopWidth: 224 },
      { name: "Moglix", logoUrl: "/assets/partners-investors/moglix.webp", width: 64, desktopWidth: 180 },
      { name: "JETTY Ventures", logoUrl: "/assets/partners-investors/jetty.webp", width: 59, desktopWidth: 164 },
      { name: "BLUME", logoUrl: "/assets/partners-investors/blume.webp", width: 59, desktopWidth: 164 },
      { name: "GIC", logoUrl: "/assets/partners-investors/gic.webp", width: 59, desktopWidth: 164 },
    ],
  },
  recognitionSection: {
    eyebrow: "Recognition",
    title: "Awards and recognition.",
    image: "/assets/awards/desktop-bg.png",
  },
  esgSection: {
    eyebrow: "Esg in Action",
    title: "Building a Better Tomorrow",
    description:
      "See how we're creating a positive impact through sustainability, people and responsible business practices.",
    tabs: [
      {
        tabTitle: "Environment",
        headline: "Every kilometre driven electric is diesel never burned.",
        summary:
          "Our vehicles replace diesel on routes that run six days a week. The saving turns up in the fuel bill long before it turns up in a report.",
        image: "/assets/about-euler/esg-photo.png",
        stats: [
          { value: "480M", unit: "km", label: "driven electric" },
          { value: "1,000+", unit: "", label: "EVs on road" },
          { value: "40", unit: "cities", label: "with charging" },
        ],
        cards: [
          {
            number: "01",
            title: "Emissions cut at the source",
            description:
              "Every Euler on a route takes a diesel vehicle off it. Four hundred and eighty million kilometres so far, none of them burning fuel.",
          },
          {
            number: "02",
            title: "A second life for every pack",
            description:
              "Packs come back to us at the end of their vehicle life. Cells that still hold charge go to stationary storage, the rest go to a licensed recycler.",
          },
          {
            number: "03",
            title: "A plant that uses less to build more",
            description:
              "Rooftop solar, LED retrofits and a rebuilt compressed-air system cut the energy used for every vehicle we assemble.",
          },
        ],
      },
      {
        tabTitle: "People",
        headline: "Safer workdays on the factory floor and out on the road.",
        summary:
          "We design commercial EVs for driver ergonomics, lower cabin heat and vibration, and invest in continuous training across every plant and service depot.",
        image: "/assets/about-euler/esg-photo.png",
        stats: [
          { value: "480M", unit: "km", label: "driven electric" },
          { value: "1,000+", unit: "", label: "EVs on road" },
          { value: "40", unit: "cities", label: "with charging" },
        ],
        cards: [
          {
            number: "01",
            title: "Built for all-day driver comfort",
            description:
              "Zero engine vibration, reduced cabin noise and intuitive controls help commercial drivers finish long shifts with less fatigue.",
          },
          {
            number: "02",
            title: "Skilling EV technicians across India",
            description:
              "Hands-on high-voltage safety and diagnostics certification programs prepare service teams across every region.",
          },
          {
            number: "03",
            title: "Safe, inclusive manufacturing hubs",
            description:
              "Ergonomic assembly stations, air quality monitoring and workplace health support keep our teams protected.",
          },
        ],
      },
      {
        tabTitle: "Governance",
        headline: "Accountability across engineering, sourcing and compliance.",
        summary:
          "From AIS-156 certified battery packs to transparent supplier audits, every Euler vehicle is backed by measurable quality and safety standards.",
        image: "/assets/about-euler/esg-photo.png",
        stats: [
          { value: "480M", unit: "km", label: "driven electric" },
          { value: "1,000+", unit: "", label: "EVs on road" },
          { value: "40", unit: "cities", label: "with charging" },
        ],
        cards: [
          {
            number: "01",
            title: "Certified battery safety",
            description:
              "Multi-layer thermal management and cell-level telemetry exceed mandatory safety norms on every production pack.",
          },
          {
            number: "02",
            title: "Responsible supply chain",
            description:
              "Vendor compliance reviews track material traceability, ethical labour standards and local component sourcing.",
          },
          {
            number: "03",
            title: "Transparent fleet reporting",
            description:
              "Annual ESG disclosures and telematics-backed sustainability metrics keep customers and investors informed.",
          },
        ],
      },
    ],
  },
  reportsSection: {
    eyebrow: "Reports and disclosures",
    title: "ESG Reports & Policies",
    image: "/assets/about-euler/reports-photo.png",
    viewAllCta: {
      label: "View All",
      href: "/products",
      variant: "secondary",
    },
  },
  hiringSection: {
    eyebrow: "Join the journey",
    title: "We are hiring, and we are selling.",
    description:
      "Either way, the same question applies. Does the work help somebody earn more than they did yesterday?",
    cta: {
      label: "View Job openings",
      href: "/careers",
      variant: "primary",
    },
    desktopImage: "/assets/hiring/desktop-bg-new.png",
    mobileImage: "/assets/hiring/mobile-bg-new.png",
  },
  seo: {
    metaTitle: "About Euler Motors — Driving India's Electric Future",
    metaDescription:
      "Learn about Euler Motors, our leadership team, manufacturing excellence, ESG commitments, milestones, and commercial electric vehicle journey across India.",
    keywords:
      "about euler motors, euler motors leadership, commercial ev india, euler factory, euler esg",
  },
};

