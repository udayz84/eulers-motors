"use client";

import Image from "next/image";
import { useState } from "react";

const A = "/assets/neo/contact/";
const CONTACTS = [
  {
    title: "1800 000 0000",
    detail: "9 am to 8 pm Monday to Saturday",
    icon: "phone.svg",
    href: "tel:18000000000",
  },
  {
    title: "fleet@eulermotors.com",
    detail: "For fleets over 50 vehicles",
    icon: "email.svg",
    href: "mailto:fleet@eulermotors.com",
  },
  {
    title: "Find your nearest dealer",
    detail: "112 locations, 24 states",
    icon: "location.svg",
    href: "/dealer-locator",
  },
] as const;

type ContactKind = "Test drive" | "Price Enquiry" | "Fleet";

function ContactCard({
  contact,
  mobile = false,
}: {
  contact: (typeof CONTACTS)[number];
  mobile?: boolean;
}) {
  const size = mobile ? 48 : 58;

  return (
    <a
      href={contact.href}
      className={`flex min-w-0 items-center bg-[#121212] text-white no-underline ${
        mobile
          ? "w-full gap-6 rounded-[8px] p-2"
          : "w-full gap-6 rounded-[16px] p-5"
      }`}
    >
      <span
        className={`grid shrink-0 place-items-center bg-[linear-gradient(94.1355deg,#00ff87_28.559%,#1d6fff_124.97%)] ${
          mobile ? "rounded-[4px]" : "rounded-[8.12px]"
        }`}
        style={{ width: size, height: size }}
      >
        <Image src={`${A}${contact.icon}`} alt="" width={24} height={24} />
      </span>
      <span className="flex min-w-0 flex-col gap-[6px] leading-[1.15]">
        <strong className="whitespace-nowrap font-sans text-[16px] font-bold tracking-[-0.32px]">
          {contact.title}
        </strong>
        <span className="whitespace-nowrap font-sans text-[12px] font-medium tracking-[-0.24px]">
          {contact.detail}
        </span>
      </span>
    </a>
  );
}

function Tabs({
  kind,
  onChange,
  mobile = false,
}: {
  kind: ContactKind;
  onChange: (kind: ContactKind) => void;
  mobile?: boolean;
}) {
  const tabs: ContactKind[] = ["Test drive", "Price Enquiry", "Fleet"];

  return (
    <div className={`flex w-full items-center ${mobile ? "gap-3" : "gap-3"}`} role="group" aria-label="Enquiry type">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          aria-pressed={kind === tab}
          onClick={() => onChange(tab)}
          className={`min-w-0 flex-1 rounded-[4px] font-display font-semibold leading-none ${
            mobile
              ? "h-8 px-2 text-[12px]"
              : "h-[42px] px-3 min-[1440px]:px-6 text-[16px]"
          } ${
            kind === tab
              ? "bg-[#121212] text-white"
              : "border border-white/50 bg-white/80 text-[#121212] backdrop-blur-[10px]"
          }`}
        >
          <span className={mobile ? "" : "whitespace-nowrap"}>{tab}</span>
        </button>
      ))}
    </div>
  );
}

function InputField({
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-1 font-sans text-[12px] font-medium text-[#212125]">
      <span className="whitespace-nowrap">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-[46px] w-full min-w-0 rounded-[13px] border border-[#ededed] bg-white px-4 py-[2px] font-sans text-[12px] font-medium text-[#121212] outline-none placeholder:text-[#9ca3af] focus:border-[#0abf8b] max-[767px]:h-9 max-[767px]:rounded-[8px]"
      />
    </label>
  );
}

function ArrowButton({ kind, mobile = false }: { kind: ContactKind; mobile?: boolean }) {
  return (
    <button
      type="submit"
      className={`inline-flex shrink-0 items-center rounded-[4px] bg-[linear-gradient(108deg,#00ff87_28.559%,#1d6fff_124.97%)] text-white ${
        mobile ? "gap-2 pl-3 pr-[2px] py-[2px]" : "h-[42px] gap-5 pl-6 pr-[2px]"
      }`}
    >
      <span className="whitespace-nowrap font-display text-[12px] font-semibold leading-none max-[767px]:text-[12px] min-[768px]:text-[16px]">
        {`Confirm ${kind.toLowerCase()}`}
      </span>
      <span className={`grid shrink-0 place-items-center bg-[#121212] ${mobile ? "size-8 rounded-[2px]" : "size-[38px] rounded-[2px]"}`}>
        <Image src={`${A}arrow.svg`} alt="" width={22} height={14} />
      </span>
    </button>
  );
}

export default function NeoContactSection({
  mode,
}: {
  mode: "desktop" | "mobile";
}) {
  const [kind, setKind] = useState<ContactKind>("Test drive");

  if (mode === "mobile") {
    return (
      <section id="contact" className="bg-white px-5 py-6 text-[#121212] min-[768px]:max-[1023px]:px-8 min-[768px]:max-[1023px]:py-12">
        <div className="mx-auto flex w-full max-w-[353px] flex-col gap-6 min-[768px]:max-[1023px]:max-w-[760px] min-[768px]:max-[1023px]:gap-8">
          <div className="flex flex-col items-start gap-[14px]">
            <div className="flex items-center gap-3">
              <Image src={`${A}logo.svg`} alt="" width={14} height={14} />
              <span className="font-sans text-[12px] uppercase leading-none">Next step</span>
            </div>
            <h2 className="w-[291px] max-w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] min-[768px]:max-[1023px]:w-full min-[768px]:max-[1023px]:text-[36px]">
              Want to know more about Neo?
            </h2>
            <p className="m-0 font-sans text-[12px] leading-[1.2] min-[768px]:max-[1023px]:max-w-[650px] min-[768px]:max-[1023px]:text-[14px]">
              We bring the vehicle to your depot with a load on it. Forty minutes. No pressure. You keep the cost report.
            </p>
          </div>

          <div className="flex flex-col gap-[10px] min-[768px]:max-[1023px]:grid min-[768px]:max-[1023px]:grid-cols-2 min-[768px]:max-[1023px]:gap-4">
            <form
              onSubmit={(event) => event.preventDefault()}
              className="flex w-full flex-col gap-3 rounded-[10px] bg-[#f3f4f5] p-4"
            >
              <div className="flex flex-col gap-[6px]">
                <h3 className="m-0 font-sans text-[24px] font-bold leading-[1.15] tracking-[-0.48px]">
                  Book a test drive
                </h3>
                <p className="m-0 font-sans text-[12px] leading-[1.2]">
                  Two steps. We call you within one working day.
                </p>
              </div>
              <Tabs kind={kind} onChange={setKind} mobile />
              <div className="grid w-full grid-cols-2 gap-[6px]">
                <InputField label="Name *" placeholder="Full name" required />
                <InputField label="Mobile number *" placeholder="10 digit" type="tel" required />
              </div>
              <div className="flex flex-col items-center gap-3">
                <ArrowButton kind={kind} mobile />
                <p className="m-0 max-w-[271px] text-center font-sans text-[12px] leading-[1.2]">
                  We never share your number with anyone else. No spam calls.
                </p>
              </div>
            </form>
            <div className="flex flex-col gap-2">
              {CONTACTS.map((contact) => (
                <ContactCard key={contact.icon} contact={contact} mobile />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="relative isolate mx-auto grid min-h-[789px] w-full max-w-[1440px] grid-cols-[minmax(0,1fr)_minmax(0,517px)] items-stretch gap-[60px] overflow-hidden bg-white px-[80px] pb-[42px] pt-[64px] max-[767px]:min-h-0 max-[767px]:grid-cols-1 max-[767px]:gap-6 max-[767px]:px-6 max-[767px]:py-8"
    >
      <div aria-hidden className="pointer-events-none absolute left-[-8px] top-[192px] -z-10 h-[441px] w-[630.733px] max-w-[60%] max-[767px]:left-0 max-[767px]:top-[110px] max-[767px]:w-[80%]">
        <Image src="/assets/faq/next-step-dashboard.png" alt="" fill sizes="(max-width: 1100px) 80vw, 631px" className="object-cover blur-none opacity-100" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg,rgba(255,255,255,0) 65.285%,#fff 100%),linear-gradient(-90deg,rgba(255,255,255,0) 71.138%,#fff 100%),linear-gradient(0deg,rgba(255,255,255,0) 69.07%,#fff 100%),linear-gradient(179.861deg,rgba(255,255,255,0) 51.97%,#fff 99.827%)",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[683px] min-w-0 flex-col justify-between max-[767px]:min-h-0 max-[767px]:gap-10">
        <div className="flex max-w-[630px] -translate-y-2 flex-col items-start gap-[14px] max-[767px]:translate-y-0">
          <div className="flex items-center gap-3">
            <Image src={`${A}logo.svg`} alt="" width={14} height={14} />
            <span className="font-sans text-[16px] uppercase leading-none">Next step</span>
          </div>
          <h2 className="m-0 w-[492px] max-w-full font-display text-[42px] font-semibold leading-[1.15] tracking-[-0.84px]">
            Want to know more about Neo?
          </h2>
          <p className="m-0 w-[448px] max-w-full font-sans text-[18px] leading-[1.3]">
            We bring the vehicle to your depot with a load on it. Forty minutes. No pressure. You keep the cost report.
          </p>
        </div>

        <div className="grid max-w-[610px] grid-cols-2 items-start gap-[10px] max-[767px]:max-w-none max-[640px]:grid-cols-1">
          <div className="flex min-w-0 flex-col gap-[10px]">
            <ContactCard contact={CONTACTS[0]} />
            <ContactCard contact={CONTACTS[1]} />
          </div>
          <ContactCard contact={CONTACTS[2]} />
        </div>
      </div>

      <form
        onSubmit={(event) => event.preventDefault()}
        className="relative z-10 mt-[36.477px] flex h-[647px] w-full flex-col justify-center gap-8 rounded-[16px] bg-[#f3f4f5] p-8 max-[767px]:mx-auto max-[767px]:mt-0 max-[767px]:h-auto max-[767px]:min-h-0 max-[767px]:max-w-[517px] max-[640px]:p-5"
      >
        <div className="flex flex-col gap-3">
          <h3 className="m-0 whitespace-nowrap font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] max-[640px]:text-[24px]">
            Book a test drive
          </h3>
          <p className="m-0 font-sans text-[16px] leading-[1.2] max-[640px]:text-[12px]">
            Two steps. We call you within one working day.
          </p>
        </div>

        <Tabs kind={kind} onChange={setKind} />

        <div className="grid grid-cols-2 gap-3">
          <InputField label="Name *" placeholder="Full name" required />
          <InputField label="Mobile number *" placeholder="10 digit" type="tel" required />
        </div>

        <label className="flex flex-col gap-1 font-sans text-[12px] font-medium text-[#212125]">
          <span>Which vehicle *</span>
          <span className="relative block">
            <select required defaultValue="" className="h-[46px] w-full appearance-none rounded-[13px] border border-[#ededed] bg-white pl-4 pr-10 text-[12px] text-[#9ca3af] outline-none focus:border-[#0abf8b]">
              <option value="" disabled>Not sure, please suggest one</option>
              <option>Neo HiRANGE</option>
              <option>Neo HiCITY</option>
            </select>
            <Image src={`${A}chevron.svg`} alt="" width={14} height={6} className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2" />
          </span>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <InputField label="City *" placeholder="Mumbai" required />
          <InputField label="Kilometres per day*" placeholder="150" type="number" required />
        </div>

        <label className="flex items-start gap-[10px] font-sans text-[14px] leading-[1.2]">
          <input type="checkbox" className="mt-0.5 size-5 shrink-0 appearance-none rounded-full border border-[#0c1530] bg-[rgba(12,21,48,0.04)] checked:bg-[#0c1530] checked:ring-2 checked:ring-inset checked:ring-white" />
          <span>
            Euler Motors and its dealers may contact me about this enquiry. {" "}
            <a href="/privacy-policy" className="text-inherit underline">Privacy policy.</a>
          </span>
        </label>

        <div className="flex w-full items-start justify-center gap-8 max-[640px]:flex-col max-[640px]:items-center max-[640px]:gap-3">
          <p className="m-0 flex-1 font-sans text-[12px] leading-[1.2] max-[640px]:text-center">
            We never share your number with anyone else. No spam calls.
          </p>
          <ArrowButton kind={kind} />
        </div>
      </form>
    </section>
  );
}
