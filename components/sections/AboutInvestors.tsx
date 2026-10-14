"use client";

import { useState } from "react";
import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";

const CONTACTS = [
  {
    icon: "/assets/contact/icon-call.svg",
    title: "1800 000 0000",
    sub: "9 am to 8 pm Monday to Saturday",
  },
  {
    icon: "/assets/contact/icon-mail.svg",
    title: "contact@eulermotors.com",
    sub: "For general enquiries",
  },
  {
    icon: "/assets/contact/icon-pin.svg",
    title: "Find your nearest dealer",
    sub: "112 locations, 24 states",
  },
];

/**
 * AboutInvestors - "Tell us what you need" contact form section
 * Desktop Figma: node-id 3538-20627
 * Mobile Figma: node-id 2937-16087
 */
const TABS = ["Test drive", "Price Enquiry", "Fleet"] as const;
type Tab = (typeof TABS)[number];

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

export default function AboutInvestors() {
  const [tab, setTab] = useState<Tab>("Test drive");

  return (
    <section
      className="relative overflow-clip bg-white"
      aria-label="Contact us"
    >
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-5 pb-6 pt-6 lg:flex-row lg:items-stretch lg:justify-between lg:gap-10 lg:px-[80px] lg:pb-[42px] lg:pt-[64px]">
        {/* Left column - heading and contact cards */}
        <div className="relative flex flex-col gap-6 lg:justify-between lg:gap-0">
          {/* Background image with blur effect - desktop only */}
          <div className="pointer-events-none absolute left-[-8px] top-[139.55px] -z-10 hidden h-[441px] w-[631px] overflow-hidden lg:block">
            <Image
              src="/assets/enterprise/truck-wash.png"
              alt=""
              fill
              sizes="631px"
              className="object-cover"
            />
          </div>

          <div className="relative flex flex-col gap-4">
            <Eyebrow label="Next step" />
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.84px] text-ink lg:text-[42px]">
                Tell us what you need!
              </h2>
              <p className="max-w-[474px] text-[12px] leading-snug text-ink lg:text-[16px] lg:leading-normal">
                We bring the vehicle to your depot with a load on it. Forty
                minutes. No pressure. You keep the cost report.
              </p>
            </div>
          </div>

          {/* Mobile form card */}
          <div className="flex flex-col gap-2.5 lg:contents">
            <div className="flex w-full flex-col gap-3 rounded-[10px] bg-surface p-4 lg:hidden">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-2xl font-bold leading-[1.15] tracking-[-0.48px] text-ink">
                  Book a test drive
                </h3>
                <p className="text-[12px] text-ink">
                  Two steps. We call you within one working day.
                </p>
              </div>
              <FormTabs active={tab} onSelect={setTab} mobile />
              <div className="flex gap-1.5">
                {FORMS[tab].fields.map(([label, ph]) => (
                  <Field key={label} label={label} placeholder={ph} mobile />
                ))}
              </div>
              <Button variant="dark" arrow="white" className="w-full">
                {FORMS[tab].cta}
              </Button>
              <p className="text-center text-[12px] font-medium text-ink">
                We never share your number with anyone else. No spam calls.
              </p>
            </div>

            {/* Contact cards */}
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

        {/* Desktop form card */}
        <div className="hidden w-[517px] shrink-0 flex-col gap-8 rounded-2xl bg-surface p-8 lg:flex">
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-ink">
              Book a test drive
            </h3>
            <p className="text-[16px] text-ink">
              Two steps. We call you within one working day.
            </p>
          </div>
          <FormTabs active={tab} onSelect={setTab} />
          <div className="flex gap-3">
            {FORMS[tab].fields.map(([label, ph]) => (
              <Field key={label} label={label} placeholder={ph} />
            ))}
          </div>
          <label className="flex items-start gap-2.5">
            <input
              type="checkbox"
              className="mt-0.5 size-5 shrink-0 cursor-pointer appearance-none rounded-full border border-[#0c1530] bg-[rgba(12,21,48,0.04)] bg-no-repeat bg-center checked:border-deep-card checked:bg-deep-card checked:bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27M4 10.5 8 14.5 16 6%27 stroke=%27white%27 stroke-width=%272%27 fill=%27none%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E')]"
            />
            <span className="text-[14px] leading-snug text-ink">
              Euler Motors and its dealers may contact me about this enquiry.
              Privacy policy.
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

function ContactCard({
  icon,
  title,
  sub,
}: {
  icon: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex w-full items-center gap-2.5 rounded-[8px] bg-surface p-2 lg:w-auto lg:gap-6 lg:rounded-2xl lg:p-5">
      <span className="flex size-[42px] shrink-0 items-center justify-center rounded-[6px] bg-deep-card lg:size-[58px] lg:rounded-[8.12px] lg:bg-white">
        <Image
          src={icon}
          alt=""
          width={16}
          height={16}
          aria-hidden
          className="size-4 brightness-0 invert lg:hidden"
        />
        <Image
          src={icon}
          alt=""
          width={24}
          height={24}
          aria-hidden
          className="hidden size-6 lg:block"
        />
      </span>
      <span className="flex flex-col gap-[6px] leading-[1.15]">
        <span className="whitespace-nowrap text-[14px] font-bold tracking-[-0.32px] text-ink lg:text-[16px]">
          {title}
        </span>
        <span className="whitespace-nowrap text-[12px] font-medium tracking-[-0.24px] text-ink">
          {sub}
        </span>
      </span>
    </div>
  );
}

function FormTabs({
  active,
  onSelect,
  mobile = false,
}: {
  active: Tab;
  onSelect: (t: Tab) => void;
  mobile?: boolean;
}) {
  return (
    <div
      className={mobile ? "flex w-full gap-2" : "flex gap-3"}
      role="tablist"
      aria-label="Enquiry type"
    >
      {TABS.map((t) => {
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
              on
                ? "bg-deep-card text-white"
                : "border border-white/50 bg-white/80 text-ink backdrop-blur-[10px]"
            }`}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

function Field({
  label,
  placeholder,
  mobile = false,
}: {
  label: string;
  placeholder: string;
  mobile?: boolean;
}) {
  const isPhone = label.startsWith("Mobile");
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const invalid = isPhone && touched && value.length !== 10;

  const base = mobile
    ? "h-9 w-full rounded-[8px] px-4"
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
          if (isPhone) {
            const d = e.target.value
              .replace(/\D/g, "")
              .replace(/^[0-5]+/, "")
              .slice(0, 10);
            return setValue(d);
          }
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
