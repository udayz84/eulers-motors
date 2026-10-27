"use client";

import { useState } from "react";
import Image from "next/image";
import FloatingWidget from "@/components/FloatingWidget";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

const SECTIONS = [
  "Overview",
  "Eligibility",
  "Acceptance Of Terms",
  "Changes",
  "Payment Services Offered",
  "Third Party Sites",
  "Seller Terms For Repclub",
  "Applicable Law",
  "Dispute Resolution",
  "Amendment To Transfer",
  "Cancellation Of Services",
  "Disclaimer",
  "Policy Changes",
  "Fraud Prevention",
  "Dealing In Compliance Agency",
  "Indemnity",
  "Limitation Of Liability",
  "Governing Law",
  "General Provisions",
  "Contact Information",
  "Legal Notices",
  "Miscellaneous",
] as const;

const ANSWERS: Record<(typeof SECTIONS)[number], string> = {
  Overview: "These terms explain how users can access the Euler Motors platform and use its online booking services.",
  Eligibility: "You must be legally able to enter into an agreement and provide accurate information when using the platform.",
  "Acceptance Of Terms": "By accessing the platform or using its services, you confirm that you have read, understood, and accepted these terms.",
  Changes: "Euler Motors may update these terms from time to time. The latest version will be published on this page.",
  "Payment Services Offered": "Payment options may be provided through approved payment partners and are subject to the payment instructions shown during the booking process.",
  "Third Party Sites": "Links to third-party websites may be provided for convenience. Those websites operate under their own terms and privacy policies.",
  "Seller Terms For Repclub": "Sellers using Repclub services are expected to follow the applicable seller requirements and the instructions provided on the platform.",
  "Applicable Law": "Your use of the services and these terms is subject to the laws that apply to the relevant transaction and location.",
  "Dispute Resolution": "If a question or dispute arises, please contact Euler Motors first so the matter can be reviewed and resolved directly where possible.",
  "Amendment To Transfer": "Any transfer of rights or responsibilities under these terms must follow the conditions communicated by Euler Motors.",
  "Cancellation Of Services": "Cancellation requests are handled according to the booking, purchase, and cancellation instructions that apply to the service.",
  Disclaimer: "Information on the platform is provided for general guidance and may change as products, services, or availability change.",
  "Policy Changes": "Updates to related policies may be posted on the website and will apply from the effective date stated in the updated policy.",
  "Fraud Prevention": "Euler Motors may review activity and take reasonable steps to protect users, payments, and the platform from suspected fraud.",
  "Dealing In Compliance Agency": "Users and partners are expected to cooperate with reasonable compliance checks and applicable agency requirements.",
  Indemnity: "You may be responsible for losses caused by misuse of the platform or by a failure to follow these terms.",
  "Limitation Of Liability": "Any limits on liability apply only to the extent permitted by applicable law.",
  "Governing Law": "These terms are interpreted under the governing law stated for the relevant service.",
  "General Provisions": "The remaining provisions continue to apply even if one provision is found to be unenforceable.",
  "Contact Information": "Questions about these terms can be sent to Euler Motors customer support using the contact details published on the website.",
  "Legal Notices": "Formal notices should be sent using the communication method and address specified by Euler Motors.",
  Miscellaneous: "Other administrative matters are handled consistently with these terms and the related Euler Motors policies.",
};

function TermsHero() {
  return (
    <section
      className="relative w-full overflow-hidden text-white"
      style={{
        backgroundColor: "#1d6fff",
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent 0, transparent 67px, rgba(0,0,0,.12) 68px), repeating-linear-gradient(0deg, transparent 0, transparent 67px, rgba(0,0,0,.12) 68px), linear-gradient(272deg, #0E2F6D -63.51%, #1D6FFF 87.23%)",
      }}
      aria-labelledby="terms-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden opacity-[0.12] sm:block"
        style={{
          backgroundImage: "url('/assets/dealer-locator-hero/desktop-texture.png')",
          backgroundPosition: "left top",
          backgroundSize: "100% auto",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] sm:hidden" aria-hidden>
        <Image
          src="/assets/dealer-locator-hero/mobile-texture.png"
          alt=""
          fill
          sizes="393px"
          className="object-fill object-bottom"
        />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 pt-[108px] pb-8 text-center sm:px-8 sm:pt-[124px] sm:pb-12 md:px-12 md:pt-[140px] md:pb-16 lg:pt-[164px] lg:pb-[104px]">
        <div className="relative flex items-center gap-1 text-[12px] font-bold uppercase leading-normal tracking-[0.6px] sm:text-[13px] lg:gap-1.5 lg:text-[14px] lg:leading-none lg:tracking-[0.7px]">
          <Image src="/assets/products/badge-line-white.svg" alt="" width={117} height={16} aria-hidden className="absolute left-[3.43px] top-0 h-4 w-[117px] lg:h-[20.355px] lg:w-[148.821px]" />
          <Image src="/assets/products/badge-cap-white.svg" alt="" width={14.794} height={16} aria-hidden className="relative h-4 w-[14.794px] lg:h-[20.355px] lg:w-[18.821px]" />
          <span className="relative whitespace-nowrap">Terms &amp; Conditions</span>
        </div>
        <h1 id="terms-title" className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-white mt-3 sm:mt-4 sm:text-[40px] md:mt-5 md:text-[46px] md:tracking-[-0.88px] lg:mt-6 lg:text-[52px] lg:tracking-[-1.04px]">
          Terms of Use
        </h1>
        <p className="mt-3 max-w-[311px] font-sans text-[12px] font-normal leading-normal text-white sm:mt-4 sm:max-w-[420px] sm:text-[14px] md:max-w-[493px] md:text-[15px] md:leading-relaxed lg:text-[16px] sm:text-white/90">
          Please read these terms carefully before using our services.
        </p>
      </div>
      <FloatingWidget boundary desktopClassName="lg:top-1/2 lg:-translate-y-1/2" />
    </section>
  );
}

function TermsSection({ title, expanded, onToggle }: { title: (typeof SECTIONS)[number]; expanded: boolean; onToggle: () => void }) {
  return (
    <article className="overflow-hidden rounded-[16px] bg-[#f3f4f5] transition-all duration-200">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={onToggle}
        className="flex min-h-[56px] w-full cursor-pointer items-center justify-between gap-4 p-4 text-left transition-colors sm:min-h-[64px] sm:p-5 sm:px-6 md:min-h-[70px] md:gap-5 md:p-6 md:px-8"
      >
        <span className="flex-1 font-sans text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-ink sm:text-[18px] md:text-[19px] lg:text-[20px] sm:tracking-[-0.4px]">{title}</span>
        <span aria-hidden className="relative flex size-5 shrink-0 items-center justify-center sm:size-5.5 md:size-6">
          <span className="absolute left-[3px] right-[3px] top-1/2 h-0.5 -translate-y-1/2 bg-ink" />
          <span className={`absolute bottom-[3px] top-[3px] left-1/2 w-0.5 -translate-x-1/2 bg-ink transition-transform ${expanded ? "scale-y-0" : ""}`} />
        </span>
      </button>
      {expanded && (
        <div className="px-4 pb-4 pt-0 sm:px-6 sm:pb-6 md:px-8 md:pb-8">
          <p className="font-sans text-[12px] font-normal leading-[1.4] text-ink/80 sm:text-[14px] sm:leading-[1.5] md:text-[16px] lg:text-[18px] sm:leading-[1.6] sm:text-ink">
            {ANSWERS[title]}
          </p>
        </div>
      )}
    </article>
  );
}

export default function TermsConditionsPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <TermsHero />
        <div className="relative flex w-full flex-col items-center justify-center bg-white pb-12 pt-8 sm:pb-16 sm:pt-10 md:pb-[56px] md:pt-[56px] lg:pb-[62px] lg:pt-[64px]" aria-labelledby="terms-title">
          <div className="flex w-full max-w-[1440px] flex-col gap-6 px-4 sm:gap-8 sm:px-8 md:gap-10 md:px-12 lg:gap-[40px] lg:px-16 xl:px-[140px] 2xl:px-[200px]">
            <div className="w-full flex-col font-sans text-[12px] leading-[1.5] text-ink sm:text-[14px] sm:leading-[1.6] md:text-[16px] md:leading-[1.65] lg:text-[18px]">
              <p>Last updated: <strong className="font-bold">October 22, 2021</strong></p>
              <p className="mt-4 sm:mt-5 md:mt-6">
                These Terms and Conditions (&quot;Terms&quot;) of online booking are executed between the User (as defined hereinafter) and Euler Motors Private Limited, a company having its registered office address at B-99, Panchsheel Vihar, New Delhi 110017 (hereinafter referred to as &quot;Euler Motors&quot;, &quot;we&quot; or &quot;us&quot; or &quot;our&quot;) and its affiliates and subsidiaries and applies to the booking of Vehicles (as defined hereinafter) listed on the &apos;Book Online&apos; section.
              </p>
              <p className="mt-4 sm:mt-5 md:mt-6">
                By accessing or using our Platform and/or booking Vehicles through the Platform, you understand and agree to be bound by these Terms. The Terms, Privacy Policy, Purchase Terms (as defined hereinafter) shall be collectively referred to as &quot;Euler Motors Policies&quot;, including any modifications or amendments made thereto by Euler Motors from time to time, at its sole discretion.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2.5 sm:gap-3 md:gap-3.5 lg:gap-[10px]">
              {SECTIONS.map((title) => (
                <TermsSection
                  key={title}
                  title={title}
                  expanded={openSection === title}
                  onToggle={() => setOpenSection((current) => (current === title ? null : title))}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
