import { Fragment } from "react";
import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import Arrow from "../ui/Arrow";

const FEATURES = [
  { value: "24 hours", label: "Truck back in a day" },
  { value: "Spare vehicle", label: "Totally free" },
  { value: "Every 3 months", label: "Free check-up at your depot" },
];

/**
 * Euler Prime banner (desktop 1:1819 · mobile 1:4894).
 * Background is the exact Figma layer stack — bg-3 sits on top (103.32%×106.74%),
 * so the white base, bg-1/bg-2 and the gradient renders beneath it, clipped.
 */
export default function PrimeBanner() {
  return (
    <section className="relative h-[583px] overflow-clip bg-white lg:h-[600px]" aria-label="Euler Prime">
      {/* background stack (Figma 1:1819, bottom → top) */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-white" />
        <Image src="/assets/prime/bg-1.png" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 overflow-hidden">
          {/* bg-2 — h 175.86% at (-4.68, -37.93), w 119.36% */}
          <Image
            src="/assets/prime/bg-2.png"
            alt=""
            width={1670}
            height={942}
            className="absolute max-w-none"
            style={{ left: "-4.68%", top: "-37.93%", width: "119.36%", height: "175.86%" }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(0,0,0) 0%, rgb(0,0,0) 100%), linear-gradient(90deg, rgba(0,0,0,0.2) 24.792%, rgba(0,0,0,0) 54.063%)",
          }}
        />
        <div className="absolute inset-0 overflow-hidden">
          {/* bg-3 — top layer, h 106.74% at (0.02, 0), w 103.32% */}
          <Image
            src="/assets/prime/bg-3.png"
            alt=""
            width={2186}
            height={941}
            priority
            className="absolute max-w-none"
            style={{ left: "0.02%", top: 0, width: "103.32%", height: "106.74%" }}
          />
        </div>
      </div>
      <div aria-hidden className="absolute -left-[205px] -top-[75px] h-[817px] w-[646px] bg-black/20 blur-[102px]" />

      <div className="absolute inset-0 flex flex-col justify-center gap-[14px] px-[20px] lg:w-[636px] lg:gap-[25px] lg:pl-20">
        <Eyebrow label="Euler Prime" dark />
        <h2 className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-1.04px] text-white lg:text-[52px]">
          Get free check-up at your depot with Prime
        </h2>

        {/* features — desktop: flat row [col · dot · col · dot · col] gap 20 (Figma 1:1827–38);
            mobile: stacked inline rows. lg:contents flattens the wrapper on desktop. */}
        <div className="flex w-full max-w-[353px] flex-col gap-1.5 rounded-[5.5px] bg-navy/30 p-2.5 lg:max-w-none lg:flex-row lg:items-center lg:gap-5 lg:rounded-[10px] lg:bg-navy/35 lg:p-5">
          {FEATURES.map((f, i) => (
            <Fragment key={f.value}>
              <div className="flex items-center gap-[5.5px] lg:contents">
                <div className="flex flex-col gap-0 lg:gap-2.5">
                  <span className="whitespace-nowrap font-display text-[14px] font-bold leading-none tracking-[-0.48px] text-[#f3f4f5] lg:text-[24px] lg:leading-[1.15]">
                    {f.value}
                  </span>
                  <span className="hidden text-[16px] leading-normal text-[#ccc] lg:block">{f.label}</span>
                </div>
                <span className="text-[12px] leading-normal text-[#ccc] lg:hidden">{f.label}</span>
                <span aria-hidden className="ml-2 size-[5px] shrink-0 rounded-full bg-white/50 lg:hidden" />
              </div>
              {i < FEATURES.length - 1 && (
                /* separators: 8×8 after the first feature, 9×8 after the second (Figma 1:1832/1:1836) */
                <span
                  aria-hidden
                  className={`hidden rounded-full bg-white/50 lg:block ${i === 0 ? "size-2" : "h-2 w-[9px]"}`}
                />
              )}
            </Fragment>
          ))}
        </div>

        <a
          href="#book-test-drive"
          className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[4px] bg-white px-5 font-display text-[12px] font-semibold leading-none text-navy lg:h-[50.477px] lg:px-6 lg:text-[16px]"
        >
          See Euler Prime
          <Arrow color="navy" />
        </a>
      </div>
    </section>
  );
}
