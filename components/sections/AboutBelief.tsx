import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import type { StrapiAboutBeliefSection } from "@/types/strapi";
import { mediaUrl } from "@/lib/strapi/client";

/* Card art = transparent cutouts absolutely positioned over the #d9e1eb card
   fill and cropped by the card's overflow-clip. Positions transcribed from
   Figma (image boxes keep each PNG's natural aspect, so a single rect per
   breakpoint reproduces the crop exactly). */
const CARDS = [
  {
    title: "Built around real business needs",
    image: "/assets/about-euler/belief-card-1.webp",
    titleCls: "left-3 top-3 w-[205.816px] lg:left-6 lg:top-6",
  },
  {
    title: "Designed for Indian roads",
    image: "/assets/about-euler/belief-card-2.webp",
    titleCls:
      "right-3 top-3 w-[153.283px] text-right lg:right-auto lg:left-6 lg:top-6 lg:w-[188.93px] lg:text-left",
  },
  {
    title: "Customer feedback drives innovation",
    image: "/assets/about-euler/belief-card-3.webp",
    titleCls: "left-3 top-3 w-[153.283px] lg:left-6 lg:top-6 lg:w-[205.816px]",
  },
  {
    title: "Reliable performance",
    image: "/assets/about-euler/belief-card-4.webp",
    titleCls:
      "right-[23.22px] top-[17.79px] w-[153.283px] text-right lg:right-auto lg:left-6 lg:top-6 lg:w-[205.816px] lg:text-left",
  },
];

export interface AboutBeliefProps {
  data?: StrapiAboutBeliefSection;
}

/**
 * Our Belief section (desktop Figma 3527:16797 · mobile 2917:13945).
 * "Building More Than Electric Vehicles" — header + four #d9e1eb cards with
 * vehicle cutouts and blue→navy gradient headings. Mobile stacks the cards
 * (200px tall) with alternating title sides; desktop keeps a centered
 * 311×284 row with all titles top-left.
 */
export default function AboutBelief({ data }: AboutBeliefProps = {}) {
  const eyebrow = data?.eyebrow || "Customers";
  const mobileEyebrow = data?.mobileEyebrow || "Our Belief";
  const title = data?.title || "Building More Than Electric Vehicles";
  const description =
    data?.description ||
    "At Euler Motors, we believe a commercial vehicle should do more than move goods. It should help businesses grow, reduce running costs and make every working day more productive. That's why every vehicle, every technology and every decision starts with the people who use it every day.";

  const cards =
    data?.cards && data.cards.length > 0
      ? data.cards.map((card, index) => {
        const slot = CARDS[index % CARDS.length];
        return {
          ...slot,
          title: card.title || slot.title,
          image: mediaUrl(card.image, slot.image),
        };
      })
      : CARDS;

  return (
    <section className="bg-white py-6 lg:py-[60px]" aria-label="Our belief">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 sm:gap-10 px-5 sm:px-8 lg:gap-[55px] lg:px-[80px]">
        {/* Header — mobile: stacked, 14px gaps · desktop: title left, copy bottom-aligned right */}
        <div className="flex w-full flex-col gap-[14px] sm:gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-[14px] lg:gap-4">
            <div className="lg:hidden">
              <Eyebrow label={mobileEyebrow} />
            </div>
            <div className="hidden lg:block">
              <Eyebrow label={eyebrow} />
            </div>
            <h2 className="font-display text-[28px] sm:text-[36px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink lg:w-[623.898px] lg:text-[52px] lg:tracking-[-1.04px]">
              {title}
            </h2>
          </div>
          <p className="text-[12px] sm:text-[14px] font-normal leading-[1.4] text-ink lg:w-[481.935px] lg:text-[16px] lg:leading-[1.40625]">
            {description}
          </p>
        </div>

        {/* Cards — mobile: 12px-apart stack, sm: 2x2 grid, desktop: centered 10px-gap row */}
        <div className="flex w-full flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 lg:flex lg:flex-row lg:justify-center lg:gap-[10px]">
          {cards.map((card, idx) => (
            <article
              key={`${card.title}-${idx}`}
              className="relative h-[200px] sm:h-[220px] w-full shrink-0 overflow-clip rounded-[12px] bg-[#d9e1eb] lg:h-[284px] lg:w-[311px]"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(min-width: 1024px) 311px, (min-width: 640px) 50vw, 100vw"
                className="pointer-events-none object-cover"
                unoptimized
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[130px] bg-gradient-to-b from-black/75 via-black/35 to-transparent"
              />
              <h3
                className={`absolute z-10 font-display text-[18px] sm:text-[20px] font-bold leading-[1.2] tracking-[-0.36px] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] lg:text-[20px] lg:font-semibold lg:tracking-[-0.4px] ${card.titleCls}`}
              >
                {card.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
