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
      className="relative h-[272px] overflow-visible bg-[linear-gradient(-87.60965884151304deg,#0e2f6d_63.511%,#1d6fff_87.226%)] text-white lg:h-[420px]"
      style={{
        backgroundColor: "#1d6fff",
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent 0, transparent 67px, rgba(0,0,0,.12) 68px), repeating-linear-gradient(0deg, transparent 0, transparent 67px, rgba(0,0,0,.12) 68px), linear-gradient(272deg, #0E2F6D -63.51%, #1D6FFF 87.23%)",
      }}
      aria-labelledby="terms-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden opacity-[0.12] lg:block"
        style={{
          backgroundImage: "url('/assets/dealer-locator-hero/desktop-texture.png')",
          backgroundPosition: "left top",
          backgroundSize: "100% auto",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] lg:hidden" aria-hidden>
        <Image
          src="/assets/dealer-locator-hero/mobile-texture.png"
          alt=""
          fill
          sizes="393px"
          className="object-fill object-bottom"
        />
      </div>
      <div className="absolute left-1/2 top-[119.99px] z-10 flex -translate-x-1/2 flex-col items-center gap-3 whitespace-nowrap text-center lg:top-[calc(50%+30px)] lg:-translate-y-1/2 lg:gap-6">
        <div className="relative flex items-center gap-1 lg:gap-1.5">
          <Image src="/assets/products/badge-line-white.svg" alt="" width={117} height={16} aria-hidden className="absolute left-[3.43px] top-0 h-4 w-[117px] lg:h-[20.355px] lg:w-[148.821px]" />
          <Image src="/assets/products/badge-cap-white.svg" alt="" width={14.794} height={16} aria-hidden className="relative h-4 w-[14.794px] lg:h-[20.355px] lg:w-[18.821px]" />
          <span className="relative whitespace-nowrap text-[12px] font-bold uppercase leading-normal tracking-[0.6px] lg:text-[14px] lg:leading-none lg:tracking-[0.7px]">Terms &amp; Conditions</span>
        </div>
        <h1 id="terms-title" className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] lg:w-[788px] lg:text-[52px] lg:tracking-[-1.04px]">Terms of Use</h1>
        <p className="whitespace-nowrap text-[12px] leading-normal lg:w-[493px] lg:text-[16px]">Please read these terms carefully before using our services.</p>
      </div>
      <FloatingWidget mobileClassName="top-[545px]" desktopClassName="lg:top-[400px]" />
    </section>
  );
}

function TermsSection({ title, expanded, onToggle }: { title: (typeof SECTIONS)[number]; expanded: boolean; onToggle: () => void }) {
  return (
    <div className={`overflow-hidden rounded-[16px] bg-[#f3f4f5] lg:flex lg:flex-col lg:items-start lg:gap-[10px] lg:self-stretch ${expanded ? "" : "lg:h-[70px]"}`}>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={onToggle}
        className="flex min-h-[64px] w-full items-center gap-2.5 px-3 py-[21px] text-left lg:flex lg:h-[70px] lg:w-full lg:items-center lg:gap-[20px] lg:self-stretch lg:p-[32px] lg:py-0"
      >
        <span className="flex-1 text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] lg:text-[20px] lg:tracking-[-0.4px]">{title}</span>
        <span aria-hidden className="relative size-6 shrink-0">
          <span className="absolute left-[5px] right-[5px] top-1/2 h-px -translate-y-1/2 bg-ink" />
          <span className={`absolute bottom-[5px] top-[5px] left-1/2 w-px -translate-x-1/2 bg-ink transition-transform ${expanded ? "scale-y-0" : ""}`} />
        </span>
      </button>
      {expanded && (
        <p className="px-3 pb-5 text-[12px] leading-[1.4] text-[#5c6675] lg:px-[32px] lg:pb-[32px] lg:pt-0 lg:text-[16px]">
          {ANSWERS[title]}
        </p>
      )}
    </div>
  );
}

export default function TermsConditionsPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <main>
        <TermsHero />
        <section className="mx-auto flex w-[393px] max-w-full flex-col items-center justify-center gap-[24px] bg-white p-[32px] lg:w-full lg:max-w-[1440px] lg:items-stretch lg:justify-start lg:gap-[40px] lg:px-[200px] lg:pb-[62px] lg:pt-16" aria-labelledby="terms-title">
          <div className="w-full px-0 text-[12px] leading-[1.4] text-ink lg:px-0 lg:w-[1040px] lg:h-[275px] lg:text-[18px]">
            <p>Last updated: <strong>October 22, 2021</strong></p>
            <p className="mt-6">
              These Terms and Conditions (&quot;Terms&quot;) of online booking are executed between the User (as defined hereinafter) and Euler Motors Private Limited, a company having its registered office address at B-99, Panchsheel Vihar, New Delhi 110017 (hereinafter referred to as &quot;Euler Motors&quot;, &quot;we&quot; or &quot;us&quot; or &quot;our&quot;) and its affiliates and subsidiaries and applies to the booking of Vehicles (as defined hereinafter) listed on the &apos;Book Online&apos; section.
            </p>
            <p className="mt-6">
              By accessing or using our Platform and/or booking Vehicles through the Platform, you understand and agree to be bound by these Terms. The Terms, Privacy Policy, Purchase Terms (as defined hereinafter) shall be collectively referred to as &quot;Euler Motors Policies&quot;, including any modifications or amendments made thereto by Euler Motors from time to time, at its sole discretion.
            </p>
          </div>
          <div className="flex w-[373px] max-w-[calc(100vw-20px)] flex-col gap-[10px] self-center lg:mt-[40px] lg:flex lg:w-full lg:max-w-full lg:flex-col lg:items-start lg:gap-[10px] lg:self-stretch">
            {SECTIONS.map((title) => (
              <TermsSection
                key={title}
                title={title}
                expanded={openSection === title}
                onToggle={() => setOpenSection((current) => (current === title ? null : title))}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
