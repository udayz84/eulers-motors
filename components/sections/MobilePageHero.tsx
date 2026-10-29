import Image from "next/image";

export default function MobilePageHero({
  label,
  title,
  titleId,
  description,
}: {
  label: string;
  title: React.ReactNode;
  titleId?: string;
  description: React.ReactNode;
}) {
  return (
    <section
      aria-label={`${label} Banner`}
      className="relative flex h-[272px] w-full items-center justify-center overflow-x-clip overflow-y-visible bg-[#1d6fff] px-[68.5px] pt-[119.99px] pb-[59.01px] text-center text-white sm:h-[320px] sm:px-16 sm:pt-[128px] sm:pb-16"
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
          {label}
        </div>
        <h1 id={titleId} className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-white sm:text-[40px] sm:tracking-[-0.8px]">
          {title}
        </h1>
        <p className="max-w-[311px] font-sans text-[12px] font-normal leading-normal text-white sm:max-w-[420px] sm:text-[14px]">
          {description}
        </p>
      </div>
    </section>
  );
}
