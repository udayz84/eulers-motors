"use client";

import { useState } from "react";
import Image from "next/image";

const TABS = ["Test drive", "Price Enquiry", "Fleet"] as const;

const CONTACTS = [
  {
    icon: "/assets/about-euler/next-step-phone.svg",
    title: "1800 000 0000",
    subtitle: "9 am to 8 pm Monday to Saturday",
  },
  {
    icon: "/assets/about-euler/next-step-email.svg",
    title: "fleet@eulermotors.com",
    subtitle: "For fleets over 50 vehicles",
  },
  {
    icon: "/assets/about-euler/next-step-location.svg",
    title: "Find your nearest dealer",
    subtitle: "112 locations, 24 states",
  },
];

/**
 * Next Step mobile contact form (Figma: 3554:20105).
 * Mobile-only form section with tabs, inputs, and contact cards.
 */
export default function NextStepMobile() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Test drive");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  return (
    <section className="bg-white px-[20px] py-[24px] relative">
      <div className="flex flex-col gap-[24px] items-start relative shrink-0 w-[353px]">
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
          <p className="font-display text-[28px] font-semibold leading-[1.15] not-italic relative shrink-0 text-[#121212] tracking-[-0.56px] w-full">
            Tell us what you need!
          </p>
          <p className="font-sans font-normal leading-normal relative shrink-0 text-[#121212] text-[12px] w-full">
            We bring the vehicle to your depot with a load on it. Forty minutes. No pressure. You keep the cost report.
          </p>
        </div>
        <div className="flex flex-col gap-[10px] items-start relative shrink-0">
          <div className="bg-[#f3f4f5] flex flex-col gap-[12px] items-center justify-center p-[16px] relative rounded-[10px] shrink-0 w-[353px]">
            <div className="flex flex-col gap-[6px] items-start relative shrink-0 text-[#121212] w-full whitespace-nowrap">
              <p className="font-sans font-bold leading-[1.15] relative shrink-0 text-[24px] tracking-[-0.48px]">
                Book a test drive
              </p>
              <p className="font-sans font-normal leading-normal relative shrink-0 text-[12px]">
                Two steps. We call you within one working day.
              </p>
            </div>
            <div className="flex gap-[12px] items-center relative shrink-0 w-full">
              <div className="bg-[#0c2c66] flex flex-[1_0_0] items-center justify-center min-w-px px-[24px] py-[10px] relative rounded-[32px]">
                <p className="font-display leading-none not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">
                  Test drive
                </p>
              </div>
              <button
                onClick={() => setActiveTab("Price Enquiry")}
                className={`backdrop-blur-[10px] border border-solid cursor-pointer flex flex-[1_0_0] items-center justify-center min-w-px px-[24px] py-[10px] relative rounded-[32px] ${
                  activeTab === "Price Enquiry"
                    ? "bg-[#0c2c66] border-white text-white"
                    : "bg-[rgba(255,255,255,0.8)] border-[rgba(255,255,255,0.5)] text-[#121212]"
                }`}
              >
                <p className="font-display leading-none not-italic relative shrink-0 text-[12px] text-left whitespace-nowrap">
                  Price Enquiry
                </p>
              </button>
              <button
                onClick={() => setActiveTab("Fleet")}
                className={`backdrop-blur-[10px] border border-solid cursor-pointer flex flex-[1_0_0] items-center justify-center min-w-px px-[24px] py-[10px] relative rounded-[32px] ${
                  activeTab === "Fleet"
                    ? "bg-[#0c2c66] border-white text-white"
                    : "bg-[rgba(255,255,255,0.8)] border-[rgba(255,255,255,0.5)] text-[#121212]"
                }`}
              >
                <p className="font-display leading-none not-italic relative shrink-0 text-[12px] text-left whitespace-nowrap">
                  Fleet
                </p>
              </button>
            </div>
            <div className="flex gap-[6px] items-start relative shrink-0 w-full">
              <div className="flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative">
                <p className="font-sans font-medium leading-normal relative shrink-0 text-[#212125] text-[12px] whitespace-nowrap">
                  Name *
                </p>
                <div className="backdrop-blur-[8.15px] bg-white border border-[#ededed] border-solid flex gap-[7px] h-[36px] items-center px-[16px] py-[2px] relative rounded-[8px] shrink-0 w-full">
                  <div className="flex flex-[1_0_0] items-center min-w-px relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full bg-transparent font-sans font-medium leading-normal text-[#9ca3af] text-[12px] outline-none placeholder:text-[#9ca3af]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative">
                <p className="font-sans font-medium leading-normal relative shrink-0 text-[#212125] text-[12px] whitespace-nowrap">
                  Mobile number *
                </p>
                <div className="backdrop-blur-[8.15px] bg-white border border-[#ededed] border-solid flex gap-[7px] h-[36px] items-center px-[16px] py-[2px] relative rounded-[8px] shrink-0 w-full">
                  <div className="flex flex-[1_0_0] items-center min-w-px relative">
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 10) setMobile(value);
                      }}
                      placeholder="10 digit"
                      className="w-full bg-transparent font-sans font-medium leading-normal text-[#9ca3af] text-[12px] outline-none placeholder:text-[#9ca3af]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[12px] items-center justify-center relative shrink-0 w-full">
              <div className="flex items-center relative shrink-0 w-full">
                <button className="bg-[#121212] cursor-pointer flex flex-[1_0_0] gap-[8px] h-[44px] items-center justify-center min-w-px px-[20px] relative rounded-[4px]">
                  <p className="font-display leading-none not-italic relative shrink-0 text-[12px] text-left text-white whitespace-nowrap">
                    Continue
                  </p>
                  <div className="h-[12px] relative shrink-0 w-[18.857px] overflow-hidden">
                    <Image
                      src="/assets/about-euler/next-step-arrow.svg"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>
              </div>
              <p className="font-sans font-medium leading-normal relative shrink-0 text-[#121212] text-[12px] text-center w-[271px]">
                We never share your number with anyone else. No spam calls.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-[10px] items-start relative shrink-0">
            {CONTACTS.map((contact, index) => (
              <div key={index} className="bg-[#f3f4f5] flex gap-[10px] items-center p-[8px] relative rounded-[8px] shrink-0 w-[353px]">
                <div className="bg-[#0c2c66] relative rounded-[5.88px] shrink-0 size-[42px] overflow-hidden">
                  <Image
                    src={contact.icon}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[6px] items-start justify-center leading-[1.15] relative shrink-0 text-[#121212] text-center whitespace-nowrap">
                  <p className="font-sans font-bold relative shrink-0 text-[14px] tracking-[-0.28px]">
                    {contact.title}
                  </p>
                  <p className="font-sans font-medium relative shrink-0 text-[12px] tracking-[-0.24px]">
                    {contact.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
