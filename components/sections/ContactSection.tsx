"use client";

import { useState } from "react";
import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";

/** Vehicles listed on the page (navbar Product menu / showcase) */
const VEHICLES = [
  "Storm EV LongRange 200",
  "Storm EV T1500",
  "HiLoad EV",
  "Turbo EV 1000",
  "Neo HiRange",
  "Neo HiCity",
];

const CONTACTS = [
  { icon: "/assets/contact/icon-call.svg", title: "1800 000 0000", sub: "9 am to 8 pm Monday to Saturday" },
  { icon: "/assets/contact/icon-mail.svg", title: "fleet@eulermotors.com", sub: "For fleets over 50 vehicles" },
  { icon: "/assets/contact/icon-pin.svg", title: "Find your nearest dealer", sub: "112 locations, 24 states" },
];

/**
 * "Tell us what you need!" + Book-a-test-drive form
 * (desktop 1:1974 · mobile 1:5028 — the mobile form is the simplified variant).
 */
const TABS = ["Test drive", "Price Enquiry", "Fleet"] as const;
type Tab = (typeof TABS)[number];

/** Per-tab form fields (Figma 1:2007 skeleton: 2 + select + 2 + consent + CTA) */
const FORMS: Record<Tab, { fields: [string, string][]; cta: string }> = {
  "Test drive": {
    fields: [
      ["Name *", "Full name"],
      ["Mobile number *", "10 digit"],
    ],
    cta: "Confirm test drive",
  },
  "Price Enquiry": {
    fields: [
      ["Name *", "Full name"],
      ["Mobile number *", "10 digit"],
    ],
    cta: "Get price list",
  },
  Fleet: {
    fields: [
      ["Company name *", "Company"],
      ["Mobile number *", "10 digit"],
    ],
    cta: "Talk to our fleet team",
  },
};
const SECOND_ROW: Record<Tab, [string, string]> = {
  "Test drive": ["City *", "Mumbai"],
  "Price Enquiry": ["City *", "Mumbai"],
  Fleet: ["City *", "Mumbai"],
};
const THIRD_FIELD: Record<Tab, [string, string]> = {
  "Test drive": ["Kilometres per day *", "150"],
  "Price Enquiry": ["Quantity of vehicles *", "5"],
  Fleet: ["Fleet size *", "Number of vehicles"],
};

export default function ContactSection() {
  const [tab, setTab] = useState<Tab>("Test drive");
  return (
    <section id="book-test-drive" className="relative overflow-clip bg-white" aria-label="Contact">
      {/* Figma 1:1974 — width 1440 · padding 64px 80px 42px 80px ·
          justify-between · items-center (columns 613 + 150 gap + 517 = 1280) */}
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-5 pb-6 pt-6 lg:flex-row lg:items-stretch lg:justify-between lg:gap-10 lg:px-[80px] lg:pb-[42px] lg:pt-[64px]">
        {/* left column — heading top · contacts bottom */}
        <div className="relative flex flex-col gap-6 lg:justify-between lg:gap-0">
          {/* photo wash — Figma 1:1976 exact box: 630.733×441 at (-8, 139.55).
              Asset is Figma's own composited export of that node (photo, four
              white fades and 30.83px blur baked in) so the wash renders exactly
              as designed instead of approximating the gradients in CSS. */}
          <Image
            aria-hidden
            src="/assets/enterprise/truck-wash.png"
            alt=""
            width={630}
            height={441}
            className="absolute left-[-8px] top-[139.55px] hidden h-[441px] w-[630.733px] object-cover lg:block"
          />

          <div className="relative flex flex-col gap-4">
            <Eyebrow label="Next step" />
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.84px] text-ink lg:text-[42px]">
                Tell us what you need!
              </h2>
              <p className="max-w-[474px] text-[12px] leading-snug text-ink lg:text-[16px] lg:leading-normal">
                We bring the vehicle to your depot with a load on it. Forty minutes. No
                pressure. You keep the cost report.
              </p>
            </div>
          </div>

          {/* mobile (Figma 1:5028/1:5037): the form card sits above the contact rows;
              lg:contents dissolves the group on desktop */}
          <div className="flex flex-col gap-2.5 lg:contents">
            {/* form card — mobile variant (Figma 1:5038) */}
            <div className="flex w-full flex-col gap-3 rounded-[10px] bg-surface p-4 lg:hidden">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-2xl font-bold leading-[1.15] tracking-[-0.48px] text-ink">Book a test drive</h3>
                <p className="text-[12px] text-ink">Two steps. We call you within one working day.</p>
              </div>
              <div className="flex w-full gap-2">
                <span className="flex flex-1 items-center justify-center rounded-[32px] bg-deep-card px-1 py-[12px] font-display text-[12px] font-semibold leading-none text-white whitespace-nowrap">
                  Test drive
                </span>
                <span className="flex flex-1 items-center justify-center rounded-[32px] border border-white/50 bg-white/80 px-1 py-[12px] font-display text-[12px] font-semibold leading-none text-ink backdrop-blur-[10px] whitespace-nowrap">
                  Price Enquiry
                </span>
                <span className="flex flex-1 items-center justify-center rounded-[32px] border border-white/50 bg-white/80 px-1 py-[12px] font-display text-[12px] font-semibold leading-none text-ink backdrop-blur-[10px] whitespace-nowrap">
                  Fleet
                </span>
              </div>
              <div className="flex gap-1.5">
                <Field label="Name *" placeholder="Full name" mobile />
                <Field label="Mobile number *" placeholder="10 digit" mobile />
              </div>
              <Button variant="dark" arrow="white" className="w-full">
                Continue
              </Button>
              <p className="text-center text-[12px] font-medium text-ink">
                We never share your number with anyone else. No spam calls.
              </p>
            </div>

            {/* contact cards — relative keeps them above the absolute photo wash */}
            <div className="relative flex flex-col gap-2.5 lg:flex-row lg:flex-wrap lg:items-start lg:gap-2.5">
              <div className="flex flex-col gap-2.5 lg:gap-2.5">
                {CONTACTS.slice(0, 2).map((c) => (
                  <ContactCard key={c.title} {...c} />
                ))}
              </div>
              <ContactCard {...CONTACTS[2]} />
            </div>
          </div>
        </div>

        {/* form card — desktop variant, Figma 1:2006/1:2007 exact */}
        <div className="hidden w-[517px] shrink-0 flex-col gap-8 rounded-2xl bg-surface p-8 lg:flex">
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-ink">
              Book a test drive
            </h3>
            <p className="text-[16px] text-ink">Two steps. We call you within one working day.</p>
          </div>
          <FormTabs active={tab} onSelect={setTab} />
          <div className="flex gap-3">
            {FORMS[tab].fields.map(([label, ph]) => (
              <Field key={label} label={label} placeholder={ph} />
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-medium text-[#212125]">Which vehicle *</span>
            <div className="relative">
              <select
                defaultValue=""
                className="h-[46px] w-full appearance-none rounded-[13px] border border-hairline bg-white px-4 text-[12px] font-medium text-ink backdrop-blur-[8.15px] outline-none"
              >
                <option value="" disabled>
                  Not sure, please suggest one
                </option>
                {VEHICLES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              <Image
                src="/assets/contact/chevron.svg"
                alt=""
                width={14}
                height={6}
                aria-hidden
                className="pointer-events-none absolute right-4 top-1/2 h-1.5 w-3.5 -translate-y-1/2 -scale-y-100"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Field label={SECOND_ROW[tab][0]} placeholder={SECOND_ROW[tab][1]} />
            <Field label={THIRD_FIELD[tab][0]} placeholder={THIRD_FIELD[tab][1]} />
          </div>
          <label className="flex items-start gap-2.5">
            <input
              type="checkbox"
              className="mt-0.5 size-5 shrink-0 cursor-pointer appearance-none rounded-full border border-[#0c1530] bg-[rgba(12,21,48,0.04)] bg-no-repeat bg-center checked:border-deep-card checked:bg-deep-card checked:bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27M4 10.5 8 14.5 16 6%27 stroke=%27white%27 stroke-width=%272%27 fill=%27none%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E')]"
            />
            <span className="text-[14px] leading-snug text-ink">
              Euler Motors and its dealers may contact me about this enquiry. Privacy policy.
            </span>
          </label>
          <div className="flex flex-col gap-3">
            <Button variant="dark" arrow="white" className="w-full">
              {FORMS[tab].cta}
            </Button>
            <p className="text-center text-[12px] text-ink">
              We never share your number with anyone else. No spam calls.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

function ContactCard({ icon, title, sub }: { icon: string; title: string; sub: string }) {
  return (
    /* Figma sizes each row by content — 301/301/302px wide (1:1988/1:1994/1:2000),
       98px tall: p-20 + 58px icon · mobile rows (1:5040/1:5046/1:5052) pad 8px —
       the 42px icon sits at x=8, y=8 in the 58px-tall row */
    <div className="flex w-full items-center gap-2.5 rounded-2xl bg-surface p-2 lg:gap-6 lg:p-5">
      <span className="flex size-[52px] shrink-0 items-center justify-center rounded-[7px] bg-deep-card lg:size-[58px] lg:rounded-[8.12px] lg:bg-white">
        <Image src={icon} alt="" width={28} height={28} aria-hidden className="size-7 brightness-0 invert lg:hidden" />
        <Image src={icon} alt="" width={24} height={24} aria-hidden className="hidden size-6 lg:block" />
      </span>
      <span className="flex flex-col gap-[6px] leading-[1.15]">
        <span className="whitespace-nowrap text-[14px] font-bold tracking-[-0.32px] text-ink lg:text-[16px]">{title}</span>
        <span className="whitespace-nowrap text-[12px] font-medium tracking-[-0.24px] text-ink">{sub}</span>
      </span>
    </div>
  );
}

function FormTabs({ active, onSelect }: { active: Tab; onSelect: (t: Tab) => void }) {
  return (
    <div className="flex gap-3" role="tablist" aria-label="Enquiry type">
      {TABS.map((t) => {
        const on = t === active;
        return (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onSelect(t)}
            className={`flex h-[42px] flex-1 items-center justify-center whitespace-nowrap rounded-full px-1 font-display text-[16px] font-semibold leading-none ${
              on ? "bg-deep-card text-white" : "border border-white/50 bg-white/80 text-ink backdrop-blur-[10px]"
            }`}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

function Field({ label, placeholder, mobile = false }: { label: string; placeholder: string; mobile?: boolean }) {
  const isPhone = label.startsWith("Mobile");
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  /* Indian mobile: 10 digits, first digit 6-9 — anything else is stripped */
  const invalid = isPhone && touched && value.length !== 10;

  const base = mobile
    ? "h-9 w-full rounded-lg px-4"
    : "h-[46px] w-full rounded-[13px] px-4";

  return (
    <label className="flex flex-1 flex-col gap-1">
      <span className="text-[12px] font-medium text-[#212125]">{label}</span>
      <input
        type={isPhone ? "tel" : "text"}
        inputMode={isPhone ? "numeric" : undefined}
        placeholder={placeholder}
        value={value}
        maxLength={isPhone ? 10 : undefined}
        onChange={(e) => {
          if (!isPhone) return setValue(e.target.value);
          const d = e.target.value.replace(/\D/g, "").replace(/^[0-5]+/, "").slice(0, 10);
          setValue(d);
        }}
        onBlur={() => isPhone && setTouched(true)}
        className={`${base} border bg-white text-[12px] font-medium backdrop-blur-[8.15px] outline-none ${
          value ? "text-ink" : "text-placeholder"
        } ${invalid ? "border-chip-red" : "border-hairline"}`}
      />
      {invalid && (
        <span className="text-[10px] font-medium text-chip-red">
          Enter a 10-digit mobile number starting with 6, 7, 8 or 9
        </span>
      )}
    </label>
  );
}
