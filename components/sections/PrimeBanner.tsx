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
 * Full-bleed photo, eyebrow + 52/28px headline, navy glass features panel.
 */
export default function PrimeBanner() {
  return (
    <section className="relative h-[583px] overflow-clip bg-black lg:h-[600px]" aria-label="Euler Prime">
      <Image src="/assets/prime/bg-3.png" alt="" fill sizes="100vw" priority className="object-cover" />
      <Image
        src="/assets/prime/bg-2.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-bottom max-lg:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%), linear-gradient(to right, rgba(0,0,0,0.2) 24.792%, rgba(0,0,0,0) 54.063%)",
          backgroundBlendMode: "multiply",
        }}
      />
      <div aria-hidden className="absolute -left-[205px] -top-[75px] h-[817px] w-[646px] bg-black/20 blur-[102px]" />

      <div className="absolute inset-0 flex flex-col justify-center gap-[14px] px-[20px] lg:w-[636px] lg:gap-[25px] lg:pl-20">
        <Eyebrow label="Euler Prime" dark />
        <h2 className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-1.04px] text-white lg:text-[52px]">
          Get free check-up at your depot with Prime
        </h2>

        {/* features — desktop: one glass row · mobile: stacked rows */}
        <div className="flex w-full max-w-[353px] flex-col gap-1.5 rounded-[5.5px] bg-navy/30 p-2.5 lg:max-w-none lg:flex-row lg:items-center lg:gap-5 lg:rounded-[10px] lg:p-5">
          {FEATURES.map((f, i) => (
            <div key={f.value} className={`flex items-center gap-[5.5px] lg:gap-0 ${i > 0 ? "lg:ml-5" : ""}`}>
              <div className="flex flex-col gap-0 lg:gap-2.5">
                <span className="whitespace-nowrap font-display text-[14px] font-bold leading-none tracking-[-0.48px] text-[#f3f4f5] lg:text-[24px] lg:leading-[1.15]">
                  {f.value}
                </span>
                <span className="hidden text-[16px] leading-normal text-[#ccc] lg:block">{f.label}</span>
              </div>
              <span aria-hidden className="ml-2 size-[5px] shrink-0 rounded-full bg-white/50 lg:hidden" />
              <span className="hidden text-[12px] leading-normal text-[#ccc] lg:hidden">{f.label}</span>
              {i < FEATURES.length - 1 && (
                <span aria-hidden className="hidden size-2 rounded-full bg-white/50 lg:ml-5 lg:block" />
              )}
            </div>
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
