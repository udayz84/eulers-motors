"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import Eyebrow from "../ui/Eyebrow";

export type CompareVehicle = {
  id: string;
  name: string;
  badge?: string;
  image: string;
  bodyType: string;
  payload: string;
  range: string;
  chargeTime: string;
  runningCost: string;
  emi: string;
  cargoSpace: string;
};

const COMPARE_VEHICLES: CompareVehicle[] = [
  {
    id: "storm-ev-lr-200",
    name: "Storm EV LR 200",
    badge: "Most Popular",
    image: "/assets/products/variant-compare-truck.png",
    bodyType: "4-wheel cargo EV",
    payload: "1,200 kg",
    range: "200 km",
    chargeTime: "90 min",
    runningCost: "₹1.05/km",
    emi: "₹25,006/month",
    cargoSpace: "2.9 m loading deck",
  },
  {
    id: "storm-ev-t1500",
    name: "Storm EV T1500",
    badge: "Heavy Duty",
    image: "/assets/products/vehicle-storm-t1500-clean.png",
    bodyType: "4-wheel container EV",
    payload: "1,500 kg",
    range: "200 km",
    chargeTime: "105 min",
    runningCost: "₹1.15/km",
    emi: "₹27,856/month",
    cargoSpace: "3.2 m loading deck",
  },
  {
    id: "turbo-ev-1000",
    name: "Turbo EV 1000",
    badge: "Fast Turnaround",
    image: "/vehicles/Turboev1000.png",
    bodyType: "4-wheel delivery EV",
    payload: "1,000 kg",
    range: "180 km",
    chargeTime: "75 min",
    runningCost: "₹0.98/km",
    emi: "₹21,328/month",
    cargoSpace: "2.5 m loading deck",
  },
  {
    id: "hiload-ev",
    name: "HiLoad EV",
    badge: "City Agile",
    image: "/assets/products/vehicle-hiload-ev-hq.png",
    bodyType: "3-wheel cargo EV",
    payload: "688 kg",
    range: "170 km",
    chargeTime: "60 min",
    runningCost: "₹0.84/km",
    emi: "₹14,800/month",
    cargoSpace: "2.2 m loading deck",
  },
];

const METRIC_ROWS = [
  { label: "Body type", key: "bodyType" as const },
  { label: "Rated payload", key: "payload" as const },
  { label: "Certified range", key: "range" as const },
  { label: "Full charge time", key: "chargeTime" as const },
  { label: "Running cost", key: "runningCost" as const },
  { label: "Estimated EMI", key: "emi" as const },
  { label: "Cargo space", key: "cargoSpace" as const },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialVehicleIndex?: number;
};

export default function VehicleCompareModal({
  isOpen,
  onClose,
  initialVehicleIndex = 0,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(initialVehicleIndex);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync initial selection whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(initialVehicleIndex);
    }
  }, [isOpen, initialVehicleIndex]);

  // Handle ESC key press and scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-5 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative my-auto flex w-full max-w-[1240px] flex-col overflow-hidden rounded-[20px] border border-white/20 bg-white shadow-2xl transition-all max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative flex items-start justify-between border-b border-[#eee] bg-gradient-to-b from-[#f9fafb] to-white px-6 py-5 sm:px-8 sm:py-6">
          <div className="flex flex-col gap-2">
            <Eyebrow label="VEHICLE COMPARISON" icons="navy" />
            <h2
              id="compare-modal-title"
              className="font-display text-[24px] font-semibold not-italic leading-[1.15] tracking-[-0.5px] text-ink sm:text-[32px] sm:tracking-[-0.7px]"
            >
              Compare Euler vehicles side by side.
            </h2>
            <p className="font-sans text-[13px] text-[#4a4f57] sm:text-[15px]">
              Review payload, certified range, charging speeds, and running costs to find your fleet match.
            </p>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close comparison modal"
            className="group flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f3f4f5] text-[#121212] transition-colors hover:bg-[#121212] hover:text-white cursor-pointer focus:outline-none"
          >
            <svg
              className="size-5 transition-transform group-hover:rotate-90 duration-200"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal Body: Comparison Table Area */}
        <div className="overflow-x-auto overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-thin">
          <div className="min-w-[780px] w-full">
            {/* Header row: Vehicle previews */}
            <div className="grid grid-cols-[180px_repeat(4,1fr)] items-end gap-3 pb-4 border-b border-[#e5e7eb]">
              <div className="pb-3 text-left">
                <span className="font-sans text-[14px] font-bold uppercase tracking-[0.5px] text-[#0e2f6d]">
                  Vehicles
                </span>
              </div>

              {COMPARE_VEHICLES.map((v, i) => {
                const isSelected = selectedIndex === i;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedIndex(i)}
                    aria-pressed={isSelected}
                    className={`group relative flex flex-col items-center rounded-[14px] p-3 transition-all duration-200 cursor-pointer text-center ${
                      isSelected
                        ? "bg-[#eaf1ff] ring-2 ring-[#1D6FFF] shadow-md"
                        : "bg-[#f8f9fa] hover:bg-[#f1f3f5]"
                    }`}
                  >
                    {/* Badge */}
                    {v.badge && (
                      <span className="mb-1 rounded-full bg-[#0E2F6D]/10 px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-[#0E2F6D]">
                        {v.badge}
                      </span>
                    )}

                    {/* Truck image render */}
                    <div className="relative h-[78px] w-[130px] shrink-0 my-1 transition-transform group-hover:scale-105 duration-200">
                      <Image
                        src={v.image}
                        alt={`${v.name} render`}
                        fill
                        sizes="130px"
                        className="object-contain"
                      />
                    </div>

                    <span className="mt-1 font-display text-[15px] font-bold leading-tight text-ink">
                      {v.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Metric Rows */}
            <div className="divide-y divide-[#f0f2f5]">
              {METRIC_ROWS.map((metric) => (
                <div
                  key={metric.key}
                  className="grid grid-cols-[180px_repeat(4,1fr)] items-center gap-3 py-3.5 hover:bg-[#fafbfc] transition-colors"
                >
                  {/* Row Label */}
                  <div className="font-sans text-[13px] sm:text-[14px] font-semibold text-[#4a4f57]">
                    {metric.label}
                  </div>

                  {/* Values */}
                  {COMPARE_VEHICLES.map((v, i) => {
                    const isSelected = selectedIndex === i;
                    const value = v[metric.key];
                    return (
                      <div
                        key={v.id}
                        onClick={() => setSelectedIndex(i)}
                        className={`text-center font-sans text-[14px] sm:text-[15px] py-1 px-2 rounded-[6px] cursor-pointer transition-colors ${
                          isSelected
                            ? "font-bold text-ink bg-[#1D6FFF]/10"
                            : "font-medium text-[#2d3139]"
                        }`}
                      >
                        {value}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Bottom Row: Actions */}
            <div className="mt-6 grid grid-cols-[180px_repeat(4,1fr)] items-center gap-3 pt-4 border-t border-[#e5e7eb]">
              <div className="font-sans text-[13px] font-medium text-[#6c727d]">
                Next steps
              </div>
              {COMPARE_VEHICLES.map((v, i) => {
                const isSelected = selectedIndex === i;
                return (
                  <div key={v.id} className="flex flex-col gap-2">
                    <Link
                      href="/products"
                      className={`flex h-10 w-full items-center justify-center rounded-[6px] font-display text-[13px] font-bold transition-all text-center ${
                        isSelected
                          ? "bg-[#121212] text-white hover:bg-black shadow-md"
                          : "border border-ink/30 bg-[#f3f4f5] text-ink hover:bg-white"
                      }`}
                    >
                      View Specs
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#eee] bg-[#fbfcfd] px-6 py-4">
          <p className="font-sans text-[12px] text-[#6c727d] text-center sm:text-left">
            *Specs and features may vary by customization deck type and battery options.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-[6px] border border-ink/30 bg-white font-display text-[13px] font-semibold text-ink hover:bg-[#f3f4f5] transition-colors cursor-pointer"
            >
              Close
            </button>
            <Link
              href="#book-test-drive"
              onClick={onClose}
              className="flex h-10 items-center justify-center px-5 rounded-[6px] bg-[#1D6FFF] font-display text-[13px] font-bold text-white hover:bg-[#0E2F6D] transition-colors shadow-sm"
            >
              Book Test Drive
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
