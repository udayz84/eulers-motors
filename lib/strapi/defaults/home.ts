import { HomePageData } from "@/types/strapi";

/**
 * Production-grade fallback data for Euler Motors homepage.
 * Synchronized with approved content specifications (Google Doc tab t.0).
 * Used whenever Strapi is unreachable, content is in draft, or fields are empty.
 */
export const DEFAULT_HOME_PAGE: HomePageData = {
  seo: {
    metaTitle: "Euler Motors — Commercial Electric Vehicles for India's Future",
    metaDescription:
      "Euler Motors manufactures high-performance commercial electric vehicles designed for tough Indian roads and maximum fleet profitability.",
    keywords: "electric vehicles, commercial ev, euler storm, euler turbo, cargo ev",
    preventIndexing: false,
  },
  hero: {
    slides: [
      {
        tag: "PERFORMANCE",
        headline: "Designed for demanding loads and everyday commercial operations.",
        subheading: "",
        primaryCta: { label: "Explore our Vehicles", href: "/products", variant: "primary" },
      },
      {
        tag: "PERFORMANCE",
        headline:
          "From different cargo requirements to diverse business needs, find your fit in our electric vehicle portfolio.",
        subheading: "",
        primaryCta: { label: "Explore our Vehicles", href: "/products", variant: "primary" },
      },
      {
        tag: "TECHNOLOGY",
        headline:
          "Purpose-built technology, thoughtful engineering, and safety-focused design for commercial mobility.",
        subheading: "",
        primaryCta: { label: "Explore our Vehicles", href: "/products", variant: "primary" },
      },
      {
        tag: "BUSINESS VALUE",
        headline: "Find the right balance of capability, operating needs, and value for your business.",
        subheading: "",
        primaryCta: { label: "Explore our Vehicles", href: "/products", variant: "primary" },
      },
    ],
  },
  statsBanner: {
    heading: "Euler Motors in numbers",
    stats: [
      { value: "10,000+", valueMobile: "10,000", unitMobile: "+", label: "Units sold" },
      { value: "52", label: "Cities" },
      { value: "96.4%", valueMobile: "96.4", unitMobile: "%", label: "Uptime across India" },
      { value: "112+", label: "Dealers & service touchpoints" },
      { value: "08", unit: "yrs", label: "Battery warranty" },
    ],
  },
  productShowcase: {
    eyebrow: "FIND YOUR FIT",
    title: "The right vehicle for every business move.",
    subtitle:
      "From last-mile deliveries to heavier commercial operations, explore electric vehicles designed around your business needs.",
    products: [
      {
        slug: "storm-ev-lr200",
        tabLabel: "Storm EV LR",
        title: "Storm EV LongRange 200",
        specsRange: "200+ km",
        specsCapacity: "1,500 kg",
        specsChargeTime: "15 min fast charge",
        productUrl: "/products/storm-ev-lr200",
      },
      {
        slug: "storm-ev-t1500",
        tabLabel: "Storm EV T1500",
        title: "Storm EV T1500",
        specsRange: "140+ km",
        specsCapacity: "1,500 kg",
        specsChargeTime: "15 min fast charge",
        productUrl: "/products/storm-ev-t1500",
      },
      {
        slug: "turbo-ev-1000",
        tabLabel: "Turbo EV",
        title: "Turbo EV 1000",
        specsRange: "180+ km",
        specsCapacity: "1,000 kg",
        specsChargeTime: "15 min fast charge",
        productUrl: "/products/turbo-ev-1000",
      },
      {
        slug: "hiload-ev",
        tabLabel: "HiLoad EV",
        title: "HiLoad EV",
        specsRange: "170 km",
        specsCapacity: "688 kg",
        specsChargeTime: "15 min fast charge",
        productUrl: "/products/hiload-ev",
      },
    ],
  },
  neoPromo: {
    eyebrow: "Presenting the future of Auto",
    title: "Neo by Euler",
    body: "Smaller three wheelers for city delivery. HiRange and HiCity. Sold and serviced by the same 112 dealers.",
    ctaLabel: "Explore Neo",
    ctaHref: "/products",
    imageAlt: "Neo by Euler three-wheelers",
    wash: "blue",
    align: "left",
  },
  talkPromo: {
    eyebrow: "Support",
    title: "Talk to an expert ",
    body: "Need assistance? Request a callback, and our team will get in touch with you in just a few minutes!",
    ctaLabel: "Request a call back",
    ctaHref: "#contact",
    imageAlt: "Euler expert with a customer",
    wash: "mobile-blue",
    align: "right",
  },
  technology: {
    eyebrow: "MADE FOR THE MILES",
    title: "Built for Indian roads.",
    description:
      "Full range in every weather condition. Purpose-built technology, thoughtful engineering, and safety-focused design for commercial mobility.",
    cta: {
      label: "See how it works",
      href: "/technology",
      variant: "primary",
    },
    cards: [
      {
        tag: "01 / Battery",
        title: "Full range, even in garmi.",
        description:
          "Indian summers can be tough on batteries. Our liquid-cooled battery helps manage heat, so you can keep moving.",
      },
      {
        tag: "02 / Comfort & Safety",
        title: "Comfortable for an 11-hour day.",
        description:
          "Spacious cabin, electronic power steering, comfortable seats, infotainment system, ADAS and reverse camera for a more comfortable, confident drive.",
      },
      {
        tag: "03 / Shepherd App",
        title: "Your entire fleet, one app.",
        description:
          "Manage real-time vehicle tracking, locate charging stations and book slots, set geofences, manage fleet operations, use digital locks and receive regular service alerts with the Shepherd mobile app.",
      },
      {
        tag: "04 / Performance",
        title: "Climbs a slope on a full load.",
        description:
          "Industry-leading torque and selectable driving modes deliver strong pulling power across steep slopes, flyovers and rough roads, even with a full load.",
      },
    ],
  },
  reviewsSection: {
    eyebrow: "CUSTOMERS",
    title: "Hear it from those who drive Euler.",
    description: "Real customers. Real experiences. Hear how Euler Motors fits into their everyday business.",
    reviews: [
      {
        customerName: "Saurabh Patil",
        roleOrCompany: "Fleet Owner",
        location: "Mumbai",
        rating: 4.9,
        quote: "14 gaadi hain. Diesel ka kharcha hi khatam ho gaya.",
        savingsMonthly: "₹41,000 saved a month",
        videoDuration: "02:32",
        storyImage: { url: "/assets/reviews/story-a.jpg" },
        overlayImage: { url: "/assets/reviews/story-b.png" },
        avatarImage: { url: "/assets/reviews/avatar.png" },
      },
      {
        customerName: "Ramesh Sharma",
        roleOrCompany: "Fleet Owner, Delhi NCR",
        location: "Delhi",
        rating: 4.9,
        quote: "Our operating costs dropped significantly since transitioning our delivery fleet to Euler.",
        savingsMonthly: "₹38,000 saved a month",
        videoDuration: "02:15",
        storyImage: { url: "/assets/reviews/story-a.jpg" },
        overlayImage: { url: "/assets/reviews/story-c.png" },
        avatarImage: { url: "/assets/reviews/avatar.png" },
      },
      {
        customerName: "Anil Verma",
        roleOrCompany: "Logistics Partner, Bengaluru",
        location: "Bengaluru",
        rating: 4.9,
        quote: "The liquid cooled battery handles heat and steep gradients with zero power drop.",
        savingsMonthly: "₹45,000 saved a month",
        videoDuration: "01:54",
        storyImage: { url: "/assets/reviews/story-a.jpg" },
        overlayImage: { url: "/assets/reviews/story-d.png" },
        avatarImage: { url: "/assets/reviews/avatar.png" },
      },
    ],
  },
  primeBanner: {
    eyebrow: "Euler Prime",
    title: "Aap Jahan. Service Wahan",
    description:
      "90-minute service, 24×7 RSA support, predictive maintenance, and doorstep service. Dedicated technicians bring service support right to your location.",
    cta: { label: "Explore Euler Prime", href: "/products", variant: "primary" },
    features: [
      { value: "90-minute service", label: "Quick response to help minimise vehicle downtime." },
      { value: "24×7 RSA support", label: "Roadside assistance when you need it." },
      { value: "Predictive maintenance", label: "Proactive support to help identify service needs early." },
      { value: "Doorstep service", label: "Expert technicians bring service support to your location." },
    ],
  },
  insightsSection: {
    eyebrow: "insights",
    title: "Learn more about EVs",
    viewAllCta: { label: "Read all insights", href: "/faq", variant: "primary" },
    articles: [
      {
        title: "What an electric fleet really costs",
        slug: "what-an-electric-fleet-really-costs",
        description:
          "Electricity, servicing, insurance, battery, and resale value. Everything calculated for fleets driving 80km to 200 km per day.",
        coverImage: { url: "/assets/insights/article-1.jpg" },
        publishDate: "14 July 2026",
        readingTime: "09 Min",
        category: "Economics",
      },
      {
        title: "How much EV subsidy will you get?",
        slug: "how-much-ev-subsidy-will-you-get",
        description: "Which states still offer subsidies, what ended in April, and how to claim them.",
        coverImage: { url: "/assets/insights/article-2.png" },
        publishDate: "14 July 2026",
        readingTime: "07 Min",
        category: "Government Policy",
      },
      {
        title: "Depot or public charging?",
        slug: "depot-or-public-charging",
        description: "Under 9 vehicles, public charging works out cheaper. The full working is inside.",
        coverImage: { url: "/assets/insights/article-3.png" },
        publishDate: "14 July 2026",
        readingTime: "05 Min",
        category: "Charging Infrastructure",
      },
    ],
  },
  enterpriseDealer: {
    enterpriseEyebrow: "ENTERPRISE",
    enterpriseTitle: "Need 50+ vehicles?",
    enterpriseDesc: "We assess your business needs and recommend the right vehicle for your operations.",
    enterpriseBullets: [
      "Vehicle recommendations for your business",
      "Charging setup at your warehouse",
      "Spare parts support",
      "Dedicated account manager",
    ],
    enterpriseCta: { label: "Talk to our team", href: "/products", variant: "primary" },
    dealerEyebrow: "DEALERSHIP OPPORTUNITIES",
    dealerTitle: "Want to become a dealer?",
    dealerDesc: "Bring Euler Motors to your city. Get support with the showroom with Service Setup and training.",
    dealerPrimaryCta: { label: "Apply now", href: "/products", variant: "primary" },
    dealerSecondaryCta: { label: "Download details", href: "/products", variant: "outline" },
  },
  contactSection: {
    eyebrow: "NEXT STEP",
    title: "Ready to make the switch?",
    description: "Tell us about your business. We’ll help you find the right Euler vehicle for your daily runs.",
    phone: "1800-1238-1238",
    email: "customer.help@eulermotors.com",
    form: {
      heading: "What are you looking for?",
      subheading: "Two steps. We call you within one working day.",
      options: ["Test drive", "Price enquiry", "Fleet solutions"],
      ctaLabel: "Submit enquiry",
      disclaimer: "We never share your number with anyone else. No spam calls.",
    },
  },
  savingsCalculator: {
    eyebrow: "SAVINGS CALCULATOR",
    title: "Calculate your savings",
    defaultDailyKm: 60,
    defaultYears: 5,
    chartImageAlt:
      "Bar chart comparing monthly profit with petrol, diesel, CNG and Euler EV — ₹23,000 more profit per month with Euler EV",
  },
  compareSection: {
    eyebrow: "WHY EULER",
    title: "What changes when you switch?",
    quizTitle: "Which vehicle fits your work?",
    quizSubtitle: "Sirf 5 questions, 30 seconds. No phone number needed.",
    quizCta: { label: "Take the 30 second test", href: "#quiz", variant: "primary" },
    withoutEulerPoints: [
      {
        persona: "Fleet owner",
        points: ["Vehicle downtime", "Fewer trips", "₹4–5/km running cost"],
      },
      {
        persona: "Transport company",
        points: ["₹4–6/km running cost", "Margin pressure", "Fleet inefficiencies"],
      },
      {
        persona: "Small business",
        points: ["High delivery costs", "Limited delivery capacity", "Cost pressure"],
      },
      {
        persona: "Driver",
        points: ["Breakdowns disrupt work", "Fewer trips", "Time off the road"],
      },
      {
        persona: "Dealer",
        points: ["Limited EV opportunities", "Changing market demands", "Business expansion challenges"],
      },
    ],
    withEulerPoints: [
      {
        persona: "Fleet owner",
        points: ["90-minute doorstep service with Euler Prime", "2 to 3 More trips", "Approx. ₹1/km running cost"],
      },
      {
        persona: "Transport company",
        points: ["Less than ₹1/km running cost", "Better operating economics", "Efficient fleet operations"],
      },
      {
        persona: "Small business",
        points: ["Potential savings", "Vehicles for your needs", "Better cost management"],
      },
      {
        persona: "Driver",
        points: ["Service support", "More earning opportunities", "More time for work"],
      },
      {
        persona: "Dealer",
        points: ["EV dealership opportunity", "Growing EV category", "Partnership with Euler"],
      },
    ],
  },
  socialWall: {
    eyebrow: "From the road",
    title: "See how Euler vehicle is effective for your business",
    subtitle: "Real drivers. Real journeys. A closer look at life with Euler.",
    posts: [
      {
        duration: "02:14",
        authorHandle: "@eulermotors",
        isOfficial: true,
        likes: "4,820 likes",
        timeAgo: "1 day ago",
        videoUrl: "https://instagram.com/eulermotors",
      },
      {
        duration: "01:48",
        authorHandle: "@eulermotors_drivers",
        isOfficial: true,
        likes: "3,150 likes",
        timeAgo: "3 days ago",
        videoUrl: "https://instagram.com/eulermotors",
      },
      {
        duration: "00:58",
        authorHandle: "@eulermotors",
        isOfficial: true,
        likes: "9,480 likes",
        timeAgo: "5 days ago",
        videoUrl: "https://instagram.com/eulermotors",
      },
    ],
  },
};
