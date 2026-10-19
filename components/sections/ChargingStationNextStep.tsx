"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const asset = "/assets/charging-station-next-step/";

function ContactCard({
  icon,
  title,
  detail,
}: {
  icon: "phone.svg" | "email.svg";
  title: string;
  detail: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-6 rounded-2xl bg-[#f3f4f5] p-5">
      <span className="flex size-[58px] shrink-0 items-center justify-center rounded-[8.12px] bg-white">
        <Image src={`${asset}${icon}`} alt="" width={24} height={24} aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-[6px] whitespace-nowrap leading-[1.15] text-[#121212]">
        <p className="font-sans text-[16px] font-bold tracking-[-0.32px]">{title}</p>
        <p className="font-sans text-[12px] font-medium tracking-[-0.24px]">{detail}</p>
      </div>
    </div>
  );
}

function CustomDropdown({
  label,
  options,
  value,
  onChange,
  isMobile = false,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  isMobile?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className="relative flex min-w-0 flex-1 flex-col gap-1 font-sans text-[12px] leading-normal text-[#212125]"
    >
      <span className="font-sans text-[12px] font-normal leading-normal text-[#212125] whitespace-nowrap">
        {label}
      </span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between gap-2 border bg-white backdrop-blur-[8.15px] transition-all cursor-pointer text-left outline-none ${
          isMobile
            ? "h-[38px] sm:h-[42px] px-3.5 rounded-[8px]"
            : "h-[46px] px-4 rounded-[13px]"
        } ${
          isOpen
            ? "border-[#0e2f6d] ring-2 ring-[#0e2f6d]/15 shadow-sm"
            : "border-[#ededed] hover:border-[#ccd2dc]"
        }`}
      >
        <span
          className={`font-sans font-medium text-[#121212] truncate ${
            isMobile ? "text-[12px] sm:text-[13px]" : "text-[12px]"
          }`}
        >
          {value}
        </span>
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 text-[#121212] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            d="M1 1.5L7 6.5L13 1.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Euler Motors Styled Dropdown Menu */}
      {isOpen && (
        <ul
          role="listbox"
          className={`absolute left-0 top-[calc(100%+6px)] z-50 flex w-full flex-col overflow-hidden border border-[#ededed] bg-white shadow-[0px_10px_28px_rgba(0,0,0,0.12)] backdrop-blur-md ${
            isMobile ? "rounded-[10px] p-1" : "rounded-[13px] p-1.5"
          }`}
        >
          {options.map((option) => {
            const isSelected = option === value;
            return (
              <li
                key={option}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between font-sans transition-colors cursor-pointer select-none ${
                  isMobile
                    ? "rounded-[6px] px-3 py-2 text-[12px]"
                    : "rounded-[8px] px-3.5 py-2.5 text-[13px]"
                } ${
                  isSelected
                    ? "bg-[#0e2f6d]/8 font-semibold text-[#0e2f6d]"
                    : "font-medium text-[#121212] hover:bg-[#f3f4f5]"
                }`}
              >
                <span>{option}</span>
                {isSelected && (
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 14 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 text-[#0e2f6d]"
                  >
                    <path
                      d="M1.5 5.5L5 9L12.5 1.5"
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
        </ul>
      )}
    </div>
  );
}

function InputField({
  label,
  placeholder,
  defaultValue,
  value,
  onChange,
  onKeyDown,
  type = "text",
  maxLength,
}: {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
  maxLength?: number;
}) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-1 font-sans text-[12px] leading-normal text-[#212125]">
      <span>{label}</span>
      <span className="flex h-[46px] items-center justify-between gap-2 rounded-[13px] border border-[#ededed] bg-white px-4 backdrop-blur-[8.15px] focus-within:border-[#0e2f6d] focus-within:ring-2 focus-within:ring-[#0e2f6d]/15 transition-all">
        <input
          type={type}
          maxLength={maxLength}
          aria-label={label}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="h-full min-w-0 flex-1 bg-transparent font-sans text-[12px] font-medium text-[#121212] outline-none placeholder:text-[#9ca3af]"
        />
      </span>
    </label>
  );
}

function NextStepBadge() {
  return (
    <div className="relative flex h-[20.355px] items-center gap-[6px]">
      <Image
        src={`${asset}badge-left.svg`}
        alt=""
        width={149}
        height={21}
        className="absolute left-[3.43px] top-0 h-[20.355px] w-[148.821px]"
      />
      <span className="relative h-[20.355px] w-[18.821px] shrink-0">
        <Image
          src={`${asset}badge-right.svg`}
          alt=""
          width={18.2171}
          height={20.3555}
          className="absolute inset-y-0 left-[3.21%] h-[20.355px] w-[18.217px]"
        />
      </span>
      <span className="relative font-sans text-[14px] font-bold uppercase tracking-[0.7px] text-[#0e2f6d]">
        Next step
      </span>
    </div>
  );
}

type TabType = "Test drive" | "Price Enquiry" | "Fleet";

export default function ChargingStationNextStep() {
  const [activeTab, setActiveTab] = useState<TabType>("Test drive");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [whatYouHave, setWhatYouHave] = useState("Warehouse");

  // Prevent typing numbers in character-only fields (Name & City)
  const handleCharacterOnlyKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow control and navigation keys
    if (
      e.ctrlKey ||
      e.metaKey ||
      e.altKey ||
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "Tab" ||
      e.key === "Enter" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "Home" ||
      e.key === "End"
    ) {
      return;
    }
    // Block any digit (0-9)
    if (/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Prevent typing non-digits in mobile field
  const handleNumberOnlyKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.ctrlKey ||
      e.metaKey ||
      e.altKey ||
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "Tab" ||
      e.key === "Enter" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "Home" ||
      e.key === "End"
    ) {
      return;
    }
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Sanitize input to only characters (letters, spaces, hyphens, and apostrophes) - no numbers allowed
  const sanitizeCharactersOnly = (val: string) => {
    return val.replace(/[^a-zA-Z\s\-'.]/g, "");
  };

  return (
    <section className="relative isolate mx-auto flex h-auto w-full max-w-[1440px] flex-col items-stretch overflow-hidden bg-white p-0 lg:h-[611px] lg:flex-row lg:items-end lg:justify-between lg:px-20 lg:pt-16 lg:pb-[42px]">
      <div className="pointer-events-none absolute left-[72px] top-[189.55px] -z-10 hidden h-[441px] w-[631px] lg:block" aria-hidden="true">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={`${asset}background.png`}
            alt=""
            fill
            sizes="631px"
            className="scale-[1.002] object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent 65.285%, white 100%), linear-gradient(270deg, transparent 71.138%, white 100%), linear-gradient(0deg, transparent 69.07%, white 100%), linear-gradient(180deg, transparent 51.97%, white 99.827%)",
          }}
        />
        <div
          className="absolute inset-0 backdrop-blur-[8px]"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 30%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 30%, black 100%)",
          }}
        />
      </div>

      {/* Desktop Layout */}
      <div className="relative z-10 hidden h-full min-w-0 flex-1 flex-col items-start justify-between lg:flex">
        <div className="flex flex-col items-start gap-4 text-[#121212]">
          <NextStepBadge />
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-[42px] font-semibold leading-[1.15] tracking-[-0.84px]">
              Host a charging point.
            </h2>
            <p className="max-w-[474px] font-sans text-[16px] leading-normal">
              Have land, a warehouse or a petrol pump on a freight route? Host an Euler charging
              point and earn from it.
            </p>
          </div>
        </div>

        <div className="relative flex flex-wrap items-start gap-[10px]">
          <ContactCard icon="phone.svg" title="1800 000 0000" detail="9 am to 8 pm Monday to Saturday" />
          <ContactCard
            icon="email.svg"
            title="partners@eulermotors.com"
            detail="For charging and depot partners"
          />
        </div>
      </div>

      {/* Desktop Form */}
      <div className="relative z-10 hidden w-[517px] shrink-0 flex-col justify-center gap-8 rounded-2xl bg-[#f3f4f5] p-8 lg:flex lg:h-[465.47px]">
        <div className="flex flex-col gap-3 text-[#121212]">
          <h3 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px]">
            Book a test drive
          </h3>
          <p className="font-sans text-[16px] leading-normal">
            Two steps. We call you within one working day.
          </p>
        </div>

        <form className="flex flex-col gap-8">
          <div className="flex gap-3 max-[480px]:flex-col">
            <InputField
              label="Name *"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(sanitizeCharactersOnly(e.target.value))}
              onKeyDown={handleCharacterOnlyKeyDown}
            />
            <InputField
              label="Mobile number *"
              placeholder="10 digit"
              type="tel"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
              onKeyDown={handleNumberOnlyKeyDown}
            />
          </div>
          <div className="flex gap-3 max-[480px]:flex-col">
            <InputField
              label="City *"
              placeholder="Mumbai"
              value={city}
              onChange={(e) => setCity(sanitizeCharactersOnly(e.target.value))}
              onKeyDown={handleCharacterOnlyKeyDown}
            />
            <CustomDropdown
              label="What you have"
              options={["Petrol Pump", "Warehouse", "Land"]}
              value={whatYouHave}
              onChange={setWhatYouHave}
            />
          </div>
          <label className="flex w-full items-center gap-[10px] font-sans text-[14px] leading-normal text-[#121212]">
            <input
              type="checkbox"
              className="size-5 shrink-0 appearance-none rounded-full border border-[#0c1530] bg-[rgba(12,21,48,0.04)] checked:bg-[#0c2c66]"
            />
            <span>Euler Motors may contact me about this enquiry.</span>
          </label>
          <button
            type="button"
            className="flex h-[50.477px] w-fit items-center justify-center gap-2 rounded-[4px] border-[0.5px] border-white bg-[#121212] px-6 font-display text-[16px] font-semibold leading-none text-white"
          >
            Send enquiry
            <Image src={`${asset}arrow.svg`} alt="" width={22} height={14} aria-hidden="true" />
          </button>
        </form>
      </div>

      {/* Mobile Layout - Figma Design */}
      <div className="flex lg:hidden relative w-full max-w-[680px] mx-auto px-5 py-6 sm:px-8 sm:py-8 flex-col items-start gap-5">
        <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
          <div className="flex gap-[4px] items-center relative shrink-0 w-full">
            <div className="absolute h-[16px] left-[3.43px] top-0 w-[116.978px] overflow-hidden">
              <Image
                src="/assets/about-euler/next-step-rect-1.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="h-[16px] relative shrink-0 w-[14.794px] overflow-hidden">
              <Image
                src="/assets/about-euler/next-step-rect-2.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <p className="font-sans font-bold leading-normal relative shrink-0 text-[#0e2f6d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
              Next step
            </p>
          </div>
          <h2 className="font-display text-[28px] sm:text-[34px] font-semibold leading-[1.15] text-[#121212] tracking-[-0.56px] w-full">
            Tell us what you need!
          </h2>
          <p className="font-sans text-[12px] sm:text-[14px] leading-normal text-[#121212] w-full">
            We bring the vehicle to your depot with a load on it. Forty minutes. No pressure. You keep the cost report.
          </p>
        </div>
        <div className="flex flex-col gap-4 items-center w-full">
          <div className="relative w-full rounded-2xl bg-[#f3f4f5] p-4 sm:p-6 flex flex-col justify-center items-center gap-3 sm:gap-4 shrink-0">
            <div className="flex flex-col gap-[6px] items-start relative shrink-0 text-[#121212] w-full">
              <p className="font-sans font-bold leading-[1.15] relative shrink-0 text-[20px] sm:text-[24px] tracking-[-0.48px]">
                Book a test drive
              </p>
              <p className="font-sans text-[12px] sm:text-[13px] leading-normal text-[#121212]">
                Two steps. We call you within one working day.
              </p>
            </div>
            <div className="flex gap-2 sm:gap-3 items-center relative shrink-0 w-full">
              <button
                type="button"
                className={`flex flex-1 items-center justify-center h-8 sm:h-9 px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                  activeTab === "Test drive" ? "bg-[#0c2c66] text-white" : "backdrop-blur-[10px] bg-white/80 border border-white/50 text-[#121212]"
                }`}
                onClick={() => setActiveTab("Test drive")}
              >
                <span className="font-display font-semibold text-[12px] sm:text-[13px] whitespace-nowrap">
                  Test drive
                </span>
              </button>
              <button
                type="button"
                className={`flex flex-1 items-center justify-center h-8 sm:h-9 px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                  activeTab === "Price Enquiry" ? "bg-[#0c2c66] text-white" : "backdrop-blur-[10px] bg-white/80 border border-white/50 text-[#121212]"
                }`}
                onClick={() => setActiveTab("Price Enquiry")}
              >
                <span className="font-display font-semibold text-[12px] sm:text-[13px] whitespace-nowrap">
                  Price Enquiry
                </span>
              </button>
              <button
                type="button"
                className={`flex flex-1 items-center justify-center h-8 sm:h-9 px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                  activeTab === "Fleet" ? "bg-[#0c2c66] text-white" : "backdrop-blur-[10px] bg-white/80 border border-white/50 text-[#121212]"
                }`}
                onClick={() => setActiveTab("Fleet")}
              >
                <span className="font-display font-semibold text-[12px] sm:text-[13px] whitespace-nowrap">
                  Fleet
                </span>
              </button>
            </div>
            <div className="flex gap-2 sm:gap-3 items-start relative shrink-0 w-full">
              <div className="flex flex-1 flex-col gap-1 items-start min-w-0">
                <label className="font-sans font-medium leading-normal text-[#212125] text-[12px] whitespace-nowrap">
                  Name *
                </label>
                <div className="backdrop-blur-[8.15px] bg-white border border-[#ededed] flex h-[38px] sm:h-[42px] items-center px-3.5 py-1 rounded-[8px] w-full focus-within:border-[#0e2f6d] focus-within:ring-2 focus-within:ring-[#0e2f6d]/15 transition-all">
                  <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(sanitizeCharactersOnly(e.target.value))}
                    onKeyDown={handleCharacterOnlyKeyDown}
                    className="w-full bg-transparent font-sans font-medium text-[12px] sm:text-[13px] text-[#121212] outline-none placeholder:text-[#9ca3af]"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-1 items-start min-w-0">
                <label className="font-sans font-medium leading-normal text-[#212125] text-[12px] whitespace-nowrap">
                  Mobile number *
                </label>
                <div className="backdrop-blur-[8.15px] bg-white border border-[#ededed] flex h-[38px] sm:h-[42px] items-center px-3.5 py-1 rounded-[8px] w-full focus-within:border-[#0e2f6d] focus-within:ring-2 focus-within:ring-[#0e2f6d]/15 transition-all">
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="10 digit"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    onKeyDown={handleNumberOnlyKeyDown}
                    className="w-full bg-transparent font-sans font-medium text-[12px] sm:text-[13px] text-[#121212] outline-none placeholder:text-[#9ca3af]"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3 items-start relative shrink-0 w-full">
              <div className="flex flex-1 flex-col gap-1 items-start min-w-0">
                <label className="font-sans font-medium leading-normal text-[#212125] text-[12px] whitespace-nowrap">
                  City *
                </label>
                <div className="backdrop-blur-[8.15px] bg-white border border-[#ededed] flex h-[38px] sm:h-[42px] items-center px-3.5 py-1 rounded-[8px] w-full focus-within:border-[#0e2f6d] focus-within:ring-2 focus-within:ring-[#0e2f6d]/15 transition-all">
                  <input
                    type="text"
                    placeholder="Mumbai"
                    value={city}
                    onChange={(e) => setCity(sanitizeCharactersOnly(e.target.value))}
                    onKeyDown={handleCharacterOnlyKeyDown}
                    className="w-full bg-transparent font-sans font-medium text-[12px] sm:text-[13px] text-[#121212] outline-none placeholder:text-[#9ca3af]"
                  />
                </div>
              </div>
              <CustomDropdown
                label="What you have"
                options={["Petrol Pump", "Warehouse", "Land"]}
                value={whatYouHave}
                onChange={setWhatYouHave}
                isMobile
              />
            </div>
            <div className="flex flex-col gap-3 items-center justify-center relative shrink-0 w-full">
              <button
                type="button"
                className="bg-[#121212] cursor-pointer flex w-full gap-2 h-[44px] sm:h-[48px] items-center justify-center px-5 rounded-[4px] hover:bg-black transition-colors"
              >
                <span className="font-display font-semibold text-[13px] sm:text-[14px] text-white whitespace-nowrap">
                  Continue
                </span>
                <div className="h-[12px] relative shrink-0 w-[18px]">
                  <Image
                    src="/assets/about-euler/next-step-arrow.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </button>
              <p className="font-sans font-medium leading-normal text-[#121212] text-[11px] sm:text-[12px] text-center w-full">
                We never share your number with anyone else. No spam calls.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 sm:gap-3 items-stretch w-full shrink-0">
            <div className="flex w-full items-center gap-3 rounded-[8px] sm:rounded-xl bg-[#f3f4f5] p-2.5 sm:p-3">
              <div className="bg-[#0c2c66] relative rounded-[6px] sm:rounded-lg shrink-0 size-[42px] sm:size-[46px] flex items-center justify-center">
                <div className="relative size-[18px]">
                  <Image
                    src="/assets/about-euler/next-step-phone.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-0.5 items-start justify-center leading-[1.2] text-[#121212]">
                <p className="font-sans font-bold text-[14px] sm:text-[15px] tracking-[-0.28px]">
                  1800 000 0000
                </p>
                <p className="font-sans font-medium text-[12px] tracking-[-0.24px] text-[#5c6675]">
                  9 am to 8 pm Monday to Saturday
                </p>
              </div>
            </div>
            <div className="flex w-full items-center gap-3 rounded-[8px] sm:rounded-xl bg-[#f3f4f5] p-2.5 sm:p-3">
              <div className="bg-[#0c2c66] relative rounded-[6px] sm:rounded-lg shrink-0 size-[42px] sm:size-[46px] flex items-center justify-center">
                <div className="relative size-[18px]">
                  <Image
                    src="/assets/about-euler/next-step-email.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-0.5 items-start justify-center leading-[1.2] text-[#121212]">
                <p className="font-sans font-bold text-[14px] sm:text-[15px] tracking-[-0.28px]">
                  fleet@eulermotors.com
                </p>
                <p className="font-sans font-medium text-[12px] tracking-[-0.24px] text-[#5c6675]">
                  For fleets over 50 vehicles
                </p>
              </div>
            </div>
            <div className="flex w-full items-center gap-3 rounded-[8px] sm:rounded-xl bg-[#f3f4f5] p-2.5 sm:p-3">
              <div className="bg-[#0c2c66] relative rounded-[6px] sm:rounded-lg shrink-0 size-[42px] sm:size-[46px] flex items-center justify-center">
                <div className="relative size-[18px]">
                  <Image
                    src="/assets/about-euler/next-step-location.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-0.5 items-start justify-center leading-[1.2] text-[#121212]">
                <p className="font-sans font-bold text-[14px] sm:text-[15px] tracking-[-0.28px]">
                  Find your nearest dealer
                </p>
                <p className="font-sans font-medium text-[12px] tracking-[-0.24px] text-[#5c6675]">
                  112 locations, 24 states
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
