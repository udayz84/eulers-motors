import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";

type PromoCardProps = {
  eyebrow?: string;
  title: string;
  body: string;
  cta: string;
  /** desktop content alignment, per Figma */
  align?: "left" | "right";
  image: string;
  imageAlt: string;
  /** card wash: "blue" both breakpoints · "mobile-blue" = blue only on mobile (Figma) */
  wash?: "blue" | "white" | "mobile-blue";
  icon?: "arrow" | "phone";
  /** desktop section horizontal padding (Neo: 80px · Talk: 60px) */
  pad?: "60" | "80";
  /** desktop photo placement: [left%, top%, width%, height%] of the card (Figma crop) */
  crop?: [number, number, number, number];
  /** mobile photo object-position */
  mobilePosition?: string;
};

/**
 * Shared pattern for the "Neo by Euler" (Figma 1:1442) and
 * "Talk to an expert" (Figma 1:1472) promo cards.
 * Desktop: content column over a 413/450px card · Mobile: 353×420 centered card.
 */
export default function PromoCard({
  eyebrow,
  title,
  body,
  cta,
  align = "left",
  image,
  imageAlt,
  wash = "blue",
  icon = "arrow",
  pad = "80",
  crop,
  mobilePosition = "50% 100%",
}: PromoCardProps) {
  const right = align === "right";
  const washCls =
    wash === "blue" ? "bg-[#D2E2FF]" : wash === "mobile-blue" ? "bg-white max-lg:bg-[#D2E2FF]" : "bg-white";
  const cardH = 413;
  void cardH;
  const cropStyle: React.CSSProperties | undefined = crop
    ? {
        left: `${crop[0]}%`,
        top: `${crop[1]}%`,
        width: `${crop[2]}%`,
        height: `${crop[3]}%`,
        objectFit: "fill",
      }
    : undefined;
  return (
    <section className="bg-white" aria-label={title}>
      <div
        className={`mx-auto max-w-[1440px] px-5 py-10 lg:py-12 ${
          pad === "80" ? "lg:px-20" : "lg:px-15"
        }`}
      >
        <div className={`relative h-[420px] w-full overflow-clip rounded-[18px] lg:h-[413px] lg:rounded-[20px] ${washCls}`}>
          {crop && (
            /* desktop: exact Figma placement — the photo fills an oversized box */
            <Image
              src={image}
              alt={imageAlt}
              width={2400}
              height={1200}
              aria-hidden={false}
              style={cropStyle}
              className="hidden lg:block"
            />
          )}
          <Image
            src={image}
            alt={crop ? "" : imageAlt}
            aria-hidden={!!crop}
            fill
            sizes="(max-width: 1024px) 393px, 1320px"
            className={`object-cover ${crop ? "lg:hidden" : ""}`}
            style={{ objectPosition: mobilePosition }}
          />
          {/* soft ellipse glow (Figma Ellipse 74) */}
          <div
            aria-hidden
            className={`absolute h-[326px] w-[506px] rounded-full bg-[#e8ecf2] opacity-70 blur-[173px] ${
              right ? "-right-40 -top-24" : "-left-40 -bottom-24 lg:-left-[367px] lg:-top-24"
            }`}
          />

          <div
            className={`absolute inset-0 flex px-5 ${
              right
                ? "items-end justify-end lg:items-center lg:justify-end"
                : "items-end justify-center lg:items-center lg:justify-start"
            } ${pad === "60" ? "lg:px-15" : "lg:pl-15 lg:pr-15"}`}
          >
            <div
              className={`flex w-[316px] flex-col items-center gap-[14px] text-center lg:w-[414.434px] lg:items-start lg:gap-4 lg:text-left ${
                right ? "lg:items-end lg:text-right" : ""
              }`}
            >
              {eyebrow && <Eyebrow label={eyebrow} />}
              <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-1.04px] text-ink lg:text-[52px]">
                {title}
              </h2>
              <p className="text-[12px] leading-snug text-ink lg:text-[16px] lg:leading-normal">{body}</p>
              <Button variant="dark" arrow={icon === "phone" ? "none" : "white"}>
                <span className="inline-flex items-center gap-2">
                  {icon === "phone" && (
                    <Image
                      src="/assets/nav/phone-white.svg"
                      alt=""
                      width={16}
                      height={16}
                      aria-hidden
                      className="h-4 w-4"
                    />
                  )}
                  {cta}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
