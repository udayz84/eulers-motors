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

function MapPin({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute flex size-[37.43px] items-center justify-center rounded-full border border-white bg-[rgba(0,0,0,0.12)] p-1 backdrop-blur-[10.4px] ${className}`}
    >
      <div className="relative flex size-[27.43px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(-40deg,#0e2f6d_6.55%,#1d6fff_98.52%)]">
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
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCardIndex, setActiveCardIndex] = useState(0);
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
      <div className="absolute inset-0 size-full overflow-hidden hidden lg:block">
        <Image
          src={`${ASSET}map-desktop.png`}
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1600px"
          aria-hidden="true"
          className="object-cover object-center pointer-events-none"
        />
      </div>
      <div className="absolute inset-0 size-full overflow-hidden lg:hidden">
        <Image
          src={`${ASSET}map-mobile.png`}
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden="true"
          className="object-cover object-center pointer-events-none"
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

      <div className="absolute left-1/2 top-[14px] z-10 flex w-[353px] max-w-[calc(100%-24px)] sm:w-[500px] -translate-x-1/2 flex-col items-center gap-3 lg:top-[36px] lg:w-[846px] lg:max-w-none lg:gap-5">
        <p className="w-full text-center font-display text-[12px] sm:text-[14px] font-semibold leading-[1.15] tracking-[-0.24px] text-[rgba(18,18,18,0.8)] lg:text-[16px] lg:tracking-[-0.32px]">
          Search by an area
        </p>

        <div className="relative flex w-full flex-col items-center gap-1 lg:gap-[10px]">
          <Image
            src={`${ASSET}search-swoosh-mobile.svg`}
            alt=""
            width={348.409}
            height={60}
            aria-hidden="true"
            className="absolute bottom-[-3.42px] left-1/2 h-[60px] w-[348.409px] max-w-none -translate-x-1/2 lg:hidden"
          />
          <Image
            src={`${ASSET}search-swoosh-desktop.svg`}
            alt=""
            width={691.148}
            height={69}
            aria-hidden="true"
            className="absolute bottom-[-12.42px] left-1/2 hidden h-[69px] w-[691.148px] max-w-none -translate-x-1/2 lg:block"
          />

          <div className="relative flex h-8 sm:h-10 w-full items-center justify-between rounded-full border border-[rgba(0,0,0,0.04)] bg-[#f3f4f5] py-0.5 pl-2 pr-0.5 sm:py-1 sm:pl-3 shadow-[0px_2px_2px_rgba(0,0,0,0.1)] lg:h-[46px] lg:py-[3px] lg:pl-4 lg:pr-[3px]">
            <label className="flex w-[100px] sm:w-[160px] shrink-0 items-center gap-1 sm:gap-2 lg:w-[138px] lg:gap-3">
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
              <span className="flex size-3 shrink-0 items-center justify-center lg:hidden">
                <Image
                  src={`${ASSET}search-icon-mobile.svg`}
                  alt=""
                  width={11.2}
                  height={11.2}
                  aria-hidden="true"
                  className="max-w-none"
                />
              </span>
              <input
                aria-label={searchLabel}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search here..."
                className="w-[80px] sm:w-[130px] bg-transparent font-sans text-[12px] sm:text-[14px] font-semibold leading-none text-[rgba(18,18,18,0.8)] outline-none placeholder:text-[rgba(18,18,18,0.8)] lg:w-[106px] lg:text-[16px]"
              />
            </label>
            <button
              type="button"
              className="flex h-[26px] sm:h-[32px] shrink-0 items-center gap-1 rounded-full bg-white px-2 sm:px-3 text-center font-sans text-[10px] sm:text-[11px] font-semibold leading-[1.2] text-[#4a4f57] lg:h-[38px] lg:gap-1 lg:px-3 lg:text-[12px]"
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
            <div className="flex h-8 sm:h-9 w-max items-center lg:h-[42px]">
              {CITIES.map((city) => {
                const selected = city === selectedCity;
                return (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setSelectedCity(city)}
                    className={`flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-[400px] px-3 font-sans text-[12px] font-semibold leading-none lg:h-[42px] lg:px-3 lg:text-[16px] ${
                      selected
                        ? "border-[0.4px] border-solid border-white text-white lg:px-4"
                        : "text-[#121212]"
                    }`}
                    style={selected ? {
                      backgroundColor: "#121212",
                      backgroundImage: "linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%)",
                    } : undefined}
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
      </div>

      <MapPin className="left-[calc(50%+52px)] top-[193px] hidden lg:flex" />
      <MapPin className="left-[calc(50%-210px)] top-[324px] hidden lg:flex" />
      <MapPin className="left-[calc(50%+56px)] top-[489px] hidden lg:flex" />

      <MapPin className="left-[28px] top-[306.67px] lg:hidden" />
      <MapPin className="left-[calc(66.67%+39px)] top-[175.67px] lg:hidden" />
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

      <div className="absolute left-[68px] top-[117px] z-10 flex -translate-x-1/2 items-center gap-[6px] rounded-[4px] bg-[#f3f4f5] p-1 lg:hidden">
        <button type="button" aria-label="Map layers" className="flex h-8 w-[42px] items-center justify-center rounded-[4px] bg-[#121212] px-3 text-white">
          <Image src={`${ASSET}map-layers-mobile.svg`} alt="" width={16.5} height={16.125} aria-hidden="true" className="max-w-none" />
        </button>
        <button type="button" aria-label="List view" className="flex h-8 w-[42px] items-center justify-center rounded-[4px] px-3 text-[#121212]">
          <Image src={`${ASSET}list-control-mobile.svg`} alt="" width={13.5} height={12} aria-hidden="true" className="max-w-none" />
        </button>
      </div>

      <Image
        src={`${ASSET}divider-mobile.svg`}
        alt=""
        width={353}
        height={1}
        aria-hidden="true"
        className="absolute left-1/2 top-[520px] h-px w-[353px] max-w-[calc(100%-24px)] sm:w-[500px] -translate-x-1/2 lg:hidden"
      />

      <div className="absolute inset-x-0 top-[536px] z-10 flex w-full flex-col gap-3 lg:bottom-[39px] lg:top-auto lg:gap-[21px]">
        <div className="flex items-center justify-between px-3 lg:px-[39px]">
          <h2 className="font-display text-[16px] sm:text-[20px] font-semibold leading-[1.15] tracking-[-0.32px] text-[#121212] lg:text-[24px] lg:tracking-[-0.48px]">
            {charging
              ? "12 Charging Points"
              : isService
              ? `${String(resultCount).padStart(2, "0")} Service Centers Found`
              : `${String(resultCount).padStart(2, "0")} Dealers Found`}
          </h2>
          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              aria-label="Previous locations"
              onClick={() => scrollByCard(-1)}
              disabled={activeCardIndex === 0}
              className="flex size-8 items-center justify-center rounded-full border border-[rgba(18,18,18,0.2)] bg-white text-[#121212] shadow-sm transition-all hover:bg-[#f3f4f5] disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
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
              className="flex size-8 items-center justify-center rounded-full border border-[rgba(18,18,18,0.2)] bg-white text-[#121212] shadow-sm transition-all hover:bg-[#f3f4f5] disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
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

      <div className="absolute left-1/2 top-[758px] flex h-5 w-[116px] -translate-x-1/2 items-center rounded-[14px] bg-white p-1 lg:hidden">
          <div
            className="h-3 w-[30px] rounded-full bg-[#121212] transition-transform duration-200"
            style={{ transform: `translateX(${activeCardIndex * 18}px)` }}
          />
        </div>
    </section>
  );
}

