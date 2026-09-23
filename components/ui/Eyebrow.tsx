import Image from "next/image";

type EyebrowProps = {
  label: string;
  /** `dark` renders the white variant for dark backgrounds */
  dark?: boolean;
  /** icon marks color — defaults to white on dark, navy otherwise. The
      * savings calculator (Figma 1:2385) keeps the navy #0E2F6D marks even
      * on its dark section, pairing them with white text */
  icons?: "navy" | "white";
  className?: string;
};

/**
 * Recurring Figma badge: cap mark + label with the slanted sweep behind the
 * label's start (Figma: cap x=0 · sweep x=3.43, overlapping).
 * Desktop: sweep 148.8×20.35 / label 14px / gap 6 / tracking 0.7;
 * Mobile: sweep 117×16 / label 12px / gap 4 / tracking 0.6.
 */
export default function Eyebrow({ label, dark = false, icons, className = "" }: EyebrowProps) {
  const tone = icons ?? (dark ? "white" : "navy");
  const line = tone === "white" ? "/assets/products/badge-line-white.svg" : "/assets/products/badge-line.svg";
  const cap = tone === "white" ? "/assets/products/badge-cap-white.svg" : "/assets/products/badge-cap.svg";
  return (
    <span className={`relative inline-flex items-center gap-[4px] lg:gap-[6px] ${className}`}>
      <Image
        src={line}
        alt=""
        width={117}
        height={16}
        className="absolute left-[3.43px] top-0 h-4 w-[117px] lg:h-[20.355px] lg:w-[148.821px]"
        aria-hidden
      />
      <Image
        src={cap}
        alt=""
        width={14.8}
        height={16}
        className="relative h-4 w-[14.8px] lg:h-[20.355px] lg:w-[18.821px]"
        aria-hidden
      />
      <span
        className={`relative uppercase font-bold text-[12px] leading-none tracking-[0.6px] lg:text-[14px] lg:tracking-[0.7px] ${
          dark ? "text-white" : "text-navy"
        }`}
      >
        {label}
      </span>
    </span>
  );
}
