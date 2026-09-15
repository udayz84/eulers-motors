import Image from "next/image";

export type ArrowColor = "white" | "ink" | "navy";

const SRC: Record<ArrowColor, string> = {
  white: "/assets/hero/btn-arrow.svg",
  ink: "/assets/nav/btn-arrow-dark.svg",
  navy: "/assets/prime/btn-arrow.svg",
};

/**
 * The Figma "Arrow Container" — a triple-chevron arrow with motion blur.
 * Desktop 22×14, mobile 18.9×12 (scaled via className).
 */
export default function Arrow({
  color = "white",
  className = "",
}: {
  color?: ArrowColor;
  className?: string;
}) {
  return (
    <Image
      src={SRC[color]}
      alt=""
      width={23}
      height={19}
      aria-hidden
      className={`h-3 w-[18.9px] lg:h-[14px] lg:w-[22px] ${className}`}
    />
  );
}
