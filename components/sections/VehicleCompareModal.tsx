"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";

export type CompareVehicle = {
  id: string;
  name: string;
  capacity: string;
  crop: [number, number, number, number];
  wheels: string;
  wheelsNum: number;
  payload: string;
  payloadNum: number;
  range: string;
  rangeNum: number;
  runningCost: string;
  runningCostNum: number;
  chargeTime: string;
  chargeTimeNum: number;
  slope: string;
  slopeNum: number;
  price: string;
  priceNum: number;
  emi: string;
  emiNum: number;
  warranty: string;
  warrantyNum: number;
};

export const COMPARE_VEHICLES: CompareVehicle[] = [
  {
    id: "storm-ev-t1500",
    name: "Storm EV T1500",
    capacity: "1,500 kg",
    crop: [-5.8, -125.03, 319.14, 213.66],
    wheels: "4 wheel",
    wheelsNum: 4,
    payload: "1,500 kg",
    payloadNum: 1500,
    range: "200 km",
    rangeNum: 200,
    runningCost: "Rs 1.15",
    runningCostNum: 1.15,
    chargeTime: "105 min",
    chargeTimeNum: 105,
    slope: "22%",
    slopeNum: 22,
    price: "Rs 12.80 L",
    priceNum: 12.80,
    emi: "Rs 27,856",
    emiNum: 27856,
    warranty: "8 years / 200,000 km",
    warrantyNum: 8,
  },
  {
    id: "storm-ev-lr-200",
    name: "Strom EV LR 200",
    capacity: "1,200 kg",
    crop: [-215.19, -125.87, 319.14, 213.66],
    wheels: "4 wheel",
    wheelsNum: 4,
    payload: "1,200 kg",
    payloadNum: 1200,
    range: "200 km",
    rangeNum: 200,
    runningCost: "Rs 1.05",
    runningCostNum: 1.05,
    chargeTime: "90 min",
    chargeTimeNum: 90,
    slope: "22%",
    slopeNum: 22,
    price: "Rs 11.49 L",
    priceNum: 11.49,
    emi: "Rs 19,800",
    emiNum: 19800,
    warranty: "8 years / 200,000 km",
    warrantyNum: 8,
  },
  {
    id: "turbo-ev-1000",
    name: "Turbo EV 1000",
    capacity: "1,000 kg",
    crop: [0, 0, 319.14, 213.66],
    wheels: "4 wheel",
    wheelsNum: 4,
    payload: "1,000 kg",
    payloadNum: 1000,
    range: "180 km",
    rangeNum: 180,
    runningCost: "Rs 0.98",
    runningCostNum: 0.98,
    chargeTime: "75 min",
    chargeTimeNum: 75,
    slope: "20%",
    slopeNum: 20,
    price: "Rs 8.99 L",
    priceNum: 8.99,
    emi: "Rs 18,200",
    emiNum: 18200,
    warranty: "6 years / 160,000 km",
    warrantyNum: 6,
  },
  {
    id: "hiload-ev",
    name: "HiLoad EV",
    capacity: "688 kg",
    crop: [-279.52, -14.06, 397.73, 266.27],
    wheels: "3 wheel",
    wheelsNum: 3,
    payload: "688 kg",
    payloadNum: 688,
    range: "151 km",
    rangeNum: 151,
    runningCost: "Rs 0.84",
    runningCostNum: 0.84,
    chargeTime: "75 min",
    chargeTimeNum: 75,
    slope: "18%",
    slopeNum: 18,
    price: "Rs 4.29 L",
    priceNum: 4.29,
    emi: "Rs 9,400",
    emiNum: 9400,
    warranty: "5 years / 150,000 km",
    warrantyNum: 5,
  },
];

type MetricDef = {
  label: string;
  displayKey: keyof CompareVehicle;
  numericKey: keyof CompareVehicle;
  higherIsBetter: boolean;
};

const COMPARISON_ROWS: MetricDef[] = [
  { label: "Wheels", displayKey: "wheels", numericKey: "wheelsNum", higherIsBetter: true },
  { label: "Load capacity", displayKey: "payload", numericKey: "payloadNum", higherIsBetter: true },
  { label: "On one charge", displayKey: "range", numericKey: "rangeNum", higherIsBetter: true },
  { label: "Running cost per km", displayKey: "runningCost", numericKey: "runningCostNum", higherIsBetter: false },
  { label: "Full charge time", displayKey: "chargeTime", numericKey: "chargeTimeNum", higherIsBetter: false },
  { label: "Slope, fully loaded", displayKey: "slope", numericKey: "slopeNum", higherIsBetter: true },
  { label: "Price, ex showroom", displayKey: "price", numericKey: "priceNum", higherIsBetter: false },
  { label: "EMI, 48 months", displayKey: "emi", numericKey: "emiNum", higherIsBetter: false },
  { label: "Battery warranty", displayKey: "warranty", numericKey: "warrantyNum", higherIsBetter: true },
];

function VehicleThumb({
  crop,
  className = "size-[32px] sm:size-[36px] rounded-[6px] sm:rounded-[7px]",
}: {
  crop: [number, number, number, number];
  className?: string;
}) {
  return (
    <div className={`relative flex shrink-0 items-center justify-center bg-white p-[3px] shadow-xs ${className}`}>
      <div className="relative size-full overflow-hidden rounded-[4px]">
        <Image
          src="/assets/calculator/vehicle.png"
          alt=""
          width={947}
          height={634}
          sizes="90px"
          className="absolute max-w-none"
          style={{
            left: `${crop[0]}%`,
            top: `${crop[1]}%`,
            width: `${crop[2]}%`,
            height: `${crop[3]}%`,
          }}
        />
      </div>
    </div>
  );
}

function ChevronDownIcon({ className = "text-[#121212]" }: { className?: string }) {
  return (
    <svg width="12" height="6" viewBox="0 0 14 6" fill="none" className={`shrink-0 ${className}`}>
      <path
        d="M0.75 0.75L7 5.25L13.25 0.75"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon({ className = "text-[#121212]" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={className}>
      <path
        d="M1 1L17 17M17 1L1 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialVehicleIndex?: number;
};

export default function VehicleCompareModal({
  isOpen,
  onClose,
  initialVehicleIndex = 1,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<"select" | "compare">("select");
  const [v1Index, setV1Index] = useState<number>(initialVehicleIndex);
  const [v2Index, setV2Index] = useState<number | null>(null);
  const [openPicker, setOpenPicker] = useState<"vehicle1" | "vehicle2" | null>(null);
  const [step2Picker, setStep2Picker] = useState<"vehicle1" | "vehicle2" | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset state whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("select");
      const validInitial =
        initialVehicleIndex >= 0 && initialVehicleIndex < COMPARE_VEHICLES.length
          ? initialVehicleIndex
          : 1;
      setV1Index(validInitial);
      setV2Index(null);
      setOpenPicker(null);
      setStep2Picker(null);
    }
  }, [isOpen, initialVehicleIndex]);

  // Handle ESC key press and scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openPicker || step2Picker) {
          setOpenPicker(null);
          setStep2Picker(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, openPicker, step2Picker, onClose]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (step === "select") {
        if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
          if (openPicker) {
            setOpenPicker(null);
          }
        }
      } else if (step === "compare") {
        if (step2Ref.current && !step2Ref.current.contains(e.target as Node)) {
          setStep2Picker(null);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [step, openPicker]);

  if (!isOpen || !mounted) return null;

  const vehicle1 = COMPARE_VEHICLES[v1Index] ?? COMPARE_VEHICLES[1];
  const vehicle2 = v2Index !== null ? COMPARE_VEHICLES[v2Index] : null;
  const compVehicle2 = vehicle2 ?? COMPARE_VEHICLES[v1Index === 0 ? 1 : 0];

  return createPortal(
    <>
      {/* ------------------------------------------------------------------ */}
      {/* STEP 1: Crisp Floating Bottom Bar with Blurred Backdrop (1583:4823)*/}
      {/* ------------------------------------------------------------------ */}
      {step === "select" && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-end pb-3 sm:pb-6 pointer-events-auto">
          {/* Slightly blurred page backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[6px] transition-opacity animate-fadeIn cursor-pointer"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Centered Dock Bar Container */}
          <aside
            ref={dockRef}
            role="dialog"
            aria-label="Compare vehicles selection bar"
            className="relative z-10 mx-auto w-full max-w-[1040px] px-3 sm:px-4 animate-slideUpClean"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Floating Neo Promo Bar */}
            <div
              className="relative w-full overflow-visible rounded-[16px] border border-white/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.2)]"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #091e4a 0%, #0e2f6d 45%, #1d6fff 100%)",
              }}
            >
              {/* Content row */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 lg:gap-8 p-3 sm:py-3.5 sm:px-5 lg:py-4 lg:px-6">
                {/* Left group: Vehicle selector slots (responsive side-by-side) */}
                <div className="relative grid grid-cols-2 gap-2 sm:flex sm:w-auto w-full items-center sm:gap-3.5">
                  {/* Vehicle 1 Slot */}
                  <button
                    type="button"
                    onClick={() =>
                      setOpenPicker(openPicker === "vehicle1" ? null : "vehicle1")
                    }
                    className="flex h-[46px] sm:h-[48px] w-full sm:w-[230px] lg:w-[260px] shrink-0 cursor-pointer items-center justify-between rounded-[12px] bg-white py-1 pl-1.5 pr-2.5 sm:pr-3.5 shadow-md border border-black/5 transition-all hover:bg-[#f8f9fa] active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                      <VehicleThumb crop={vehicle1.crop} />
                      <span className="truncate font-sans text-[12px] sm:text-[14px] lg:text-[15px] font-bold tracking-[-0.28px] text-[#121212]">
                        {vehicle1.name}
                      </span>
                    </div>
                    <ChevronDownIcon />
                  </button>

                  {/* Vehicle 2 Slot */}
                  {vehicle2 ? (
                    <button
                      type="button"
                      onClick={() =>
                        setOpenPicker(openPicker === "vehicle2" ? null : "vehicle2")
                      }
                      className="flex h-[46px] sm:h-[48px] w-full sm:w-[230px] lg:w-[260px] shrink-0 cursor-pointer items-center justify-between rounded-[12px] bg-white py-1 pl-1.5 pr-2.5 sm:pr-3.5 shadow-md border border-black/5 transition-all hover:bg-[#f8f9fa] active:scale-[0.99]"
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                        <VehicleThumb crop={vehicle2.crop} />
                        <span className="truncate font-sans text-[12px] sm:text-[14px] lg:text-[15px] font-bold tracking-[-0.28px] text-[#121212]">
                          {vehicle2.name}
                        </span>
                      </div>
                      <ChevronDownIcon />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setOpenPicker(openPicker === "vehicle2" ? null : "vehicle2")
                      }
                      className="flex h-[46px] sm:h-[48px] w-full sm:w-[230px] lg:w-[260px] shrink-0 cursor-pointer items-center justify-between rounded-[12px] border-2 border-dashed border-white/80 bg-white/12 py-1 px-2.5 sm:px-3.5 transition-all hover:bg-white/20 active:scale-[0.99]"
                    >
                      <span className="truncate font-sans text-[12px] sm:text-[13px] lg:text-[14px] font-bold tracking-[-0.28px] text-white">
                        <span className="sm:hidden">Pick vehicle 2</span>
                        <span className="hidden sm:inline">Pick a second vehicle</span>
                      </span>
                      <ChevronDownIcon className="text-white" />
                    </button>
                  )}

                  {/* Popover Menu: PICK A SECOND VEHICLE */}
                  {openPicker && (
                    <div
                      className={`fixed inset-x-3 bottom-[calc(100%+10px)] sm:absolute sm:inset-auto sm:bottom-[calc(100%+14px)] z-50 w-auto sm:w-[314px] max-h-[50vh] overflow-y-auto rounded-[20px] border border-black/10 bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)] animate-fadeIn ${
                        openPicker === "vehicle1" ? "sm:left-0" : "sm:left-[240px] lg:left-[270px]"
                      }`}
                    >
                      <p className="font-sans text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.7px] text-[#0e2f6d]">
                        {openPicker === "vehicle1" ? "Select vehicle 1" : "Pick a second vehicle"}
                      </p>
                      <div className="mt-2.5 sm:mt-3 flex flex-col gap-2">
                        {COMPARE_VEHICLES.map((v, i) => {
                          const isCurrent =
                            openPicker === "vehicle1" ? i === v1Index : i === v2Index;
                          return (
                            <button
                              key={v.id}
                              type="button"
                              onClick={() => {
                                if (openPicker === "vehicle1") {
                                  setV1Index(i);
                                } else {
                                  setV2Index(i);
                                }
                                setOpenPicker(null);
                              }}
                              className={`flex w-full cursor-pointer items-center gap-3 rounded-[12px] p-2 text-left transition-colors ${
                                isCurrent
                                  ? "bg-[#e2e8f0] ring-1 ring-[#0e2f6d]/30"
                                  : "bg-[#f3f4f5] hover:bg-[#e6e9ee]"
                              }`}
                            >
                              <VehicleThumb
                                crop={v.crop}
                                className="size-[34px] sm:size-[38px] rounded-[7px] p-1 shadow-xs"
                              />
                              <div className="flex flex-col gap-[2px] leading-tight min-w-0">
                                <span className="truncate font-sans text-[13px] sm:text-[14px] font-bold tracking-[-0.28px] text-[#121212]">
                                  {v.name}
                                </span>
                                <span className="font-sans text-[11px] sm:text-[12px] font-medium tracking-[-0.24px] text-[#555]">
                                  {v.capacity}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right group: Compare & Clear buttons */}
                <div className="flex w-full sm:w-auto items-center justify-end gap-2 sm:gap-2.5">
                  <button
                    type="button"
                    disabled={v2Index === null}
                    onClick={() => {
                      if (v2Index !== null) {
                        setStep("compare");
                      }
                    }}
                    className={`flex h-[44px] sm:h-[48px] flex-1 sm:flex-none items-center justify-center gap-2 sm:gap-2.5 rounded-[6px] px-4 sm:px-6 font-display text-[13px] sm:text-[15px] font-semibold leading-none text-white transition-all whitespace-nowrap ${
                      v2Index !== null
                        ? "bg-[#121212] hover:bg-black cursor-pointer shadow-md border border-white/20 active:scale-[0.98]"
                        : "bg-[#121212]/70 opacity-55 cursor-not-allowed border border-white/10"
                    }`}
                  >
                    <span>Compare 2 vehicles</span>
                    <Image
                      src="/assets/compare/btn-arrow.svg"
                      alt=""
                      width={18}
                      height={11}
                      className="h-[11px] w-[18px] shrink-0"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (v2Index !== null) {
                        setV2Index(null);
                      } else {
                        onClose();
                      }
                    }}
                    className="flex h-[44px] sm:h-[48px] items-center justify-center rounded-[6px] border border-white/50 bg-white/15 px-3.5 sm:px-5 font-display text-[13px] sm:text-[15px] font-semibold leading-none text-white backdrop-blur-md transition-all hover:bg-white/25 active:scale-[0.98] cursor-pointer whitespace-nowrap"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* STEP 2: Compare Vehicles Modal Dialog (Figma 1583:3672)            */}
      {/* ------------------------------------------------------------------ */}
      {step === "compare" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="compare-modal-title"
          className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-black/60 p-2.5 sm:p-5 backdrop-blur-md animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <div
            className="relative flex w-full max-w-[756px] max-h-[92vh] flex-col overflow-hidden rounded-[16px] bg-[#f3f4f5] p-3.5 sm:p-6 shadow-2xl animate-scaleUp"
            data-node-id="1583:3672"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header (fixed at top of modal) */}
            <div className="flex items-start justify-between w-full shrink-0 mb-3 sm:mb-4">
              <div className="flex flex-col gap-1.5 sm:gap-2">
                <div className="inline-flex w-fit items-center rounded-[50px] bg-white px-2.5 py-0.5 sm:py-1 shadow-xs">
                  <span className="font-sans text-[11px] sm:text-[12px] font-bold text-black">
                    Differences highlighted
                  </span>
                </div>
                <h2
                  id="compare-modal-title"
                  className="font-display text-[22px] sm:text-[32px] font-semibold tracking-[-0.64px] text-[#121212] leading-[1.15]"
                >
                  Compare vehicles
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex size-8 items-center justify-center rounded-full text-[#121212] transition-colors hover:bg-black/5 cursor-pointer shrink-0"
                aria-label="Close compare modal"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Scrollable Container for Table Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 [scrollbar-width:thin] pr-0.5">
              {/* White Card: Comparison Table */}
              <div
                ref={step2Ref}
                className="relative w-full rounded-[12px] bg-white p-3 sm:p-5 shadow-sm overflow-hidden"
              >
                {/* Horizontal scroll container for mobile table consistency */}
                <div className="w-full overflow-x-auto [scrollbar-width:thin]">
                  <div className="min-w-[490px] sm:min-w-0">
                    {/* Vehicle Selectors Row (interactive dropdowns) */}
                    <div className="relative mb-3 flex items-center gap-2.5 sm:gap-4 pl-[120px] sm:pl-[140px] md:pl-[180px] w-full">
                      {/* Column 1 Selector */}
                      <div className="relative flex-1">
                        <button
                          type="button"
                          onClick={() =>
                            setStep2Picker(step2Picker === "vehicle1" ? null : "vehicle1")
                          }
                          className="flex h-[48px] sm:h-[52px] w-full cursor-pointer items-center justify-between rounded-[10px] sm:rounded-[12px] bg-[#f3f4f5] py-1 pl-1.5 pr-2.5 sm:pr-3.5 transition-colors hover:bg-[#e9edf3]"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <VehicleThumb
                              crop={vehicle1.crop}
                              className="size-[32px] sm:size-[40px] rounded-[6px] p-1"
                            />
                            <span className="truncate font-sans text-[12px] sm:text-[15px] font-bold tracking-[-0.32px] text-[#121212]">
                              {vehicle1.name}
                            </span>
                          </div>
                          <ChevronDownIcon />
                        </button>

                        {/* Dropdown 1 */}
                        {step2Picker === "vehicle1" && (
                          <div className="absolute left-0 top-[calc(100%+6px)] z-50 w-full min-w-[210px] rounded-[14px] border border-black/10 bg-white p-2 shadow-xl animate-fadeIn">
                            {COMPARE_VEHICLES.map((v, i) => (
                              <button
                                key={v.id}
                                type="button"
                                onClick={() => {
                                  setV1Index(i);
                                  setStep2Picker(null);
                                }}
                                className={`flex w-full cursor-pointer items-center gap-2.5 rounded-[10px] p-2 text-left transition-colors ${
                                  i === v1Index
                                    ? "bg-[#e2e8f0]"
                                    : "hover:bg-[#f3f4f5]"
                                }`}
                              >
                                <VehicleThumb crop={v.crop} className="size-[28px] sm:size-[30px] rounded-[5px] p-1" />
                                <span className="truncate font-sans text-[12px] sm:text-[13px] font-bold text-[#121212]">
                                  {v.name}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Column 2 Selector */}
                      <div className="relative flex-1">
                        <button
                          type="button"
                          onClick={() =>
                            setStep2Picker(step2Picker === "vehicle2" ? null : "vehicle2")
                          }
                          className="flex h-[48px] sm:h-[52px] w-full cursor-pointer items-center justify-between rounded-[10px] sm:rounded-[12px] bg-[#f3f4f5] py-1 pl-1.5 pr-2.5 sm:pr-3.5 transition-colors hover:bg-[#e9edf3]"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <VehicleThumb
                              crop={compVehicle2.crop}
                              className="size-[32px] sm:size-[40px] rounded-[6px] p-1"
                            />
                            <span className="truncate font-sans text-[12px] sm:text-[15px] font-bold tracking-[-0.32px] text-[#121212]">
                              {compVehicle2.name}
                            </span>
                          </div>
                          <ChevronDownIcon />
                        </button>

                        {/* Dropdown 2 */}
                        {step2Picker === "vehicle2" && (
                          <div className="absolute left-0 top-[calc(100%+6px)] z-50 w-full min-w-[210px] rounded-[14px] border border-black/10 bg-white p-2 shadow-xl animate-fadeIn">
                            {COMPARE_VEHICLES.map((v, i) => (
                              <button
                                key={v.id}
                                type="button"
                                onClick={() => {
                                  setV2Index(i);
                                  setStep2Picker(null);
                                }}
                                className={`flex w-full cursor-pointer items-center gap-2.5 rounded-[10px] p-2 text-left transition-colors ${
                                  (v2Index !== null ? i === v2Index : i === (v1Index === 0 ? 1 : 0))
                                    ? "bg-[#e2e8f0]"
                                    : "hover:bg-[#f3f4f5]"
                                }`}
                              >
                                <VehicleThumb crop={v.crop} className="size-[28px] sm:size-[30px] rounded-[5px] p-1" />
                                <span className="truncate font-sans text-[12px] sm:text-[13px] font-bold text-[#121212]">
                                  {v.name}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Spec Rows (9 Rows) */}
                    <div className="flex w-full flex-col divide-y divide-[#e9edf3]">
                      {COMPARISON_ROWS.map((row) => {
                        const val1 = vehicle1[row.displayKey] as string;
                        const val2 = compVehicle2[row.displayKey] as string;
                        const num1 = vehicle1[row.numericKey] as number;
                        const num2 = compVehicle2[row.numericKey] as number;

                        const isDiff = num1 !== num2;
                        const isBetter1 = isDiff && (row.higherIsBetter ? num1 > num2 : num1 < num2);
                        const isBetter2 = isDiff && (row.higherIsBetter ? num2 > num1 : num2 < num1);

                        return (
                          <div
                            key={row.label}
                            className="flex h-[40px] sm:h-[42px] items-center py-2.5 sm:py-4 text-[12px] sm:text-[14px]"
                          >
                            {/* Metric Label */}
                            <div className="w-[120px] sm:w-[140px] md:w-[180px] shrink-0 font-sans font-semibold text-[#4a4f57]">
                              {row.label}
                            </div>

                            {/* Cell 1 */}
                            <div className="flex flex-1 items-center gap-1.5 sm:gap-2">
                              <span className="font-sans text-[12px] sm:text-[16px] font-bold text-[#121212] tracking-[-0.08px]">
                                {val1}
                              </span>
                              {isBetter1 && (
                                <span className="inline-flex items-center rounded-[20px] border-[1.28px] border-solid border-[#6fcf97] bg-[rgba(111,207,151,0.24)] px-1.5 py-0.5 sm:py-1 font-sans text-[9px] sm:text-[10px] font-bold tracking-[-0.2px] text-[#121212] backdrop-blur-[12.8px]">
                                  Better
                                </span>
                              )}
                            </div>

                            {/* Cell 2 */}
                            <div className="flex flex-1 items-center gap-1.5 sm:gap-2">
                              <span className="font-sans text-[12px] sm:text-[16px] font-bold text-[#121212] tracking-[-0.08px]">
                                {val2}
                              </span>
                              {isBetter2 && (
                                <span className="inline-flex items-center rounded-[20px] border-[1.28px] border-solid border-[#6fcf97] bg-[rgba(111,207,151,0.24)] px-1.5 py-0.5 sm:py-1 font-sans text-[9px] sm:text-[10px] font-bold tracking-[-0.2px] text-[#121212] backdrop-blur-[12.8px]">
                                  Better
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* View Vehicle Buttons Row */}
                    <div className="flex items-center gap-2.5 sm:gap-4 pl-[120px] sm:pl-[140px] md:pl-[180px] pt-3.5 sm:pt-4 w-full">
                      <div className="flex-1">
                        <Link
                          href="/products"
                          onClick={onClose}
                          className="flex h-[32px] w-full sm:w-[130px] items-center justify-center rounded-[4px] border border-[rgba(18,18,18,0.5)] bg-[#f3f4f5] px-3 font-display text-[11px] sm:text-[12px] font-semibold text-[#121212] transition-colors hover:bg-white"
                        >
                          View Vehicle
                        </Link>
                      </div>
                      <div className="flex-1">
                        <Link
                          href="/products"
                          onClick={onClose}
                          className="flex h-[32px] w-full sm:w-[130px] items-center justify-center rounded-[4px] border border-[rgba(18,18,18,0.5)] bg-[#f3f4f5] px-3 font-display text-[11px] sm:text-[12px] font-semibold text-[#121212] transition-colors hover:bg-white"
                        >
                          View Vehicle
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer (fixed at bottom of modal) */}
            <div className="flex items-center justify-between w-full pt-2.5 sm:pt-3 shrink-0 border-t border-black/5">
              <button
                type="button"
                onClick={() => setStep("select")}
                className="flex items-center gap-1 font-sans text-[12px] sm:text-[13px] font-semibold text-[#0e2f6d] hover:underline cursor-pointer"
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M10 12L6 8L10 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Change selection</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  window.open("/assets/products/variant-compare-truck.png", "_blank");
                }}
                className="flex h-[42px] sm:h-[48px] items-center justify-center gap-2 rounded-[4px] border-[0.5px] border-white bg-[#121212] px-4 sm:px-6 font-display text-[11px] sm:text-[12px] font-semibold text-white shadow-sm transition-all hover:bg-black cursor-pointer active:scale-[0.98]"
              >
                <span>Download Brochure</span>
                <Image
                  src="/assets/compare/btn-arrow.svg"
                  alt=""
                  width={16}
                  height={10}
                  className="h-[10px] w-[16px] shrink-0"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
