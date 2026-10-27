"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Dealer {
  id: string;
  name: string;
  badges: string[];
  address: string;
  hours: string;
  distance: string;
  phone: string;
}

interface ChargingStation {
  id: string;
  name: string;
  address: string;
  hours: string;
  distance: string;
  badges: string[];
  phone: string;
}

const DEALERS: Dealer[] = [
  {
    id: "kandivali",
    name: "Euler Motors — Kandivali",
    badges: ["Dealer", "Service"],
    address: "Akurli Metro Station, Kandivali East",
    hours: "Open until 7 pm",
    distance: "1.3",
    phone: "1800 000 0000",
  },
  {
    id: "thane",
    name: "Euler Motors — Thane",
    badges: ["Dealer"],
    address: "Arun Arcade, Chitalsar, Manpada",
    hours: "Open until 7 pm",
    distance: "52.5",
    phone: "1800 000 0000",
  },
  {
    id: "vasai",
    name: "Euler Motors — Vasai",
    badges: ["Dealer"],
    address: "Johnson's Compound, Golani Naka, Vasai East",
    hours: "Open until 7 pm",
    distance: "150",
    phone: "1800 000 0000",
  },
  {
    id: "ambattur",
    name: "Euler Motors, Ambattur",
    badges: ["Dealer", "Service"],
    address: "Ambattur Industrial Estate, Chennai 600058",
    hours: "Open until 7 pm",
    distance: "1,338",
    phone: "1800 000 0000",
  },
];

const CHARGING_STATIONS: ChargingStation[] = [
  {
    id: "fast-charge-andheri",
    name: "Euler Fast Charge, Andheri MIDC",
    address: "Marol MIDC, opposite Gate 2, Andheri East",
    hours: "Open 24 hours",
    badges: ["CCS2", "60 kW", "4 of 6 free"],
    distance: "13",
    phone: "1800 000 0000",
  },
  {
    id: "partner-hub-bhiwandi",
    name: "Partner Hub, Bhiwandi",
    address: "Marol MIDC, opposite Gate 2, Andheri East",
    hours: "Open 24 hours",
    badges: ["CCS2", "11 of 14 free"],
    distance: "18.9",
    phone: "1800 000 0000",
  },
  {
    id: "depot-charge-vashi",
    name: "Euler Depot Charge, Vashi",
    address: "Marol MIDC, opposite Gate 2, Andheri East",
    hours: "Open 24 hours",
    badges: ["CCS2", "Depot", "6 of 8 free"],
    distance: "22.5",
    phone: "1800 000 0000",
  },
  {
    id: "fast-charge-andheri-east",
    name: "Euler Fast Charge, Andheri MIDC",
    address: "Marol MIDC, opposite Gate 2, Andheri East",
    hours: "Open 24 hours",
    badges: ["CCS2", "60 kW", "4 of 6 free"],
    distance: "13",
    phone: "1800 000 0000",
  },
];

interface ServiceCenter {
  id: string;
  name: string;
  address: string;
  hours: string;
  distance: string;
  badges: string[];
  phone: string;
}

const SERVICE_CENTERS: ServiceCenter[] = [
  {
    id: "kandivali-service",
    name: "Euler Motors — Kandivali Service Hub",
    address: "Akurli Metro Station, Kandivali East, Mumbai",
    hours: "Open until 8 pm",
    badges: ["Service", "Spares", "Express Bay"],
    distance: "1.3",
    phone: "1800 000 0000",
  },
  {
    id: "andheri-service",
    name: "Euler Authorized Service Center, Andheri",
    address: "Saki Vihar Road, Marol MIDC, Andheri East, Mumbai",
    hours: "Open 8 am to 8 pm",
    badges: ["Service", "Battery Check", "Body Shop"],
    distance: "5.8",
    phone: "1800 000 0000",
  },
  {
    id: "turbhe-service",
    name: "Euler Service Point, Navi Mumbai",
    address: "MIDC Industrial Area, Turbhe, Navi Mumbai",
    hours: "Open until 7 pm",
    badges: ["Service", "Fleet Repair"],
    distance: "21.4",
    phone: "1800 000 0000",
  },
  {
    id: "thane-service",
    name: "Euler Central Workshop, Thane",
    address: "Arun Arcade, Chitalsar, Manpada, Thane West",
    hours: "Open 24 hours",
    badges: ["Service", "Spares", "Major Repairs"],
    distance: "32.0",
    phone: "1800 000 0000",
  },
  {
    id: "ambattur-service",
    name: "Euler Motors Service, Ambattur",
    address: "Ambattur Industrial Estate, Chennai 600058",
    hours: "Open until 7 pm",
    badges: ["Service", "Authorized"],
    distance: "1,338",
    phone: "1800 000 0000",
  },
];

const CITIES = ["Hyderabad", "Delhi NCR", "Bengaluru", "Mumbai", "Ahmedabad", "Kolkata"];

const ASSET = "/assets/dealer-locator/";

/**
 * The map is the background of the locator. It is a 1400x815 artwork that is
 * scaled with `object-cover`, so the size the browser has to download is driven
 * by the *height* of the frame, not by its width:
 *
 * - mobile  (< 768px): the frame is 794px tall, so the artwork is scaled to
 *   815 -> 794px and the visible image is 1400 * 794/815 = ~1364px wide.
 * - desktop (>= 768px): the frame is 815px tall and the artwork is 1400x815, so
 *   the visible image is 1400px wide (or the frame width, whichever is bigger).
 *
 * `sizes` therefore has to describe that scaled width. Using the frame width
 * instead made the browser download a ~400px wide image which it then had to
 * stretch, which is what made the map look blurry.
 */
const MAP_SIZES =
  "(min-width: 1640px) 1600px, (min-width: 1440px) calc(100vw - 40px), (min-width: 768px) 1400px, 1364px";

function MapPin({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute flex size-[37.43px] items-center justify-center rounded-full border border-white bg-[rgba(0,0,0,0.12)] p-1 backdrop-blur-[10.4px] ${className}`}
    >
      <div className="relative flex size-[27.429px] shrink-0 flex-col items-center justify-center gap-[22.857px] rounded-[11428.57px] bg-[linear-gradient(0deg,#000_0%,#000_100%)] bg-white p-[9.143px] lg:bg-[linear-gradient(-40deg,#0e2f6d_6.55%,#1d6fff_98.52%)]">
        <Image
          src={`${ASSET}pin-logo-desktop.svg`}
          alt=""
          width={13.1806}
          height={9.1435}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 hidden max-w-none -translate-x-1/2 -translate-y-1/2 lg:block"
        />
        <Image
          src={`${ASSET}pin-logo-mobile.svg`}
          alt=""
          width={13.1806}
          height={9.1435}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 lg:hidden"
        />
      </div>
    </div>
  );
}

function DealerCard({ dealer }: { dealer: Dealer }) {
  const directionsUrl = `https://maps.google.com/?q=${encodeURIComponent(`${dealer.name} ${dealer.address}`)}`;

  return (
    <article className="flex h-[180px] w-[300px] shrink-0 flex-col justify-between rounded-[12px] bg-white p-[14px] lg:h-[204px] lg:w-[400px] lg:p-5">
      <div className="flex flex-col items-start gap-3">
        <div className="flex h-6 items-center gap-[10px]">
          {dealer.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-[50px] bg-[#d4dbec] px-[10px] py-1 font-sans text-[12px] font-bold leading-4 text-black"
            >
              {badge}
            </span>
          ))}
        </div>
        <h3 className="font-display text-[16px] font-semibold leading-none tracking-[-0.16px] text-[#121212] lg:text-[18px]">
          {dealer.name}
        </h3>
        <p className="font-sans text-[12px] font-medium leading-none text-[#121212]">
          <span className="lg:hidden">Marol MIDC, opposite Gate 2, Andheri East</span>
          <span className="hidden lg:inline">{dealer.address}</span>
        </p>
        <div className="flex items-center gap-[10px] font-sans text-[12px] font-medium leading-none text-[rgba(18,18,18,0.6)]">
          <span className="lg:hidden">Open 24 hours</span>
          <span className="hidden lg:inline">{dealer.hours}</span>
          <span className="hidden h-1 w-1 rounded-full bg-[rgba(18,18,18,0.3)] lg:inline-block" />
          <span className="hidden lg:inline">Mon - Fri</span>
        </div>
      </div>

      <div className="flex h-8 items-center justify-between lg:h-[42px]">
        <p className="whitespace-nowrap font-sans text-[20px] font-bold leading-none tracking-[-0.4px] text-[#121212] lg:text-[22px] lg:tracking-[-0.44px]">
          {dealer.distance} <span className="font-normal text-[16px] tracking-[-0.32px] lg:text-[18px] lg:tracking-[-0.36px]">km</span>
        </p>
        <div className="flex items-center gap-2">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 items-center justify-center gap-[10px] rounded-[4px] bg-[#121212] pl-5 pr-3 font-display text-[12px] font-semibold leading-none text-white lg:h-[42px] lg:text-[14px]"
          >
            Get Directions
            <span className="hidden size-5 shrink-0 items-center justify-center lg:flex">
              <Image
                src={`${ASSET}directions-desktop.svg`}
                alt=""
                width={14.3438}
                height={16.7851}
                aria-hidden="true"
                className="max-w-none"
              />
            </span>
            <span className="flex size-[14px] shrink-0 items-center justify-center lg:hidden">
              <Image
                src={`${ASSET}directions-mobile.svg`}
                alt=""
                width={10.0938}
                height={11.8496}
                aria-hidden="true"
                className="max-w-none"
              />
            </span>
          </a>
          <a
            href={`tel:${dealer.phone.replaceAll(" ", "")}`}
            aria-label={`Call ${dealer.name}`}
            className="flex size-8 items-center justify-center rounded-[4px] border border-[rgba(18,18,18,0.5)] bg-[#f3f4f5] lg:size-[42px]"
          >
            <span className="hidden size-5 items-center justify-center lg:flex">
              <Image
                src={`${ASSET}call-desktop.svg`}
                alt=""
                width={18.6677}
                height={18.6677}
                aria-hidden="true"
                className="max-w-none"
              />
            </span>
            <span className="flex size-[14px] items-center justify-center lg:hidden">
              <Image
                src={`${ASSET}call-mobile.svg`}
                alt=""
                width={13.1674}
                height={13.1674}
                aria-hidden="true"
                className="max-w-none"
              />
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

function ChargingStationCard({ station }: { station: ChargingStation }) {
  const directionsUrl = `https://maps.google.com/?q=${encodeURIComponent(`${station.name} ${station.address}`)}`;

  return (
    <article className="flex h-[180px] w-[300px] shrink-0 flex-col justify-between rounded-[12px] bg-white p-[14px] lg:h-[204px] lg:w-[400px] lg:p-5">
      <div className="flex flex-col items-start gap-3">
        <div className="flex h-6 items-center gap-[10px]">
          {station.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-[50px] bg-[#d4dbec] px-[10px] py-1 font-sans text-[12px] font-bold leading-4 text-black"
            >
              {badge}
            </span>
          ))}
        </div>
        <h3 className="font-display text-[16px] font-semibold leading-none tracking-[-0.16px] text-[#121212] lg:text-[18px]">
          {station.name}
        </h3>
        <p className="font-sans text-[12px] font-medium leading-none text-[#121212]">
          {station.address}
        </p>
        <div className="flex items-center gap-[10px] font-sans text-[12px] font-medium leading-none text-[rgba(18,18,18,0.6)]">
          <span>{station.hours}</span>
        </div>
      </div>

      <div className="flex h-8 items-center justify-between lg:h-[42px]">
        <p className="whitespace-nowrap font-sans text-[0px] font-semibold leading-[0] tracking-[-0.4px] text-[#121212]">
          <span className="font-bold text-[22px] leading-none tracking-[-0.44px]">{station.distance}</span>
          <span className="text-[22px] leading-none tracking-[-0.44px]">{" "}</span>
          <span className="text-[18px] font-normal leading-none tracking-[-0.36px]">km</span>
        </p>
        <div className="flex items-center gap-2">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 items-center justify-center gap-[10px] rounded-[4px] bg-[#121212] pl-5 pr-3 font-display text-[12px] font-semibold leading-none text-white lg:h-[42px] lg:text-[14px]"
          >
            Get Directions
            <span className="hidden size-5 shrink-0 items-center justify-center lg:flex">
              <Image
                src={`${ASSET}directions-desktop.svg`}
                alt=""
                width={14.3438}
                height={16.7851}
                aria-hidden="true"
                className="max-w-none"
              />
            </span>
            <span className="flex size-[14px] shrink-0 items-center justify-center lg:hidden">
              <Image
                src={`${ASSET}directions-mobile.svg`}
                alt=""
                width={10.0938}
                height={11.8496}
                aria-hidden="true"
                className="max-w-none"
              />
            </span>
          </a>
          <a
            href={`tel:${station.phone.replaceAll(" ", "")}`}
            aria-label={`Call ${station.name}`}
            className="flex size-8 items-center justify-center rounded-[4px] border border-[rgba(18,18,18,0.5)] bg-[#f3f4f5] lg:size-[42px]"
          >
            <span className="hidden size-5 items-center justify-center lg:flex">
              <Image
                src={`${ASSET}call-desktop.svg`}
                alt=""
                width={18.6677}
                height={18.6677}
                aria-hidden="true"
                className="max-w-none"
              />
            </span>
            <span className="flex size-[14px] items-center justify-center lg:hidden">
              <Image
                src={`${ASSET}call-mobile.svg`}
                alt=""
                width={13.1674}
                height={13.1674}
                aria-hidden="true"
                className="max-w-none"
              />
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

function ServiceCenterCard({ serviceCenter }: { serviceCenter: ServiceCenter }) {
  const directionsUrl = `https://maps.google.com/?q=${encodeURIComponent(`${serviceCenter.name} ${serviceCenter.address}`)}`;

  return (
    <article className="flex h-[180px] w-[300px] shrink-0 flex-col justify-between rounded-[12px] bg-white p-[14px] lg:h-[204px] lg:w-[400px] lg:p-5">
      <div className="flex flex-col items-start gap-3">
        <div className="flex h-6 items-center gap-[10px]">
          {serviceCenter.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-[50px] bg-[#d4dbec] px-[10px] py-1 font-sans text-[12px] font-bold leading-4 text-black"
            >
              {badge}
            </span>
          ))}
        </div>
        <h3 className="font-display text-[16px] font-semibold leading-none tracking-[-0.16px] text-[#121212] lg:text-[18px]">
          {serviceCenter.name}
        </h3>
        <p className="font-sans text-[12px] font-medium leading-none text-[#121212]">
          <span className="lg:hidden">{serviceCenter.address.split(",")[0]}</span>
          <span className="hidden lg:inline">{serviceCenter.address}</span>
        </p>
        <div className="flex items-center gap-[10px] font-sans text-[12px] font-medium leading-none text-[rgba(18,18,18,0.6)]">
          <span className="lg:hidden">{serviceCenter.hours}</span>
          <span className="hidden lg:inline">{serviceCenter.hours}</span>
          <span className="hidden h-1 w-1 rounded-full bg-[rgba(18,18,18,0.3)] lg:inline-block" />
          <span className="hidden lg:inline">Mon - Sat</span>
        </div>
      </div>

      <div className="flex h-8 items-center justify-between lg:h-[42px]">
        <p className="whitespace-nowrap font-sans text-[20px] font-bold leading-none tracking-[-0.4px] text-[#121212] lg:text-[22px] lg:tracking-[-0.44px]">
          {serviceCenter.distance} <span className="font-normal text-[16px] tracking-[-0.32px] lg:text-[18px] lg:tracking-[-0.36px]">km</span>
        </p>
        <div className="flex items-center gap-2">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 items-center justify-center gap-[10px] rounded-[4px] bg-[#121212] pl-5 pr-3 font-display text-[12px] font-semibold leading-none text-white lg:h-[42px] lg:text-[14px]"
          >
            Get Directions
            <span className="hidden size-5 shrink-0 items-center justify-center lg:flex">
              <Image
                src={`${ASSET}directions-desktop.svg`}
                alt=""
                width={14.3438}
                height={16.7851}
                aria-hidden="true"
                className="max-w-none"
              />
            </span>
            <span className="flex size-[14px] shrink-0 items-center justify-center lg:hidden">
              <Image
                src={`${ASSET}directions-mobile.svg`}
                alt=""
                width={10.0938}
                height={11.8496}
                aria-hidden="true"
                className="max-w-none"
              />
            </span>
          </a>
          <a
            href={`tel:${serviceCenter.phone.replaceAll(" ", "")}`}
            aria-label={`Call ${serviceCenter.name}`}
            className="flex size-8 items-center justify-center rounded-[4px] border border-[rgba(18,18,18,0.5)] bg-[#f3f4f5] lg:size-[42px]"
          >
            <span className="hidden size-5 items-center justify-center lg:flex">
              <Image
                src={`${ASSET}call-desktop.svg`}
                alt=""
                width={18.6677}
                height={18.6677}
                aria-hidden="true"
                className="max-w-none"
              />
            </span>
            <span className="flex size-[14px] items-center justify-center lg:hidden">
              <Image
                src={`${ASSET}call-mobile.svg`}
                alt=""
                width={13.1674}
                height={13.1674}
                aria-hidden="true"
                className="max-w-none"
              />
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function DealerLocator({
  variant = "dealer",
  searchLabel = "Search dealers by area",
}: {
  variant?: "dealer" | "charging" | "service";
  searchLabel?: string;
}) {
  const charging = variant === "charging";
  const isService = variant === "service";
  /**
   * Figma frames the charging locator's map higher than the dealer one: on
   * mobile the artwork is lifted ~150px so the "MUMBAI" label (source y
   * 375-402 on the 1400x815 art -> y 365-392 in the 794px-tall frame) sits at
   * y 215-242, level with the top half of the floating quick-action rail,
   * whose collapsed height sits at y 211-294 of the frame. The cropped top edge
   * is clipped by the frame's `overflow-hidden`; the 150px this leaves free at
   * the bottom sits under the bottom blur ellipse, so it is not visible.
   */
  const mobileMapShift = charging ? "max-lg:-translate-y-[150px]" : "";
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cityRowScrollRef = useRef<HTMLDivElement>(null);

  const filteredDealers = DEALERS.filter((dealer) =>
    `${dealer.name} ${dealer.address}`.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredStations = CHARGING_STATIONS.filter((station) =>
    `${station.name} ${station.address} ${station.badges.join(" ")}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  const filteredServiceCenters = SERVICE_CENTERS.filter((sc) =>
    `${sc.name} ${sc.address} ${sc.badges.join(" ")}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  const resultCount = charging
    ? filteredStations.length
    : isService
    ? filteredServiceCenters.length
    : filteredDealers.length;

  useEffect(() => {
    if (window.matchMedia("(max-width: 1023px)").matches && cityRowScrollRef.current) {
      cityRowScrollRef.current.scrollLeft = 49;
    }
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
      setActiveCardIndex(0);
    }
  }, [variant, selectedCity, searchQuery]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll > 0) {
      const lastIndex = Math.max(0, resultCount - 1);
      setActiveCardIndex(Math.min(lastIndex, Math.max(0, Math.round((container.scrollLeft / maxScroll) * lastIndex))));
    }
  };

  const scrollByCard = (direction: -1 | 1) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const firstCard = container.querySelector<HTMLElement>("article");
    const cardWidth = firstCard?.offsetWidth ?? (window.innerWidth >= 1024 ? 400 : 300);
    const gap = window.innerWidth >= 1024 ? 20 : 12;
    const step = cardWidth + gap;
    container.scrollBy({
      left: direction * step,
      behavior: "smooth",
    });
    setActiveCardIndex((prev) =>
      Math.max(0, Math.min(resultCount - 1, prev + direction))
    );
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(event.key === "ArrowRight" ? 1 : -1);
    }
  };

  return (
    <section
      aria-label={charging ? "Charging station locator" : "Dealer locator"}
      className="relative mx-auto h-[794px] w-[calc(100%-16px)] sm:w-[calc(100%-24px)] lg:w-[calc(100%-40px)] max-w-[1600px] overflow-hidden rounded-[12px] border border-[rgba(0,0,0,0.1)] bg-white lg:h-[815px] lg:rounded-[20px]"
    >
      <div className="absolute inset-0 size-full overflow-hidden">
        <Image
          src={`${ASSET}map-image.png`}
          alt=""
          fill
          priority
          sizes={MAP_SIZES}
          quality={90}
          aria-hidden="true"
          className={`object-cover object-center pointer-events-none ${mobileMapShift}`}
        />
      </div>
      <div className="absolute bottom-[-151px] left-[-593px] h-[491px] w-[1551px] rounded-full bg-[#d4dbec] blur-[81px] lg:hidden" />
      <div className="absolute bottom-[-191px] left-[-112px] hidden h-[349px] w-[1662px] rounded-full bg-[#d4dbec] blur-[81px] lg:block" />
      <div className="absolute left-[-131px] top-[-128px] hidden h-[407px] w-[1710px] lg:block">
        <div className="absolute inset-[-39.84%_-9.48%]">
          <Image
            src={`${ASSET}glow-desktop.svg`}
            alt=""
            width={2034.87}
            height={731.505}
            aria-hidden="true"
            className="absolute inset-0 size-full max-w-none"
          />
        </div>
      </div>
      <div className="absolute left-[-557px] top-[-224px] h-[355px] w-[1490px] lg:hidden">
        <div className="absolute inset-[-45.74%_-10.89%]">
          <Image
            src={`${ASSET}glow-mobile.svg`}
            alt=""
            width={1814.39}
            height={679.029}
            aria-hidden="true"
            className="absolute inset-0 size-full max-w-none"
          />
        </div>
      </div>

      <div className="absolute left-1/2 top-[14px] z-10 flex w-[353px] max-w-[calc(100%-24px)] sm:w-[480px] -translate-x-1/2 flex-col items-center lg:top-[30px] lg:w-[692px] lg:max-w-none">
        <div className="relative flex w-full flex-col items-center gap-1 lg:gap-[10px]">
          <Image
            src={`${ASSET}search-swoosh-mobile.svg`}
            alt=""
            width={348.409}
            height={60}
            aria-hidden="true"
            className="absolute bottom-[-3.42px] left-1/2 h-[60px] w-[348.409px] max-w-none -translate-x-1/2 lg:hidden pointer-events-none"
          />
          <Image
            src={`${ASSET}search-swoosh-desktop.svg`}
            alt=""
            width={691.148}
            height={69}
            aria-hidden="true"
            className="absolute bottom-[-12.42px] left-1/2 hidden h-[69px] w-[691.148px] max-w-none -translate-x-1/2 lg:block pointer-events-none"
          />

          <div className="relative flex h-9 sm:h-10 w-full items-center justify-between rounded-full border border-[rgba(0,0,0,0.06)] bg-white py-0.5 pl-3 pr-1 sm:py-1 sm:pl-4 sm:pr-1.5 shadow-[0px_2px_12px_rgba(0,0,0,0.08)] lg:h-[46px] lg:py-[3px] lg:pl-5 lg:pr-[4px]">
            <label className="flex w-[120px] sm:w-[160px] shrink-0 items-center gap-2 lg:w-[150px] lg:gap-3">
              <span className="hidden size-5 shrink-0 items-center justify-center lg:flex">
                <Image
                  src={`${ASSET}search-icon-desktop.svg`}
                  alt=""
                  width={18.1667}
                  height={18.1667}
                  aria-hidden="true"
                  className="max-w-none"
                />
              </span>
              <span className="flex size-3.5 shrink-0 items-center justify-center lg:hidden">
                <Image
                  src={`${ASSET}search-icon-mobile.svg`}
                  alt=""
                  width={12}
                  height={12}
                  aria-hidden="true"
                  className="max-w-none"
                />
              </span>
              <input
                aria-label={searchLabel}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search here..."
                className="w-full bg-transparent font-sans text-[13px] sm:text-[14px] font-normal sm:font-medium leading-none text-[#121212] outline-none placeholder:text-[rgba(18,18,18,0.65)] lg:text-[16px]"
              />
            </label>
            <button
              type="button"
              className="flex h-[28px] sm:h-[32px] shrink-0 items-center gap-1.5 rounded-full bg-white px-2.5 sm:px-3.5 border border-[rgba(0,0,0,0.08)] shadow-sm text-center font-sans text-[10px] sm:text-[11px] font-semibold leading-[1.2] text-[#4a4f57] hover:bg-[#f8f9fa] transition-colors cursor-pointer lg:h-[38px] lg:px-4 lg:text-[12px]"
            >
              <Image
                src={`${ASSET}location-icon-desktop.svg`}
                alt=""
                width={14}
                height={14}
                aria-hidden="true"
                className="hidden max-w-none lg:block"
              />
              <Image
                src={`${ASSET}location-icon-mobile.svg`}
                alt=""
                width={14}
                height={14}
                aria-hidden="true"
                className="max-w-none lg:hidden"
              />
              Use my current location
            </button>
          </div>

          <div
            ref={cityRowScrollRef}
            className="no-scrollbar relative h-8 sm:h-9 w-[331px] sm:w-[480px] max-w-full touch-pan-x overflow-x-auto overflow-y-hidden rounded-b-[24px] lg:h-[42px] lg:w-[600px] lg:max-w-none lg:overflow-visible"
          >
            <div className="flex h-8 sm:h-9 w-max lg:w-full items-center lg:justify-between px-1 lg:px-3 lg:h-[42px]">
              {CITIES.map((city) => {
                const selected = city === selectedCity;
                return (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setSelectedCity(city)}
                    className={`flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-full font-sans text-[12px] font-semibold leading-none transition-all cursor-pointer lg:h-[38px] lg:text-[15px] ${
                      selected
                        ? "bg-[#1363DF] text-white px-4 lg:px-5 shadow-sm"
                        : "text-[#121212] px-2.5 sm:px-3 hover:text-[#1363DF]"
                    }`}
                  >
                    {city}
                  </button>
                );
              })}
            </div>
            <Image
              src={`${ASSET}chips-fade-left.svg`}
              alt=""
              width={27.2397}
              height={23.1431}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1 h-[23px] w-[27px] max-w-none lg:hidden"
            />
            <Image
              src={`${ASSET}chips-fade-right.svg`}
              alt=""
              width={27.2397}
              height={23.1431}
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-1 h-[23px] w-[27px] max-w-none rotate-180 lg:hidden"
            />
          </div>
        </div>

        {/* Map / Cards toggle directly under Cities matching Figma */}
        <div className="mt-2.5 sm:mt-3 flex items-center gap-[6px] rounded-[6px] bg-[#f3f4f5] p-1 shadow-sm border border-black/5">
          <button
            type="button"
            aria-label="Map view"
            title="Map view"
            onClick={() => setViewMode("map")}
            className={`flex h-8 w-[42px] cursor-pointer items-center justify-center rounded-[4px] px-3 transition-colors ${
              viewMode === "map"
                ? "bg-[#121212] text-white shadow-sm"
                : "text-[#121212] hover:bg-black/5"
            }`}
          >
            <svg
              width="17"
              height="16"
              viewBox="0 0 16.5 16.125"
              fill="none"
              className="stroke-current max-w-none"
              aria-hidden="true"
            >
              <path
                d="M15.75 6.75V6.16311C15.75 4.7084 15.75 3.98105 15.3107 3.52913C14.8713 3.07721 14.1642 3.07721 12.75 3.07721H11.191C10.503 3.07721 10.4973 3.07587 9.87862 2.76625L7.37991 1.51585C6.33663 0.99378 5.81499 0.732743 5.25929 0.750884C4.70358 0.769025 4.19908 1.06356 3.19009 1.65263L2.26919 2.19027C1.52804 2.62297 1.15747 2.83932 0.953736 3.19923C0.750002 3.55915 0.750002 3.99745 0.750002 4.87405V11.0368C0.750002 12.1886 0.750002 12.7645 1.0067 13.085C1.17751 13.2983 1.41687 13.4416 1.6815 13.4892C2.0792 13.5606 2.5661 13.2763 3.53988 12.7078L3.53991 12.7078C4.20117 12.3217 4.83758 11.9208 5.62865 12.0295C6.29152 12.1206 6.9075 12.5389 7.5 12.8354"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M5.25 0.749999L5.25 12" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M10.5 3V6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M12.375 7.875C10.5485 7.875 9 9.38737 9 11.2222C9 13.0926 10.5765 14.3856 12.0274 15.2838C12.1333 15.3436 12.2531 15.375 12.375 15.375C12.4969 15.375 12.6167 15.3436 12.7226 15.2838C14.1762 14.3943 15.75 13.0862 15.75 11.2222C15.75 9.38737 14.2015 7.875 12.375 7.875Z"
                strokeWidth="1.5"
              />
              <path d="M12.375 11.25H12.3817" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Cards view"
            title="Cards view"
            onClick={() => setViewMode("list")}
            className={`flex h-8 w-[42px] cursor-pointer items-center justify-center rounded-[4px] px-3 transition-colors ${
              viewMode === "list"
                ? "bg-[#121212] text-white shadow-sm"
                : "text-[#121212] hover:bg-black/5"
            }`}
          >
            <svg
              width="14"
              height="12"
              viewBox="0 0 13.5 12"
              fill="none"
              className="stroke-current max-w-none"
              aria-hidden="true"
            >
              <path d="M0.75 0.75L8.25 0.750001" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M0.75 6L12.75 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M0.75 11.25L12.75 11.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Map pins and details - only in map view */}
      {viewMode === "map" && (
        <>
          <MapPin className="left-[calc(50%+115px)] top-[220px] hidden lg:flex" />
          <MapPin className="left-[calc(50%-210px)] top-[324px] hidden lg:flex" />
          <MapPin className="left-[calc(50%+56px)] top-[489px] hidden lg:flex" />

          <MapPin className="left-[50px] top-[306.67px] lg:hidden" />
          <MapPin className="left-[calc(66.67%+49px)] top-[165.67px] lg:hidden" />
          <MapPin className="left-[calc(66.67%+43.76px)] top-[471.67px] lg:hidden" />
          <div className="absolute left-[calc(33.33%+24.68px)] top-[331.36px] h-[65.31px] w-[88.25px] lg:left-[calc(50%-88px)] lg:top-[348.69px]">
            <Image
              src={`${ASSET}pin-detail-desktop.svg`}
              alt=""
              width={88.2466}
              height={91.194}
              aria-hidden="true"
              className="absolute left-0 top-[-25.89px] hidden max-w-none lg:block"
            />
            <Image
              src={`${ASSET}pin-detail-mobile.svg`}
              alt=""
              width={88.2466}
              height={91.194}
              aria-hidden="true"
              className="absolute left-0 top-[-25.89px] max-w-none lg:hidden"
            />
          </div>
          <span className="absolute left-[calc(33.33%+69.3px)] top-[381px] size-4 rounded-full border-2 border-white bg-[#1d6fff] lg:left-[calc(50%-42px)] lg:top-[399px]" aria-hidden="true" />
        </>
      )}

      {/* Map View: Horizontal cards at bottom */}
      {viewMode === "map" && (
        <>
          <Image
            src={`${ASSET}divider-mobile.svg`}
            alt=""
            width={353}
            height={1}
            aria-hidden="true"
            className="absolute left-1/2 top-[520px] h-px w-[353px] max-w-[calc(100%-24px)] sm:w-[500px] -translate-x-1/2 lg:hidden"
          />

          <div className="absolute inset-x-0 top-[536px] z-10 flex w-full flex-col gap-3 lg:bottom-[36px] lg:top-auto lg:gap-[18px]">
            <div className="flex items-center justify-between px-3 lg:px-[39px]">
              <h2 className="font-display text-[16px] sm:text-[20px] font-semibold leading-[1.15] tracking-[-0.32px] text-[#121212] lg:text-[24px] lg:tracking-[-0.48px]">
                {charging
                  ? "12 Charging Points"
                  : isService
                  ? `${String(resultCount).padStart(2, "0")} Service Centers Found`
                  : `${String(resultCount).padStart(2, "0")} Dealers Found`}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous locations"
                  onClick={() => scrollByCard(-1)}
                  disabled={activeCardIndex === 0}
                  className="flex size-7 sm:size-8 items-center justify-center rounded-full border border-[rgba(18,18,18,0.2)] bg-white text-[#121212] shadow-sm transition-all hover:bg-[#f3f4f5] disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next locations"
                  onClick={() => scrollByCard(1)}
                  disabled={activeCardIndex >= resultCount - 1}
                  className="flex size-7 sm:size-8 items-center justify-center rounded-full border border-[rgba(18,18,18,0.2)] bg-white text-[#121212] shadow-sm transition-all hover:bg-[#f3f4f5] disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              onKeyDown={handleCardKeyDown}
              tabIndex={0}
              role="region"
              aria-label={charging ? "Charging station locations" : "Dealer locations"}
              className="no-scrollbar flex w-full snap-x snap-mandatory scroll-pl-3 items-center gap-3 overflow-x-auto overscroll-x-contain touch-pan-x px-3 lg:scroll-pl-[39px] lg:gap-5 lg:px-[39px]"
            >
              {charging
                ? filteredStations.map((station) => (
                    <div key={station.id} className="shrink-0 snap-start">
                      <ChargingStationCard station={station} />
                    </div>
                  ))
                : isService
                ? filteredServiceCenters.map((serviceCenter) => (
                    <div key={serviceCenter.id} className="shrink-0 snap-start">
                      <ServiceCenterCard serviceCenter={serviceCenter} />
                    </div>
                  ))
                : filteredDealers.map((dealer) => (
                    <div key={dealer.id} className="shrink-0 snap-start">
                      <DealerCard dealer={dealer} />
                    </div>
                  ))}
            </div>
          </div>

          {/* Bottom handle bar indicator matching Figma and screenshot */}
          <div
            className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 h-1.5 w-10 sm:w-12 rounded-full bg-[#121212]/35 pointer-events-none"
            aria-hidden="true"
          />
        </>
      )}

      {/* List / Cards View: Cards appear instead of the map */}
      {viewMode === "list" && (
        <div className="absolute inset-x-0 bottom-0 top-[140px] sm:top-[150px] lg:top-[180px] z-20 flex flex-col overflow-y-auto bg-[#eef2f8]/95 px-4 pb-8 backdrop-blur-md lg:px-10">
          <div className="mb-4 flex items-center justify-between pt-2">
            <h2 className="font-display text-[16px] font-semibold leading-[1.15] tracking-[-0.32px] text-[#121212] sm:text-[20px] lg:text-[24px] lg:tracking-[-0.48px]">
              {charging
                ? "12 Charging Points"
                : isService
                ? `${String(resultCount).padStart(2, "0")} Service Centers Found`
                : `${String(resultCount).padStart(2, "0")} Dealers Found`}
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 pb-6 lg:gap-5">
            {charging
              ? filteredStations.map((station) => (
                  <div key={station.id} className="w-[300px] shrink-0 lg:w-[400px]">
                    <ChargingStationCard station={station} />
                  </div>
                ))
              : isService
              ? filteredServiceCenters.map((serviceCenter) => (
                  <div key={serviceCenter.id} className="w-[300px] shrink-0 lg:w-[400px]">
                    <ServiceCenterCard serviceCenter={serviceCenter} />
                  </div>
                ))
              : filteredDealers.map((dealer) => (
                  <div key={dealer.id} className="w-[300px] shrink-0 lg:w-[400px]">
                    <DealerCard dealer={dealer} />
                  </div>
                ))}
          </div>
        </div>
      )}
    </section>
  );
}

