"use client";

import Image from "next/image";
import { Fragment } from "react";

const ASSET = "/assets/service-page/guidelines/";

const DOS = [
  "Book your service slot in advance via the app or website",
  "Carry your vehicle registration and warranty documents",
  "Report any unusual sounds, vibrations or warning lights clearly",
  "Keep your vehicle battery above 20% when bringing it in",
  "Follow the recommended service schedule (every 10,000 km or 6 months)",
  "Collect your service summary report before leaving",
];

const DONTS = [
  "Don't attempt to open or repair the battery pack yourself",
  "Don't ignore dashboard warning lights or error codes",
  "Don't skip scheduled maintenance visits",
  "Don't use non-approved accessories or aftermarket parts",
  "Don't charge with damaged cables or unauthorized chargers",
  "Don't modify the vehicle wiring or electrical system",
];

function Eyebrow() {
  return (
    <div className="relative flex h-4 items-center gap-1 lg:h-[20.355px] lg:gap-1.5">
      {/* Swoosh underline */}
      <div className="absolute left-0 top-[0.33px] h-4 w-[116.978px] lg:hidden">
        <Image
          src={`${ASSET}eyebrow-swoosh-mobile.svg`}
          alt=""
          width={114.561}
          height={16}
          className="absolute left-[1.205px] top-0 h-4 w-[114.561px] max-w-none"
        />
      </div>
      <div className="absolute left-0 top-0 hidden h-[20.355px] w-[148.821px] lg:block">
        <Image
          src={`${ASSET}eyebrow-swoosh-desktop.svg`}
          alt=""
          width={146.405}
          height={20.355}
          className="absolute left-[1.205px] top-0 h-[20.355px] w-[146.405px] max-w-none"
        />
      </div>
      {/* Accent slash */}
      <div className="relative h-4 w-[14.794px] shrink-0 lg:hidden">
        <Image
          src={`${ASSET}eyebrow-square-mobile.svg`}
          alt=""
          width={14.1899}
          height={16}
          className="absolute left-[0.604px] top-0 h-4 w-[14.1899px] max-w-none"
        />
      </div>
      <div className="relative hidden h-[20.355px] w-[18.821px] shrink-0 lg:block">
        <Image
          src={`${ASSET}eyebrow-square-desktop.svg`}
          alt=""
          width={18.2171}
          height={20.355}
          className="absolute left-[0.604px] top-0 h-[20.355px] w-[18.2171px] max-w-none"
        />
      </div>
      <span className="relative font-sans text-xs font-bold uppercase leading-[16px] tracking-[0.6px] text-[#0e2f6d] lg:text-sm lg:leading-[19px] lg:tracking-[0.7px]">
        SERVICE GUIDELINES
      </span>
    </div>
  );
}

function Badge({ tone }: { tone: "do" | "dont" }) {
  const isDont = tone === "dont";
  return (
    <div
      className={`relative flex w-full items-center gap-2.5 px-5 lg:w-auto ${
        isDont ? "justify-end lg:justify-start" : "justify-center lg:justify-start"
      }`}
    >
      {/* Tilted banner behind the label */}
      <div
        className={`absolute top-[-5.53px] h-[48.328px] ${
          isDont
            ? "left-[246px] w-[94.892px] lg:left-[7px] lg:w-[120px]"
            : "left-[12px] w-[93.892px] lg:left-[7px] lg:w-[120px]"
        }`}
      >
        <Image
          src={`${ASSET}${isDont ? "badge-donts-mobile.svg" : "badge-dos-mobile.svg"}`}
          alt=""
          fill
          className={`object-fill lg:hidden ${isDont ? "-scale-x-100" : ""}`}
        />
        <Image
          src={`${ASSET}${isDont ? "badge-donts-desktop.svg" : "badge-dos-desktop.svg"}`}
          alt=""
          fill
          className="hidden object-fill lg:block"
        />
      </div>
      <span
        className={`relative font-sans text-sm font-bold uppercase leading-[19px] tracking-[0.7px] text-white lg:text-lg lg:leading-[25px] lg:tracking-[0.9px] ${
          isDont ? "shrink-0" : "flex-1 lg:flex-none"
        }`}
      >
        <span className="lg:hidden">{isDont ? " Don'ts" : " Do's"}</span>
        <span className="hidden lg:inline">{isDont ? "Don'ts" : "Do's"}</span>
      </span>
    </div>
  );
}

function GuidelineCard({ items, tone }: { items: string[]; tone: "do" | "dont" }) {
  const isDont = tone === "dont";

  return (
    <div className="relative z-10 flex w-full flex-col gap-[14px] rounded-[12px] bg-white p-4 lg:gap-6 lg:p-6">
      {items.map((item, index) => (
        <Fragment key={item}>
          {index > 0 && (
            <div className="relative h-0 w-full">
              <div className="absolute inset-x-0 -top-[0.5px] h-px bg-[#d4dbec]" />
            </div>
          )}
          <div className="flex w-full items-center gap-3">
            <div
              className={
                isDont
                  ? "flex size-[42px] shrink-0 items-center justify-center rounded-[20px] p-1.5 bg-[rgba(240,6,6,0.1)] lg:rounded-full lg:bg-[rgba(212,219,236,0.4)]"
                  : "flex size-[42px] shrink-0 items-center justify-center rounded-[20px] p-1.5 bg-[rgba(212,219,236,0.4)] lg:rounded-full"
              }
            >
              {isDont ? (
                <div className="flex size-[42px] shrink-0 items-center justify-center rounded-[20px] p-1.5 bg-[rgba(240,6,6,0.1)]">
                  <Icon tone="dont" />
                </div>
              ) : (
                <Icon tone="do" />
              )}
            </div>
            <p className="flex-1 font-sans text-sm font-semibold leading-[20px] tracking-[-0.28px] text-[#121212] lg:text-lg lg:leading-[25px] lg:tracking-[-0.36px]">
              {item}
            </p>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

function Icon({ tone }: { tone: "do" | "dont" }) {
  const isDont = tone === "dont";

  return (
    <>
      <Image
        src={`${ASSET}${isDont ? "icon-cancel-mobile.svg" : "icon-check-mobile.svg"}`}
        alt=""
        width={20}
        height={20}
        className="h-[20px] w-[20px] lg:hidden"
      />
      <Image
        src={`${ASSET}${isDont ? "icon-cancel.svg" : "icon-check.svg"}`}
        alt=""
        width={18}
        height={18}
        className="hidden h-[18px] w-[18px] lg:block"
      />
    </>
  );
}

export default function ServiceGuidelines() {
  return (
    <section className="relative isolate w-full flex-col items-center justify-center bg-[#d4dbec]">
      {/* Full-width background; content centred & capped at 1440px so it stays responsive */}
      <div className="mx-auto max-w-[1440px] w-full px-5 pb-5 pt-8 lg:px-16 lg:py-[62px] flex flex-col items-center justify-center">
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6 lg:gap-[55px]">
        {/* Header */}
        <div className="flex w-full flex-col items-start gap-[14px] lg:items-center lg:gap-4">
          <Eyebrow />
          <h2 className="w-[279.376px] font-display text-[28px] font-semibold leading-[32px] tracking-[-0.56px] text-[#121212] lg:w-auto lg:whitespace-nowrap lg:text-[42px] lg:leading-[48px] lg:tracking-[-0.84px]">
            Do&apos;s and Don&apos;ts at Our Service Centres
          </h2>
          <p className="w-full font-sans text-xs font-normal leading-[16px] text-[#121212] lg:w-auto lg:whitespace-nowrap lg:text-base lg:leading-[22px]">
            Follow these guidelines to ensure a smooth and safe service experience for your Euler
            vehicle.
          </p>
        </div>

        {/* Guidelines */}
        <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-center lg:gap-[42px]">
          <div className="flex w-full flex-1 flex-col gap-[11px]">
            <Badge tone="do" />
            <GuidelineCard items={DOS} tone="do" />
          </div>
          <div className="flex w-full flex-1 flex-col gap-[11px]">
            <Badge tone="dont" />
            <GuidelineCard items={DONTS} tone="dont" />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
