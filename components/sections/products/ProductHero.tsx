import { Fragment } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

const ASSET = "/assets/products/";

/** Stats bar entries — Figma 3241:17008 */
const STATS = [
  { value: "200", unit: "km", label: "on one charge" },
  { value: "1,200", unit: "kg", label: "load capacity" },
  { value: "₹1.05/", unit: "km", label: "running cost" },
  { value: "90", unit: "min", label: "full charge time" },
];

function Stat({ value, unit, label }: { value: string; unit: string; label: string }) {
  return (
    <div className="flex w-[120px] shrink-0 flex-col gap-[4.8px] whitespace-nowrap">
      <p className="font-display text-[20px] font-semibold leading-[1.15] tracking-[-0.4px] text-ink">
        {value} <span className="font-sans text-[14px] font-medium">{unit}</span>
      </p>
      <p className="font-sans text-[14px] font-medium capitalize leading-normal text-ink">{label}</p>
    </div>
  );
}

/**
 * Image gallery thumbnails — Figma 2862:10044. Thumbs 2/3 stack semi-transparent
 * vehicle layers exactly as Figma does; thumb 1's top layer is opaque so the base
 * is dropped. "+5" tile carries a black/80 overlay.
 */
function Thumbs() {
  return (
    <div className="flex items-end gap-2">
      <div className="relative size-[62px] shrink-0 overflow-hidden rounded-[4px] bg-[#d9d9d9]">
        <Image src={`${ASSET}thumb-1.png`} alt="Storm EV LR 200 Base" fill sizes="62px" className="object-cover" />
      </div>
      <div className="relative size-[62px] shrink-0 overflow-hidden rounded-[4px] bg-[#d9d9d9]">
        <Image src={`${ASSET}thumb-base.png`} alt="" aria-hidden fill sizes="62px" className="object-cover" />
        <Image src={`${ASSET}thumb-2-mid.png`} alt="" aria-hidden fill sizes="62px" className="object-bottom" />
        <Image src={`${ASSET}thumb-2-top.png`} alt="" aria-hidden fill sizes="62px" className="object-cover" />
      </div>
      <div className="relative size-[62px] shrink-0 overflow-hidden rounded-[4px] bg-[#d9d9d9]">
        <Image src={`${ASSET}thumb-base.png`} alt="" aria-hidden fill sizes="62px" className="object-cover" />
        <Image src={`${ASSET}thumb-2-mid.png`} alt="" aria-hidden fill sizes="62px" className="object-bottom" />
        <div className="absolute inset-0 bg-black/80" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-sans text-[18px] font-semibold text-white">+5</span>
      </div>
    </div>
  );
}

/** Variants dropdown card — Figma 2862:10122 */
function VariantsPanel() {
  return (
    <div className="flex w-full flex-col gap-3 rounded-lg bg-white/20 p-[14px] backdrop-blur-[12px] xl:w-[251px]">
      <p className="w-full font-sans text-[14px] font-bold uppercase leading-normal tracking-[0.7px] text-navy">Variants</p>
      <div className="flex w-full items-center justify-between rounded-[12px] bg-white py-[6px] pl-1.5 pr-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="relative size-[42px] shrink-0 overflow-hidden rounded-[6.146px] bg-surface">
            {/* Figma crops a 97.11×64.97 render of the photo at -65.46/-38.28
                inside this 30.42px window — a 3.19x zoomed detail, not a cover fit */}
            <div className="absolute inset-[5.79px] overflow-hidden rounded-[5.799px]">
              <Image
                src={`${ASSET}variant-thumb.png`}
                alt=""
                aria-hidden
                width={97.11}
                height={64.97}
                className="absolute left-[-65.46px] top-[-38.28px] h-[64.97px] w-[97.11px] max-w-none"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-1">
            <p className="whitespace-nowrap font-sans text-[14px] font-bold leading-[1.15] tracking-[-0.28px] text-navy">Base</p>
            <div className="flex items-center gap-1">
              <p className="whitespace-nowrap font-sans text-[12px] font-medium leading-[1.15] tracking-[-0.24px] text-navy">200 km</p>
              <span className="size-[4px] shrink-0 rounded-full bg-navy/20" />
              <p className="whitespace-nowrap font-sans text-[12px] font-medium leading-[1.15] tracking-[-0.24px] text-navy">₹11.49 L</p>
            </div>
          </div>
        </div>
        <Image
          src={`${ASSET}variant-chevron.svg`}
          alt=""
          aria-hidden
          width={15.5}
          height={7.12}
          className="h-[7.12px] w-[15.5px] -scale-y-100"
        />
      </div>
    </div>
  );
}

/**
 * /products hero — Figma 2862:10040 (1440×800 frame; fixed navbar overlays top 71px).
 * Background is hero-bg-desktop.png (2880×1600, 16:9) — an exact fit for the
 * desktop box (1440×800, no crop). On mobile the portrait box crops it
 * full-bleed, so it is centered on the vehicle (object-center) to keep the
 * truck in frame.
 */
export default function ProductHero() {
  return (
    <section aria-label="Storm EV LR 200 Base" className="relative w-full overflow-hidden bg-white max-xl:min-h-[740px] xl:h-[800px]">
      {/* Background — hero-bg-desktop.png; desktop 16:9 exact fit, mobile full-bleed cover centered on the vehicle */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src={`${ASSET}hero-bg-desktop.png`}
          alt="Storm EV LR 200 electric three-wheeler on a city road"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col px-5 pt-[130px] xl:block xl:px-0 xl:pt-0">
        <div className="flex flex-col items-start gap-4 xl:absolute xl:left-20 xl:top-[130px] xl:w-[303px]">
          <h1 className="font-display text-[30px] font-semibold not-italic leading-[1.15] tracking-[-0.6px] text-ink xl:text-[42px] xl:tracking-[-0.84px]">
            Storm EV LR 200 Base
          </h1>
          <p className="w-full font-sans text-[16px] leading-normal text-ink xl:w-[308.7px]">
            Built for long city and highway runs. Carries a full load all day and charges overnight at your depot.
          </p>
          <Button className="mt-2 xl:mt-0">Download Brochure</Button>
        </div>

        <div className="mt-6 xl:absolute xl:right-20 xl:top-[130px] xl:mt-0">
          <VariantsPanel />
        </div>

        <div className="mt-auto flex flex-col xl:hidden">
          <Thumbs />
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 rounded-t-lg bg-white/60 backdrop-blur-[10px] px-5 py-4">
            {STATS.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>

      {/* desktop overlays */}
      <div className="absolute bottom-8 left-20 z-10 max-xl:hidden">
        <Thumbs />
      </div>
      <div className="absolute bottom-0 right-20 z-10 flex w-[720px] items-center justify-between rounded-t-lg bg-white/60 backdrop-blur-[10px] px-5 py-[14px] max-xl:hidden">
        {STATS.map((s, i) => (
          <Fragment key={s.label}>
            {i > 0 && <span className="h-[21.143px] w-[0.8px] shrink-0 bg-ink/32" />}
            <Stat {...s} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}
