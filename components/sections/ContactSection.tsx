"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";
import { HomeContactFormData } from "@/types/strapi";

/** Vehicles listed on the page (navbar Product menu / showcase) */
const DEFAULT_VEHICLES = [
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

export interface ContactSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  contacts?: ContactItem[];
  form?: HomeContactFormData;
  formHeading?: string;
  formSubheading?: string;
  formCtaLabel?: string;
  formDisclaimer?: string;
}

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
  formCtaLabel,
  formDisclaimer,
}: ContactSectionProps = {}) {
  const effectiveHeading = form?.heading || formHeading || "What are you looking for?";
  const effectiveSubheading = form?.subheading || formSubheading || "Two steps. We call you within one working day.";
  const effectiveDisclaimer =
    form?.disclaimer || formDisclaimer || "We never share your number with anyone else. No spam calls.";
  const effectivePrivacyNotice =
    form?.privacyNotice || "Euler Motors and its dealers may contact me about this enquiry. Privacy policy.";

  // Vehicle options parsing: supports comma-separated string or array
  const activeVehicles = useMemo(() => {
    const raw = form?.vehicleOptions;
    if (typeof raw === "string") {
      const parsed = raw
        .split(/[\n,]+/)
        .map((s) => s.trim())
        .filter(Boolean);
      return parsed.length > 0 ? parsed : DEFAULT_VEHICLES;
    }
    if (Array.isArray(raw) && raw.length > 0) {
      return raw;
    }
    return DEFAULT_VEHICLES;
  }, [form?.vehicleOptions]);

  // Tab configurations (supports repeatable tabs, internally grouped tab1/tab2/tab3, or flat fields)
  const tabConfigs = useMemo(() => {
    const rawConfigs = [
      {
        id: "tab1",
        defaultTitle: "Test drive",
        defaultField1: ["Name", "Full name"],
        defaultField2: ["Mobile number", "10 digit"],
        defaultVehicle: ["Which vehicle", "Not sure, please suggest one"],
        defaultCity: ["City", "Mumbai"],
        defaultCustom: ["Kilometres per day", "150"],
        defaultCta: "Confirm test drive",
      },
      {
        id: "tab2",
        defaultTitle: "Price enquiry",
        defaultField1: ["Name", "Full name"],
        defaultField2: ["Mobile number", "10 digit"],
        defaultVehicle: ["Which vehicle", "Not sure, please suggest one"],
        defaultCity: ["City", "Mumbai"],
        defaultCustom: ["Quantity of vehicles", "5"],
        defaultCta: "Get price list",
      },
      {
        id: "tab3",
        defaultTitle: "Fleet solutions",
        defaultField1: ["Company name", "Company"],
        defaultField2: ["Mobile number", "10 digit"],
        defaultVehicle: ["Which vehicle", "Not sure, please suggest one"],
        defaultCity: ["City", "Mumbai"],
        defaultCustom: ["Fleet size", "Number of vehicles"],
        defaultCta: "Talk to our fleet team",
      },
    ];

    return rawConfigs.map((cfg, idx) => {
      const tabData =
        (form?.tabs && form.tabs[idx]) ||
        (idx === 0 ? form?.tab1 : idx === 1 ? form?.tab2 : form?.tab3);

      const flatTitle =
        idx === 0 ? form?.tab1Title : idx === 1 ? form?.tab2Title : form?.tab3Title;
      const flatField1 =
        idx === 0 ? form?.tab1NameLabel : idx === 1 ? form?.tab2NameLabel : form?.tab3NameLabel;
      const flatField1Placeholder =
        idx === 0 ? form?.tab1NamePlaceholder : idx === 1 ? form?.tab2NamePlaceholder : form?.tab3NamePlaceholder;
      const flatField2 =
        idx === 0 ? form?.tab1PhoneLabel : idx === 1 ? form?.tab2PhoneLabel : form?.tab3PhoneLabel;
      const flatField2Placeholder =
        idx === 0 ? form?.tab1PhonePlaceholder : idx === 1 ? form?.tab2PhonePlaceholder : form?.tab3PhonePlaceholder;
      const flatVehicle =
        idx === 0 ? form?.tab1VehicleLabel : idx === 1 ? form?.tab2VehicleLabel : form?.tab3VehicleLabel;
      const flatVehiclePlaceholder =
        idx === 0 ? form?.tab1VehiclePlaceholder : idx === 1 ? form?.tab2VehiclePlaceholder : form?.tab3VehiclePlaceholder;
      const flatCity =
        idx === 0 ? form?.tab1CityLabel : idx === 1 ? form?.tab2CityLabel : form?.tab3CityLabel;
      const flatCityPlaceholder =
        idx === 0 ? form?.tab1CityPlaceholder : idx === 1 ? form?.tab2CityPlaceholder : form?.tab3CityPlaceholder;
      const flatCustom =
        idx === 0 ? form?.tab1CustomLabel : idx === 1 ? form?.tab2CustomLabel : form?.tab3CustomLabel;
      const flatCustomPlaceholder =
        idx === 0 ? form?.tab1CustomPlaceholder : idx === 1 ? form?.tab2CustomPlaceholder : form?.tab3CustomPlaceholder;
      const flatCta =
        idx === 0 ? form?.tab1CtaLabel : idx === 1 ? form?.tab2CtaLabel : form?.tab3CtaLabel;

      return {
        id: cfg.id,
        title: tabData?.tabTitle || flatTitle || cfg.defaultTitle,
        field1: [
          tabData?.nameLabel || flatField1 || cfg.defaultField1[0],
          tabData?.namePlaceholder || flatField1Placeholder || cfg.defaultField1[1],
        ] as [string, string],
        field1Required: tabData?.nameRequired ?? true,
        field2: [
          tabData?.phoneLabel || flatField2 || cfg.defaultField2[0],
          tabData?.phonePlaceholder || flatField2Placeholder || cfg.defaultField2[1],
        ] as [string, string],
        field2Required: tabData?.phoneRequired ?? true,
        vehicleSelect: [
          tabData?.vehicleLabel || flatVehicle || cfg.defaultVehicle[0],
          tabData?.vehiclePlaceholder || flatVehiclePlaceholder || cfg.defaultVehicle[1],
        ] as [string, string],
        vehicleRequired: tabData?.vehicleRequired ?? true,
        city: [
          tabData?.cityLabel || flatCity || cfg.defaultCity[0],
          tabData?.cityPlaceholder || flatCityPlaceholder || cfg.defaultCity[1],
        ] as [string, string],
        cityRequired: tabData?.cityRequired ?? true,
        custom: [
          tabData?.customFieldLabel || flatCustom || cfg.defaultCustom[0],
          tabData?.customFieldPlaceholder || flatCustomPlaceholder || cfg.defaultCustom[1],
        ] as [string, string],
        customRequired: tabData?.customFieldRequired ?? true,
        cta: tabData?.ctaLabel || flatCta || form?.ctaLabel || formCtaLabel || cfg.defaultCta,
      };
    });
  }, [form, formCtaLabel]);

  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const currentTab = tabConfigs[activeTabIdx] || tabConfigs[0];

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
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-5 pb-6 pt-6 lg:flex-row lg:items-stretch lg:justify-between lg:gap-10 lg:px-[80px] lg:pb-[42px] lg:pt-[64px]">
        {/* left column — heading top · contacts bottom */}
        <div className="relative flex flex-col gap-6 lg:justify-between lg:gap-0">
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

          {/* mobile: the form card sits above the contact rows */}
          <div className="flex flex-col gap-2.5 lg:contents">
            {/* form card — mobile variant */}
            <div className="flex w-full flex-col gap-3 rounded-[10px] bg-surface p-4 lg:hidden">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-2xl font-bold leading-[1.15] tracking-[-0.48px] text-ink">
                  {effectiveHeading}
                </h3>
                <p className="text-[12px] text-ink">{effectiveSubheading}</p>
              </div>
              <div className="flex w-full gap-2" role="tablist" aria-label="Enquiry type">
                {tabConfigs.map((t, idx) => {
                  const on = idx === activeTabIdx;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setActiveTabIdx(idx)}
                      className={`flex flex-1 items-center justify-center whitespace-nowrap rounded-full px-1 font-display font-semibold leading-none h-8 text-[12px] ${
                        on
                          ? "bg-deep-card text-white"
                          : "border border-white/50 bg-white/80 text-ink backdrop-blur-[10px]"
                      }`}
                    >
                      {t.title}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-1.5">
                <Field
                  key={`${currentTab.id}-mob-f1`}
                  label={currentTab.field1[0]}
                  placeholder={currentTab.field1[1]}
                  required={currentTab.field1Required}
                  mobile
                />
                <Field
                  key={`${currentTab.id}-mob-f2`}
                  label={currentTab.field2[0]}
                  placeholder={currentTab.field2[1]}
                  required={currentTab.field2Required}
                  mobile
                />
              </div>
              <Button href="/products" variant="dark" arrow="white" className="w-full">
                {currentTab.cta}
              </Button>
              <p className="text-center text-[12px] font-medium text-ink">
                {effectiveDisclaimer}
              </p>
            </div>

            {/* contact cards */}
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

        {/* form card — desktop variant */}
        <div className="hidden w-[517px] shrink-0 flex-col gap-8 rounded-2xl bg-surface p-8 lg:flex">
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-ink">
              {effectiveHeading}
            </h3>
            <p className="text-[16px] text-ink">{effectiveSubheading}</p>
          </div>
          <div className="flex gap-3" role="tablist" aria-label="Enquiry type">
            {tabConfigs.map((t, idx) => {
              const on = idx === activeTabIdx;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActiveTabIdx(idx)}
                  className={`flex flex-1 items-center justify-center whitespace-nowrap rounded-full px-1 font-display font-semibold leading-none h-[42px] text-[16px] ${
                    on
                      ? "bg-deep-card text-white"
                      : "border border-white/50 bg-white/80 text-ink backdrop-blur-[10px]"
                  }`}
                >
                  {t.title}
                </button>
              );
            })}
          </div>
          <div className="flex gap-3">
            <Field
              key={`${currentTab.id}-desk-f1`}
              label={currentTab.field1[0]}
              placeholder={currentTab.field1[1]}
              required={currentTab.field1Required}
            />
            <Field
              key={`${currentTab.id}-desk-f2`}
              label={currentTab.field2[0]}
              placeholder={currentTab.field2[1]}
              required={currentTab.field2Required}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-medium text-[#212125]">
              {currentTab.vehicleSelect[0].replace(/\s*\*+\s*$/, "").trim()}
              {currentTab.vehicleRequired ? " *" : ""}
            </span>
            <div className="relative">
              <select
                defaultValue=""
                required={currentTab.vehicleRequired}
                className="h-[46px] w-full appearance-none rounded-[13px] border border-hairline bg-white px-4 text-[12px] font-medium text-ink backdrop-blur-[8.15px] outline-none"
              >
                <option value="" disabled>
                  {currentTab.vehicleSelect[1]}
                </option>
                {activeVehicles.map((v) => (
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
            <Field
              key={`${currentTab.id}-desk-city`}
              label={currentTab.city[0]}
              placeholder={currentTab.city[1]}
              required={currentTab.cityRequired}
            />
            <Field
              key={`${currentTab.id}-desk-custom`}
              label={currentTab.custom[0]}
              placeholder={currentTab.custom[1]}
              required={currentTab.customRequired}
            />
          </div>
          <label className="flex items-start gap-2.5">
            <input
              type="checkbox"
              className="mt-0.5 size-5 shrink-0 cursor-pointer appearance-none rounded-full border border-[#0c1530] bg-[rgba(12,21,48,0.04)] bg-no-repeat bg-center checked:border-deep-card checked:bg-deep-card checked:bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3E%3Cpath d=%27M4 10.5 8 14.5 16 6%27 stroke=%27white%27 stroke-width=%272%27 fill=%27none%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E')]"
            />
            <span className="text-[14px] leading-snug text-ink">
              {effectivePrivacyNotice}
            </span>
          </label>
          <div className="flex flex-col gap-3">
            <Button href="/products" variant="dark" arrow="white" className="w-full">
              {currentTab.cta}
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

function Field({
  label,
  placeholder,
  mobile = false,
  required = true,
}: {
  label: string;
  placeholder: string;
  mobile?: boolean;
  required?: boolean;
}) {
  const isPhone = label.toLowerCase().includes("mobile") || label.toLowerCase().includes("phone");
  const isAlpha = label.toLowerCase().includes("city");
  const isNum = /kilometres|quantity|fleet size/i.test(label);
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const invalid = isPhone && touched && value.length !== 10;

  const base = mobile
    ? "h-9 w-full rounded-[8px] px-4"
    : "h-[46px] w-full rounded-[13px] px-4";

  const cleanLabel = label.replace(/\s*\*+\s*$/, "").trim();
  const showAsterisk = required !== false;

  return (
    <label className="flex flex-1 flex-col gap-1">
      <span className="text-[12px] font-medium text-[#212125]">
        {cleanLabel}
        {showAsterisk ? " *" : ""}
      </span>
      <input
        type={isPhone ? "tel" : "text"}
        inputMode={isPhone || isNum ? "numeric" : undefined}
        placeholder={placeholder}
        value={value}
        required={showAsterisk}
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
