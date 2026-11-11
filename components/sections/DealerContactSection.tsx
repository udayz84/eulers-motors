"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { DealerContactSectionData, StrapiMedia } from "@/types/strapi";
import { mediaUrl } from "@/lib/strapi/client";

const ASSET = "/assets/dealer-contact/";

const DEFAULT_VEHICLES = [
  "Storm EV LongRange 200",
  "Storm EV T1500",
  "HiLoad EV",
  "Turbo EV 1000",
  "Neo HiRange",
  "Neo HiCity",
];

function ContactCard({
  icon,
  iconMedia,
  mobileIconMedia,
  title,
  detail,
  mobileOrder,
}: {
  icon: string;
  iconMedia?: StrapiMedia | string;
  mobileIconMedia?: StrapiMedia | string;
  title: string;
  detail: string;
  mobileOrder: string;
}) {
  const iconFile = icon.endsWith(".svg") ? icon : `${icon}.svg`;
  const desktopFallback = `${ASSET}${iconFile}`;
  const mobileFallback = `${ASSET}${iconFile.replace(".svg", "-mobile.svg")}`;
  const desktopSrc = iconMedia ? mediaUrl(iconMedia, desktopFallback) : desktopFallback;
  const mobileSrc = mobileIconMedia ? mediaUrl(mobileIconMedia, desktopSrc) : iconMedia ? desktopSrc : mobileFallback;

  return (
    <div
      className={`flex min-h-[58px] items-center gap-[10px] rounded-[8px] bg-[#f3f4f5] p-2 lg:min-h-[98px] lg:gap-6 lg:rounded-2xl lg:p-5 ${mobileOrder}`}
    >
      <div className="flex size-[42px] shrink-0 items-center justify-center rounded-[5.88px] bg-[#0c2c66] lg:size-[58px] lg:rounded-[8.12px] lg:bg-white">
        <Image
          src={mobileSrc}
          alt=""
          width={16}
          height={16}
          aria-hidden="true"
          className="lg:hidden"
        />
        <Image
          src={desktopSrc}
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
          className="hidden lg:block"
        />
      </div>
      <div className="min-w-0 text-[#121212]">
        <p className="font-sans text-sm font-bold leading-[1.15] tracking-[-0.28px] lg:text-base lg:tracking-[-0.32px]">
          {title}
        </p>
        <p className="mt-1.5 whitespace-nowrap font-sans text-xs font-medium leading-[1.15] tracking-[-0.24px]">
          {detail}
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  required = true,
}: {
  label: string;
  placeholder: string;
  required?: boolean;
}) {
  const isPhone = label.toLowerCase().includes("mobile") || label.toLowerCase().includes("phone");
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const invalid = isPhone && touched && value.length !== 10;
  const cleanLabel = label.replace(/\s*\*+\s*$/, "").trim();
  const showAsterisk = required !== false;

  return (
    <label className="block min-w-0 font-sans text-xs leading-[1.15] text-[#121212]">
      <span className="mb-1 block">
        {cleanLabel}
        {showAsterisk ? " *" : ""}
      </span>
      <input
        type={isPhone ? "tel" : "text"}
        inputMode={isPhone ? "numeric" : undefined}
        placeholder={placeholder}
        value={value}
        required={showAsterisk}
        maxLength={isPhone ? 10 : undefined}
        onChange={(e) => {
          if (isPhone) {
            const d = e.target.value.replace(/\D/g, "").replace(/^[0-5]+/, "").slice(0, 10);
            return setValue(d);
          }
          setValue(e.target.value);
        }}
        onBlur={() => isPhone && setTouched(true)}
        className={`h-[36px] w-full rounded-[8px] border bg-white px-4 font-sans text-xs leading-[1.15] backdrop-blur-[8.15px] outline-none lg:h-[46px] lg:rounded-[13px] ${value ? "text-[#121212]" : "text-[#9ca3af]"
          } ${invalid ? "border-chip-red" : "border-[#ededed]"}`}
      />
      {invalid && (
        <span className="mt-1 block font-sans text-[10px] font-medium text-chip-red">
          Enter a 10-digit mobile number starting with 6, 7, 8 or 9
        </span>
      )}
    </label>
  );
}

function SelectField({
  label,
  placeholder,
  options,
  required = true,
}: {
  label: string;
  placeholder: string;
  options: string[];
  required?: boolean;
}) {
  const cleanLabel = label.replace(/\s*\*+\s*$/, "").trim();
  const showAsterisk = required !== false;

  return (
    <label className="block min-w-0 font-sans text-xs leading-[1.15] text-[#121212]">
      <span className="mb-1 block">
        {cleanLabel}
        {showAsterisk ? " *" : ""}
      </span>
      <span className="relative block">
        <select
          defaultValue=""
          required={showAsterisk}
          className="h-[36px] w-full appearance-none rounded-[8px] border border-[#ededed] bg-white px-4 font-sans text-xs leading-[1.15] text-[#121212] backdrop-blur-[8.15px] outline-none lg:h-[46px] lg:rounded-[13px]"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <Image
          src={`${ASSET}chevron.svg`}
          alt=""
          width={12}
          height={7}
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
        />
      </span>
    </label>
  );
}

export interface DealerContactSectionProps extends Partial<DealerContactSectionData> { }

const DEFAULT_CARDS = [
  { icon: "phone.svg", title: "1800 000 0000", detail: "9 am to 8 pm Monday to Saturday", mobileOrder: "order-1" },
  { icon: "email.svg", title: "fleet@eulermotors.com", detail: "For fleets over 50 vehicles", mobileOrder: "order-2 lg:order-3" },
  { icon: "location.svg", title: "Find your nearest dealer", detail: "112 locations, 24 states", mobileOrder: "order-3 lg:order-2" },
];

export default function DealerContactSection({
  eyebrow = "Next step",
  desktopTitle = "Not sure which dealer to use?",
  mobileTitle = "Tell us what you need!",
  desktopDescription = "Tell us where you work and how much you carry. We will put you with the right dealer and call you within one working day.",
  mobileDescription = "We bring the vehicle to your depot with a load on it. Forty minutes. No pressure. You keep the cost report.",
  backgroundImage,
  cards,
  form,
  formHeading = "What are you looking for?",
  formSubheading = "Two steps. We call you within one working day.",
  vehicleOptions,
  tabs,
  tab1,
  tab2,
  tab3,
  tab1Title = "Test drive",
  tab1NameLabel = "Name *",
  tab1NamePlaceholder = "Full name",
  tab1PhoneLabel = "Mobile number *",
  tab1PhonePlaceholder = "10 digit",
  tab1VehicleLabel = "Which vehicle *",
  tab1VehiclePlaceholder = "Not sure, please suggest one",
  tab1CityLabel = "City *",
  tab1CityPlaceholder = "Mumbai",
  tab1CustomLabel = "Kilometres per day *",
  tab1CustomPlaceholder = "150",
  tab1CtaLabel = "Confirm test drive",

  tab2Title = "Price enquiry",
  tab2NameLabel = "Name *",
  tab2NamePlaceholder = "Full name",
  tab2PhoneLabel = "Mobile number *",
  tab2PhonePlaceholder = "10 digit",
  tab2VehicleLabel = "Which vehicle *",
  tab2VehiclePlaceholder = "Not sure, please suggest one",
  tab2CityLabel = "City *",
  tab2CityPlaceholder = "Mumbai",
  tab2CustomLabel = "Quantity of vehicles *",
  tab2CustomPlaceholder = "5",
  tab2CtaLabel = "Get price list",

  tab3Title = "Fleet solutions",
  tab3NameLabel = "Company name *",
  tab3NamePlaceholder = "Company",
  tab3PhoneLabel = "Mobile number *",
  tab3PhonePlaceholder = "10 digit",
  tab3VehicleLabel = "Which vehicle *",
  tab3VehiclePlaceholder = "Not sure, please suggest one",
  tab3CityLabel = "City *",
  tab3CityPlaceholder = "Mumbai",
  tab3CustomLabel = "Fleet size *",
  tab3CustomPlaceholder = "Number of vehicles",
  tab3CtaLabel = "Talk to our fleet team",

  privacyNotice = "Euler Motors and its dealers may contact me about this enquiry. Privacy policy.",
  disclaimer = "We never share your number with anyone else. No spam calls.",
  thankYouMessage = "Thank you! We will call you within one working day.",
}: DealerContactSectionProps) {
  const effectiveHeading = form?.heading || formHeading;
  const effectiveSubheading = form?.subheading || formSubheading;
  const effectiveVehicleOptions = form?.vehicleOptions || vehicleOptions;
  const effectiveTabs = form?.tabs || tabs;
  const effectivePrivacyNotice = form?.privacyNotice || privacyNotice;
  const effectiveDisclaimer = form?.disclaimer || disclaimer;
  const effectiveThankYouMessage = form?.thankYouMessage || thankYouMessage;

  // Parse vehicle options: supports comma-separated string or array
  const activeVehicles = useMemo(() => {
    const raw = effectiveVehicleOptions;
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
  }, [effectiveVehicleOptions]);

  // Tab form configs (supports repeatable tabs, internally grouped tab1/tab2/tab3, or flat fields)
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
        (effectiveTabs && effectiveTabs[idx]) ||
        (idx === 0 ? (form?.tab1 || tab1) : idx === 1 ? (form?.tab2 || tab2) : (form?.tab3 || tab3));

      const flatTitle =
        idx === 0 ? tab1Title : idx === 1 ? tab2Title : tab3Title;
      const flatField1 =
        idx === 0 ? tab1NameLabel : idx === 1 ? tab2NameLabel : tab3NameLabel;
      const flatField1Placeholder =
        idx === 0 ? tab1NamePlaceholder : idx === 1 ? tab2NamePlaceholder : tab3NamePlaceholder;
      const flatField2 =
        idx === 0 ? tab1PhoneLabel : idx === 1 ? tab2PhoneLabel : tab3PhoneLabel;
      const flatField2Placeholder =
        idx === 0 ? tab1PhonePlaceholder : idx === 1 ? tab2PhonePlaceholder : tab3PhonePlaceholder;
      const flatVehicle =
        idx === 0 ? tab1VehicleLabel : idx === 1 ? tab2VehicleLabel : tab3VehicleLabel;
      const flatVehiclePlaceholder =
        idx === 0 ? tab1VehiclePlaceholder : idx === 1 ? tab2VehiclePlaceholder : tab3VehiclePlaceholder;
      const flatCity =
        idx === 0 ? tab1CityLabel : idx === 1 ? tab2CityLabel : tab3CityLabel;
      const flatCityPlaceholder =
        idx === 0 ? tab1CityPlaceholder : idx === 1 ? tab2CityPlaceholder : tab3CityPlaceholder;
      const flatCustom =
        idx === 0 ? tab1CustomLabel : idx === 1 ? tab2CustomLabel : tab3CustomLabel;
      const flatCustomPlaceholder =
        idx === 0 ? tab1CustomPlaceholder : idx === 1 ? tab2CustomPlaceholder : tab3CustomPlaceholder;
      const flatCta =
        idx === 0 ? tab1CtaLabel : idx === 1 ? tab2CtaLabel : tab3CtaLabel;

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
        cta: tabData?.ctaLabel || flatCta || cfg.defaultCta,
      };
    });
  }, [
    tabs,
    tab1,
    tab2,
    tab3,
    tab1Title,
    tab1NameLabel,
    tab1NamePlaceholder,
    tab1PhoneLabel,
    tab1PhonePlaceholder,
    tab1VehicleLabel,
    tab1VehiclePlaceholder,
    tab1CityLabel,
    tab1CityPlaceholder,
    tab1CustomLabel,
    tab1CustomPlaceholder,
    tab1CtaLabel,
    tab2Title,
    tab2NameLabel,
    tab2NamePlaceholder,
    tab2PhoneLabel,
    tab2PhonePlaceholder,
    tab2VehicleLabel,
    tab2VehiclePlaceholder,
    tab2CityLabel,
    tab2CityPlaceholder,
    tab2CustomLabel,
    tab2CustomPlaceholder,
    tab2CtaLabel,
    tab3Title,
    tab3NameLabel,
    tab3NamePlaceholder,
    tab3PhoneLabel,
    tab3PhonePlaceholder,
    tab3VehicleLabel,
    tab3VehiclePlaceholder,
    tab3CityLabel,
    tab3CityPlaceholder,
    tab3CustomLabel,
    tab3CustomPlaceholder,
    tab3CtaLabel,
  ]);

  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const currentTab = tabConfigs[activeTabIdx] || tabConfigs[0];

  const activeCards = cards !== undefined ? cards : DEFAULT_CARDS;

  const bgImageSrc = backgroundImage
    ? mediaUrl(backgroundImage, `${ASSET}background.webp`)
    : `${ASSET}background.webp`;

  return (
    <section className="relative isolate mx-auto flex min-h-[678px] w-full overflow-hidden bg-white px-5 py-6 sm:px-8 lg:min-h-[789.477px] lg:w-[1440px] lg:max-w-full lg:items-center lg:justify-between lg:px-20 lg:pt-16 lg:pb-[42px]">
      <div
        className="pointer-events-none absolute left-[72px] top-[203.55px] -z-10 hidden h-[441px] w-[631px] max-w-[55vw] lg:block"
        aria-hidden="true"
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={bgImageSrc}
            alt=""
            width={1476}
            height={1066}
            sizes="630px"
            className="absolute left-[-0.09%] top-[-3.49%] h-[103.49%] max-w-none w-[100.19%]"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_65.285%,white_100%),linear-gradient(270deg,transparent_71.138%,white_100%),linear-gradient(0deg,transparent_69.07%,white_100%),linear-gradient(180deg,transparent_51.97%,white_99.827%)]" />
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-0 lg:h-[683.477px] lg:flex-row lg:justify-between lg:gap-12">
        <div className="contents lg:flex lg:w-[613px] lg:shrink-0 lg:flex-col lg:justify-between">
          <div className="order-1 mb-6 flex flex-col gap-[14px] lg:order-none lg:mb-0 lg:gap-4">
            <div className="relative flex h-4 items-center gap-1 pl-1 lg:h-[21px] lg:gap-1.5 w-fit">
              <div className="absolute inset-0 -left-1 -right-2">
                <Image
                  src={`${ASSET}decor-left-mobile.svg`}
                  alt=""
                  fill
                  sizes="250px"
                  aria-hidden="true"
                  className="object-fill lg:hidden"
                />
                <Image
                  src={`${ASSET}decor-left.svg`}
                  alt=""
                  fill
                  sizes="350px"
                  aria-hidden="true"
                  className="hidden object-fill lg:block"
                />
              </div>
              <Image
                src={`${ASSET}decor-right-mobile.svg`}
                alt=""
                width={15}
                height={16}
                aria-hidden="true"
                className="relative h-4 w-[15px] shrink-0 lg:hidden"
              />
              <Image
                src={`${ASSET}decor-right.svg`}
                alt=""
                width={19}
                height={21}
                aria-hidden="true"
                className="relative hidden h-[21px] w-[19px] shrink-0 lg:block"
              />
              <span className="relative font-sans text-xs font-bold uppercase tracking-[0.6px] text-[#0e2f6d] lg:text-sm lg:tracking-[0.7px] pr-2 whitespace-nowrap">
                {eyebrow}
              </span>
            </div>
            <h2 className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-[#121212] lg:max-w-[646px] lg:text-[42px] lg:tracking-[-0.84px]">
              <span className="lg:hidden">{mobileTitle || desktopTitle}</span>
              <span className="hidden lg:inline">{desktopTitle || mobileTitle}</span>
            </h2>
            <p className="w-full font-sans text-xs leading-normal text-[#121212] lg:max-w-[474px] lg:text-base">
              <span className="lg:hidden">{mobileDescription || desktopDescription}</span>
              <span className="hidden lg:inline">{desktopDescription || mobileDescription}</span>
            </p>
          </div>

          <div className="order-3 mt-0 grid grid-cols-1 gap-2.5 lg:order-none lg:mt-8 lg:grid-cols-2">
            {activeCards.map((c, i) => (
              <ContactCard
                key={`${c.title}-${i}`}
                icon={c.icon || "phone"}
                iconMedia={"iconMedia" in c ? c.iconMedia : undefined}
                mobileIconMedia={"mobileIconMedia" in c ? c.mobileIconMedia : undefined}
                title={c.title}
                detail={c.detail}
                mobileOrder={c.mobileOrder || `order-${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="order-2 mb-2.5 flex min-h-[294px] w-full flex-col gap-3 rounded-[10px] bg-[#f3f4f5] p-4 lg:order-none lg:mb-0 lg:min-h-[683.477px] lg:w-[517px] lg:shrink-0 lg:items-center lg:justify-center lg:gap-8 lg:rounded-2xl lg:p-8">
          <div className="flex w-full flex-col gap-1.5 lg:gap-3">
            <h3 className="font-sans text-2xl font-bold leading-[1.15] tracking-[-0.48px] text-[#121212] lg:font-display lg:text-[32px] lg:font-semibold lg:tracking-[-0.64px]">
              {effectiveHeading}
            </h3>
            <p className="font-sans text-xs leading-normal text-[#121212] lg:text-base">
              {effectiveSubheading}
            </p>
          </div>
          <div className="flex w-full gap-2 sm:gap-3" role="tablist" aria-label="Enquiry type">
            {tabConfigs.map((t, idx) => {
              const on = idx === activeTabIdx;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => {
                    setActiveTabIdx(idx);
                    setSubmitted(false);
                  }}
                  className={`h-[34px] flex-1 items-center justify-center whitespace-nowrap rounded-full px-1 sm:px-2 font-display text-[11px] sm:text-xs font-semibold leading-none lg:h-[42px] lg:px-3 lg:text-base ${on
                    ? "bg-[#0c2c66] text-white"
                    : "border border-white/50 bg-white/80 text-[#121212] backdrop-blur-[10px]"
                    }`}
                >
                  {t.title}
                </button>
              );
            })}
          </div>

          <form
            noValidate
            className="contents"
            onSubmit={(e) => {
              e.preventDefault();
              const visibleControls = Array.from(
                e.currentTarget.querySelectorAll<HTMLInputElement | HTMLSelectElement>("input, select")
              ).filter((el) => el.offsetParent !== null);
              for (const el of visibleControls) {
                if (el.required && !el.value.trim()) {
                  el.focus();
                  return;
                }
                if (el.type === "tel" && el.value.length !== 10) {
                  el.focus();
                  return;
                }
              }
              setSubmitted(true);
            }}
          >
            <div className="grid w-full grid-cols-2 gap-1.5 lg:gap-3">
              <Field
                key={`${currentTab.id}-f1`}
                label={currentTab.field1[0]}
                placeholder={currentTab.field1[1]}
                required={currentTab.field1Required}
              />
              <Field
                key={`${currentTab.id}-f2`}
                label={currentTab.field2[0]}
                placeholder={currentTab.field2[1]}
                required={currentTab.field2Required}
              />
            </div>
            <div className="hidden w-full lg:block">
              <SelectField
                key={`${currentTab.id}-veh`}
                label={currentTab.vehicleSelect[0]}
                placeholder={currentTab.vehicleSelect[1]}
                options={activeVehicles}
                required={currentTab.vehicleRequired}
              />
            </div>
            <div className="hidden w-full grid-cols-2 gap-3 lg:grid">
              <Field
                key={`${currentTab.id}-city`}
                label={currentTab.city[0]}
                placeholder={currentTab.city[1]}
                required={currentTab.cityRequired}
              />
              <Field
                key={`${currentTab.id}-custom`}
                label={currentTab.custom[0]}
                placeholder={currentTab.custom[1]}
                required={currentTab.customRequired}
              />
            </div>
            <label className="hidden w-full items-start gap-2.5 font-sans text-sm leading-[1.4] text-[#121212] lg:flex">
              <input
                type="checkbox"
                className="mt-0.5 size-5 shrink-0 appearance-none rounded-full border border-[#0c1530] bg-[rgba(12,21,48,0.04)] checked:bg-[#0c2c66]"
              />
              <span>{effectivePrivacyNotice}</span>
            </label>
            <div className="flex w-full flex-col items-center gap-3">
              <button
                type="submit"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-[4px] border-[0.5px] border-white bg-[#121212] px-5 font-display text-xs font-bold text-white lg:h-[50.477px] lg:w-full lg:px-6 lg:text-base lg:font-semibold hover:bg-black transition-colors cursor-pointer"
              >
                <span>{currentTab.cta}</span>
                <Image
                  src={`${ASSET}arrow-mobile.svg`}
                  alt=""
                  width={19}
                  height={13}
                  aria-hidden="true"
                  className="lg:hidden"
                />
                <Image
                  src={`${ASSET}arrow.svg`}
                  alt=""
                  width={22}
                  height={14}
                  aria-hidden="true"
                  className="hidden lg:block"
                />
              </button>
              {submitted ? (
                <p className="w-full text-center font-sans text-xs font-medium leading-normal text-[#0c2c66]">
                  {effectiveThankYouMessage}
                </p>
              ) : (
                <p className="w-[271px] text-center font-sans text-xs leading-normal text-[#121212] lg:w-full">
                  {effectiveDisclaimer}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
