import type { StrapiInPressPageData } from "@/types/strapi";

export const defaultInPressPageData: StrapiInPressPageData = {
  hero: {
    eyebrow: "Newsroom",
    title: "In the News",
    description:
      "See the latest media coverage, company announcements and industry updates from Euler Motors.",
    ctaLabel: "Download Media Kit",
    ctaHref: "#media-kit",
  },
  featuredSection: {
    title: "Featured story",
    stories: [
      {
        source: "Business Standard",
        date: "28 July 2026",
        title: "Euler Motors expands charging network across India",
        summary:
          "The company is adding depot chargers at customer sites and highway points along the Delhi to Mumbai freight corridor, a route that carries a large share of the country\u2019s containerised road freight.",
        image: "/assets/insights/article-featured-1.png",
      },
      {
        source: "Business Standard",
        date: "18 July 2026",
        title: "Euler Motors brings electric freight within reach of more businesses",
        summary:
          "New charging and service locations are helping more fleet operators make the switch to electric commercial vehicles.",
        image: "/assets/insights/article-featured-1.png",
      },
    ],
  },
  coverageSection: {
    eyebrow: "Latest press coverage",
    title: "News & Media Coverage",
    categories: [
      { label: "Company News" },
      { label: "Funding" },
      { label: "Charging" },
      { label: "Service" },
      { label: "Warranty" },
    ],
    articles: [
      {
        source: "Economic Times",
        date: "12 July 2026",
        title: "Euler Motors secures strategic investment to scale its electric fleet",
        summary:
          "Proceeds are earmarked for a second assembly line and a wider service footprint, the company told the paper.",
        category: "Funding",
        url: "#",
      },
      {
        source: "Autocar Professional",
        date: "30 June 2026",
        title: "Euler launches new commercial EV platform",
        summary:
          "One skateboard chassis will carry three body styles down the same line, cutting the changeover between variants.",
        category: "Company News",
        url: "#",
      },
      {
        source: "The Hindu BusinessLine",
        date: "14 July 2026",
        title: "Government fleet electrification gathers pace",
        summary:
          "The agreement covers twelve hundred last-mile vehicles and shared charging over three years.",
        category: "Charging",
        url: "#",
      },
      {
        source: "Financial Express",
        date: "24 June 2026",
        title: "EV adoption in logistics continues to grow",
        summary:
          "Fleet operators quoted in the report put the switch down to running cost per kilometre rather than purchase price.",
        category: "Service",
        url: "#",
      },
      {
        source: "Mint",
        date: "18 June 2026",
        title: "Euler Motors expands its nationwide service network",
        summary: "The role covers the plant ramp and supplier quality across both assembly lines.",
        category: "Service",
        url: "#",
      },
      {
        source: "Autocar India",
        date: "10 June 2026",
        title: "Electric goods vehicles get a longer warranty",
        summary: "The updated coverage is designed to give fleet owners more confidence on the road.",
        category: "Warranty",
        url: "#",
      },
      {
        source: "Business Standard",
        date: "4 June 2026",
        title: "Euler Motors adds fast charging locations for fleet customers",
        summary: "The expansion connects high-demand delivery and freight corridors.",
        category: "Charging",
        url: "#",
      },
      {
        source: "The Economic Times",
        date: "28 May 2026",
        title: "Euler Motors announces new manufacturing capacity",
        summary: "The company is preparing for rising demand for electric commercial vehicles.",
        category: "Company News",
        url: "#",
      },
    ],
  },
  mediaKitSection: {
    eyebrow: "Media kit",
    title: "Everything you need to cover Euler",
    subtitle: "Official company information, brand assets and media resources, all in one place.",
    items: [
      {
        label: "Media kit",
        title: "Logos, product shots, boilerplate and the company one-pager in one archive.",
        size: "18.4 km",
        filename: "euler-media-kit.zip",
      },
      {
        label: "Brand assets",
        title: "Wordmark and symbol in SVG and PNG, with the clear-space rules.",
        size: "6.2 km",
        filename: "euler-brand-assets.zip",
      },
      {
        label: "Company fact sheet",
        title: "Founding, footprint, plants, patents and the current team.",
        size: "140 kb",
        filename: "euler-fact-sheet.pdf",
      },
      {
        label: "Media kit",
        title: "Logos, product shots, boilerplate and the company one-pager in one archive.",
        size: "18.4 km",
        filename: "euler-media-kit.zip",
      },
      {
        label: "Leadership portraits",
        title: "Press-ready portraits with approved credits and captions.",
        size: "24.1 MB",
        filename: "euler-leadership-portraits.zip",
      },
      {
        label: "Press contact",
        title: "Reach the communications team directly for interviews and enquiries.",
        size: "",
        filename: "press@eulermotors.com",
      },
      {
        label: "Brochures",
        title: "Discover our story, explore our services, and see how we can bring your vision to life.",
        size: "",
        filename: "support@eulermotors.com",
      },
    ],
  },
  contactSection: {
    title: "Looking to speak with Euler Motors?",
    subtitle:
      "For media enquiries, interviews or press requests, our communications team is here to help.",
    buttonLabel: "Contact communications",
    email: "press@eulermotors.com",
  },
  seo: {
    metaTitle: "In the News | Euler Motors",
    metaDescription:
      "See the latest media coverage, company announcements and industry updates from Euler Motors.",
  },
};
