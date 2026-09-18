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
  /** desktop card height (Figma: Neo 413 · Talk 450; 480 per review) */
  cardH?: "413" | "450" | "470" | "480" | "500";
  /** desktop photo placement: [left%, top%, width%, height%] of the card (Figma crop) */
  crop?: [number, number, number, number];
  /** mobile photo placement (Figma mobile crop, e.g. Neo 1:4671) */
  cropMobile?: [number, number, number, number];
  /** stacked mobile image layers — [src, left%, top%, width%, height%]
      (e.g. Talk 1:4691 uses two: desktop-bg + talk-3) */
  mobileLayers?: { src: string; box: [number, number, number, number] }[];
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
  cropMobile,
  mobileLayers,
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
      {/* Figma grids — Neo 1:1442: card spans 80→1360 (1280px), widened to 40px
          side insets (1360px) per review · Talk 1:1472/1:1473: card spans
          113.33→1379.33 in Figma, widened to ml 80 / mr 40 (1320px), keeping its
          right-shifted asymmetry. */}
      <div
        className={`mx-auto w-full max-w-[1440px] px-5 py-10 lg:px-0 ${
          pad === "80" ? "lg:py-12" : "lg:py-[58px]"
        }`}
      >
        <div
          className={`relative h-[420px] w-full overflow-clip rounded-[18px] lg:rounded-[20px] ${
            cardH === "450"
              ? "lg:h-[450px]"
              : cardH === "470"
                ? "lg:h-[470px]"
                : cardH === "480"
                  ? "lg:h-[480px]"
                  : cardH === "500"
                    ? "lg:h-[500px]"
                    : "lg:h-[413px]"
          } ${washCls} ${pad === "80" ? "lg:mx-10 lg:w-auto" : "lg:ml-20 lg:mr-10 lg:w-auto"}`}
        >
          {crop && (
            /* desktop: exact Figma placement — the photo fills an oversized,
               absolutely-positioned box (left/top only apply when positioned;
               max-w-none escapes preflight's img max-width clamp at 114% width) */
            <Image
              src={image}
              alt={imageAlt}
              width={2400}
              height={1200}
              aria-hidden={false}
              style={cropStyle}
              className="absolute hidden max-w-none lg:block"
            />
          )}
          {mobileLayers ? (
            /* stacked mobile layers with exact Figma boxes (Talk 1:4691) */
            mobileLayers.map((m, i) => (
              <Image
                key={i}
                src={m.src}
                alt={i === mobileLayers.length - 1 ? imageAlt : ""}
                aria-hidden={i !== mobileLayers.length - 1}
                width={2400}
                height={1200}
                className="absolute max-w-none max-lg:block lg:hidden"
                style={{
                  left: `${m.box[0]}%`,
                  top: `${m.box[1]}%`,
                  width: `${m.box[2]}%`,
                  height: `${m.box[3]}%`,
                  objectFit: "fill",
                }}
              />
            ))
          ) : cropMobile ? (
            /* mobile: exact Figma crop box (Neo 1:4671) */
            <Image
              src={image}
              alt={imageAlt}
              width={2400}
              height={1200}
              aria-hidden={false}
              className="absolute max-w-none max-lg:block lg:hidden"
              style={{
                left: `${cropMobile[0]}%`,
                top: `${cropMobile[1]}%`,
                width: `${cropMobile[2]}%`,
                height: `${cropMobile[3]}%`,
                objectFit: "fill",
              }}
            />
          ) : (
            <Image
              src={image}
              alt={crop ? "" : imageAlt}
              aria-hidden={!!crop}
              fill
              sizes="(max-width: 1024px) 393px, 1320px"
              className={`object-cover ${crop ? "lg:hidden" : ""}`}
              style={{ objectPosition: mobilePosition }}
            />
          )}
          {/* soft ellipse glow — desktop uses the exact Ellipse 74 svg placements:
              Neo (Figma 1:1444): container 932.512×750.623 at (-366.94,-119.11),
                svg oversized via insets -33.35%/-26.84%
              Talk (Figma 1:1474): container 1116.054×2002.27 at (670.5,-630.1),
                svg oversized via insets -12.5%/-22.43%
              Neo mobile (1:4672): container 505.519×329.738 at (-104.19,-119.24),
                svg oversized via insets -52.71%/-34.38% */}
          {!right && (
            <div aria-hidden className="absolute left-[-366.94px] top-[-119.11px] hidden h-[750.623px] w-[932.512px] lg:block">
              <div className="absolute inset-[-33.35%_-26.84%]">
                <Image src="/assets/neo/ellipse.svg" alt="" fill sizes="1433px" className="pointer-events-none" />
              </div>
            </div>
          )}
          {!right && (
            <div aria-hidden className="absolute left-[-104.19px] top-[-119.24px] block h-[329.738px] w-[505.519px] max-lg:block lg:hidden">
              <div className="absolute inset-[-52.71%_-34.38%]">
                <Image src="/assets/neo/ellipse-mobile.svg" alt="" fill sizes="853px" className="pointer-events-none" />
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
          {/* Talk mobile glow — #e8ecf2 blurred rect, 573.092×219.121 at
              (-120.74, -51.56), blur 17.6 (Figma 1:4692) */}
          {right && (
            <div
              aria-hidden
              className="absolute left-[-120.74px] top-[-51.56px] block h-[219.121px] w-[573.092px] bg-[#e8ecf2] blur-[17.6px] lg:hidden"
            />
          )}

          <div
            className={`absolute inset-0 flex px-5 ${
              right
                ? /* Talk mobile (1:4693): content centered in the upper part;
                     desktop stays right-aligned per 1:1484 */
                  "items-start justify-center pt-[7px] lg:items-center lg:justify-end lg:pt-0"
                : /* Neo mobile (1:4673): content sits in the upper part of the card */
                  "items-start justify-center pt-[15px] lg:items-center lg:justify-start lg:pt-0"
            } ${right ? "lg:pl-15 lg:pr-[69.57px]" : "lg:pl-15 lg:pr-15"}`}
          >
            <div
              className={`flex w-[312px] flex-col items-center gap-[14px] text-center lg:w-[414.434px] lg:gap-4 ${
                right ? "lg:items-end lg:text-right" : "lg:items-start lg:text-left lg:-translate-y-[34.81px]"
              }`}
            >
              {eyebrow && <Eyebrow label={eyebrow} />}
              <h2 className="whitespace-nowrap font-display text-[28px] font-semibold leading-[1.15] tracking-[-1.04px] text-ink lg:text-[52px]">
                {title}
              </h2>
              <p className="text-[12px] leading-snug text-ink lg:text-[16px] lg:leading-[22px]">{body}</p>
              <Button variant="dark" arrow={icon === "phone" ? "none" : "white"} className="max-lg:px-3">
                <span className="inline-flex items-center gap-2">
                  {cta}
                  {icon === "phone" && (
                    /* desktop 1:1496: 23.8×24 container, glyph 18×17.85 ·
                       mobile 1:4702: 16×16 container, glyph 11.94 */
                    <span className="inline-flex h-4 w-4 items-center justify-center lg:h-6 lg:w-[23.8px]" aria-hidden>
                      <Image
                        src="/assets/nav/phone-white.svg"
                        alt=""
                        width={18}
                        height={18}
                        className="h-3 w-3 lg:h-[17.85px] lg:w-[18px]"
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
