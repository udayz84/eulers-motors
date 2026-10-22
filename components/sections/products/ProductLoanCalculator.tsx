"use client";

import { useState } from "react";
import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import Arrow from "@/components/ui/Arrow";

type VehicleOption = {
  name: string;
  price: number;
  thumb: string;
};

const VEHICLES: VehicleOption[] = [
  { name: "Strom EV LR 200", price: 1149000, thumb: "/assets/products/vehicle-storm-lr200.png" },
  { name: "Storm EV T1500", price: 1280000, thumb: "/assets/products/vehicle-storm-t1500.png" },
  { name: "Turbo EV 1000", price: 980000, thumb: "/assets/products/vehicle-turbo-1000.png" },
  { name: "HiLoad EV", price: 750000, thumb: "/assets/products/vehicle-hiload-ev.png" },
];

/**
 * Interactive RangeSlider matching Figma design (ruler tick track + glow pill + 3-grip thumb)
 */
function LoanRangeSlider({
  value,
  min,
  max,
  step = 1,
  onChange,
  ariaLabel,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  ariaLabel: string;
}) {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  return (
    <div className="group relative flex h-4 w-full items-center">
      {/* Tick track */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-[12px] w-full -translate-y-1/2 overflow-hidden lg:h-[18px]">
        <Image
          src="/assets/calculator/slider-line.svg"
          alt=""
          aria-hidden
          width={464}
          height={20}
          className="h-full w-full object-fill opacity-80"
        />
      </div>

      {/* Gradient fill */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 h-[10px] -translate-y-1/2 overflow-hidden rounded-l-full lg:h-[14px]"
        style={{ width: `${pct}%` }}
      >
        <div
          className="absolute inset-y-0 left-0 w-[calc(100%+12px)]"
          style={{ background: "linear-gradient(to right, #091c3d, #1d6fff)" }}
        />
        <div className="absolute -top-[3px] right-[2px] h-[16px] w-[12px] rounded-bl-[16px] rounded-tl-[16px] bg-[#1d6fff] blur-[2.5px] lg:h-[22px] lg:w-[16px]" />
        <div className="absolute right-[3px] top-0 h-[10px] w-[8px] rounded-bl-[16px] rounded-tl-[16px] bg-white blur-[2px] lg:h-[14px] lg:w-[10px]" />
      </div>

      {/* Thumb with 3 grips */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 flex h-[18px] w-[24px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[1.5px] rounded-[18px] border-b-[0.5px] border-r-[0.5px] border-solid border-[#1d6fff] bg-white shadow-[inset_1px_1px_3px_rgba(0,0,0,0.25)] lg:h-[26px] lg:w-[34px] lg:gap-[2.5px]"
        style={{ left: `${pct}%` }}
      >
        <span className="h-[8px] w-[1px] rounded-full bg-[#cbd5e1] lg:h-[12px] lg:w-[1.5px]" />
        <span className="h-[8px] w-[1px] rounded-full bg-[#cbd5e1] lg:h-[12px] lg:w-[1.5px]" />
        <span className="h-[8px] w-[1px] rounded-full bg-[#cbd5e1] lg:h-[12px] lg:w-[1.5px]" />
      </div>

      {/* Real range input on top for interaction */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={ariaLabel}
        onChange={(e) => onChange(Number(e.target.value))}
        className="relative z-10 h-7 w-full cursor-pointer appearance-none bg-transparent opacity-0 touch-none"
      />
    </div>
  );
}

/**
 * Loans Section / EMI Calculator
 * Sourced directly from Figma mobile specs & desktop responsiveness.
 */
export default function ProductLoanCalculator() {
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [downPaymentPct, setDownPaymentPct] = useState(15);
  const [months, setMonths] = useState(48);

  const vehicle = VEHICLES[selectedVehicle];
  const interestRate = 10.5;

  // Monthly EMI Calculation: P * r * (1+r)^n / ((1+r)^n - 1)
  const principal = vehicle.price * (1 - downPaymentPct / 100);
  const monthlyRate = interestRate / 100 / 12;
  const emi = Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
  );

  return (
    <section aria-label="Loan calculator" className="w-full bg-white py-8 lg:py-16">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center px-4 sm:px-6 lg:px-[42px]">
        {/* Main Card with Figma Gradient */}
        <div
          className="relative flex w-full max-w-[393px] sm:max-w-[680px] flex-col items-start gap-[24px] overflow-hidden rounded-[16px] px-[10px] sm:px-8 py-[32px] sm:py-10 lg:max-w-full lg:flex-row lg:items-center lg:justify-between lg:gap-[60px] lg:px-[42px] lg:py-[53px] xl:gap-[120px]"
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), linear-gradient(272deg, #0E2F6D -63.51%, #1D6FFF 87.23%), #041231",
          }}
        >
          {/* Left Column (Header + Partners + Desktop EMI Box) */}
          <div className="flex w-full flex-col items-start gap-[14px] self-stretch lg:min-h-[430px] lg:w-[492px] lg:shrink-0 lg:justify-between lg:gap-8">
            <div className="flex w-full flex-col items-start gap-[14px] self-stretch">
              {/* Heading / Eyebrow */}
              <div className="flex w-full items-center gap-[4px] self-stretch font-sans text-[12px] font-bold uppercase tracking-[0.6px] text-white">
                <Eyebrow label="LOAN" dark icons="white" />
              </div>

              {/* Subheading */}
              <h2 className="w-full self-stretch font-display text-[28px] sm:text-[38px] font-semibold leading-[115%] tracking-[-0.56px] text-white lg:max-w-[430px] lg:text-[42px] xl:text-[52px] xl:tracking-[-1.04px]">
                Loan approved in <br className="lg:hidden" />48 hours.
              </h2>

              {/* Body Text */}
              <p className="w-full font-sans text-[12px] sm:text-[14px] font-normal leading-normal text-[#C3C3C3] lg:max-w-[484px] lg:text-[16px]">
                We work with 14 banks and finance companies. There is a separate desk for you. Move the
                slider to see your EMI.
              </p>

              {/* Partner element (Figma 2732:7782 / 2732:7784) */}
              <div className="mt-1 flex flex-col items-start gap-[12px] self-stretch font-sans text-white">
                <span className="text-[14px] font-semibold text-white">Partners</span>
                {/* Partner logos — Frame 1984081090 (Figma 2732:7784): gap 32px, items-center */}
                <div className="no-scrollbar flex items-center gap-[32px] overflow-x-auto">
                  {/* HDFC Bank — 87.82 × 16.401 (2732:7785) */}
                  <div className="relative h-[16.401px] w-[87.82px] shrink-0">
                    <Image
                      src="/assets/loan/bank-hdfc.png"
                      alt="HDFC Bank"
                      fill
                      sizes="88px"
                      className="object-contain"
                    />
                  </div>
                  {/* Mahindra Finance — 54.009 × 16.401 (2732:7786) */}
                  <div className="relative h-[16.401px] w-[54.009px] shrink-0">
                    <Image
                      src="/assets/loan/bank-mahindra.png"
                      alt="Mahindra Finance"
                      fill
                      sizes="54px"
                      className="object-contain"
                    />
                  </div>
                  {/* Tata Capital — 70.322 × 16.401 (2732:7787) */}
                  <div className="relative h-[16.401px] w-[70.322px] shrink-0">
                    <Image
                      src="/assets/loan/tata.png"
                      alt="Tata Capital"
                      fill
                      sizes="71px"
                      className="object-contain"
                    />
                  </div>
                  {/* Shriram Finance — 56.262 × 20 on white plate (2732:7788) */}
                  <div className="relative h-[20px] w-[56.262px] shrink-0 overflow-hidden rounded-[2px] bg-white">
                    <Image
                      src="/assets/loan/bank-shriram.png"
                      alt="Shriram Finance"
                      fill
                      sizes="57px"
                      className="object-contain"
                    />
                  </div>
                  {/* Chevron Arrow — Vector 142 (2732:7789): 6 × 14 */}
                  <svg
                    width="6"
                    height="14"
                    viewBox="0 0 6 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1.75L4.75 7L1 12.25"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Desktop-only EMI Display Box */}
            <div className="hidden h-[125px] w-full items-center gap-[15px] rounded-[12px] border border-white/10 bg-[#071838] p-4 lg:flex">
              <p className="font-display text-[44px] font-semibold leading-[1.15] tracking-[-2px] text-white sm:text-[54px] xl:text-[62px] xl:tracking-[-3.72px]">
                ₹{emi.toLocaleString("en-IN")}
              </p>
              <div className="font-sans text-[16px] leading-[1.2] tracking-[-0.48px] text-[#c3c3c3]">
                <p>per month</p>
                <p>
                  <strong className="font-semibold text-white">at 10.5%</strong> interest
                </p>
              </div>
            </div>
          </div>

          {/* Mobile-only EMI Display Box (sits directly under partners on mobile) */}
          <div className="flex w-full items-center justify-start gap-3 rounded-[12px] border border-white/10 bg-[#071838] px-5 py-4 sm:gap-4 lg:hidden">
            <p className="font-display text-[36px] font-semibold leading-none tracking-[-1.5px] text-white sm:text-[40px]">
              ₹{emi.toLocaleString("en-IN")}
            </p>
            <div className="flex flex-col items-start font-sans text-[12px] leading-tight text-[#c3c3c3]">
              <span>per month</span>
              <span>
                <strong className="font-semibold text-white">at 10.5%</strong> interest
              </span>
            </div>
          </div>

          {/* Right Column: Calculator Controls Card */}
          <div className="flex w-full flex-col gap-4 rounded-[14px] border border-white/10 bg-[#020b18] p-4 sm:p-5 lg:flex-1 lg:gap-5 lg:rounded-[16px] lg:p-6 xl:max-w-[660px]">
            {/* Vehicle Selector */}
            <div className="relative flex flex-col gap-2">
              <label className="font-sans text-[13px] font-medium text-white sm:text-[14px] lg:text-[18px]">
                Vehicle
              </label>
              <button
                type="button"
                onClick={() => setDropdownOpen((v) => !v)}
                aria-expanded={dropdownOpen}
                className="flex w-full items-center justify-between rounded-[8px] border border-white/15 bg-[#0b182d] p-1.5 pr-3 transition-colors hover:border-white/30 sm:rounded-[12px] sm:py-2 sm:pl-2 sm:pr-4"
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex size-[36px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] bg-white p-0.5 sm:size-[42px]">
                    <Image
                      src={vehicle.thumb}
                      alt={vehicle.name}
                      width={34}
                      height={34}
                      className="object-contain"
                    />
                  </div>
                  <span className="font-sans text-[14px] font-semibold tracking-[-0.2px] text-white sm:text-[16px]">
                    {vehicle.name}
                  </span>
                </div>
                {/* Chevron */}
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`text-white transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M1 1L7 7L13 1"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute top-[68px] z-30 flex w-full flex-col overflow-hidden rounded-[10px] border border-white/20 bg-[#0c182c] shadow-2xl sm:top-[78px]">
                  {VEHICLES.map((v, i) => (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => {
                        setSelectedVehicle(i);
                        setDropdownOpen(false);
                      }}
                      className={`flex items-center justify-between px-3 py-2.5 text-left transition-colors hover:bg-white/10 ${
                        i === selectedVehicle ? "bg-white/15" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative flex size-7 shrink-0 items-center justify-center rounded bg-white p-0.5">
                          <Image src={v.thumb} alt={v.name} width={24} height={24} className="object-contain" />
                        </div>
                        <span className="font-sans text-[13px] font-semibold text-white">{v.name}</span>
                      </div>
                      <span className="font-sans text-[11px] text-white/50">
                        ₹{(v.price / 100000).toFixed(2)} Lakh
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Down Payment Slider */}
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <div className="flex items-center justify-between font-sans text-white">
                <span className="text-[13px] font-medium text-white sm:text-[16px] lg:text-[18px]">
                  Down payment
                </span>
                <span className="font-display text-[18px] font-bold tracking-tight text-white sm:text-[22px]">
                  {downPaymentPct}%
                </span>
              </div>
              <LoanRangeSlider
                value={downPaymentPct}
                min={10}
                max={50}
                step={5}
                onChange={setDownPaymentPct}
                ariaLabel="Down payment percentage"
              />
            </div>

            {/* Number of Months Slider */}
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <div className="flex items-center justify-between font-sans text-white">
                <span className="text-[13px] font-medium text-white sm:text-[16px] lg:text-[18px]">
                  Number of months
                </span>
                <span className="font-display text-[18px] font-bold tracking-tight text-white sm:text-[22px]">
                  {months} months
                </span>
              </div>
              <LoanRangeSlider
                value={months}
                min={12}
                max={60}
                step={6}
                onChange={setMonths}
                ariaLabel="Loan tenure in months"
              />
            </div>

            {/* CTA Button + Disclaimer */}
            <div className="mt-1 flex flex-col gap-3 pt-1">
              <a
                href="#book-test-drive"
                className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[6px] bg-white font-sans text-[14px] font-semibold text-[#041231] shadow-md transition-all hover:bg-[#f3f4f5] active:scale-[0.99] lg:h-[50px] lg:text-[16px]"
              >
                <span>Check Eligibility</span>
                <Arrow color="ink" />
              </a>

              <p className="font-sans text-[11px] leading-[1.35] text-[#8E9BAE] sm:text-[12px]">
                This is an estimate. Asli rate aapke credit aur bank par depend karta hai.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
