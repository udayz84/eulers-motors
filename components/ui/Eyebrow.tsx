import Image from "next/image";

type EyebrowProps = {
  label: string;
  /** `dark` renders the white variant for dark backgrounds */
  dark?: boolean;
  className?: string;
};

/**
 * Recurring Figma badge: slanted underline sweep + cap mark + label.
 * Desktop: underline 148.8×20.35 / label 14px; Mobile: 117×16 / label 12px.
 */
export default function Eyebrow({ label, dark = false, className = "" }: EyebrowProps) {
  const line = dark ? "/assets/products/badge-line-white.svg" : "/assets/products/badge-line.svg";
  const cap = dark ? "/assets/products/badge-cap-white.svg" : "/assets/products/badge-cap.svg";
  return (
    <span className={`relative inline-flex items-center gap-[6px] ${className}`}>
      <Image
        src={line}
        alt=""
        width={117}
        height={16}
        className="h-4 w-[117px] lg:h-[20.355px] lg:w-[148.821px]"
        aria-hidden
      />
      <Image
        src={cap}
        alt=""
        width={14.8}
        height={16}
        className="h-4 w-[14.8px] lg:h-[20.355px] lg:w-[18.821px]"
        aria-hidden
      />
      <span
        className={`relative uppercase font-bold text-[12px] leading-none tracking-[0.7px] lg:text-[14px] ${
          dark ? "text-white" : "text-navy"
        }`}
      >
        {label}
      </span>
    </span>
  );
}
