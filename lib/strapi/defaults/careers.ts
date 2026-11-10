import type { StrapiCareerPosition, StrapiCareersPageData } from "@/types/strapi";

export const defaultCareersPageData: StrapiCareersPageData = {
  hero: {
    eyebrow: "GROW WITH US",
    title: "Shape the Future of Electric Mobility.",
    subtitle:
      "Be part of a team engineering electric mobility and shaping the future of commercial transportation.",
    cta: {
      label: "Find Jobs",
      href: "#open-positions",
      variant: "primary",
    },
  },
  benefitsSection: {
    eyebrow: "Why work with us",
    title: "Build More Than a Career.",
    description:
      "At Euler Motors, you work on real engineering challenges, build technology for Indian conditions and contribute to the future of commercial mobility.",
    benefits: [
      {
        number: "01",
        title: "Solve Real-World Challenges",
        description:
          "Work on electric vehicles designed for the everyday demands of businesses, roads and logistics.",
      },
      {
        number: "02",
        title: "Work Across Disciplines",
        description:
          "Bring engineering, software, design and technology together to solve complex mobility challenges.",
      },
      {
        number: "03",
        title: "Make Innovation Happen",
        description:
          "Turn ideas into practical solutions that improve how commercial vehicles perform and operate.",
      },
    ],
  },
  supportSection: {
    eyebrow: "Our offering",
    title: "Support That Matters",
    subtitle:
      "We focus on complete physical, mental, and professional growth support. No standard corporate fluff, just helpful baseline perks.",
    items: [
      {
        title: "Medical Cover",
        description: "Cover for you, spouse, children, and parents.",
      },
      {
        title: "Learning Budget",
        description: "Paid courses, workshops, and global certs.",
      },
      {
        title: "Flexible Leave",
        description: "Take the time you need comfortably.",
      },
      {
        title: "Counseling",
        description: "Confidential mental health support, free of cost.",
      },
      {
        title: "Equity Options",
        description: "Own a stake in the mobility revolution.",
      },
      {
        title: "Modern Workspace",
        description: "Spacious hubs in Delhi & Bangalore.",
      },
      {
        title: "Parental Support",
        description: "Helpful paid parent leave systems.",
      },
      {
        title: "Recognition",
        description: "Quarterly peer-voted awards & spot bonuses.",
      },
    ],
  },
  positionsSection: {
    eyebrow: "Open positions",
    title: "Find Your Place at Euler.",
    subtitle:
      "Explore opportunities across teams and locations. Find a role that matches your skills and helps shape the future of electric mobility.",
  },
  gallerySection: {
    eyebrow: "LIFE AT EULER",
    title: "A Place to Build, Learn and Grow.",
    subtitle:
      "From the shop floor to collaborative workspaces, get a glimpse of the people, ideas and everyday experiences that shape life at Euler Motors.",
    images: [
      {
        url: "/assets/careers/gallery-office.webp",
        alternativeText: "Euler Motors Office",
      },
      {
        url: "/assets/careers/gallery-meeting-room.webp",
        alternativeText: "Euler Motors Meeting Space",
      },
      {
        url: "/assets/careers/gallery-team.webp",
        alternativeText: "Euler Motors Team",
      },
      {
        url: "/assets/careers/gallery-team-work.webp",
        alternativeText: "Euler Motors Collaboration",
      },
      {
        url: "/assets/careers/gallery-workspace.webp",
        alternativeText: "Euler Motors Workspace",
      },
      {
        url: "/assets/careers/doc-embedded-gallery.webp",
        alternativeText: "Life at Euler Showcase",
      },
    ],
  },
  testimonialsSection: {
    eyebrow: "Employee voices",
    title: "Hear It from Our People.",
    subtitle:
      "Get a glimpse of life at Euler through the experiences and perspectives of the people building our electric mobility journey.",
    testimonials: [
      {
        quote:
          "Joined to work on advanced electric powertrains. Stayed because of the collaborative culture and freedom to innovate. The team here genuinely values engineering excellence and new ideas.",
        name: "Rahul Deshmukh",
        role: "Senior Engineer, Euler Motors",
        image: {
          url: "/assets/careers/testimonial-rahul.webp",
          alternativeText: "Rahul Deshmukh",
        },
      },
      {
        quote:
          "Joined to build cutting-edge battery packs. Stayed because of the high trust and low bureaucracy. The ownership given to engineers here is rare in the EV sector.",
        name: "Jahan Melad",
        role: "Project Manager, Euler Motors",
        image: {
          url: "/assets/careers/testimonial-jahan.webp",
          alternativeText: "Jahan Melad",
        },
      },
      {
        quote:
          "Came here to solve real-world mobility challenges. Stayed because of the supportive leadership and meaningful work. Every project gives us the opportunity to build technology that makes a difference.",
        name: "Priya Sharma",
        role: "Manufacturing Lead, Euler Motors",
        image: {
          url: "/assets/careers/testimonial-priya.webp",
          alternativeText: "Priya Sharma",
        },
      },
    ],
  },
  seo: {
    metaTitle: "Careers at Euler Motors — Shape the Future of Electric Mobility",
    metaDescription:
      "Be part of a team engineering electric mobility and shaping the future of commercial transportation.",
    keywords: "euler motors careers, ev jobs india, commercial ev engineering, automotive jobs, clean tech careers",
  },
};

export const defaultCareerPositions: StrapiCareerPosition[] = [
  {
    title: "Senior Engineer, Battery Systems",
    department: "Engineering",
    location: "New Delhi",
    experience: "5 to 8 years",
    description: "Own the thermal and cell balancing behaviour of the pack across our range.",
    slug: "senior-engineer-battery-systems",
    isActive: true,
    applyUrl: "mailto:careers@eulermotors.com?subject=Application:%20Senior%20Engineer,%20Battery%20Systems",
    order: 1,
  },
  {
    title: "Manufacturing Engineer, Assembly",
    department: "Manufacturing",
    location: "New Delhi",
    experience: "3 to 6 years",
    description: "Improve the assembly line that builds every Euler vehicle, one station at a time.",
    slug: "manufacturing-engineer-assembly",
    isActive: true,
    applyUrl: "mailto:careers@eulermotors.com?subject=Application:%20Manufacturing%20Engineer,%20Assembly",
    order: 2,
  },
  {
    title: "Fleet Sales Manager",
    department: "Sales",
    location: "Chennai",
    experience: "4 to 8 years",
    description: "Drive commercial vehicle fleet adoption with enterprise logistics and cargo clients across South India.",
    slug: "fleet-sales-manager",
    isActive: true,
    applyUrl: "mailto:careers@eulermotors.com?subject=Application:%20Fleet%20Sales%20Manager",
    order: 3,
  },
  {
    title: "Lead Firmware Engineer, IoT",
    department: "Software",
    location: "Bengaluru",
    experience: "5 to 8 years",
    description: "Architect vehicle telematics, BMS integration, and real-time charging telemetry platforms.",
    slug: "lead-firmware-engineer-iot",
    isActive: true,
    applyUrl: "mailto:careers@eulermotors.com?subject=Application:%20Lead%20Firmware%20Engineer,%20IoT",
    order: 4,
  },
  {
    title: "Quality Assurance Engineer, Powertrain",
    department: "Manufacturing",
    location: "Pune",
    experience: "3 to 6 years",
    description: "Implement endurance testing and quality control for commercial electric drive trains.",
    slug: "qa-engineer-powertrain",
    isActive: true,
    applyUrl: "mailto:careers@eulermotors.com?subject=Application:%20QA%20Engineer,%20Powertrain",
    order: 5,
  },
  {
    title: "Regional Service Operations Manager",
    department: "Service",
    location: "Mumbai",
    experience: "4 to 8 years",
    description: "Lead regional service depot operations, warranty resolution, and depot technician readiness.",
    slug: "regional-service-manager",
    isActive: true,
    applyUrl: "mailto:careers@eulermotors.com?subject=Application:%20Regional%20Service%20Operations%20Manager",
    order: 6,
  },
];
