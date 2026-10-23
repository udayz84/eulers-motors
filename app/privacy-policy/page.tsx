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
      <main>
        <PolicyHero label="Privacy policy" title="Privacy Policy" />
        <article className="policy-content mx-auto flex w-[393px] max-w-full flex-col items-center justify-center gap-[24px] p-[32px] text-[12px] leading-[1.35] text-ink sm:gap-[32px] sm:p-10 sm:text-[14px] sm:leading-[1.5] lg:w-[1440px] lg:max-w-full lg:flex-col lg:items-center lg:justify-center lg:gap-[40px] lg:px-[200px] lg:pb-[42px] lg:pt-[64px] lg:text-[16px] lg:leading-[1.4]">
          <div className="w-[329px] max-w-full sm:w-full lg:h-[200px] lg:w-[1040px] lg:max-w-[calc(100vw-400px)] lg:text-[18px]">
            <p className="lg:w-full">Last updated: <strong>October 22, 2021</strong></p>
            <div className="mt-[23px] space-y-[17px] sm:mt-[20px] sm:space-y-[14px] lg:mt-[26px] lg:w-full lg:space-y-0"><p>This is our policy which outlines how Euler Motors Private Limited protects any information that you give us when you visit the website. Euler Motors Private Limited is committed to ensuring that your privacy is protected.</p><p>Should we ask you to provide certain information by which you can be identified when using the website, then you can be assured that it will only be used in accordance with this privacy statement.</p><p>Euler Motors Private Limited may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. This policy is effective from October 22, 2021.</p></div>
          </div>
          <div className="w-[373px] max-w-[calc(100vw-20px)] flex flex-col gap-[10px] sm:w-full sm:max-w-full lg:flex lg:w-[1040px] lg:max-w-[calc(100vw-400px)] lg:flex-col lg:items-start lg:gap-[10px] lg:space-y-0">{ITEMS.map((item) => {
              const expanded = open === item.id;
              return (
                <section key={item.id} className={`flex w-full flex-col items-center justify-center gap-[10px] self-stretch rounded-[16px] bg-[#f3f4f5] px-[12px] py-[21px] sm:px-[24px] sm:py-[24px] lg:flex lg:w-auto lg:self-stretch lg:gap-[20px] lg:rounded-[16px] lg:p-[32px] ${expanded ? "lg:h-auto lg:flex-col lg:items-start lg:justify-center" : "h-[66px] sm:h-[70px] lg:h-[70px] lg:flex-row lg:items-center"}`}><button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? "" : item.id)} className="flex w-full items-center gap-[10px] text-left sm:gap-[16px] lg:gap-[20px]"><h2 className="flex-1 text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-[#121212] sm:text-[18px] sm:tracking-[-0.36px] lg:[flex:1_0_0] lg:text-[20px] lg:font-semibold lg:leading-[1.4] lg:tracking-[-0.4px] lg:capitalize lg:text-[#121212]">{item.title}</h2><span className="shrink-0 text-[24px] font-normal leading-none sm:text-[26px] lg:text-[28px]" aria-hidden>{expanded ? "-" : "+"}</span></button>{expanded && item.body && <p className="w-full whitespace-pre-line text-[12px] leading-[1.4] text-[rgba(18,18,18,0.8)] sm:text-[14px] sm:leading-[1.5] lg:w-[881.039px] lg:max-w-full lg:text-[18px] lg:font-normal lg:leading-[1.4] lg:text-[#121212]">{item.body}</p>}</section>
              );
            })}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}
