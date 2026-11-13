import Image from "next/image";
import FloatingWidget from "@/components/FloatingWidget";

export default function MobilePageHero({
  label,
  title,
  titleId,
  description,
  action,
  className = "",
  hasWidget = false,
  imageSrc,
  imageOffsetClassName = "top-0",
  imageClassName = "",
  imageFitClassName = "object-cover",
  imagePositionClassName = "object-top",
}: {
  label: string;
  title: React.ReactNode;
  titleId?: string;
  description: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  hasWidget?: boolean;
  /** Hero artwork. Cropped to the same 393×272 mobile banner box. */
  imageSrc?: string;
  imageOffsetClassName?: string;
  imageClassName?: string;
  imageFitClassName?: string;
  imagePositionClassName?: string;
}) {
  const textColor = imageSrc ? "text-[#0e2f6d]" : "text-white";
  return (
    <section
      aria-label={`${label} Banner`}
      className={`relative flex h-[272px] w-full items-center justify-center overflow-x-clip overflow-y-visible bg-[#1d6fff] px-5 sm:px-8 pt-[119.99px] pb-[59.01px] text-center ${textColor} sm:h-[320px] sm:pt-[128px] sm:pb-16 ${className}`}
      style={
        imageSrc
          ? { backgroundColor: "#d2dff5" }
          : {
              backgroundImage:
                "repeating-linear-gradient(90deg,transparent 0,transparent 67px,rgba(0,0,0,.12) 68px),repeating-linear-gradient(0deg,transparent 0,transparent 67px,rgba(0,0,0,.12) 68px),linear-gradient(272deg,#0e2f6d -63.51%,#1d6fff 87.23%)",
            }
      }
    >
      {imageSrc && (
        /* Extend the artwork to the top edge of the mobile hero. */
        <div className={`pointer-events-none absolute inset-x-0 bottom-0 ${imageOffsetClassName} select-none`}>
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="230vw"
            aria-hidden
            className={`${imageFitClassName} ${imagePositionClassName} ${imageClassName}`}
          />
        </div>
      )}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="relative flex items-center gap-1 text-[12px] font-bold uppercase leading-normal tracking-[0.6px] sm:text-[13px]">
          <Image
            src={imageSrc ? "/assets/products/badge-line.svg" : "/assets/products/badge-line-white.svg"}
            alt=""
            width={117}
            height={16}
            aria-hidden
            className="absolute left-[3.43px] top-0 h-4 w-[117px]"
          />
          <Image
            src={imageSrc ? "/assets/products/badge-cap.svg" : "/assets/products/badge-cap-white.svg"}
            alt=""
            width={14.794}
            height={16}
            aria-hidden
            className="relative h-4 w-[14.794px]"
          />
          {label}
        </div>
        <h1 id={titleId} className={`font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] ${textColor} sm:text-[40px] sm:tracking-[-0.8px]`}>
          {title}
        </h1>
        <p className={`max-w-[311px] font-sans text-[12px] font-normal leading-normal ${textColor} sm:max-w-[420px] sm:text-[14px]`}>
          {description}
        </p>
        {action}
      </div>
      {hasWidget && <FloatingWidget boundary mobileOnly mobileClassName="top-[506.33px]" mobileRightClassName="right-[-29.531px]" />}
    </section>
  );
}
