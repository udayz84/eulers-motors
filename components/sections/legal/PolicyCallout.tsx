import type { ReactNode } from "react";

/**
 * Highlighted policy callout used on the refund-policy page.
 * Callout content is powered by the Strapi `legal.callout` component.
 */
export default function PolicyCallout({
  title,
  children,
  className = "",
  headingClassName = "",
  contentClassName = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
  headingClassName?: string;
  contentClassName?: string;
}) {
  return (
    <>
      <section className="flex w-full flex-col items-center justify-center gap-3 self-stretch rounded-[16px] bg-[#F3F4F5] px-4 py-4 sm:p-6 lg:hidden">
        <h2 className={`self-stretch font-sans text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-[#121212] capitalize sm:text-[18px] sm:tracking-[-0.36px] ${headingClassName}`}>
          {title}
        </h2>
        <div className={`self-stretch font-sans text-[12px] font-normal leading-[140%] text-[rgba(18,18,18,0.80)] sm:text-[14px] sm:leading-[1.6] ${contentClassName}`}>
          {children}
        </div>
      </section>
      <section className={`hidden lg:flex lg:h-auto lg:min-h-[212px] lg:w-full lg:max-w-[1040px] lg:flex-col lg:items-center lg:gap-[20px] lg:self-stretch lg:rounded-[16px] lg:bg-[#F3F4F5] lg:p-[32px] ${className}`}>
        <h2 className="font-sans text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-ink sm:text-[18px] md:text-[19px] lg:w-full lg:max-w-[976px] lg:min-h-[28px] lg:self-stretch lg:text-[20px] lg:leading-[140%] lg:tracking-[-0.4px] lg:capitalize" style={{ color: "#121212", fontFamily: "Manrope", fontSize: "20px", fontStyle: "normal", fontWeight: 600, lineHeight: "140%", letterSpacing: "-0.4px", textTransform: "capitalize", alignSelf: "stretch" }}>
          {title}
        </h2>
        <div className={`mt-3 font-sans text-[12px] leading-[1.5] text-[#5c5c5c] sm:mt-4 sm:text-[14px] sm:leading-[1.6] md:text-[16px] lg:!mt-0 lg:w-full lg:max-w-[976px] lg:self-stretch lg:text-[18px] lg:leading-[140%] ${contentClassName}`} style={{ color: "rgba(18, 18, 18, 0.80)", fontFamily: "Manrope", fontSize: "18px", fontStyle: "normal", fontWeight: 400, lineHeight: "140%", alignSelf: "stretch" }}>
          {children}
        </div>
      </section>
    </>
  );
}
