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
  { name: "Strom EV LR 200", price: 1150000, thumb: "/assets/products/vehicle-storm-lr200.png" },
  { name: "Storm EV T1500", price: 1280000, thumb: "/assets/products/vehicle-storm-t1500.png" },
  { name: "Turbo EV 1000", price: 980000, thumb: "/assets/products/vehicle-turbo-1000.png" },
  { name: "HiLoad EV", price: 750000, thumb: "/assets/products/vehicle-hiload-ev.png" },
];

/**
 * Interactive RangeSlider matching Figma design (2732:7812 & 2732:7828)
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
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="group relative h-3 w-full">
      {/* Tick track */}
      <Image
        src="/assets/calculator/slider-line.svg"
        alt=""
        aria-hidden
        width={628}
        height={21}
        className="absolute left-0 top-1/2 h-[12.25px] w-full -translate-y-1/2 lg:h-[21.43px]"
      />
      {/* Gradient fill */}
      <div
        className="absolute left-0 top-1/2 h-[12px] -translate-y-1/2 overflow-clip lg:h-[21px]"
        style={{ width: `${pct}%` }}
      >
        <div
          className="absolute inset-y-0 left-0 w-[calc(100%+11px)] lg:w-[calc(100%+19px)]"
          style={{ background: "linear-gradient(to right, #091c3d, #1d6fff)" }}
        />
        <div className="absolute -top-[4.32px] right-[5.71px] h-[22.07px] w-[16.75px] rounded-bl-[22px] rounded-tl-[21px] bg-[#1d6fff] blur-[3.17px] lg:-top-[7.56px] lg:right-[10px] lg:h-[38.63px] lg:w-[29.31px] lg:blur-[5.55px]" />
        <div className="absolute right-[6.7px] top-0 h-[13.43px] w-[10.19px] rounded-bl-[22px] rounded-tl-[21px] bg-white blur-[3.17px] lg:right-[8px] lg:h-[23.51px] lg:w-[17.84px] lg:blur-[5.55px]" />
      </div>
      {/* Thumb with 3 grips */}
      <div
        aria-hidden
        className="absolute top-1/2 flex h-[18.29px] w-[24.38px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[1.83px] overflow-clip rounded-[18.29px] border-b-[0.46px] border-r-[0.46px] border-solid border-[#1d6fff] bg-white shadow-[inset_0.91px_0.91px_3.66px_rgba(0,0,0,0.25)] lg:h-[32px] lg:w-[43px] lg:gap-[3.2px] lg:rounded-[32px] lg:border-b-[0.8px] lg:border-r-[0.8px] lg:shadow-[inset_1.6px_1.6px_6.4px_rgba(0,0,0,0.25)] group-focus-within:outline group-focus-within:outline-2 group-focus-within:outline-white/40"
        style={{ left: `${pct}%` }}
      >
        <span className="h-[8px] w-[0.91px] rounded-[18px] bg-[#f3f4f5] lg:h-[14px] lg:w-[1.6px] lg:rounded-[32px]" />
        <span className="h-[8px] w-[0.91px] rounded-[18px] bg-[#f3f4f5] lg:h-[14px] lg:w-[1.6px] lg:rounded-[32px]" />
        <span className="h-[8px] w-[0.91px] rounded-[18px] bg-[#f3f4f5] lg:h-[14px] lg:w-[1.6px] lg:rounded-[32px]" />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={ariaLabel}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-grab appearance-none bg-transparent opacity-0"
      />
    </div>
  );
}

/**
 * Loan Calculator Section — Figma node 2732:7773
 * Recreates the loan approval feature container, bank partner row,
 * interactive down-payment/tenure sliders, and dynamic EMI calculation.
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
    <section aria-label="Loan calculator" className="w-full bg-white py-12 lg:py-16">
      <div className="mx-auto flex w-full max-w-[1440px] px-5 xl:px-[42px]">
        {/* Main Card with Figma Gradient (Figma 2732:7773) */}
        <div
          className="relative flex w-full flex-col gap-10 overflow-hidden rounded-[12px] px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-[60px] lg:px-[42px] lg:py-[53px] xl:gap-[120px]"
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), linear-gradient(272deg, #0E2F6D -63.51%, #1D6FFF 87.23%), #041231",
          }}
        >
          {/* Left Column: Heading, Description, Bank Partners & EMI Box (Figma 2732:7774) */}
          <div className="flex w-full flex-col justify-between gap-8 lg:min-h-[430px] lg:w-[492px] lg:shrink-0">
            <div className="flex flex-col items-start gap-3">
              <Eyebrow label="LOAN" dark icons="white" />
              <h2 className="w-full max-w-[430px] font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-white sm:text-[42px] xl:text-[52px] xl:tracking-[-1.04px]">
                Loan approved in 48 hours.
              </h2>
              <p className="w-full max-w-[484px] font-sans text-[16px] font-normal leading-normal text-[#c3c3c3]">
                We work with 14 banks and finance companies. There is a separate desk for you. Move
                the slider to see your EMI.
              </p>

              {/* Partners Row (Figma 2732:7782) */}
              <div className="mt-2 flex flex-col items-start gap-3">
                <p className="font-sans text-[14px] font-semibold text-white">Partners</p>
                <div className="flex flex-wrap items-center justify-center gap-8">
                  {/* HDFC Bank */}
                  <div className="relative h-[16.401px] w-[70.322px] shrink-0 brightness-200">
                    <Image
                      src="/assets/loan/bank-hdfc.png"
                      alt="HDFC Bank"
                      fill
                      sizes="70px"
                      className="object-contain"
                    />
                  </div>
                  {/* Mahindra Finance */}
                  <div className="relative h-[16.401px] w-[70.322px] shrink-0 brightness-150">
                    <Image
                      src="/assets/loan/bank-mahindra.png"
                      alt="Mahindra Finance"
                      fill
                      sizes="70px"
                      className="object-contain"
                    />
                  </div>
                  {/* Tata Capital */}
                  <div className="relative h-[16.401px] w-[70.322px] shrink-0 brightness-150">
                    <Image
                      src="/assets/loan/bank-tata.png"
                      alt="Tata Capital"
                      fill
                      sizes="70px"
                      className="object-contain"
                    />
                  </div>
                  {/* Shriram Finance */}
                  <div className="relative flex h-[16.401px] w-[70.322px] shrink-0 items-center justify-center rounded-[2px] bg-white p-0.5">
                    <Image
                      src="/assets/loan/bank-shriram.png"
                      alt="Shriram Finance"
                      width={52}
                      height={16}
                      className="object-contain"
                    />
                  </div>
                  {/* Arrow Indicator */}
                  <svg
                    width="6"
                    height="14"
                    viewBox="0 0 6 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 text-white/60"
                  >
                    <path
                      d="M1 1L5 7L1 13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* EMI Display Box (Figma 2732:7790) */}
            <div className="flex h-[125px] w-full items-center gap-[15px] rounded-[12px] border border-white/10 bg-black/50 p-4">
              <p className="font-display text-[44px] font-semibold leading-[1.15] tracking-[-2px] text-white sm:text-[54px] xl:text-[62px] xl:tracking-[-3.72px]">
                ₹{emi.toLocaleString("en-IN")}
              </p>
              <div className="font-sans text-[16px] leading-[1.2] tracking-[-0.48px] text-white/40">
                <p>per month</p>
                <p>
                  <span className="text-white">at 10.5%</span> interest
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Calculator Controls Glass Card (Figma 2732:7793) */}
          <div className="flex w-full flex-1 flex-col gap-5 rounded-[16px] border border-white/10 bg-[#030d1e]/60 p-6 backdrop-blur-[15px] xl:max-w-[660px]">
            {/* Vehicle Selector (Figma 2732:7794) */}
            <div className="relative flex flex-col gap-3 py-2">
              <div className="flex items-center justify-between text-white">
                <p className="font-sans text-[20px] font-medium tracking-[-0.4px]">Vehicle</p>
              </div>
              <button
                type="button"
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-[12px] border border-white/10 bg-[#29313f]/50 py-1.5 pl-1.5 pr-4 transition-colors hover:border-white/30"
              >
                <div className="flex items-center gap-2">
                  <div className="relative flex size-[42px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] bg-white p-1">
                    <Image
                      src={vehicle.thumb}
                      alt={vehicle.name}
                      width={38}
                      height={38}
                      className="object-contain"
                    />
                  </div>
                  <p className="font-sans text-[16px] font-bold tracking-[-0.32px] text-white">
                    {vehicle.name}
                  </p>
                </div>
                {/* Chevron */}
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`text-white transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
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
                <div className="absolute top-[96px] z-20 flex w-full flex-col overflow-hidden rounded-[12px] border border-white/20 bg-[#0c182c] shadow-xl">
                  {VEHICLES.map((v, i) => (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => {
                        setSelectedVehicle(i);
                        setDropdownOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/10 ${i === selectedVehicle ? "bg-white/15" : ""}`}
                    >
                      <div className="relative flex size-8 shrink-0 items-center justify-center rounded bg-white p-0.5">
                        <Image src={v.thumb} alt={v.name} width={28} height={28} className="object-contain" />
                      </div>
                      <span className="font-sans text-[15px] font-semibold text-white">{v.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Down Payment Slider (Figma 2732:7808) */}
            <div className="flex flex-col gap-5 py-2">
              <div className="flex items-center justify-between text-white">
                <p className="font-sans text-[20px] font-medium tracking-[-0.4px]">Down payment</p>
                <p className="font-sans text-[24px] font-bold tracking-[-0.48px]">{downPaymentPct}%</p>
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

            {/* Number of Months Slider (Figma 2732:7824) */}
            <div className="flex flex-col gap-5 py-2">
              <div className="flex items-center justify-between text-white">
                <p className="font-sans text-[20px] font-medium tracking-[-0.4px]">Number of months</p>
                <p className="font-sans text-[24px] font-bold tracking-[-0.48px]">{months} months</p>
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

            {/* Bottom Row: CTA Button + Disclaimer (Figma 2732:7840) */}
            <div className="mt-2 flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                className="flex h-[50.48px] shrink-0 items-center justify-center gap-2 rounded-[4px] border-[0.5px] border-white bg-[#f2f2f2] px-6 font-display text-[16px] font-semibold text-ink transition-transform hover:scale-[1.02] hover:bg-white"
              >
                <span>Check Eligibility</span>
                <Arrow color="ink" />
              </button>
              <p className="flex-1 font-sans text-[15px] font-normal leading-snug text-[#c3c3c3] sm:text-[16px]">
                This is an estimate. Asli rate aapke credit aur bank par depend karta hai.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
