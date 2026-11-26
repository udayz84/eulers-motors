import type { StrapiNavbarData, StrapiFooterData } from "@/types/strapi";

export const defaultNavbarData: StrapiNavbarData = {
  logo: "/assets/nav/logo-white.svg",
  links: [
    { label: "Product", href: "/products" },
    { label: "Company", href: "#" },
    { label: "Technology", href: "/technology" },
    { label: "Support", href: "#" },
  ],
  companyLinks: [
    { label: "About us", desc: "EV Revolution for India", href: "/about" },
    { label: "Leadership", desc: "Founders and board", href: "/about#leadership" },
    { label: "Careers", desc: "Find the right role for you.", href: "/careers" },
    { label: "In press", desc: "News and media kit", href: "/in-press" },
  ],
  supportLinks: [
    { label: "Find a dealer", desc: "112 dealers, 24 states", href: "/dealer-locator" },
    { label: "Service centres", desc: "On the spot repair", href: "/service-centers" },
    { label: "Charging stations", desc: "1,412 points on the app", href: "/charging-stations" },
    { label: "Media Kit", desc: "Brochure and manuals", href: "/in-press#media-kit" },
    { label: "FAQs", desc: "Common questions", href: "/faq" },
  ],
  productLinks: [
    { label: "Storm EV LongRange 200", desc: "1,500 kg", href: "/products/lr200" },
    { label: "Storm EV T1500", desc: "1,500 kg", href: "/products/storm-ev-t1500" },
    { label: "HiLoad EV", desc: "688 kg", href: "/products/hiload-ev" },
    { label: "Turbo EV 1000", desc: "1,000 kg", href: "/products/turbo-ev-1000" },
    { label: "Neo HiRange", href: "/products" },
    { label: "Neo HiCity", href: "/products" },
  ],
  megaVehicles: [
    { name: "Storm EV LR 200", payload: "1,500 kg", href: "/products/lr200", category: "4-Wheelers", image: "/assets/products/vehicle-storm-lr200.png" },
    { name: "Storm EV T1500", payload: "1,500 kg", href: "/products/storm-ev-t1500", category: "4-Wheelers", image: "/assets/products/vehicle-storm-t1500.png" },
    { name: "Turbo EV 1000", payload: "1,000 kg", href: "/products/turbo-ev-1000", category: "4-Wheelers", image: "/assets/products/vehicle-turbo-1000.png" },
    { name: "HiLoad EV", payload: "688 kg", href: "/products/hiload-ev", category: "3-Wheelers", image: "/assets/products/vehicle-hiload-ev.png" },
  ],
  ctaLabel: "Book a Test Drive",
  ctaHref: "#book-test-drive",
  searchPlaceholder: "Search here...",
};

export const defaultFooterData: StrapiFooterData = {
  logo: "/assets/footer/logo-dark.svg",
  columns: [
    {
      title: "Euler Motors",
      openOnMobile: true,
      links: [
        { label: "Storm EV LongRange 200", href: "/products/lr200" },
        { label: "Storm EV T1500", href: "/products/storm-ev-t1500" },
        { label: "HiLoad EV", href: "/products/hiload-ev" },
        { label: "Turbo EV 1000", href: "/products/turbo-ev-1000" },
      ],
    },
    {
      title: "Neo by Euler",
      openOnMobile: false,
      links: [
        { label: "HiRange", href: "/products" },
        { label: "HiCity", href: "/products" },
      ],
    },
    {
      title: "Support",
      openOnMobile: false,
      links: [
        { label: "Dealer Locator", href: "/dealer-locator" },
        { label: "Service Centres", href: "/service-centers" },
        { label: "Charging Stations Locator", href: "/charging-stations" },
        { label: "Downloads", href: "/in-press#media-kit" },
      ],
    },
    {
      title: "Resources",
      openOnMobile: false,
      links: [
        { label: "Blogs", href: "/insights" },
        { label: "In press", href: "/in-press" },
      ],
    },
    {
      title: "Company",
      openOnMobile: false,
      links: [
        { label: "About us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Sitemap", href: "#" },
      ],
    },
    {
      title: "Legal",
      openOnMobile: false,
      links: [
        { label: "Privacy policy", href: "/privacy-policy" },
        { label: "Terms and conditions", href: "/terms-conditions" },
        { label: "Cookie policy", href: "#" },
        { label: "Refund policy", href: "/refund-policy" },
      ],
    },
  ],
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/EulerMotors/", icon: "/assets/footer/icon-facebook.svg", flip: false },
    { label: "Instagram", href: "https://www.instagram.com/eulermotors/", icon: "/assets/footer/icon-instagram.svg", flip: true },
    { label: "YouTube", href: "https://www.youtube.com/c/EulerMotors", icon: "/assets/footer/icon-youtube.svg", flip: true },
    { label: "X", href: "https://twitter.com/Euler_Motors", icon: "/assets/footer/icon-x.svg", flip: false },
  ],
  copyright: "© 2026 Euler Motors. All rights reserved.",
  cin: "CIN U34100DL2018PTC000000.",
};
