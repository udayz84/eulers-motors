"use client";

import { useState } from "react";
import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";

const STATES = [
  "Maharashtra",
  "Delhi",
  "Karnataka",
  "Tamil Nadu",
  "Gujarat",
  "Haryana",
  "Uttar Pradesh",
  "Rajasthan",
  "Telangana",
  "West Bengal",
];

const CITIES = [
  "Mumbai",
  "New Delhi",
  "Bengaluru",
  "Chennai",
  "Ahmedabad",
  "Pune",
  "Hyderabad",
  "Kolkata",
  "Gurugram",
  "Noida",
];

const PRODUCTS = [
  "Select Product",
  "Storm EV LongRange 200",
  "Storm EV T1500",
  "HiLoad EV",
  "Turbo EV 1000",
  "Neo HiRange",
  "Neo HiCity",
];

/**
 * FAQ Contact Section — Figma node 2979:8641
 * "Could not find your answer?" + 3 Contact Rows + "Contact support" form card.
 * Responsive for both mobile and desktop screens.
 */
export default function FaqContact() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    state: "Maharashtra",
    city: "Mumbai",
    product: "Select Product",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        mobile: "",
        email: "",
        state: "Maharashtra",
        city: "Mumbai",
        product: "Select Product",
      });
    }, 4000);
  };

  return (
    <section
      data-node-id="2979:8641"
      aria-label="Contact Support"
      className="relative w-full overflow-hidden bg-white px-5 py-8 sm:px-8 sm:py-12 md:px-12 lg:px-[80px] lg:py-[64px]"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-8 lg:gap-12">
        {/* Left Column: Title Block & Contact Details Rows */}
        <div className="flex w-full flex-col gap-5 sm:gap-6 md:flex-1 md:max-w-[360px] lg:max-w-[520px]">
          {/* Title Block */}
          <div className="flex flex-col gap-2.5 sm:gap-3.5">
            <div className="flex h-6 items-center">
              <Eyebrow label="Next step" className="font-bold text-[12px] sm:text-[13px] lg:text-[14px] uppercase tracking-[0.6px] lg:tracking-[0.7px]" />
            </div>

            <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink sm:text-[34px] md:text-[36px] lg:text-[42px] lg:tracking-[-0.84px]">
              Could not find <br className="sm:hidden" />
              your answer?
            </h2>

            <p className="max-w-[420px] font-sans text-[12px] font-normal leading-normal text-ink sm:text-[14px] md:text-[15px] lg:text-[16px]">
              Our team is happy to help. Leave your details and we will get back to you.
            </p>
          </div>

          {/* 3 Contact Rows (Figma 2979:8652) */}
          <div className="flex flex-col gap-2 sm:gap-2.5">
            {/* Phone contact */}
            <div className="flex items-center gap-2.5 rounded-[8px] bg-[#f3f4f5] p-2 transition-colors hover:bg-[#eaeaeb] sm:p-2.5">
              <div className="flex size-[42px] shrink-0 items-center justify-center rounded-[5.88px] bg-[#0c2c66]">
                <Image
                  src="/assets/faq/icon-contact-phone.svg"
                  alt="Phone"
                  width={16}
                  height={16}
                  className="size-4"
                />
              </div>
              <div className="flex flex-col gap-0.5 font-sans leading-[1.15]">
                <span className="text-[14px] font-bold tracking-[-0.28px] text-ink sm:text-[15px] lg:text-[16px] lg:tracking-[-0.32px]">
                  1800 000 0000
                </span>
                <span className="text-[12px] font-medium tracking-[-0.24px] text-ink/80">
                  9 am to 8 pm Monday to Saturday
                </span>
              </div>
            </div>

            {/* Email contact */}
            <div className="flex items-center gap-2.5 rounded-[8px] bg-[#f3f4f5] p-2 transition-colors hover:bg-[#eaeaeb] sm:p-2.5">
              <div className="flex size-[42px] shrink-0 items-center justify-center rounded-[5.88px] bg-[#0c2c66]">
                <Image
                  src="/assets/faq/icon-contact-mail.svg"
                  alt="Email"
                  width={16}
                  height={16}
                  className="size-4"
                />
              </div>
              <div className="flex flex-col gap-0.5 font-sans leading-[1.15]">
                <span className="text-[14px] font-bold tracking-[-0.28px] text-ink sm:text-[15px] lg:text-[16px] lg:tracking-[-0.32px]">
                  fleet@eulermotors.com
                </span>
                <span className="text-[12px] font-medium tracking-[-0.24px] text-ink/80">
                  For fleets over 50 vehicles
                </span>
              </div>
            </div>

            {/* Nearest dealer contact */}
            <div className="flex items-center gap-2.5 rounded-[8px] bg-[#f3f4f5] p-2 transition-colors hover:bg-[#eaeaeb] sm:p-2.5">
              <div className="flex size-[42px] shrink-0 items-center justify-center rounded-[5.88px] bg-[#0c2c66]">
                <Image
                  src="/assets/faq/icon-contact-pin.svg"
                  alt="Location"
                  width={16}
                  height={16}
                  className="size-4"
                />
              </div>
              <div className="flex flex-col gap-0.5 font-sans leading-[1.15]">
                <span className="text-[14px] font-bold tracking-[-0.28px] text-ink sm:text-[15px] lg:text-[16px] lg:tracking-[-0.32px]">
                  Find your nearest dealer
                </span>
                <span className="text-[12px] font-medium tracking-[-0.24px] text-ink/80">
                  112 locations, 24 states
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact support Form Card (Figma 2981:9081) */}
        <div className="w-full md:flex-1 md:max-w-[390px] lg:max-w-[480px]">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-3 rounded-[10px] bg-[#f3f4f5] p-4 sm:p-5 md:p-4.5 lg:p-6"
          >
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-[22px] font-semibold leading-[1.15] tracking-[-0.44px] text-ink sm:text-[26px] lg:text-[32px] lg:tracking-[-0.64px]">
                Contact support
              </h3>
              <p className="font-sans text-[12px] text-ink/80 sm:text-[14px] lg:text-[16px]">
                One step. We reply within one working day.
              </p>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-[8px] bg-white p-6 text-center">
                <span className="text-[28px]">✓</span>
                <p className="mt-2 font-display text-[16px] font-bold text-ink">Thank you!</p>
                <p className="mt-1 font-sans text-[12px] text-ink/70">
                  Your enquiry has been received. Our team will contact you shortly.
                </p>
              </div>
            ) : (
              <>
                {/* Row 1: Name & Mobile */}
                <div className="flex gap-2">
                  <div className="flex flex-1 flex-col gap-1">
                    <label className="font-sans text-[12px] font-medium text-[#212125]">
                      Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-[36px] w-full rounded-[8px] border border-[#ededed] bg-white px-3 font-sans text-[12px] font-medium text-ink placeholder:text-[#9ca3af] focus:border-navy focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <label className="font-sans text-[12px] font-medium text-[#212125]">
                      Mobile number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="10 digit"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="h-[36px] w-full rounded-[8px] border border-[#ededed] bg-white px-3 font-sans text-[12px] font-medium text-ink placeholder:text-[#9ca3af] focus:border-navy focus:outline-none"
                    />
                  </div>
                </div>

                {/* Row 2: Email & State */}
                <div className="flex gap-2">
                  <div className="flex flex-1 flex-col gap-1">
                    <label className="font-sans text-[12px] font-medium text-[#212125]">
                      Email*
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="Full email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-[36px] w-full rounded-[8px] border border-[#ededed] bg-white px-3 font-sans text-[12px] font-medium text-ink placeholder:text-[#9ca3af] focus:border-navy focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <label className="font-sans text-[12px] font-medium text-[#212125]">
                      State*
                    </label>
                    <div className="relative">
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="h-[36px] w-full appearance-none rounded-[8px] border border-[#ededed] bg-white px-3 pr-7 font-sans text-[12px] font-medium text-ink focus:border-navy focus:outline-none cursor-pointer"
                      >
                        {STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <Image
                        src="/assets/contact/dropdown-chevron.svg"
                        alt=""
                        width={10}
                        height={5}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-70"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: City & Product */}
                <div className="flex gap-2">
                  <div className="flex flex-1 flex-col gap-1">
                    <label className="font-sans text-[12px] font-medium text-[#212125]">
                      City *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="h-[36px] w-full appearance-none rounded-[8px] border border-[#ededed] bg-white px-3 pr-7 font-sans text-[12px] font-medium text-ink focus:border-navy focus:outline-none cursor-pointer"
                      >
                        {CITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <Image
                        src="/assets/contact/dropdown-chevron.svg"
                        alt=""
                        width={10}
                        height={5}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-70"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <label className="font-sans text-[12px] font-medium text-[#212125]">
                      Product*
                    </label>
                    <div className="relative">
                      <select
                        value={formData.product}
                        onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                        className="h-[36px] w-full appearance-none rounded-[8px] border border-[#ededed] bg-white px-3 pr-7 font-sans text-[12px] font-medium text-ink focus:border-navy focus:outline-none cursor-pointer"
                      >
                        {PRODUCTS.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                      <Image
                        src="/assets/contact/dropdown-chevron.svg"
                        alt=""
                        width={10}
                        height={5}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-70"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button (Figma 2981:9129) */}
                <button
                  type="submit"
                  className="mt-1 flex h-[44px] lg:h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-[#121212] px-5 font-display text-[13px] sm:text-[14px] lg:text-[16px] font-semibold text-white transition-all hover:bg-black/80 active:scale-[0.98]"
                >
                  <span>Continue</span>
                  <Image
                    src="/assets/contact/btn-arrow-white.svg"
                    alt=""
                    width={18}
                    height={14}
                    className="h-3.5 w-auto"
                  />
                </button>

                {/* Privacy assurance note */}
                <p className="font-sans text-[12px] font-medium text-[#121212] text-center">
                  We use your number only to answer this question. No marketing calls.
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
