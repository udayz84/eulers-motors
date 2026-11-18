import type { StrapiFaqPageData } from "@/types/strapi";

const FAQ_INTRO_PARAGRAPHS = [
  'These Terms and Conditions (\u201cTerms\u201d) of online booking are executed between the User (as defined hereinafter) and Euler Motors Private Limited, a company having its registered office address at B-99, Panchsheel Vihar, New Delhi 110017 (hereinafter referred to as \u201cEuler Motors\u201d, \u201cwe\u201d or \u201cus\u201d or \u201cour\u201d) and its affiliates and subsidiaries and applies to the booking of Vehicles (as defined hereinafter) listed on the \u2018Book Online\u2019 section.',
  'By accessing or using our Platform and/or booking Vehicles through the Platform, you understand and agree to be bound by these Terms. The Terms, Privacy Policy, Purchase Terms (as defined hereinafter) shall be collectively referred to as \u201cEuler Motors Policies\u201d, including any modifications or amendments made thereto by Euler Motors from time to time, at its sole discretion.',
];

export const defaultFaqPageData: StrapiFaqPageData = {
  hero: {
    eyebrow: "Help centre",
    title: "Frequently asked questions",
    description:
      "Find answers to the most common questions about our vehicles, charging, service, warranty and more.",
  },
  faqsSection: {
    searchPlaceholder: "Search for the question",
    lastUpdated: "October 22, 2021",
    introText: FAQ_INTRO_PARAGRAPHS.join("\n\n"),
    categories: [
      { label: "General" },
      { label: "Vehicles" },
      { label: "Charging" },
      { label: "Service" },
      { label: "Warranty" },
    ],
    items: [
      // --- GENERAL (7 items) ---
      {
        question: "What does Euler Motors make?",
        answer:
          "Euler Motors manufactures commercial electric vehicles engineered specifically for Indian road conditions, including our flagship cargo EV models designed for high payload capacity, exceptional thermal efficiency, and maximum range.",
        category: "General",
        isFeatured: true,
        order: 1,
      },
      {
        question: "Are these vehicles suitable for daily commercial use?",
        answer:
          "Yes. Most owners run 80 to 150 km a day, six days a week, and the vehicles are designed and warranted for that.",
        category: "General",
        isFeatured: true,
        order: 2,
      },
      {
        question: "Do I need a special licence to drive one?",
        answer:
          "No special commercial licence is required beyond a valid Light Motor Vehicle (LMV) driving licence issued in India.",
        category: "General",
        isFeatured: true,
        order: 3,
      },
      {
        question: "Why is an electric vehicle cheaper to run than a diesel one?",
        answer:
          "Electricity costs per kilometer are approximately \u20b91.2 to \u20b91.8 compared to \u20b96 to \u20b99 for diesel. EVs also have far fewer moving parts, virtually eliminating engine oil changes, transmission servicing, and exhaust maintenance.",
        category: "General",
        isFeatured: true,
        order: 4,
      },
      {
        question: "How does regenerative braking work on Euler vehicles?",
        answer:
          "Euler commercial vehicles feature multi-level regenerative braking that captures kinetic energy during deceleration and feeds it back into the battery pack, extending your operational range on congested city routes.",
        category: "General",
        order: 5,
      },
      {
        question: "Where are Euler vehicles manufactured?",
        answer:
          "Euler vehicles are designed and engineered at our R&D center in New Delhi and built at our state-of-the-art manufacturing plant in Haryana with over 90% indigenous components.",
        category: "General",
        order: 6,
      },
      {
        question: "Can I purchase Euler vehicles through institutional financing or loans?",
        answer:
          "Yes. Euler has partnered with leading nationalized and private financial institutions to provide competitive interest rates, low down payment options, and flexible EMI schedules for individual operators and fleet owners.",
        category: "General",
        order: 7,
      },

      // --- VEHICLES (8 items) ---
      {
        question: "What is the payload capacity of Euler commercial vehicles?",
        answer:
          "Depending on the model and variant, payload capacity ranges from 688 kg to over 1,500 kg, designed with reinforced leaf-spring suspension and aerospace-grade chassis alloys to withstand heavy cargo loads.",
        category: "Vehicles",
        order: 8,
      },
      {
        question: "What real-world driving range can I expect on a full charge?",
        answer:
          "Euler vehicles deliver a certified range of up to 200 km, with typical real-world commercial route delivery ranges between 120 km and 170 km depending on payload weight, terrain, and traffic conditions.",
        category: "Vehicles",
        order: 9,
      },
      {
        question: "How do Euler vehicles perform during extreme heat and monsoons?",
        answer:
          "Our proprietary liquid-cooled battery technology maintains optimal operating cell temperatures even in 45\u00b0C+ summer heat. With IP67-rated battery and motor enclosures, Euler vehicles navigate waterlogged roads and heavy rain safely.",
        category: "Vehicles",
        order: 10,
      },
      {
        question: "What cargo body types and dimensions are available?",
        answer:
          "We offer multiple container body configurations including open-bed, high-side deck, fully enclosed container boxes, and customized refrigerated units tailored for eCommerce, FMCG, and logistics operations.",
        category: "Vehicles",
        order: 11,
      },
      {
        question: "How does the vehicle handle steep gradients and flyovers?",
        answer:
          "Equipped with high-torque electric powertrains delivering peak torque from 0 RPM, Euler vehicles easily conquer gradients of up to 21% even with maximum payload on steep urban flyovers.",
        category: "Vehicles",
        order: 12,
      },
      {
        question: "What connected vehicle features are included in the cabin?",
        answer:
          "Each vehicle is equipped with telematics hardware integrating directly with the Euler Shepherd fleet management app, providing real-time GPS tracking, geofencing, battery health telemetry, and remote immobilizer.",
        category: "Vehicles",
        order: 13,
      },
      {
        question: "Are safety features like crash protection and roll-over safeguards included?",
        answer:
          "Yes. Built with a front-impact crumple zone, heavy-gauge steel cabin structure, hydraulic dual-circuit brakes, and seatbelt reminders, our vehicles exceed all AIS safety standards.",
        category: "Vehicles",
        order: 14,
      },
      {
        question: "What driving modes are available?",
        answer:
          "Drivers can toggle between Eco mode for maximum battery conservation and range, and Power mode for rapid acceleration and heavy load hauling on expressways.",
        category: "Vehicles",
        order: 15,
      },

      // --- CHARGING (8 items) ---
      {
        question: "How long does it take to fully charge an EV?",
        answer:
          "Charging time varies by battery capacity and charger type. Using a DC fast charger, you can reach 80% charge in about 30 to 45 minutes, while standard AC charging takes 4 to 6 hours.",
        category: "Charging",
        order: 16,
      },
      {
        question: "What types of charging stations are compatible with Euler vehicles?",
        answer:
          "Euler vehicles support standard CCS2 DC fast charging as well as Type 2 AC chargers and industrial 15A three-pin sockets for convenient depot and overnight charging.",
        category: "Charging",
        order: 17,
      },
      {
        question: "Can I charge my vehicle at home or at my small warehouse?",
        answer:
          "Yes, you can charge using a standard 15A wall socket or install an Euler-certified dedicated wallbox AC charger for faster overnight charging.",
        category: "Charging",
        order: 18,
      },
      {
        question: "How much does it cost to charge an electric vehicle?",
        answer:
          "Charging costs depend on local electricity tariffs. On average, commercial EV charging costs between \u20b91.2 to \u20b91.8 per kilometer, which is significantly lower than petrol or diesel.",
        category: "Charging",
        order: 19,
      },
      {
        question: "How do I find nearby charging stations?",
        answer:
          "You can locate nearby compatible charging stations directly in the Euler mobile app with real-time station availability, navigation directions, and socket types.",
        category: "Charging",
        order: 20,
      },
      {
        question: "Is it safe to charge in the rain?",
        answer:
          "Yes, it is completely safe. EV charging plugs and vehicle inlets are weatherproof (rated IP65/IP67) with built-in safety interlocks that prevent power flow until a secure seal is confirmed.",
        category: "Charging",
        order: 21,
      },
      {
        question: "Does fast charging degrade battery life over time?",
        answer:
          "Our liquid-cooled battery thermal management system prevents cell overheating during DC fast charging, preserving battery longevity and cell degradation rates over thousands of charge cycles.",
        category: "Charging",
        order: 22,
      },
      {
        question: "Can Euler install charging infrastructure at our fleet depot?",
        answer:
          "Yes. Euler Energy provides end-to-end depot charging turnkey installations, including power distribution planning, smart chargers, energy management software, and 24/7 technical maintenance.",
        category: "Charging",
        order: 23,
      },

      // --- SERVICE (7 items) ---
      {
        question: "Can I follow the progress of a repair in real-time?",
        answer:
          "Yes. You can track real-time servicing status, diagnostic updates, and estimated vehicle delivery times through the Euler mobile app and customer portal.",
        category: "Service",
        isFeatured: true,
        order: 24,
      },
      {
        question: "What is the scheduled maintenance interval for Euler vehicles?",
        answer:
          "Because electric powertrains require no oil changes or spark plug replacements, routine periodic service intervals are scheduled every 10,000 km or 6 months, primarily for suspension, brake pads, and tire inspections.",
        category: "Service",
        order: 25,
      },
      {
        question: "Where can I service my Euler commercial vehicle?",
        answer:
          "Euler operates a nationwide network of 112+ authorized service centers across 24 states, staffed by certified EV technicians with dedicated service bays.",
        category: "Service",
        order: 26,
      },
      {
        question: "Is mobile roadside assistance or on-site fleet servicing available?",
        answer:
          "Yes. Our 'Euler on Wheels' mobile service vans can be dispatched directly to your depot or breakdown location for on-site periodic maintenance and minor repairs.",
        category: "Service",
        order: 27,
      },
      {
        question: "How quickly are genuine replacement parts supplied?",
        answer:
          "We maintain regional parts distribution hubs across India guaranteeing 24-to-48-hour delivery for critical components, keeping fleet downtime to an absolute minimum.",
        category: "Service",
        order: 28,
      },
      {
        question: "What software updates are provided for vehicle intelligence?",
        answer:
          "Euler vehicles receive over-the-air (OTA) firmware updates to enhance motor efficiency, refine battery management algorithms, and introduce new telemetry features.",
        category: "Service",
        order: 29,
      },
      {
        question: "How do I schedule a service appointment?",
        answer:
          "Service appointments can be booked in under 60 seconds via the Euler Shepherd App, our toll-free customer helpline (1800 000 0000), or directly through your dedicated account manager.",
        category: "Service",
        order: 30,
      },

      // --- WARRANTY (8 items) ---
      {
        question: "What is covered under warranty?",
        answer:
          "Comprehensive warranty coverage includes the proprietary battery pack, electric drivetrain, motor controller, chassis, and core electronics against manufacturing defects.",
        category: "Warranty",
        isFeatured: true,
        order: 31,
      },
      {
        question: "How long is the battery warranty?",
        answer:
          "Euler vehicle battery packs are covered under warranty for up to 3 years or 100,000 km (whichever comes first), ensuring peace of mind throughout your fleet operations.",
        category: "Warranty",
        isFeatured: true,
        order: 32,
      },
      {
        question: "How do I claim warranty support?",
        answer:
          "You can initiate a warranty claim instantly by contacting your nearest authorized Euler service center, booking an appointment through the mobile app, or calling our 24/7 dedicated fleet support hotline.",
        category: "Warranty",
        isFeatured: true,
        order: 33,
      },
      {
        question: "What is not covered under warranty?",
        answer:
          "Normal wear-and-tear items such as tires, brake pads, wiper blades, cosmetic damage, unauthorized modifications, and issues resulting from accidents or improper usage are not covered under standard warranty.",
        category: "Warranty",
        isFeatured: true,
        order: 34,
      },
      {
        question: "Does the warranty transfer if I sell the vehicle?",
        answer:
          "Yes, the manufacturer warranty is tied to the vehicle identification number (VIN) and automatically transfers to the new registered owner for the remaining warranty period.",
        category: "Warranty",
        isFeatured: true,
        order: 35,
      },
      {
        question: "Is there an extended warranty option available for fleet buyers?",
        answer:
          "Yes, Euler offers extended warranty packages that cover powertrain and battery health for up to 5 years or 150,000 km, customizable for high-mileage logistics fleets.",
        category: "Warranty",
        order: 36,
      },
      {
        question: "What is the roadside breakdown warranty policy?",
        answer:
          "Every new Euler vehicle includes 24/7 roadside assistance (RSA) throughout the warranty term, providing free towing to the nearest authorized workshop in case of mechanical or electrical failure.",
        category: "Warranty",
        order: 37,
      },
      {
        question: "Does installing aftermarket accessories void the vehicle warranty?",
        answer:
          "Non-electrical accessories do not affect your warranty. However, any tampering with the high-voltage electrical architecture, wiring harness, or battery connections by unauthorized third parties will void the warranty.",
        category: "Warranty",
        order: 38,
      },
    ],
  },
  quickHelpSection: {
    eyebrow: "Quick help",
    title: "The three things people ask for next.",
    subtitle: "Maximize efficiency and prolong vehicle battery lifespan with simple routine habits.",
    items: [
      {
        icon: "/assets/faq/icon-test-drive.png",
        title: "Book a test drive",
        description: "Not sure which vehicle fits your route? We bring one to your depot with a load.",
        buttonText: "Book Now",
        href: "/contact",
      },
      {
        icon: "/assets/faq/icon-dealer.png",
        title: "Locate a dealer",
        description: "112 dealers across 24 states, every one with a workshop bay.",
        buttonText: "Find Dealer",
        href: "/dealer-locator",
      },
      {
        icon: "/assets/faq/icon-service.png",
        title: "Book a service",
        description: "Pick a centre, a date and a slot. Or ask the mobile van to come to you.",
        buttonText: "Book Service",
        href: "/service-centers",
      },
    ],
  },
  seo: {
    metaTitle: "Frequently Asked Questions | Euler Motors",
    metaDescription:
      "Find answers to the most common questions about Euler Motors electric vehicles, charging, service, warranty, and privacy policies.",
  },
};
