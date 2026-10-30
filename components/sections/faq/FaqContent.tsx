"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import FloatingWidget from "@/components/FloatingWidget";

type Category = "All" | "General" | "Vehicles" | "Charging" | "Service" | "Warranty";

interface CategoryMeta {
  id: Category;
  label: string;
  count: number;
}

const CATEGORIES: CategoryMeta[] = [
  { id: "All", label: "All", count: 78 },
  { id: "General", label: "General", count: 7 },
  { id: "Vehicles", label: "Vehicles", count: 8 },
  { id: "Charging", label: "Charging", count: 8 },
  { id: "Service", label: "Service", count: 7 },
  { id: "Warranty", label: "Warranty", count: 8 },
];

interface FaqItem {
  id: string;
  title: string;
  answer: string;
  categories: Category[];
}

const FAQ_DATABASE: FaqItem[] = [
  // --- GENERAL (7 items) ---
  {
    id: "gen-1",
    title: "What does Euler Motors make?",
    answer:
      "Euler Motors manufactures commercial electric vehicles engineered specifically for Indian road conditions, including our flagship cargo EV models designed for high payload capacity, exceptional thermal efficiency, and maximum range.",
    categories: ["General"],
  },
  {
    id: "gen-2",
    title: "Are these vehicles suitable for daily commercial use?",
    answer:
      "Yes. Most owners run 80 to 150 km a day, six days a week, and the vehicles are designed and warranted for that.",
    categories: ["General"],
  },
  {
    id: "gen-3",
    title: "Do I need a special licence to drive one?",
    answer:
      "No special commercial licence is required beyond a valid Light Motor Vehicle (LMV) driving licence issued in India.",
    categories: ["General"],
  },
  {
    id: "gen-4",
    title: "Why is an electric vehicle cheaper to run than a diesel one?",
    answer:
      "Electricity costs per kilometer are approximately ₹1.2 to ₹1.8 compared to ₹6 to ₹9 for diesel. EVs also have far fewer moving parts, virtually eliminating engine oil changes, transmission servicing, and exhaust maintenance.",
    categories: ["General"],
  },
  {
    id: "gen-5",
    title: "How does regenerative braking work on Euler vehicles?",
    answer:
      "Euler commercial vehicles feature multi-level regenerative braking that captures kinetic energy during deceleration and feeds it back into the battery pack, extending your operational range on congested city routes.",
    categories: ["General"],
  },
  {
    id: "gen-6",
    title: "Where are Euler vehicles manufactured?",
    answer:
      "Euler vehicles are designed and engineered at our R&D center in New Delhi and built at our state-of-the-art manufacturing plant in Haryana with over 90% indigenous components.",
    categories: ["General"],
  },
  {
    id: "gen-7",
    title: "Can I purchase Euler vehicles through institutional financing or loans?",
    answer:
      "Yes. Euler has partnered with leading nationalized and private financial institutions to provide competitive interest rates, low down payment options, and flexible EMI schedules for individual operators and fleet owners.",
    categories: ["General"],
  },

  // --- VEHICLES (8 items) ---
  {
    id: "veh-1",
    title: "What is the payload capacity of Euler commercial vehicles?",
    answer:
      "Depending on the model and variant, payload capacity ranges from 688 kg to over 1,500 kg, designed with reinforced leaf-spring suspension and aerospace-grade chassis alloys to withstand heavy cargo loads.",
    categories: ["Vehicles"],
  },
  {
    id: "veh-2",
    title: "What real-world driving range can I expect on a full charge?",
    answer:
      "Euler vehicles deliver a certified range of up to 200 km, with typical real-world commercial route delivery ranges between 120 km and 170 km depending on payload weight, terrain, and traffic conditions.",
    categories: ["Vehicles"],
  },
  {
    id: "veh-3",
    title: "How do Euler vehicles perform during extreme heat and monsoons?",
    answer:
      "Our proprietary liquid-cooled battery technology maintains optimal operating cell temperatures even in 45°C+ summer heat. With IP67-rated battery and motor enclosures, Euler vehicles navigate waterlogged roads and heavy rain safely.",
    categories: ["Vehicles"],
  },
  {
    id: "veh-4",
    title: "What cargo body types and dimensions are available?",
    answer:
      "We offer multiple container body configurations including open-bed, high-side deck, fully enclosed container boxes, and customized refrigerated units tailored for eCommerce, FMCG, and logistics operations.",
    categories: ["Vehicles"],
  },
  {
    id: "veh-5",
    title: "How does the vehicle handle steep gradients and flyovers?",
    answer:
      "Equipped with high-torque electric powertrains delivering peak torque from 0 RPM, Euler vehicles easily conquer gradients of up to 21% even with maximum payload on steep urban flyovers.",
    categories: ["Vehicles"],
  },
  {
    id: "veh-6",
    title: "What connected vehicle features are included in the cabin?",
    answer:
      "Each vehicle is equipped with telematics hardware integrating directly with the Euler Shepherd fleet management app, providing real-time GPS tracking, geofencing, battery health telemetry, and remote immobilizer.",
    categories: ["Vehicles"],
  },
  {
    id: "veh-7",
    title: "Are safety features like crash protection and roll-over safeguards included?",
    answer:
      "Yes. Built with a front-impact crumple zone, heavy-gauge steel cabin structure, hydraulic dual-circuit brakes, and seatbelt reminders, our vehicles exceed all AIS safety standards.",
    categories: ["Vehicles"],
  },
  {
    id: "veh-8",
    title: "What driving modes are available?",
    answer:
      "Drivers can toggle between Eco mode for maximum battery conservation and range, and Power mode for rapid acceleration and heavy load hauling on expressways.",
    categories: ["Vehicles"],
  },

  // --- CHARGING (8 items) ---
  {
    id: "chg-1",
    title: "How long does it take to fully charge an EV?",
    answer:
      "Charging time varies by battery capacity and charger type. Using a DC fast charger, you can reach 80% charge in about 30 to 45 minutes, while standard AC charging takes 4 to 6 hours.",
    categories: ["Charging"],
  },
  {
    id: "chg-2",
    title: "What types of charging stations are compatible with Euler vehicles?",
    answer:
      "Euler vehicles support standard CCS2 DC fast charging as well as Type 2 AC chargers and industrial 15A three-pin sockets for convenient depot and overnight charging.",
    categories: ["Charging"],
  },
  {
    id: "chg-3",
    title: "Can I charge my vehicle at home or at my small warehouse?",
    answer:
      "Yes, you can charge using a standard 15A wall socket or install an Euler-certified dedicated wallbox AC charger for faster overnight charging.",
    categories: ["Charging"],
  },
  {
    id: "chg-4",
    title: "How much does it cost to charge an electric vehicle?",
    answer:
      "Charging costs depend on local electricity tariffs. On average, commercial EV charging costs between ₹1.2 to ₹1.8 per kilometer, which is significantly lower than petrol or diesel.",
    categories: ["Charging"],
  },
  {
    id: "chg-5",
    title: "How do I find nearby charging stations?",
    answer:
      "You can locate nearby compatible charging stations directly in the Euler mobile app with real-time station availability, navigation directions, and socket types.",
    categories: ["Charging"],
  },
  {
    id: "chg-6",
    title: "Is it safe to charge in the rain?",
    answer:
      "Yes, it is completely safe. EV charging plugs and vehicle inlets are weatherproof (rated IP65/IP67) with built-in safety interlocks that prevent power flow until a secure seal is confirmed.",
    categories: ["Charging"],
  },
  {
    id: "chg-7",
    title: "Does fast charging degrade battery life over time?",
    answer:
      "Our liquid-cooled battery thermal management system prevents cell overheating during DC fast charging, preserving battery longevity and cell degradation rates over thousands of charge cycles.",
    categories: ["Charging"],
  },
  {
    id: "chg-8",
    title: "Can Euler install charging infrastructure at our fleet depot?",
    answer:
      "Yes. Euler Energy provides end-to-end depot charging turnkey installations, including power distribution planning, smart chargers, energy management software, and 24/7 technical maintenance.",
    categories: ["Charging"],
  },

  // --- SERVICE (7 items) ---
  {
    id: "srv-1",
    title: "Can I follow the progress of a repair in real-time?",
    answer:
      "Yes. You can track real-time servicing status, diagnostic updates, and estimated vehicle delivery times through the Euler mobile app and customer portal.",
    categories: ["Service"],
  },
  {
    id: "srv-2",
    title: "What is the scheduled maintenance interval for Euler vehicles?",
    answer:
      "Because electric powertrains require no oil changes or spark plug replacements, routine periodic service intervals are scheduled every 10,000 km or 6 months, primarily for suspension, brake pads, and tire inspections.",
    categories: ["Service"],
  },
  {
    id: "srv-3",
    title: "Where can I service my Euler commercial vehicle?",
    answer:
      "Euler operates a nationwide network of 112+ authorized service centers across 24 states, staffed by certified EV technicians with dedicated service bays.",
    categories: ["Service"],
  },
  {
    id: "srv-4",
    title: "Is mobile roadside assistance or on-site fleet servicing available?",
    answer:
      "Yes. Our 'Euler on Wheels' mobile service vans can be dispatched directly to your depot or breakdown location for on-site periodic maintenance and minor repairs.",
    categories: ["Service"],
  },
  {
    id: "srv-5",
    title: "How quickly are genuine replacement parts supplied?",
    answer:
      "We maintain regional parts distribution hubs across India guaranteeing 24-to-48-hour delivery for critical components, keeping fleet downtime to an absolute minimum.",
    categories: ["Service"],
  },
  {
    id: "srv-6",
    title: "What software updates are provided for vehicle intelligence?",
    answer:
      "Euler vehicles receive over-the-air (OTA) firmware updates to enhance motor efficiency, refine battery management algorithms, and introduce new telemetry features.",
    categories: ["Service"],
  },
  {
    id: "srv-7",
    title: "How do I schedule a service appointment?",
    answer:
      "Service appointments can be booked in under 60 seconds via the Euler Shepherd App, our toll-free customer helpline (1800 000 0000), or directly through your dedicated account manager.",
    categories: ["Service"],
  },

  // --- WARRANTY (8 items) ---
  {
    id: "war-1",
    title: "What is covered under warranty?",
    answer:
      "Comprehensive warranty coverage includes the proprietary battery pack, electric drivetrain, motor controller, chassis, and core electronics against manufacturing defects.",
    categories: ["Warranty"],
  },
  {
    id: "war-2",
    title: "How long is the battery warranty?",
    answer:
      "Euler vehicle battery packs are covered under warranty for up to 3 years or 100,000 km (whichever comes first), ensuring peace of mind throughout your fleet operations.",
    categories: ["Warranty"],
  },
  {
    id: "war-3",
    title: "How do I claim warranty support?",
    answer:
      "You can initiate a warranty claim instantly by contacting your nearest authorized Euler service center, booking an appointment through the mobile app, or calling our 24/7 dedicated fleet support hotline.",
    categories: ["Warranty"],
  },
  {
    id: "war-4",
    title: "What is not covered under warranty?",
    answer:
      "Normal wear-and-tear items such as tires, brake pads, wiper blades, cosmetic damage, unauthorized modifications, and issues resulting from accidents or improper usage are not covered under standard warranty.",
    categories: ["Warranty"],
  },
  {
    id: "war-5",
    title: "Does the warranty transfer if I sell the vehicle?",
    answer:
      "Yes, the manufacturer warranty is tied to the vehicle identification number (VIN) and automatically transfers to the new registered owner for the remaining warranty period.",
    categories: ["Warranty"],
  },
  {
    id: "war-6",
    title: "Is there an extended warranty option available for fleet buyers?",
    answer:
      "Yes, Euler offers extended warranty packages that cover powertrain and battery health for up to 5 years or 150,000 km, customizable for high-mileage logistics fleets.",
    categories: ["Warranty"],
  },
  {
    id: "war-7",
    title: "What is the roadside breakdown warranty policy?",
    answer:
      "Every new Euler vehicle includes 24/7 roadside assistance (RSA) throughout the warranty term, providing free towing to the nearest authorized workshop in case of mechanical or electrical failure.",
    categories: ["Warranty"],
  },
  {
    id: "war-8",
    title: "Does installing aftermarket accessories void the vehicle warranty?",
    answer:
      "Non-electrical accessories do not affect your warranty. However, any tampering with the high-voltage electrical architecture, wiring harness, or battery connections by unauthorized third parties will void the warranty.",
    categories: ["Warranty"],
  },
];

/**
 * FAQ Main Container — Figma node 3538:26361
 * - Dynamic tab filtering with curated questions per category
 * - By default, the first accordion is open across all tabs and searches
 * - When searching, the "Last Updated" and legal text paragraphs are hidden, showing only the relevant accordions
 */
export default function FaqContent() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  // By default, the first accordion (gen-1) is open on initial load
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    "gen-1": true,
  });

  const isSearching = searchQuery.trim().length > 0;

  const filteredFaqs = useMemo(() => {
    let list: FaqItem[] = [];

    if (activeCategory === "All") {
      // In "All" view, order with top featured items across categories
      list = [
        ...FAQ_DATABASE.filter((f) => f.id === "gen-1"),
        ...FAQ_DATABASE.filter((f) => f.id === "gen-2"),
        ...FAQ_DATABASE.filter((f) => f.id === "gen-3"),
        ...FAQ_DATABASE.filter((f) => f.id === "gen-4"),
        ...FAQ_DATABASE.filter((f) => f.id === "srv-1"),
        ...FAQ_DATABASE.filter((f) => f.id === "war-1"),
        ...FAQ_DATABASE.filter((f) => f.id === "war-2"),
        ...FAQ_DATABASE.filter((f) => f.id === "war-3"),
        ...FAQ_DATABASE.filter((f) => f.id === "war-4"),
        ...FAQ_DATABASE.filter((f) => f.id === "war-5"),
        ...FAQ_DATABASE.filter(
          (f) =>
            ![
              "gen-1",
              "gen-2",
              "gen-3",
              "gen-4",
              "srv-1",
              "war-1",
              "war-2",
              "war-3",
              "war-4",
              "war-5",
            ].includes(f.id)
        ),
      ];
    } else {
      list = FAQ_DATABASE.filter((faq) =>
        faq.categories.includes(activeCategory)
      );
    }

    if (isSearching) {
      const queryWords = searchQuery.trim().toLowerCase().split(/\s+/);
      list = list.filter((faq) =>
        queryWords.every(
          (word) =>
            faq.title.toLowerCase().includes(word) ||
            faq.answer.toLowerCase().includes(word)
        )
      );
    }

    return list;
  }, [activeCategory, searchQuery, isSearching]);

  // By default, the first accordion should be open in all tabs and search results
  useEffect(() => {
    if (filteredFaqs.length > 0) {
      setExpandedItems({ [filteredFaqs[0].id]: true });
    } else {
      setExpandedItems({});
    }
  }, [activeCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [showAllMobile, setShowAllMobile] = useState(false);

  // Reset showAllMobile on category or search change
  useEffect(() => {
    setShowAllMobile(false);
  }, [activeCategory, searchQuery]);

  // On mobile when not searching and showAllMobile is false, limit to first 10 items
  const displayedFaqs = useMemo(() => {
    return filteredFaqs;
  }, [filteredFaqs]);

  return (
    <div
      data-node-id="3538:26361"
      className="relative mx-auto flex w-full flex-col items-center justify-center bg-white px-5 py-8 sm:px-8 sm:py-10 lg:w-full lg:max-w-none lg:px-8 xl:px-0 lg:pb-[62px] lg:pt-[64px]"
    >
      <div className="flex w-full max-w-[720px] mx-auto flex-col gap-6 p-0 sm:gap-8 lg:max-w-[1040px] lg:gap-[40px] lg:px-0">
        {/* ============================================================== */}
        {/* Search & Category Filter Section (Figma 3538:26362 / 2979:8417)*/}
        {/* ============================================================== */}
        <div className="relative flex w-[373px] max-w-[calc(100vw_-_20px)] self-center flex-col items-center gap-4 sm:w-full sm:max-w-full sm:self-auto sm:gap-5 md:gap-[20px]">
          {/* Tapered Frosted Filter Tray Background on Desktop / Wide Tablets (Figma 3538:26363) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-[9.75px] left-1/2 hidden h-[76px] w-[811px] -translate-x-1/2 select-none min-[880px]:block"
          >
            <Image
              src="/assets/faq/filter-tray.svg"
              alt=""
              width={811}
              height={76}
              className="size-full object-contain"
            />
          </div>

          {/* Search Row Input Box (Figma 3538:26364 / 2979:8417) */}
          <div className="relative z-10 flex h-[42px] w-full items-center justify-between rounded-[50px] border border-black/[0.06] bg-[#f3f4f5] px-3.5 py-1 sm:h-[46px] sm:rounded-[500px] sm:border-black/[0.04] sm:py-[3px] sm:pl-4 sm:pr-3 sm:drop-shadow-[0px_2px_2px_rgba(0,0,0,0.1)] lg:h-[46px] lg:rounded-[500px] lg:border-black/[0.04] lg:py-[3px] lg:pl-4 lg:pr-[3px] lg:drop-shadow-[0px_2px_4px_rgba(0,0,0,0.1)]">
            <div className="flex w-full items-center gap-2.5 sm:gap-3">
              <div className="flex size-4 shrink-0 items-center justify-center sm:size-5">
                <Image
                  src="/assets/faq/icon-search.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="size-3.5 opacity-80 sm:size-[18px]"
                />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for the question"
                className="w-full bg-transparent font-sans text-[14px] font-semibold text-ink placeholder:text-ink/80 focus:outline-none sm:text-[15px] md:text-[16px] lg:text-[16px] lg:font-semibold lg:text-[rgba(18,18,18,0.80)]"
              />
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="cursor-pointer text-[12px] font-medium text-ink/60 hover:text-ink sm:text-[13px]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Popular Categories Pill Row (Figma 3538:26368 / 2979:8424) */}
          {/* Spreads full width edge-to-edge on mobile and small tablets, centers on medium tablets */}
          <div className="relative z-10 -mx-4 w-[calc(100%+32px)] sm:-mx-8 sm:w-[calc(100%+64px)] md:mx-0 md:w-full">
            <div className="faq-pill-row flex w-full items-center justify-start gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:px-8 md:justify-center md:px-0">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex h-[32px] shrink-0 cursor-pointer items-center gap-1.5 rounded-[400px] px-3 transition-all duration-200 active:scale-95 sm:h-[36px] sm:px-3.5 md:h-auto md:px-4 md:py-3.5 ${
                      isActive
                        ? "faq-active-category border-[0.4px] border-white text-white shadow-sm"
                        : "bg-[#cccccc]/30 text-ink hover:bg-[#cccccc]/50"
                    }`}
                    style={
                      isActive
                        ? {
                            backgroundImage:
                              "linear-gradient(246.81deg, rgb(14, 47, 109) 138.16%, rgb(29, 111, 255) 87.02%)",
                          }
                        : undefined
                    }
                  >
                    <span className="font-sans text-[12px] font-semibold leading-none sm:text-[13px] md:text-[16px] md:leading-[100%] lg:font-semibold">
                      {cat.label}
                    </span>
                    <span
                      className={`size-[3.15px] rounded-full ${
                        isActive ? "bg-white/50" : "bg-black/50"
                      }`}
                    />
                    <span
                      className={`font-sans text-[10px] font-normal leading-none sm:text-[12px] md:text-[13px] lg:text-[14px] ${
                        isActive ? "text-white" : "text-ink"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* Introductory Policy & Terms Text (Tablet & Desktop in Figma)   */}
        {/* Hidden on mobile (Figma 2979:7915) & hidden during search     */}
        {/* ============================================================== */}
        {!isSearching && (
          <div className="hidden w-full max-w-[1040px] flex-col font-sans text-[15px] leading-[1.6] text-ink md:flex md:h-auto md:min-h-[275px] lg:text-[18px]">
            <p className="mb-3 md:mb-4">
              <span className="font-normal">Last updated: </span>
              <span className="font-bold text-ink">October 22, 2021</span>
            </p>
            <p className="mb-3 md:mb-4">
              These Terms and Conditions (&ldquo;Terms&rdquo;) of online booking are executed between
              the User (as defined hereinafter) and Euler Motors Private Limited, a company having its
              registered office address at B-99, Panchsheel Vihar, New Delhi 110017 (hereinafter
              referred to as &ldquo;Euler Motors&rdquo;, &ldquo;we&rdquo; or &ldquo;us&rdquo; or
              &ldquo;our&rdquo;) and its affiliates and subsidiaries and applies to the booking of
              Vehicles (as defined hereinafter) listed on the &apos;Book Online&apos; section.
            </p>
            <p>
              By accessing or using our Platform and/or booking Vehicles through the Platform, you
              understand and agree to be bound by these Terms. The Terms, Privacy Policy, Purchase
              Terms (as defined hereinafter) shall be collectively referred to as &ldquo;Euler Motors
              Policies&rdquo;, including any modifications or amendments made thereto by Euler Motors
              from time to time, at its sole discretion.
            </p>
          </div>
        )}

        {/* ============================================================== */}
        {/* Dynamic Accordions List (Figma 3538:26361 / 2979:8438)         */}
        {/* ============================================================== */}
        <div
          key={activeCategory}
          id="faq-accordion-list"
          className="flex w-[373px] max-w-[calc(100vw_-_20px)] flex-col gap-2.5 self-center transition-all duration-300 sm:w-full sm:max-w-full sm:self-auto sm:gap-3 md:gap-[10px]"
        >
          {displayedFaqs.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[16px] bg-[#f3f4f5] px-6 py-12 text-center">
              <p className="font-sans text-[16px] font-semibold text-ink sm:text-[18px]">
                No matching questions found
              </p>
              <p className="mt-1 font-sans text-[13px] text-ink/70 sm:text-[14px]">
                We couldn&apos;t find anything matching &ldquo;{searchQuery}&rdquo;. Try another keyword or clear your search.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-4 cursor-pointer rounded-full bg-navy px-5 py-2 font-sans text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-navy/90 sm:text-[14px]"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <>
              {displayedFaqs
                .slice(0, !isSearching && !showAllMobile ? 10 : displayedFaqs.length)
                .map((faq, index) => {
                  const isOpen = !!expandedItems[faq.id];
                  return (
                    <article
                      key={faq.id}
                      className="overflow-hidden rounded-[16px] bg-[#f3f4f5] transition-all duration-200"
                      style={{
                        animation: `fadeIn 300ms ease-out ${Math.min(index * 30, 240)}ms both`,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(faq.id)}
                        aria-expanded={isOpen}
                        className="flex h-[56px] min-h-[56px] w-full cursor-pointer items-center justify-between gap-4 p-4 text-left transition-colors sm:h-[64px] sm:min-h-[64px] sm:p-5 sm:px-6 md:h-[70px] md:min-h-[70px] md:gap-5 md:p-6 md:px-8"
                      >
                        <span className="flex-1 font-sans text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-ink sm:text-[18px] md:text-[20px] lg:text-[20px] sm:tracking-[-0.4px]">
                          {faq.title}
                        </span>
                        <span className="relative flex size-5 shrink-0 items-center justify-center sm:size-5.5 md:size-6">
                          <Image
                            src="/assets/faq/icon-plus.svg"
                            alt=""
                            width={24}
                            height={24}
                            aria-hidden
                            className={`absolute size-5 select-none transition-all duration-300 sm:size-5.5 md:size-6 ${
                              isOpen ? "opacity-0 rotate-90 scale-75 pointer-events-none" : "opacity-100 rotate-0 scale-100"
                            }`}
                          />
                          <Image
                            src="/assets/faq/icon-minus.svg"
                            alt=""
                            width={24}
                            height={24}
                            aria-hidden
                            className={`absolute size-5 select-none transition-all duration-300 sm:size-5.5 md:size-6 ${
                              isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75 pointer-events-none"
                            }`}
                          />
                        </span>
                      </button>

                      <div
                        className="accordion-grid"
                        data-open={isOpen}
                      >
                        <div className="accordion-inner">
                          <div className="px-4 pb-4 pt-0 sm:px-6 sm:pb-6 md:px-8 md:pb-8">
                            <p className="font-sans text-[12px] font-normal leading-[1.4] text-ink/80 sm:text-[14px] sm:leading-[1.5] md:text-[16px] lg:!text-[18px] lg:font-normal lg:leading-[140%] lg:text-[#121212] sm:leading-[1.6] sm:text-ink">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}

              {/* Load More Button on Mobile (Figma node 2982:9198) */}
              {!isSearching && !showAllMobile && displayedFaqs.length > 10 && (
                <div className="mt-2 flex justify-center md:hidden">
                  <button
                    type="button"
                    onClick={() => setShowAllMobile(true)}
                    className="flex h-[32px] cursor-pointer items-center justify-center rounded-[4px] border border-black/50 bg-[#f3f4f5] px-5 font-display text-[12px] font-bold text-ink transition-colors hover:bg-black/10 active:scale-95"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <FloatingWidget mobileOnly mobileClassName="top-[361px] -translate-y-1/2" />
    </div>
  );
}
