"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import PolicyHero from "@/components/sections/PolicyHero";
import MobilePageHero from "@/components/sections/MobilePageHero";
import FloatingWidget from "@/components/FloatingWidget";

const ITEMS = [
  { id: "collect", title: "We may collect the following information:", body: "We may collect information such as your name, contact details, vehicle preferences, service requests, and any other information you choose to share with us while using our website or contacting our team." },
  { id: "why", title: "Why we collect this information:", body: "Information record keeping\nTo improve our products and services. To send promotional emails/SMS about new products, special offers or other information which we think you may find interesting. To contact you for market research purposes by email, phone or mail. To customize the website according to your preferences and interests" },
  { id: "security", title: "Security", body: "We take reasonable steps to keep your information safe from unauthorized access, misuse, or disclosure. Access to information is limited to people who need it to provide our services and support your relationship with Euler Motors." },
  { id: "cookies", title: "Cookies", body: "We use cookies to help the website work properly, remember your preferences, and understand how visitors use our pages. You can manage or disable cookies through your browser settings, although some website features may not work as expected." },
];

export default function PrivacyPolicyPage() {
  const [open, setOpen] = useState("why");

  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <div className="lg:hidden">
          <MobilePageHero
            label="Privacy policy"
            title="Privacy Policy"
            titleId="privacy-title-mobile"
            description="We protect your data and respect your privacy."
          />
        </div>
        <div className="hidden lg:block">
          <PolicyHero label="Privacy policy" title="Privacy Policy" />
        </div>
        <div className="relative mx-auto flex w-full flex-col items-center justify-center gap-6 bg-white px-5 py-8 sm:gap-8 sm:px-8 sm:py-10 lg:w-full lg:max-w-none lg:gap-0 lg:px-8 xl:px-0 lg:pb-[62px] lg:pt-[64px]" aria-labelledby="privacy-title">
          <div className="flex w-full max-w-[720px] mx-auto flex-col gap-6 p-0 sm:gap-8 lg:max-w-[1040px] lg:gap-[40px] lg:px-0">
            <div className="h-auto min-h-[272px] w-full flex-col self-stretch font-sans text-[12px] font-normal leading-[140%] text-[#121212] sm:h-auto sm:min-h-0 sm:w-full sm:text-[14px] sm:leading-[1.6] lg:h-auto lg:min-h-[275px] lg:w-full lg:max-w-[1040px] lg:text-[18px] lg:leading-[140%]">
              <p className="font-normal">Last updated: <strong className="font-bold">October 22, 2021</strong></p>
              <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4 md:mt-6 lg:space-y-0">
                <p>This is our policy which outlines how Euler Motors Private Limited protects any information that you give us when you visit the website. Euler Motors Private Limited is committed to ensuring that your privacy is protected.</p>
                <p>Should we ask you to provide certain information by which you can be identified when using the website, then you can be assured that it will only be used in accordance with this privacy statement.</p>
                <p>Euler Motors Private Limited may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. This policy is effective from October 22, 2021.</p>
              </div>
            </div>
            <div className="flex w-[373px] max-w-[calc(100vw_-_20px)] flex-col items-start gap-[10px] self-center sm:w-full sm:max-w-full lg:w-full lg:max-w-[1040px] lg:self-stretch lg:gap-[10px]">
              {ITEMS.map((item) => {
                const expanded = open === item.id;
                return (
                  <article key={item.id} className="w-full self-stretch overflow-hidden rounded-[16px] bg-[#f3f4f5] transition-all duration-200">
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setOpen(expanded ? "" : item.id)}
                      className="flex h-[66px] w-full cursor-pointer items-center justify-center gap-[10px] px-3 py-[21px] text-left transition-colors sm:h-[74px] sm:justify-between sm:gap-[10px] sm:px-5 lg:h-[70px] lg:min-h-[70px] lg:justify-between lg:gap-[20px] lg:p-[32px]"
                    >
                      <span className="flex-[1_0_0] font-sans text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-[#121212] capitalize sm:text-[18px] sm:tracking-[-0.36px] lg:text-[20px] lg:font-semibold lg:leading-[140%] lg:tracking-[-0.4px]">
                        {item.title}
                      </span>
                      <span className="relative flex size-5 shrink-0 items-center justify-center sm:size-6 md:size-6">
                        <Image
                          src="/assets/faq/icon-plus.svg"
                          alt=""
                          width={24}
                          height={24}
                          aria-hidden
                          className={`absolute size-5 select-none transition-all duration-300 sm:size-6 md:size-6 ${
                            expanded ? "opacity-0 rotate-90 scale-75 pointer-events-none" : "opacity-100 rotate-0 scale-100"
                          }`}
                        />
                        <Image
                          src="/assets/faq/icon-minus.svg"
                          alt=""
                          width={24}
                          height={24}
                          aria-hidden
                          className={`absolute size-5 select-none transition-all duration-300 sm:size-6 md:size-6 ${
                            expanded ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75 pointer-events-none"
                          }`}
                        />
                      </span>
                    </button>
                    <div
                      className="accordion-grid"
                      data-open={expanded}
                    >
                      <div className="accordion-inner">
                        {item.body && (
                          <div className="px-4 pb-4 pt-0 sm:px-6 sm:pb-6 md:px-8 md:pb-8 lg:px-[32px] lg:pb-[32px]">
                            <p className="font-sans text-[12px] font-normal leading-[1.4] text-ink sm:text-[14px] sm:leading-[1.5] md:text-[16px] lg:text-[18px] lg:leading-[1.4]">
                              {item.body}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          <FloatingWidget mobileOnly mobileClassName="top-[361px] -translate-y-1/2" />
        </div>
      </main>
      <Footer />
    </>
  );
}
