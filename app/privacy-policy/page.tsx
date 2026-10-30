"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import PolicyHero from "@/components/sections/PolicyHero";
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
          <section
            aria-label="Privacy Policy Banner"
            className="relative flex h-[272px] w-full items-center justify-center overflow-x-clip overflow-y-visible bg-[#1d6fff] px-5 sm:px-8 pt-[119.99px] pb-[59.01px] text-center text-white sm:h-[320px] sm:pt-[128px] sm:pb-16"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg,transparent 0,transparent 67px,rgba(0,0,0,.12) 68px),repeating-linear-gradient(0deg,transparent 0,transparent 67px,rgba(0,0,0,.12) 68px),linear-gradient(272deg,#0e2f6d -63.51%,#1d6fff 87.23%)",
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="relative flex items-center gap-1 text-[12px] font-bold uppercase leading-normal tracking-[0.6px] sm:text-[13px]">
                <Image
                  src="/assets/products/badge-line-white.svg"
                  alt=""
                  width={117}
                  height={16}
                  aria-hidden
                  className="absolute left-[3.43px] top-0 h-4 w-[117px]"
                />
                <Image
                  src="/assets/products/badge-cap-white.svg"
                  alt=""
                  width={14.794}
                  height={16}
                  aria-hidden
                  className="relative h-4 w-[14.794px]"
                />
                Privacy policy
              </div>
              <h1 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-white sm:text-[40px] sm:tracking-[-0.8px]">
                Privacy Policy
              </h1>
              <p className="max-w-[311px] font-sans text-[12px] font-normal leading-normal text-white sm:max-w-[420px] sm:text-[14px]">
                We protect your data and respect your privacy.
              </p>
            </div>
          </section>
        </div>
        <div className="hidden lg:block">
          <PolicyHero label="Privacy policy" title="Privacy Policy" />
        </div>
        <div className="relative mx-auto flex w-full flex-col items-center justify-center gap-6 bg-white px-5 py-8 sm:gap-8 sm:px-8 sm:py-10 lg:w-full lg:max-w-none lg:gap-[40px] lg:px-8 xl:px-0 lg:pt-[64px] lg:pb-[42px]">
          <div className="flex w-full max-w-[720px] mx-auto flex-col gap-6 sm:gap-8 lg:max-w-[1040px] lg:gap-[40px] lg:px-0">
            <div className="h-auto min-h-[272px] w-full self-stretch font-sans text-[12px] font-normal leading-[1.4] text-[#121212] sm:h-auto sm:min-h-0 sm:w-full sm:text-[14px] lg:h-auto lg:min-h-0 lg:w-full lg:max-w-[1040px] lg:text-[18px] lg:leading-[1.4]">
              <p className="font-normal">Last updated: <strong className="font-bold">October 22, 2021</strong></p>
              <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4 md:mt-6 lg:space-y-0">
                <p>This is our policy which outlines how Euler Motors Private Limited protects any information that you give us when you visit the website. Euler Motors Private Limited is committed to ensuring that your privacy is protected.</p>
                <p>Should we ask you to provide certain information by which you can be identified when using the website, then you can be assured that it will only be used in accordance with this privacy statement.</p>
                <p>Euler Motors Private Limited may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. This policy is effective from October 22, 2021.</p>
              </div>
            </div>
            <div className="flex w-full max-w-[100vw] flex-col items-start gap-[10px] self-center sm:w-full sm:max-w-full lg:w-full lg:max-w-[1040px] lg:items-start lg:gap-[10px] lg:self-stretch">
              {ITEMS.map((item) => {
                const expanded = open === item.id;
                return (
                  <article key={item.id} className="w-full self-stretch overflow-hidden rounded-[16px] bg-[#f3f4f5] transition-all duration-200 lg:self-stretch lg:rounded-[16px] lg:bg-[#F3F4F5]">
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setOpen(expanded ? "" : item.id)}
                      className="flex h-[66px] w-full cursor-pointer items-center justify-center gap-[10px] px-3 py-[21px] text-left transition-colors sm:h-[74px] sm:justify-between sm:px-5 lg:h-[70px] lg:justify-between lg:gap-[20px] lg:p-0 lg:px-[32px]"
                    >
                      <h2 className="flex-[1_0_0] font-sans text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-[#121212] sm:text-[18px] lg:text-[#121212] lg:text-[20px] lg:leading-[1.4] lg:font-semibold lg:tracking-[-0.4px] lg:capitalize">
                        {item.title}
                      </h2>
                      <span className="relative flex size-6 shrink-0 items-center justify-center lg:size-6">
                        <Image
                          src="/assets/faq/icon-plus.svg"
                          alt=""
                          width={24}
                          height={24}
                          aria-hidden
                          className={`absolute size-6 select-none transition-all duration-300 lg:size-6 ${
                            expanded ? "opacity-0 rotate-90 scale-75 pointer-events-none" : "opacity-100 rotate-0 scale-100"
                          }`}
                        />
                        <Image
                          src="/assets/faq/icon-minus.svg"
                          alt=""
                          width={24}
                          height={24}
                          aria-hidden
                          className={`absolute size-6 select-none transition-all duration-300 lg:size-6 ${
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
                            <p className="self-stretch font-sans text-[12px] font-normal leading-[1.4] text-[rgba(18,18,18,0.80)] sm:text-[14px] lg:w-[881.039px] lg:max-w-full lg:text-[#121212] lg:text-[18px] lg:font-normal lg:leading-[1.4]">
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
