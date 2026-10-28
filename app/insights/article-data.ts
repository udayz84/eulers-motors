export type ArticleSummary = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
};

export const ARTICLE_SUMMARIES: ArticleSummary[] = [
  {
    slug: "connected-vehicles-business",
    title: "How Connected Vehicles Help Businesses Run Better",
    category: "Technology",
    date: "28 July 2026",
    readTime: "5 min read",
    image: "/assets/insights/article-featured-1.png",
    excerpt: "See how connected vehicle technology can help businesses…",
  },
  {
    slug: "future-electric-commercial-vehicles",
    title: "The Future of Electric Commercial Vehicles",
    category: "Technology",
    date: "25 July 2026",
    readTime: "7 min read",
    image: "/assets/insights/article-featured-2.png",
    excerpt: "Exploring the next generation of EV technology for logistics…",
  },
  {
    slug: "sustainable-supply-chains",
    title: "Building Sustainable Supply Chains",
    category: "Industry",
    date: "20 July 2026",
    readTime: "6 min read",
    image: "/assets/insights/article-featured-3.png",
    excerpt: "How electric fleets are transforming logistics operations…",
  },
  {
    slug: "ai-fleet-management",
    title: "Optimizing Fleet Management with AI",
    category: "Fleet Operations",
    date: "15 July 2026",
    readTime: "8 min read",
    image: "/assets/insights/article-featured-4.png",
    excerpt: "Leveraging artificial intelligence for smarter fleet decisions…",
  },
  {
    slug: "ev-maintenance-best-practices",
    title: "Electric Vehicle Maintenance Best Practices",
    category: "Service",
    date: "10 July 2026",
    readTime: "4 min read",
    image: "/assets/insights/article-featured-1.png",
    excerpt: "Essential tips for maintaining your electric fleet…",
  },
  {
    slug: "battery-technology-advances",
    title: "Battery Technology Advances in 2026",
    category: "Technology",
    date: "5 July 2026",
    readTime: "6 min read",
    image: "/assets/insights/article-featured-2.png",
    excerpt: "Latest breakthroughs in battery technology for commercial EVs…",
  },
  {
    slug: "electric-fleet-costs",
    title: "What an electric fleet really costs",
    category: "Industry",
    date: "14 July 2026",
    readTime: "9 min read",
    image: "/assets/insights/article-1.jpg",
    excerpt:
      "Electricity, servicing, insurance, battery, and resale value. Everything calculated for fleets driving 80km to 200 km per day.",
  },
  {
    slug: "ev-subsidy",
    title: "How much EV subsidy will you get?",
    category: "Industry",
    date: "14 July 2026",
    readTime: "9 min read",
    image: "/assets/insights/article-2.png",
    excerpt:
      "Which states still offer subsidies, what ended in April, and how to claim them.",
  },
  {
    slug: "how-to-charge-electric-truck",
    title: "How to Charge Your Electric Truck: Home vs Public Charging",
    category: "Charging",
    date: "28 July 2026",
    readTime: "5 min read",
    image: "/assets/insights/article-featured-3.png",
    excerpt:
      "This guide compares depot and public charging and explains how fleet operators combine both to keep vehicles running without downtime.",
  },
];

export const CHARGING_GUIDE_SLUG = "how-to-charge-electric-truck";

