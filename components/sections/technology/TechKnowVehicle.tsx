import Eyebrow from "@/components/ui/Eyebrow";

const A = "/assets/technology-page";

type ChipKind = "plain" | "cropped" | "blurred";

const CHIPS: {
  label: string;
  icon: string;
  active: boolean;
  kind: ChipKind;
}[] = [
  { label: "Motor", icon: `${A}/kv__imgChatGpt2.png`, active: true, kind: "plain" },
  { label: "Battery", icon: `${A}/kv__imgChatGpt3.png`, active: false, kind: "cropped" },
  { label: "Charging", icon: `${A}/kv__imgChatGpt4.png`, active: false, kind: "blurred" },
  { label: "Motor", icon: `${A}/kv__imgChatGpt2.png`, active: false, kind: "plain" },
  { label: "Battery", icon: `${A}/kv__imgChatGpt3.png`, active: false, kind: "plain" },
  { label: "Charging", icon: `${A}/kv__imgChatGpt4.png`, active: false, kind: "blurred" },
];

const DETAIL = [
  { label: "WHAT IS IT", body: "A motor that makes its pulling power from zero, with no gearbox." },
  { label: "WHY DOES IT MATTER", body: "City work is stop and start all day, with weight on board." },
  {
    label: "WHAT IT MEANS FOR YOUR BUSINESS",
    body: "Up a flyover loaded, without dropping a trip from the route.",
    accent: true,
  },
];

function Chip({ label, icon, active, kind }: (typeof CHIPS)[number]) {
  if (active) {
    return (
      <div
        className="flex w-[113px] shrink-0 flex-col items-center justify-center gap-3 rounded-[6px] border border-[#256dec] px-4 py-[6px]"
        style={{
          backgroundImage:
            "linear-gradient(-30.732deg,#0e2f6d 10.379%,#1d6fff 90.974%), linear-gradient(90deg,#121212 0%,#121212 100%)",
        }}
      >
        <img src={icon} alt="" className="size-[52px] shrink-0 object-cover" />
        <p className="w-full text-center text-[12px] font-bold leading-normal text-white">{label}</p>
      </div>
    );
  }

  const cell =
    "relative w-[113px] shrink-0 rounded-[6px] border border-[rgba(204,204,204,0.12)] bg-[#121212] px-4 opacity-80";

  const glow = (
    /* soft glow behind the icon (Figma Ellipse 3429) */
    <div className="pointer-events-none absolute left-[33.77px] top-[31.44px] h-[31.73px] w-[25.076px]">
      <div className="absolute inset-[-137.09%_-173.47%]">
        <img src={`${A}/kv__imgEllipse3429.svg`} alt="" className="block size-full max-w-none" />
      </div>
    </div>
  );

  if (kind === "cropped") {
    return (
      <div className={`${cell} flex flex-col items-center justify-between pb-1.5 pt-3`}>
        {glow}
        <div className="relative h-[46.886px] w-[71.23px] shrink-0 overflow-hidden opacity-50">
          <img src={icon} alt="" className="absolute left-[0.63%] top-0 h-full w-[98.73%] max-w-none" />
        </div>
        <p className="w-full text-center text-[12px] font-bold leading-normal text-[#ccc] opacity-50">{label}</p>
      </div>
    );
  }

  if (kind === "blurred") {
    return (
      <div className={`${cell} flex flex-col items-center justify-end gap-3 overflow-clip py-1.5`}>
        {glow}
        <p className="w-full text-center text-[12px] font-bold leading-normal text-[#ccc] opacity-50">{label}</p>
        <div className="absolute left-[26.46px] top-[14.51px] flex h-[87.57px] w-[72.857px] items-center justify-center">
          <div className="flex-none rotate-[-19.47deg]">
            <div className="relative h-[74.926px] w-[50.783px] overflow-hidden opacity-50">
              <img src={icon} alt="" className="absolute left-0 top-[-6.78%] h-[108.02%] w-full max-w-none" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${cell} flex flex-col items-center gap-3 py-1.5`}>
      {glow}
      <div className="relative size-[52px] shrink-0 opacity-50">
        <img src={icon} alt="" className="absolute inset-0 size-full max-w-none object-cover" />
      </div>
      <p className="w-full text-center text-[12px] font-bold leading-normal text-[#ccc] opacity-50">{label}</p>
    </div>
  );
}

/** TECHNOLOGY page — "The parts / Know Your Vehicle Better" (Figma 3006:10290, 393×743). */
export default function TechKnowVehicle() {
  return (
    <section className="bg-[#041231]" aria-label="Know your vehicle better">
      <div className="relative mx-auto h-[743px] w-full max-w-[393px] overflow-clip">
        <div className="absolute left-[19.49px] right-[20.51px] top-[42.06px] flex flex-col items-start gap-[14px]">
          <Eyebrow label="The parts" dark />
          <h2 className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white">
            Know Your Vehicle Better
          </h2>
          <p className="w-[305.008px] font-sans text-[12px] font-normal leading-normal text-white">
            Understand what each key part does and how it helps you on every trip.
          </p>
        </div>

        {/* vehicle diagram + motor leader line */}
        <div className="absolute left-[66.34px] top-[158.08px] h-[187.669px] w-[306.156px] mix-blend-lighten">
          <img src={`${A}/kv__imgChatGpt1.png`} alt="" className="absolute inset-0 size-full max-w-none object-cover" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 91.376 142.44, rgba(4,18,49,0) 0%, rgba(4,18,49,1) 95.733%)",
              opacity: 0.2,
            }}
          />
        </div>
        <p className="absolute left-[46.35px] top-[220.06px] -translate-x-1/2 whitespace-nowrap text-center text-[12px] font-bold leading-normal text-white">
          Motor
        </p>
        <div className="absolute left-[46.35px] top-[237.64px] h-[60.066px] w-[91.288px]">
          <img src={`${A}/kv__imgVector174.svg`} alt="" className="absolute inset-0 size-full max-w-none" />
        </div>

        {/* part chips — Motor active (row scrolls horizontally) */}
        <div className="no-scrollbar absolute left-0 top-[335.06px] flex w-full items-stretch gap-2 overflow-x-auto pl-[19.99px] pr-5">
          {CHIPS.map((chip, i) => (
            <Chip key={`${chip.label}-${i}`} {...chip} />
          ))}
        </div>

        {/* part detail */}
        <div className="absolute left-1/2 top-[441.06px] w-[353px] -translate-x-1/2 rounded-[8px] border border-[rgba(204,204,204,0.12)] bg-[linear-gradient(180deg,rgba(18,18,18,0.2)_41.677%,rgba(0,0,0,0.2)_100%)] p-3">
          <div className="flex flex-col items-start gap-5">
            <p className="w-full font-display text-[18px] font-semibold leading-[1.15] tracking-[-0.36px] text-white">
              Full loads, from standstill.
            </p>
            <div className="flex w-full flex-col items-start gap-1.5">
              {DETAIL.map((d) => (
                <div key={d.label} className="flex w-full flex-col items-start gap-2 rounded-[8px] bg-black p-3">
                  <p
                    className="text-[12px] font-bold leading-[1.15] tracking-[-0.24px]"
                    style={{ color: d.accent ? "#1d6fff" : "#ccc" }}
                  >
                    {d.label}
                  </p>
                  <p className="w-full text-[12px] leading-[1.4] tracking-[-0.24px] text-[#ccc] opacity-80">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
