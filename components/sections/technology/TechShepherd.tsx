import Eyebrow from "@/components/ui/Eyebrow";

const A = "/assets/technology-page";

const FEATURES = [
  { icon: `${A}/shep__imgElements.svg`, title: "Live tracking", body: "Where every vehicle is, updated every ten seconds." },
  { icon: `${A}/shep__imgElements1.svg`, title: "Trip history", body: "Every trip, stop and time on site, per driver." },
  { icon: `${A}/shep__imgElements2.svg`, title: "Charging status", body: "What is charging, how far along, and when it is done." },
  { icon: `${A}/shep__imgElements3.svg`, title: "Vehicle Health & Service", body: "Monitor vehicle health and service reminders in one place." },
  { icon: `${A}/shep__imgElements4.svg`, title: "Remote diagnostics", body: "Fault codes read from your depot, not from a workshop." },
  { icon: `${A}/shep__imgElements5.svg`, title: "Performance reports", body: "Trips, distance, uptime and cost per kilometre." },
];

/** TECHNOLOGY page — "Shepherd app / Manage Everything in One Place" (Figma 3008:10799, 393×663). */
export default function TechShepherd() {
  return (
    <section className="bg-[#f3f4f5]" aria-label="Shepherd app">
      <div className="relative mx-auto h-[663px] w-full max-w-[393px] overflow-clip">
        <div className="absolute left-5 top-[44px] flex w-[353px] flex-col items-start gap-[14px]">
          <Eyebrow label="Shepherd app" />
          <h2 className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink">
            Manage Everything in One Place
          </h2>
          <p className="w-[326.035px] font-sans text-[12px] font-normal leading-normal text-ink">
            Track your vehicles, battery, trips, charging and service updates from one simple
            dashboard.
          </p>
        </div>

        <div className="absolute left-[23px] top-[156.5px] size-[350px]">
          <div className="absolute left-[-66.82px] top-[20.71px] h-[378.772px] w-[459.675px] overflow-hidden rounded-[8px]">
            <img
              src={`${A}/shep__imgImage749.png`}
              alt="Shepherd app dashboard"
              className="absolute left-0 top-[-5.82%] h-[105.79%] w-full max-w-none object-cover"
            />
          </div>
          <div aria-hidden className="absolute left-[-581.19px] top-[294.79px] h-[233.914px] w-[1526.493px] bg-[#f3f4f5] blur-[47.1px]" />
        </div>

        <div className="no-scrollbar absolute left-5 right-0 top-[466px] flex items-center gap-3 overflow-x-auto">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex w-[280px] shrink-0 flex-col items-start gap-2 overflow-clip rounded-[8px] bg-white p-[14px]">
              <div className="flex w-full items-center gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-[4px] bg-[#eff3f8]">
                  <img src={f.icon} alt="" className="size-5 object-contain" />
                </div>
                <p className="whitespace-nowrap text-center text-[16px] font-bold capitalize leading-normal text-ink">{f.title}</p>
              </div>
              <div className="flex w-full items-center justify-center pl-10">
                <p className="min-w-px flex-1 text-[12px] leading-[1.4] text-[rgba(18,18,18,0.8)]">{f.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute left-1/2 top-[585px] flex w-[353px] -translate-x-1/2 items-start gap-2">
          <button
            type="button"
            className="flex h-11 min-w-px flex-1 items-center justify-center gap-2 rounded-[4px] border border-[rgba(18,18,18,0.5)] bg-[#f3f4f5] px-4"
          >
            <span className="whitespace-nowrap font-display text-[12px] font-semibold leading-none text-ink">
              Download the app
            </span>
            <img src={`${A}/shep__imgElements6.svg`} alt="" className="size-4 shrink-0 object-contain" />
          </button>
          <button
            type="button"
            className="flex h-11 min-w-px flex-1 items-center justify-center gap-2 rounded-[4px] bg-[#121212] px-4"
          >
            <span className="whitespace-nowrap font-display text-[12px] font-bold leading-none text-white">
              See how it connects
            </span>
            <img src={`${A}/shep__imgContainer.svg`} alt="" className="h-3 w-[18.857px] shrink-0 object-contain" />
          </button>
        </div>
      </div>
    </section>
  );
}
