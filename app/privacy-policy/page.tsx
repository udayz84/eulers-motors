"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import PolicyHero from "@/components/sections/PolicyHero";

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
        <PolicyHero label="Privacy policy" title="Privacy Policy" />
        <div className="relative flex w-full flex-col items-center justify-center bg-white pb-12 pt-8 sm:pb-16 sm:pt-10 md:pb-[56px] md:pt-[56px] lg:pb-[62px] lg:pt-[64px]">
          <div className="flex w-full max-w-[1440px] flex-col gap-6 px-4 sm:gap-8 sm:px-8 md:gap-10 md:px-12 lg:gap-[40px] lg:px-16 xl:px-[140px] 2xl:px-[200px]">
            <div className="w-full flex-col font-sans text-[12px] leading-[1.5] text-ink sm:text-[14px] sm:leading-[1.6] md:text-[16px] md:leading-[1.65] lg:text-[18px]">
              <p>Last updated: <strong className="font-bold">October 22, 2021</strong></p>
              <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4 md:mt-6 md:space-y-4">
                <p>This is our policy which outlines how Euler Motors Private Limited protects any information that you give us when you visit the website. Euler Motors Private Limited is committed to ensuring that your privacy is protected.</p>
                <p>Should we ask you to provide certain information by which you can be identified when using the website, then you can be assured that it will only be used in accordance with this privacy statement.</p>
                <p>Euler Motors Private Limited may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. This policy is effective from October 22, 2021.</p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2.5 sm:gap-3 md:gap-3.5 lg:gap-[10px]">
              {ITEMS.map((item) => {
                const expanded = open === item.id;
                return (
                  <article key={item.id} className="overflow-hidden rounded-[16px] bg-[#f3f4f5] transition-all duration-200">
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setOpen(expanded ? "" : item.id)}
                      className="flex min-h-[56px] w-full cursor-pointer items-center justify-between gap-4 p-4 text-left transition-colors sm:min-h-[64px] sm:p-5 sm:px-6 md:min-h-[70px] md:gap-5 md:p-6 md:px-8"
                    >
                      <h2 className="flex-1 font-sans text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-ink sm:text-[18px] md:text-[19px] lg:text-[20px] sm:tracking-[-0.4px]">
                        {item.title}
                      </h2>
                      <span className="shrink-0 font-sans text-[22px] font-normal leading-none text-ink sm:text-[24px] md:text-[26px] lg:text-[28px]" aria-hidden>
                        {expanded ? "-" : "+"}
                      </span>
                    </button>
                    {expanded && item.body && (
                      <div className="px-4 pb-4 pt-0 sm:px-6 sm:pb-6 md:px-8 md:pb-8">
                        <p className="w-full whitespace-pre-line font-sans text-[12px] font-normal leading-[1.4] text-ink/80 sm:text-[14px] sm:leading-[1.5] md:text-[16px] lg:text-[18px] sm:leading-[1.6] sm:text-ink">
                          {item.body}
                        </p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
