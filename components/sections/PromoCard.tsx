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
  /** desktop card height (Figma: Neo 413 · Talk 450) */
  cardH?: "413" | "450";
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
  cardH = "413",
  crop,
  mobilePosition = "50% 100%",
}: PromoCardProps) {
  const right = align === "right";
  const washCls =
    wash === "blue" ? "bg-[#D2E2FF]" : wash === "mobile-blue" ? "bg-white max-lg:bg-[#D2E2FF]" : "bg-white";
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
      {/* section padding per Figma: Neo 1:1442 px80/py48 · Talk 1:1472 px60/py58 */}
      <div
        className={`mx-auto w-full px-5 py-10 lg:px-0 ${
          pad === "80" ? "max-w-[1280px] lg:py-12" : "max-w-[1320px] lg:py-[58px]"
        }`}
      >
        <div
          className={`relative h-[420px] w-full overflow-clip rounded-[18px] lg:rounded-[20px] ${
            cardH === "450" ? "lg:h-[450px]" : "lg:h-[413px]"
          } ${washCls}`}
        >
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
          {/* soft ellipse glow — desktop uses the exact Ellipse 74 svg placements:
              Neo (Figma 1:1444): container 932.512×750.623 at (-366.94,-119.11),
                svg oversized via insets -33.35%/-26.84%
              Talk (Figma 1:1474): container 1116.054×2002.27 at (670.5,-630.1),
                svg oversized via insets -12.5%/-22.43% */}
          {!right && (
            <div aria-hidden className="absolute left-[-366.94px] top-[-119.11px] hidden h-[750.623px] w-[932.512px] lg:block">
              <div className="absolute inset-[-33.35%_-26.84%]">
                <Image src="/assets/neo/ellipse.svg" alt="" fill sizes="1433px" className="pointer-events-none" />
              </div>
            </div>
          )}
          {right && (
            <div aria-hidden className="absolute left-[670.5px] top-[-630.1px] hidden h-[2002.27px] w-[1116.054px] lg:block">
              <div className="absolute inset-[-12.5%_-22.43%]">
                <Image src="/assets/talk/ellipse.svg" alt="" fill sizes="1617px" className="pointer-events-none" />
              </div>
            </div>
          )}
          {/* mobile glow stays as a blur approximation on both variants */}
          <div
            aria-hidden
            className={`absolute h-[326px] w-[506px] rounded-full bg-[#e8ecf2] opacity-70 blur-[173px] ${
              right ? "-right-40 -top-24 lg:hidden" : "-left-40 -bottom-24 lg:hidden"
            }`}
          />

          <div
            className={`absolute inset-0 flex px-5 ${
              right
                ? "items-end justify-end lg:items-center lg:justify-end"
                : "items-end justify-center lg:items-center lg:justify-start"
            } ${right ? "lg:pl-15 lg:pr-[69.57px]" : "lg:pl-15 lg:pr-15"}`}
          >
            <div
              className={`flex w-[316px] flex-col items-center gap-[14px] text-center lg:w-[414.434px] lg:items-start lg:gap-4 lg:text-left ${
                right ? "lg:items-end lg:text-right" : "lg:-translate-y-[34.81px]"
              }`}
            >
              {eyebrow && <Eyebrow label={eyebrow} />}
              <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-1.04px] text-ink lg:text-[52px]">
                {title}
              </h2>
              <p className="text-[12px] leading-snug text-ink lg:text-[16px] lg:leading-[22px]">{body}</p>
              <Button variant="dark" arrow={icon === "phone" ? "none" : "white"}>
                <span className="inline-flex items-center gap-2">
                  {cta}
                  {icon === "phone" && (
                    /* Figma 1:1496: 23.8×24 icon container, glyph 18×17.85 after the label */
                    <span className="inline-flex h-6 w-[23.8px] items-center justify-center" aria-hidden>
                      <Image
                        src="/assets/nav/phone-white.svg"
                        alt=""
                        width={18}
                        height={18}
                        className="h-[17.85px] w-[18px]"
                      />
                    </span>
                  )}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
