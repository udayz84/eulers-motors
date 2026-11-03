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

export interface ContactItem {
  icon: string;
  title: string;
  sub: string;
}

export interface ContactFormData {
  heading?: string;
  subheading?: string;
  options?: string[];
  ctaLabel?: string;
  disclaimer?: string;
}

export interface ContactSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  contacts?: ContactItem[];
  form?: ContactFormData;
  formHeading?: string;
  formSubheading?: string;
  formOptions?: string[];
  formCtaLabel?: string;
  formDisclaimer?: string;
}

const getTabConfig = (tabName: string) => {
  const lower = (tabName || "").toLowerCase();
  if (lower.includes("fleet")) {
    return {
      fields: [
        ["Company name *", "Company"],
        ["Mobile number *", "10 digit"],
      ] as [string, string][],
      secondRow: ["City *", "Mumbai"] as [string, string],
      thirdField: ["Fleet size *", "Number of vehicles"] as [string, string],
      vehicleSelect: ["Which vehicle *", "Not sure, please suggest one"] as [string, string],
    };
  }
  if (lower.includes("price")) {
    return {
      fields: [
        ["Name *", "Full name"],
        ["Mobile number *", "10 digit"],
      ] as [string, string][],
      secondRow: ["City *", "Mumbai"] as [string, string],
      thirdField: ["Quantity of vehicles *", "5"] as [string, string],
      vehicleSelect: ["Which vehicle *", "Not sure, please suggest one"] as [string, string],
    };
  }
  return {
    fields: [
      ["Name *", "Full name"],
      ["Mobile number *", "10 digit"],
    ] as [string, string][],
    secondRow: ["City *", "Mumbai"] as [string, string],
    thirdField: ["Kilometres per day *", "150"] as [string, string],
    vehicleSelect: ["Which vehicle *", "Not sure, please suggest one"] as [string, string],
  };
};

export default function ContactSection({
  eyebrow = "Next step",
  title = "Tell us what you need!",
  description = "We bring the vehicle to your depot with a load on it. Forty minutes. No pressure. You keep the cost report.",
  phone,
  email,
  contacts,
  form,
  formHeading,
  formSubheading,
  formOptions,
  formCtaLabel,
  formDisclaimer,
}: ContactSectionProps = {}) {
  const effectiveHeading = form?.heading || formHeading || "What are you looking for?";
  const effectiveSubheading = form?.subheading || formSubheading || "Two steps. We call you within one working day.";
  const rawOptions = form?.options || formOptions;
  const effectiveOptions: string[] =
    Array.isArray(rawOptions) && rawOptions.length > 0
      ? rawOptions
      : ["Test drive", "Price enquiry", "Fleet solutions"];
  const effectiveCtaLabel = form?.ctaLabel || formCtaLabel || "Submit enquiry";
  const effectiveDisclaimer =
    form?.disclaimer || formDisclaimer || "We never share your number with anyone else. No spam calls.";

  const [tab, setTab] = useState<string>(effectiveOptions[0] || "Test drive");
  const activeConfig = getTabConfig(tab);

  const currentContacts =
    contacts !== undefined
      ? contacts
      : [
          {
            icon: "/assets/contact/icon-call-new.svg",
            title: phone || "1800 000 0000",
            sub: "9 am to 8 pm Monday to Saturday",
          },
          {
            icon: "/assets/contact/icon-mail-new.svg",
            title: email || "fleet@eulermotors.com",
            sub: "For fleets over 50 vehicles",
          },
          {
            icon: "/assets/contact/icon-pin-new.svg",
            title: "Find your nearest dealer",
            sub: "112 locations, 24 states",
          },
        ];

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
            {eyebrow && <Eyebrow label={eyebrow} />}
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.84px] text-ink lg:text-[42px]">
                {title}
              </h2>
              <p className="max-w-[474px] text-[12px] leading-snug text-ink lg:text-[16px] lg:leading-normal">
                {description}
              </p>
            </div>
          </div>

          {/* mobile (Figma 1:5028/1:5037): the form card sits above the contact rows;
              lg:contents dissolves the group on desktop */}
          <div className="flex flex-col gap-2.5 lg:contents">
            {/* form card — mobile variant (Figma 1:5038) */}
            <div className="flex w-full flex-col gap-3 rounded-[10px] bg-surface p-4 lg:hidden">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-2xl font-bold leading-[1.15] tracking-[-0.48px] text-ink">{effectiveHeading}</h3>
                <p className="text-[12px] text-ink">{effectiveSubheading}</p>
              </div>
              <FormTabs active={tab} tabs={effectiveOptions} onSelect={setTab} mobile />
              <div className="flex gap-1.5">
                {activeConfig.fields.map(([label, ph]) => (
                  <Field key={label} label={label} placeholder={ph} mobile />
                ))}
              </div>
              <Button href="/products" variant="dark" arrow="white" className="w-full">
                {effectiveCtaLabel}
              </Button>
              <p className="text-center text-[12px] font-medium text-ink">
                {effectiveDisclaimer}
              </p>
            </div>

            {/* contact cards — relative keeps them above the absolute photo wash */}
            {currentContacts.length > 0 && (
              <div className="relative flex flex-col gap-2.5 lg:flex-row lg:flex-wrap lg:items-start lg:gap-2.5">
                <div className="flex flex-col gap-2.5 lg:gap-2.5">
                  {currentContacts.slice(0, 2).map((c) => (
                    <ContactCard key={c.title} {...c} />
                  ))}
                </div>
                {currentContacts[2] && <ContactCard {...currentContacts[2]} />}
                {currentContacts.slice(3).map((c) => (
                  <ContactCard key={c.title} {...c} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* form card — desktop variant, Figma 1:2006/1:2007 exact */}
        <div className="hidden w-[517px] shrink-0 flex-col gap-8 rounded-2xl bg-surface p-8 lg:flex">
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-ink">
              {effectiveHeading}
            </h3>
            <p className="text-[16px] text-ink">{effectiveSubheading}</p>
          </div>
          <FormTabs active={tab} tabs={effectiveOptions} onSelect={setTab} />
          <div className="flex gap-3">
            {activeConfig.fields.map(([label, ph]) => (
              <Field key={label} label={label} placeholder={ph} />
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-medium text-[#212125]">{activeConfig.vehicleSelect[0]}</span>
            <div className="relative">
              <select
                defaultValue=""
                className="h-[46px] w-full appearance-none rounded-[13px] border border-hairline bg-white px-4 text-[12px] font-medium text-ink backdrop-blur-[8.15px] outline-none"
              >
                <option value="" disabled>
                  {activeConfig.vehicleSelect[1]}
                </option>
                {VEHICLES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              <Image
                src="/assets/contact/chevron-new.svg"
                alt=""
                width={14}
                height={6}
                aria-hidden
                className="pointer-events-none absolute right-4 top-1/2 h-1.5 w-3.5 -translate-y-1/2 -scale-y-100"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Field label={activeConfig.secondRow[0]} placeholder={activeConfig.secondRow[1]} />
            <Field label={activeConfig.thirdField[0]} placeholder={activeConfig.thirdField[1]} />
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
            <Button href="/products" variant="dark" arrow="white" className="w-full">
              {effectiveCtaLabel}
            </Button>
            <p className="text-center text-[12px] text-ink">
              {effectiveDisclaimer}
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
    <div className="flex w-full items-center gap-2.5 rounded-[8px] bg-surface p-2 lg:w-auto lg:gap-6 lg:rounded-2xl lg:p-5">
      <span className="flex size-[42px] shrink-0 items-center justify-center rounded-[6px] bg-deep-card lg:size-[58px] lg:rounded-[8.12px] lg:bg-white">
        <Image src={icon} alt="" width={16} height={16} aria-hidden className="size-4 brightness-0 invert lg:hidden" />
        <Image src={icon} alt="" width={24} height={24} aria-hidden className="hidden size-6 lg:block" />
      </span>
      <span className="flex flex-col gap-[6px] leading-[1.15]">
        <span className="whitespace-nowrap text-[14px] font-bold tracking-[-0.32px] text-ink lg:text-[16px]">{title}</span>
        <span className="whitespace-nowrap text-[12px] font-medium tracking-[-0.24px] text-ink">{sub}</span>
      </span>
    </div>
  );
}

function FormTabs({
  active,
  tabs,
  onSelect,
  mobile = false,
}: {
  active: string;
  tabs: string[];
  onSelect: (t: string) => void;
  mobile?: boolean;
}) {
  return (
    <div className={mobile ? "flex w-full gap-2" : "flex gap-3"} role="tablist" aria-label="Enquiry type">
      {tabs.map((t) => {
        const on = t === active;
        return (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onSelect(t)}
            className={`flex flex-1 items-center justify-center whitespace-nowrap rounded-full px-1 font-display font-semibold leading-none ${
              mobile ? "h-8 text-[12px]" : "h-[42px] text-[16px]"
            } ${
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
  /* City: letters + spaces only · count fields (km/quantity/fleet): digits only */
  const isAlpha = label.startsWith("City");
  const isNum = /Kilometres|Quantity|Fleet size/.test(label);
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  /* Indian mobile: 10 digits, first digit 6-9 — anything else is stripped */
  const invalid = isPhone && touched && value.length !== 10;

  const base = mobile
    ? "h-9 w-full rounded-[8px] px-4"
    : "h-[46px] w-full rounded-[13px] px-4";

  return (
    <label className="flex flex-1 flex-col gap-1">
      <span className="text-[12px] font-medium text-[#212125]">{label}</span>
      <input
        type={isPhone ? "tel" : "text"}
        inputMode={isPhone || isNum ? "numeric" : undefined}
        placeholder={placeholder}
        value={value}
        maxLength={isPhone ? 10 : undefined}
        onChange={(e) => {
          if (isPhone) {
            const d = e.target.value.replace(/\D/g, "").replace(/^[0-5]+/, "").slice(0, 10);
            return setValue(d);
          }
          if (isAlpha) return setValue(e.target.value.replace(/[^A-Za-z\s]/g, ""));
          if (isNum) return setValue(e.target.value.replace(/\D/g, ""));
          setValue(e.target.value);
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
