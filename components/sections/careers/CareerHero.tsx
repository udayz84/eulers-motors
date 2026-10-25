"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import FloatingWidget from "@/components/FloatingWidget";
import Eyebrow from "@/components/ui/Eyebrow";
import type { CareerFilters } from "./types";

type SelectOption = {
  label: string;
  value: string;
};

const DEPARTMENT_OPTIONS: SelectOption[] = [
  { label: "Human Resource", value: "" },
  { label: "Engineering", value: "Engineering" },
  { label: "Manufacturing", value: "Manufacturing" },
  { label: "Sales", value: "Sales" },
  { label: "Software", value: "Software" },
  { label: "Service", value: "Service" },
  { label: "Warranty", value: "Warranty" },
];

const LOCATION_OPTIONS: SelectOption[] = [
  { label: "Not sure, please suggest one", value: "" },
  { label: "New Delhi", value: "New Delhi" },
  { label: "Bengaluru", value: "Bengaluru" },
  { label: "Pune", value: "Pune" },
  { label: "Chennai", value: "Chennai" },
  { label: "Mumbai", value: "Mumbai" },
];

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
    width: number;
    maxHeight: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const listboxId = useId().replace(/:/g, "");
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const selected = options[selectedIndex] ?? options[0];

  const updateMenuPosition = useCallback(() => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const below = window.innerHeight - rect.bottom - 8;
    const above = rect.top - 8;
    const openUp = below < 220 && above > below;
    const maxHeight = Math.min(260, openUp ? above : below);

    setMenuPosition({
      top: openUp ? rect.top - maxHeight - 4 : rect.bottom + 4,
      left: rect.left,
      width: rect.width,
      maxHeight,
    });
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  const selectOption = useCallback(
    (option: SelectOption) => {
      onChange(option.value);
      closeMenu();
    },
    [closeMenu, onChange],
  );

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (containerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    };
    const handleScroll = (event: Event) => {
      if (menuRef.current?.contains(event.target as Node)) return;
      updateMenuPosition();
    };
    const handleResize = () => updateMenuPosition();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [open, closeMenu, updateMenuPosition]);

  const openMenu = () => {
    setActiveIndex(selectedIndex);
    updateMenuPosition();
    setOpen(true);
  };

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        openMenu();
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % options.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => (index - 1 + options.length) % options.length);
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        selectOption(options[activeIndex]);
        break;
      case "Escape":
        event.preventDefault();
        closeMenu();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  const labelId = `${listboxId}-label`;
  const valueId = `${listboxId}-value`;

  return (
    <div
      ref={containerRef}
      className="relative flex min-w-0 flex-col gap-1 font-sans text-xs font-medium text-white lg:text-sm"
    >
      <span id={labelId}>{label}</span>
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={`${labelId} ${valueId}`}
        aria-activedescendant={open ? `${listboxId}-option-${activeIndex}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={handleButtonKeyDown}
        className="relative flex h-9 w-full cursor-pointer items-center rounded-[4px] border border-[#ededed] bg-white px-4 pr-[38px] text-left font-sans text-xs font-medium text-placeholder outline-none transition-colors focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 lg:h-[42px] lg:text-sm"
      >
        <span id={valueId} className="truncate">
          {selected.label}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 14 8"
          className={`pointer-events-none absolute right-4 top-1/2 h-2 w-[14px] -translate-y-1/2 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="m1 1 6 6 6-6" fill="none" stroke="#121212" strokeWidth="1.4" />
        </svg>
      </button>

      {open &&
        menuPosition &&
        createPortal(
          <ul
            ref={menuRef}
            id={listboxId}
            role="listbox"
            aria-labelledby={labelId}
            onMouseDown={(event) => event.preventDefault()}
            style={{
              position: "fixed",
              top: menuPosition.top,
              left: menuPosition.left,
              width: menuPosition.width,
              maxHeight: menuPosition.maxHeight,
            }}
            className="z-[100] flex flex-col overflow-y-auto rounded-xl border border-[#ededed] bg-white p-1 shadow-[0px_10px_28px_rgba(0,0,0,0.14)]"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isActive = index === activeIndex;

              return (
                <li
                  id={`${listboxId}-option-${index}`}
                  key={option.label}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectOption(option)}
                  className={`flex cursor-pointer select-none items-center justify-between gap-2 rounded-[8px] px-3 py-2 font-sans text-xs transition-colors lg:px-4 lg:text-sm ${
                    isActive ? "bg-[#f3f4f5]" : ""
                  } ${isSelected ? "font-semibold text-ink" : "font-medium text-ink/80"}`}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 14 11"
                      className="h-[11px] w-[14px] shrink-0 text-brand"
                    >
                      <path
                        d="M1.5 5.5 5 9l7.5-7.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>,
          document.body,
        )}
    </div>
  );
}

type CareerHeroProps = {
  filters: CareerFilters;
  onChange: (filters: CareerFilters) => void;
};

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-[14px] shrink-0">
      <circle cx="6.9" cy="6.9" r="4.8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="m10.5 10.5 3.2 3.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 22 14" className="h-3 w-[18.86px]">
      <path d="M1 7h19M14 1l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function CareerHero({ filters, onChange }: CareerHeroProps) {
  const findJobs = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative isolate h-[734px] overflow-hidden bg-black text-white lg:h-[700px]" aria-labelledby="careers-heading">
      <div
        className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden bg-[linear-gradient(180deg,rgb(29_111_255_/_0%)_31.136%,#041231_60.12%),linear-gradient(8.53deg,#0e2f6d_28.191%,#1d6fff_89.743%)] max-lg:bg-[linear-gradient(180deg,rgb(29_111_255_/_0%)_31.14%,#041231_60.12%),linear-gradient(5deg,#0e2f6d_28.19%,#1d6fff_89.74%)] lg:bg-[linear-gradient(-86.6deg,#0e2f6d_63.511%,#1d6fff_87.226%),#000]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[url('/assets/careers/hero-texture.png')] bg-[length:cover] bg-[position:center_bottom] bg-no-repeat opacity-[0.12] lg:bg-left-top lg:bg-[length:1440px_810.895px]" />
        <div className="absolute top-[155.67px] bottom-auto left-[-41px] h-[579px] w-[477px] overflow-hidden lg:inset-0 lg:top-auto lg:bottom-[-204px] lg:h-[909px] lg:w-full">
          <Image
            src="/assets/careers/hero-mobile.png"
            alt=""
            width={1440}
            height={1394}
            priority
            className="absolute top-[-53.43%] left-[-2.96%] h-[153.36%] w-[104.66%] max-w-none object-fill lg:hidden"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 42%, black 60%, black 67%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 42%, black 60%, black 67%, transparent 100%)",
            }}
          />
          <Image
            src="/assets/careers/hero-desktop.png"
            alt=""
            width={1440}
            height={1394}
            className="absolute top-[-53.45%] left-[46.45%] hidden h-[153.36%] w-[54.44%] max-w-none object-fill lg:block lg:[mask-image:linear-gradient(to_right,transparent_0%,black_6%)]"
          />
        </div>
        <div className="absolute inset-0 max-lg:hidden bg-[linear-gradient(180deg,#2059bf_0%,rgb(32_89_191_/_0%)_39.666%)] lg:bg-[linear-gradient(268.23deg,rgb(36_106_227_/_0%)_32.76%,#246ae3_76.34%)]" />
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(25,75,165,0) calc(max(80px, (100vw - 1440px) / 2 + 80px) + 259.26px), rgba(25,75,165,0.5) 46.46%, rgba(25,75,165,0) 58%)",
          }}
        />
      </div>

      <div className="absolute top-[101.31px] left-5 w-[calc(100%_-_40px)] max-w-[518.52px] lg:top-[407px] lg:left-[max(80px,calc((100vw-1440px)/2+80px))] lg:w-[518.52px]">
        <form className="flex flex-col items-stretch gap-3 lg:gap-2" onSubmit={findJobs}>
          <label className="flex h-[42px] items-center gap-2 rounded-[50px] border border-black/[0.06] bg-white px-3 text-ink">
            <SearchIcon />
            <span className="sr-only">Search open roles</span>
            <input
              className="w-full min-w-0 border-0 bg-transparent font-sans text-sm font-semibold text-ink outline-0 placeholder:text-ink/80 placeholder:opacity-100"
              type="search"
              value={filters.search}
              onChange={(event) => onChange({ ...filters, search: event.target.value })}
              placeholder="Search for the question"
            />
          </label>

          <FilterSelect
            label="Department"
            value={filters.department}
            options={DEPARTMENT_OPTIONS}
            onChange={(department) => onChange({ ...filters, department })}
          />

          <FilterSelect
            label="Location"
            value={filters.location}
            options={LOCATION_OPTIONS}
            onChange={(location) => onChange({ ...filters, location })}
          />

          <button type="submit" className="flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded bg-white px-5 font-display text-xs font-bold text-ink transition-colors duration-[160ms] hover:bg-mist lg:h-[50px] lg:px-6 lg:text-base">
            Find Jobs
            <ArrowIcon />
          </button>
        </form>
      </div>

      <div className="absolute top-[552px] left-5 flex w-[calc(100%_-_40px)] max-w-[518.52px] flex-col items-start gap-[14px] lg:top-[148px] lg:left-[max(80px,calc((100vw-1440px)/2+80px))] lg:w-[518.52px]">
        <Eyebrow label="Grow with us" dark icons="white" className="h-4 lg:h-[20.36px]" />
        <h1 id="careers-heading" className="m-0 w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white lg:w-[498.92px] lg:text-[52px] lg:tracking-[-1.04px]">Shape the Future of Electric Mobility</h1>
        <p className="m-0 w-full font-sans text-xs font-normal leading-normal text-white lg:w-[518.52px] lg:text-base">
          Be part of a collaborative, focused team solving real infrastructure and engineering
          challenges to clean commercial transport across India.
        </p>
      </div>

      <FloatingWidget mobileClassName="bottom-[60px]" desktopClassName="lg:top-[400px]" />
    </section>
  );
}
