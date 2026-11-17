import Image from "next/image";
import TechnologyMobile from "./TechnologyMobile";

const A = "/assets/technology-page/know-your-vehicle";

export default function Technology() {
  return (
    <section id="technology" aria-label="Technology">
    <div className="hidden lg:block">
    <section aria-label="Technology" className="bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 pb-5 pt-[42px] lg:px-20 lg:pb-[42px]">
        <header className="flex w-full flex-col gap-[14px] lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-[14px]">
            <div className="flex items-center gap-1.5 lg:gap-3">
              <Image src={`${A}/vehicle-logo.svg`} alt="" width={14} height={14} />
              <span className="font-sans text-xs leading-normal text-ink lg:text-base">TECHNOLOGY</span>
            </div>
            <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink lg:w-[552px] lg:text-[42px] lg:tracking-[-0.84px]">
              Your vehicle tells you<br className="hidden lg:block" /> what&apos;s happening.
            </h2>
          </div>
          <p className="max-w-[319px] font-sans text-xs leading-normal text-ink lg:max-w-[412px] lg:text-[18px]">
            No manuals, no guessing. Everything you need to know sits on your phone and on your dashboard.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-[1.737fr_1fr] lg:gap-[18px]">
          <div className="relative col-span-2 h-[180px] overflow-hidden rounded-[6px] text-white lg:col-span-1 lg:h-[303px] lg:rounded-lg">
            <Image src={`${A}/vehicle-shepherd-desktop.png`} alt="" width={2400} height={1200} className="absolute left-[-27.67%] top-[-7.73%] h-[116.09%] w-[127.66%] object-cover" />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(155deg,rgba(0,104,177,.82)_0%,rgba(0,111,164,.66)_38%,rgba(0,160,143,.78)_66%,transparent_91%)]" />
            <CardCopy className="left-6 top-6 w-[260px] gap-[10px]" label="SHEPHERD APP" title="Track your vehicle from your phone" description="Live location, battery, trip history and anti-theft alerts." titleWidth="max-w-[213px]" descriptionWidth="max-w-[230px]" />
          </div>

          <div className="relative h-[220px] overflow-hidden rounded-[6px] bg-[#121212] text-white lg:h-[303px] lg:rounded-lg">
            <Glow />
            <CardCopy className="left-6 top-6 w-[260px] gap-[10px]" label="XAVIER™ CLUSTER" title="See speed, charge and distance at a glance" description="See speed, charge and distance at a glance" titleWidth="max-w-[330px]" descriptionWidth="max-w-[206px]" small />
            <Image src={`${A}/vehicle-cluster.png`} alt="Xavier digital vehicle cluster" width={1728} height={928} className="absolute left-[154px] top-[98px] h-[190.782px] w-[397.826px] object-cover" />
          </div>

          <div className="relative h-[220px] overflow-hidden rounded-[6px] bg-[#121212] text-white lg:h-[303px] lg:rounded-lg">
            <Glow reverse />
            <CardCopy className="left-6 top-6 w-[260px] gap-[10px]" label="BUILT FOR OUR ROADS" title={<>0.8mm metal body.<br />13% thicker.</>} description="Hill assist for smoother climbs with heavy loads." titleWidth="max-w-[240px]" descriptionWidth="max-w-[192px]" small />
            <div aria-hidden className="absolute left-[8.23px] top-[73px] h-[288.523px] w-[601.639px] scale-x-[-1]">
              <Image src={`${A}/vehicle-body.png`} alt="" width={1728} height={928} className="absolute left-[7.38%] top-[4.75%] h-full w-[65.88%] object-fill" />
            </div>
          </div>

          <div className="relative col-span-2 h-[180px] overflow-hidden rounded-[6px] text-white lg:col-span-1 lg:h-[303px] lg:rounded-lg">
            <Image src={`${A}/vehicle-charging-desktop.png`} alt="" width={2400} height={1200} className="absolute left-[0.02%] top-[-23.57%] h-[138.68%] w-[99.98%] object-cover" />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(155deg,rgba(0,104,177,.82)_0%,rgba(0,111,164,.66)_38%,rgba(0,160,143,.78)_66%,transparent_91%)]" />
            <CardCopy className="bottom-6 left-6 w-[260px] gap-[10px]" label="BATTERY & CHARGING" title="Charge with a 16-amp socket." description="Charge from zero to full in about 3.5 hours." titleWidth="max-w-[181px]" descriptionWidth="max-w-[196px]" small />
          </div>
        </div>
      </div>
    </section>
    </div>
    <div className="lg:hidden"><TechnologyMobile /></div>
    </section>
  );
}

function CardCopy({
  className,
  label,
  title,
  description,
  titleWidth,
  descriptionWidth,
  small = false,
}: {
  className: string;
  label: string;
  title: React.ReactNode;
  description: string;
  titleWidth: string;
  descriptionWidth: string;
  small?: boolean;
}) {
  return (
    <div className={`absolute z-10 flex flex-col items-start ${className}`}>
      <p className="font-sans text-[10px] font-bold leading-[1.15] tracking-[1px] opacity-80 lg:text-xs lg:tracking-[1.2px]">{label}</p>
      <h3 className={`font-display font-semibold leading-[1.15] text-white ${small ? "text-base tracking-[-0.32px] lg:text-[22px] lg:tracking-[-0.44px]" : "text-base tracking-[-0.32px] lg:text-[22px] lg:tracking-[-0.44px]"} ${titleWidth}`}>{title}</h3>
      <p className={`font-sans text-[11px] leading-normal lg:text-sm ${descriptionWidth}`}>{description}</p>
    </div>
  );
}

function Glow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div aria-hidden className={`absolute inset-0 ${reverse ? "bg-[radial-gradient(ellipse_at_95%_105%,rgba(0,95,162,.64),transparent_57%),radial-gradient(ellipse_at_66%_83%,rgba(0,176,160,.56),transparent_47%)]" : "bg-[radial-gradient(ellipse_at_100%_100%,rgba(0,182,166,.58),transparent_55%),radial-gradient(ellipse_at_72%_60%,rgba(0,94,160,.45),transparent_58%)]"}`} />
  );
}
