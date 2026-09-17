import type { ReactNode } from "react";
import Arrow, { type ArrowColor } from "./Arrow";

type ButtonVariant = "dark" | "white" | "outline";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  arrow?: ArrowColor | "none";
  className?: string;
  href?: string;
  type?: "button" | "submit";
};

const VARIANTS: Record<ButtonVariant, string> = {
  // bg #121212 · 0.5px white border · radius 4 (Figma "Right Button Container")
  dark: "bg-ink border-[0.5px] border-solid border-white text-white",
  white: "bg-white border border-transparent",
  outline: "bg-surface border border-ink/50 text-ink",
};

/**
 * Primary CTA. Desktop h-50.477/px-24/16px Archia SemiBold · Mobile h-44/px-20/12px.
 * The Figma uses Archia SemiBold for labels; only Archia Regular is publicly
 * licensed, so heavier weights are synthesized by the browser (see globals.css).
 */
export default function Button({
  children,
  variant = "dark",
  arrow = "white",
  className = "",
  href,
  type = "button",
}: ButtonProps) {
  const arrowColor: ArrowColor =
    arrow === "none"
      ? "white"
      : variant === "white"
        ? arrow === "white"
          ? "ink"
          : arrow
        : arrow;

  const cls = `inline-flex items-center justify-center gap-2 rounded-[4px]
    h-11 px-5 lg:h-[50.477px] lg:px-6
    font-display font-semibold leading-none text-[12px] lg:text-[16px]
    whitespace-nowrap transition-transform duration-200 hover:scale-[1.02]
    ${VARIANTS[variant]} ${className}`;

  const content = (
    <>
      <span
        className={
          variant === "white"
            ? "text-ink"
            : ""
        }
      >
        {children}
      </span>
      {arrow !== "none" && <Arrow color={arrowColor} />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={cls}>
      {content}
    </button>
  );
}
