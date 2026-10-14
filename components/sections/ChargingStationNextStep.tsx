"use client";

import Image from "next/image";
import { useState } from "react";

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

function InputField({
  label,
  placeholder,
  defaultValue,
  dropdown = false,
}: {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  dropdown?: boolean;
}) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-1 font-sans text-[12px] leading-normal text-[#212125]">
      <span>{label}</span>
      <span className="flex h-[46px] items-center justify-between gap-2 rounded-[13px] border border-[#ededed] bg-white px-4 backdrop-blur-[8.15px]">
        {dropdown ? (
          <select
            defaultValue={defaultValue}
            className="h-full min-w-0 flex-1 appearance-none bg-transparent font-sans text-[12px] font-medium text-[#9ca3af] outline-none"
            aria-label={label}
          >
            <option value="Petrol Pump">Petrol Pump</option>
            <option value="Warehouse">Warehouse</option>
            <option value="Land">Land</option>
          </select>
        ) : (
          <input
            aria-label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className="h-full min-w-0 flex-1 bg-transparent font-sans text-[12px] font-medium text-[#121212] outline-none placeholder:text-[#9ca3af]"
          />
        )}
        {dropdown && (
          <Image src={`${asset}chevron.svg`} alt="" width={14} height={6} aria-hidden="true" />
        )}
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

  return (
    <section className="relative isolate mx-auto flex h-[611px] w-full max-w-[1440px] items-end justify-between overflow-hidden bg-white px-20 pt-16 pb-[42px] max-[767px]:p-0 max-[767px]:h-auto max-[767px]:flex-col max-[767px]:items-stretch max-[767px]:gap-8">
      <div className="pointer-events-none absolute left-[72px] top-[179.55px] -z-10 hidden h-[441px] w-[631px] lg:block" aria-hidden="true">
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
      </div>

      {/* Desktop Layout */}
      <div className="relative z-10 flex h-full min-w-0 flex-1 flex-col items-start justify-between max-[767px]:hidden">
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
      <div className="relative z-10 flex w-[517px] shrink-0 flex-col justify-center gap-8 rounded-2xl bg-[#f3f4f5] p-8 max-[767px]:hidden">
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
            <InputField label="Name *" placeholder="Full name" />
            <InputField label="Mobile number *" placeholder="10 digit" />
          </div>
          <div className="flex gap-3 max-[480px]:flex-col">
            <InputField label="City *" placeholder="Mumbai" />
            <InputField label="What you have" defaultValue="Petrol Pump" dropdown />
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
      <div className="hidden max-[767px]:flex relative" style={{ padding: '24px 20px', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
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
          <div className="relative shrink-0" style={{ display: 'flex', width: '353px', padding: '16px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '12px', borderRadius: '10px', background: '#f3f4f5' }}>
            <div className="flex flex-col gap-[6px] items-start relative shrink-0 text-[#121212] w-full whitespace-nowrap">
              <p className="font-sans font-bold leading-[1.15] relative shrink-0 text-[24px] tracking-[-0.48px]">
                Book a test drive
              </p>
              <p className="font-sans font-normal leading-normal relative shrink-0 text-[12px]">
                Two steps. We call you within one working day.
              </p>
            </div>
            <div className="flex gap-[12px] items-center relative shrink-0 w-full">
              <div
                className={`flex flex-[1_0_0] items-center justify-center min-w-px px-[24px] py-[10px] relative rounded-[32px] cursor-pointer ${
                  activeTab === "Test drive" ? "bg-[#0c2c66]" : "backdrop-blur-[10px] bg-[rgba(255,255,255,0.8)] border border-[rgba(255,255,255,0.5)] border-solid"
                }`}
                onClick={() => setActiveTab("Test drive")}
              >
                <p className={`font-display leading-none not-italic relative shrink-0 whitespace-nowrap ${activeTab === "Test drive" ? "text-white" : "text-[#121212]"} text-[12px]`}>
                  Test drive
                </p>
              </div>
              <div
                className={`flex flex-[1_0_0] items-center justify-center min-w-px px-[24px] py-[10px] relative rounded-[32px] cursor-pointer ${
                  activeTab === "Price Enquiry" ? "bg-[#0c2c66]" : "backdrop-blur-[10px] bg-[rgba(255,255,255,0.8)] border border-[rgba(255,255,255,0.5)] border-solid"
                }`}
                onClick={() => setActiveTab("Price Enquiry")}
              >
                <p className={`font-display leading-none not-italic relative shrink-0 whitespace-nowrap ${activeTab === "Price Enquiry" ? "text-white" : "text-[#121212]"} text-[12px]`}>
                  Price Enquiry
                </p>
              </div>
              <div
                className={`flex flex-[1_0_0] items-center justify-center min-w-px px-[24px] py-[10px] relative rounded-[32px] cursor-pointer ${
                  activeTab === "Fleet" ? "bg-[#0c2c66]" : "backdrop-blur-[10px] bg-[rgba(255,255,255,0.8)] border border-[rgba(255,255,255,0.5)] border-solid"
                }`}
                onClick={() => setActiveTab("Fleet")}
              >
                <p className={`font-display leading-none not-italic relative shrink-0 whitespace-nowrap ${activeTab === "Fleet" ? "text-white" : "text-[#121212]"} text-[12px]`}>
                  Fleet
                </p>
              </div>
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
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      placeholder="10 digit"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
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
            <div className="relative shrink-0" style={{ display: 'flex', width: '353px', padding: '8px', alignItems: 'center', gap: '10px', borderRadius: '8px', background: '#f3f4f5' }}>
              <div className="bg-[#0c2c66] relative rounded-[5.88px] shrink-0 size-[42px]">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-1/2">
                  <div className="absolute inset-[8.33%]">
                    <Image
                      src="/assets/about-euler/next-step-phone.svg"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[6px] items-start justify-center leading-[1.15] relative shrink-0 text-[#121212] text-center whitespace-nowrap">
                <p className="font-sans font-bold relative shrink-0 text-[14px] tracking-[-0.28px]">
                  1800 000 0000
                </p>
                <p className="font-sans font-medium relative shrink-0 text-[12px] tracking-[-0.24px]">
                  9 am to 8 pm Monday to Saturday
                </p>
              </div>
            </div>
            <div className="relative shrink-0" style={{ display: 'flex', width: '353px', padding: '8px', alignItems: 'center', gap: '10px', borderRadius: '8px', background: '#f3f4f5' }}>
              <div className="bg-[#0c2c66] relative rounded-[5.88px] shrink-0 size-[42px]">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-1/2">
                  <div className="absolute inset-[14.58%_8.33%]">
                    <Image
                      src="/assets/about-euler/next-step-email.svg"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[6px] items-start justify-center leading-[1.15] relative shrink-0 text-[#121212] text-center whitespace-nowrap">
                <p className="font-sans font-bold relative shrink-0 text-[14px] tracking-[-0.28px]">
                  fleet@eulermotors.com
                </p>
                <p className="font-sans font-medium relative shrink-0 text-[12px] tracking-[-0.24px]">
                  For fleets over 50 vehicles
                </p>
              </div>
            </div>
            <div className="relative shrink-0" style={{ display: 'flex', width: '353px', padding: '8px', alignItems: 'center', gap: '10px', borderRadius: '8px', background: '#f3f4f5' }}>
              <div className="bg-[#0c2c66] relative rounded-[5.88px] shrink-0 size-[42px]">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-1/2">
                  <div className="absolute inset-[8.33%_12.5%]">
                    <Image
                      src="/assets/about-euler/next-step-location.svg"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[6px] items-start justify-center leading-[1.15] relative shrink-0 text-[#121212] text-center whitespace-nowrap">
                <p className="font-sans font-bold relative shrink-0 text-[14px] tracking-[-0.28px]">
                  Find your nearest dealer
                </p>
                <p className="font-sans font-medium relative shrink-0 text-[12px] tracking-[-0.24px]">
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
