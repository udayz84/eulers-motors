"use client";

import { useState } from "react";
import Image from "next/image";

export type PolicyAccordionItem = {
  id: string;
  title: string;
  body: string;
};

/**
 * Policy accordion list shared by the privacy-policy and terms-conditions pages.
 * Sections are powered by the Strapi `legal.section-item` component.
 */
export default function PolicyAccordion({
  items,
  defaultOpenId = "",
}: {
  items: PolicyAccordionItem[];
  defaultOpenId?: string;
}) {
  const [open, setOpen] = useState(defaultOpenId);

  return (
    <div className="flex w-[373px] max-w-[calc(100vw_-_20px)] flex-col items-start gap-[10px] self-center sm:w-full sm:max-w-full lg:w-full lg:max-w-[1040px] lg:self-stretch lg:gap-[10px]">
      {items.map((item) => {
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
  );
}
