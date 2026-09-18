import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";

/** Desktop strips (Figma 1:1520 / 1:1552): 8 cards each — the second pass swaps
    the photo cards for icon variants. Photo crop = [left, top, width, height] %
    of the 85.086px window into /assets/compare/truck-side.png. */
type DeskCard = {
  text: string;
  icon?: string;
  photo?: { h: number; crop: [number, number, number, number]; top?: boolean };
};

const WITHOUT_DESK: DeskCard[] = [
  { icon: "/assets/compare/icon-fuel.svg", text: "Diesel cost goes up every month" },
  { photo: { h: 69.534, crop: [-4.16, -110.35, 196.07, 219.26] }, text: "Breakdowns stop your work" },
  { photo: { h: 82, crop: [-108.78, 0, 199.78, 189.44] }, text: "Fewer trips, less earning" },
  { icon: "/assets/compare/icon-swap.svg", text: "No easy way to compare vehicles" },
  { icon: "/assets/compare/icon-fuel.svg", text: "Diesel cost goes up every month" },
  { icon: "/assets/compare/icon-cancel.svg", text: "Breakdowns stop your work" },
  { icon: "/assets/compare/icon-chart-down.svg", text: "Fewer trips, less earning" },
  { icon: "/assets/compare/icon-swap.svg", text: "No easy way to compare vehicles" },
];

const WITH_DESK: DeskCard[] = [
  /* Figma sets explicit line breaks (whitespace-pre-wrap) on the two-line texts */
  { icon: "/assets/compare/icon-cash.svg", text: "Running cost \n₹1.05 per km" },
  { photo: { h: 82, crop: [-117.95, -100, 210.91, 200] }, text: "Service done in \n48 hours" },
  { photo: { h: 82, crop: [0, 0, 210.91, 200], top: true }, text: "More trips, \nmore earning" },
  { icon: "/assets/compare/icon-truck.svg", text: "See your whole fleet on your phone" },
  { icon: "/assets/compare/icon-cash.svg", text: "Running cost \n₹1.05 per km" },
  { icon: "/assets/compare/icon-clock.svg", text: "Service done in \n48 hours" },
  { icon: "/assets/compare/icon-chart-up.svg", text: "More trips, \nmore earning" },
  { icon: "/assets/compare/icon-truck.svg", text: "See your whole fleet on your phone" },
];

const AUDIENCE = ["Fleet owner", "Transport company", "Small business", "Driver", "Dealer"];

/** intrinsic glyph sizes — Figma renders each icon at natural size centered in
    a 24px window (e.g. fuel-station is 21.5×19.5), not stretched to 24×24 */
const ICON_SIZE: Record<string, [number, number]> = {
  "/assets/compare/icon-fuel.svg": [22, 20],
  "/assets/compare/icon-swap.svg": [16, 16],
  "/assets/compare/icon-cancel.svg": [22, 22],
  "/assets/compare/icon-chart-down.svg": [20, 20],
  "/assets/compare/icon-cash.svg": [22, 22],
  "/assets/compare/icon-truck.svg": [20, 20],
  "/assets/compare/icon-clock.svg": [22, 22],
  "/assets/compare/icon-chart-up.svg": [22, 18],
};

/**
 * "What changes when you switch?" (desktop 1:1498 · mobile 1:4703).
 * Split Without/With Euler carousels over a navy→blue gradient.
 */
export default function CompareSection() {
  return (
    <section
      className="relative overflow-clip"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.4) 100%), linear-gradient(-87.02deg, #0E2F6D 63.511%, #1D6FFF 87.226%), linear-gradient(90deg, #E9EDF3 0%, #E9EDF3 100%)",
      }}
      aria-label="Why Euler"
    >
      {/* ── mobile: composed Figma 1:4703 frame (393×612) — title block at
          y31.3 · flat visual render (1:4704) at y94 · Neo promo at y459 ── */}
      <div className="relative mx-auto h-[612px] w-full max-w-[393px] lg:hidden">
        {/* title container — (19.32, 31.3), gap 14, pills h-32 (1:4753) */}
        <div className="absolute inset-x-[19.32px] top-[31.3px] z-10 flex flex-col items-center gap-[14px]">
          <Eyebrow label="Why Euler" dark />
          <h2 className="w-[310.678px] text-center font-display text-[28px] font-semibold leading-[normal] tracking-[-0.56px] text-white">
            What changes when you switch?
          </h2>
          <div className="snap-row -mx-[19.32px] w-auto justify-start gap-3 px-[19.32px]">
            {AUDIENCE.map((a, i) => (
              <span
                key={a}
                className={`flex h-[32px] shrink-0 items-center justify-center whitespace-nowrap rounded-[24.381px] px-[14px] font-display text-[12px] font-semibold leading-none ${
                  i === 0
                    ? "border-[0.641px] border-[rgba(18,18,18,0.5)] border-solid bg-white text-ink"
                    : "border-[0.762px] border-solid border-white/10 bg-black text-white backdrop-blur-[7.619px]"
                }`}
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* visual — exact render of the composed frame 1:4704 at (0, 94) */}
        <Image
          src="/assets/compare/mobile-top.png"
          alt="Without Euler versus with Euler comparison"
          width={393}
          height={418}
          className="absolute left-0 top-[94px] h-[417.845px] w-full object-cover"
        />

        {/* Neo promo — (20, 459) 353×133, r8, p16, stacked centered (1:4771) */}
        <div className="absolute left-1/2 top-[459px] z-10 flex w-[353px] max-w-[calc(100%-40px)] -translate-x-1/2 flex-col items-center gap-[14px] overflow-clip rounded-lg p-4">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(241.11deg, #0E2F6D 138.16%, #1D6FFF 87.019%), linear-gradient(164.22deg, #0E2F6D 0%, #114399 71.429%)",
            }}
          />
          <Image
            src="/assets/compare/neo-promo-bg.png"
            alt=""
            fill
            sizes="353px"
            aria-hidden
            className="object-cover opacity-20"
          />
          <div className="relative flex flex-col items-center gap-0.5 whitespace-nowrap text-center">
            <p className="text-[18px] font-semibold leading-[1.25] tracking-[-0.27px] text-white">
              Which vehicle fits your work?
            </p>
            <p className="text-[12px] font-normal leading-[1.5] text-on-dark-2">
              Sirf 5 questions, 30 seconds. No phone number needed.
            </p>
          </div>
          <Button variant="dark" arrow="white" className="relative">
            Take the 30 second test
          </Button>
        </div>
      </div>

      {/* decorative truck outlines + concentric rings (desktop) — Figma 1:1499 / 1:1585.
          Anchored to the centered 1440px design grid, not the viewport edge, so the
          ovals stay aligned with the content on screens wider than 1440. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="relative mx-auto h-full w-full max-w-[1440px]">
          <Image
            src="/assets/compare/truck-outline.svg"
            alt=""
            width={544}
            height={907}
            className="absolute left-[720px] top-[-45px]"
          />
          <Image
            src="/assets/compare/truck-big.svg"
            alt=""
            width={226}
            height={938}
            className="absolute left-[720px] top-[50px]"
          />
        </div>
      </div>

      {/* header — desktop only; the mobile frame 1:4703 has its own title block */}
      <div className="relative mx-auto hidden w-full max-w-[1360px] flex-col items-center gap-[24px] px-5 pt-[62px] lg:flex">
        <div className="flex flex-col items-center gap-4">
          <Eyebrow label="Why Euler" dark />
          <h2 className="text-center font-display text-[42px] font-semibold leading-[normal] tracking-[-0.84px] text-white">
            What changes when you switch?
          </h2>
        </div>
        <div className="snap-row gap-3" role="tablist" aria-label="Audience">
          {AUDIENCE.map((a, i) => (
            <span
              key={a}
              role="tab"
              aria-selected={i === 0}
              className={`flex h-[42px] items-center justify-center whitespace-nowrap rounded-[32px] px-6 font-display text-[16px] font-semibold leading-none ${
                i === 0
                  ? "border-[0.841px] border-[rgba(18,18,18,0.5)] border-solid bg-white text-ink"
                  : "border border-white/10 bg-black text-white backdrop-blur-[10px]"
              }`}
            >
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* ── desktop strips — full-bleed across the whole screen (per review), cards
            keep the Figma 1:1520/1:1552 look: static cropped rows, not a marquee.
            Left half "Without" (80% opacity), right half "With", split at the
            section's centre line like the design's 720/740 split. */}
      <div className="absolute left-0 top-[371px] hidden h-[220px] w-1/2 overflow-clip opacity-80 lg:block">
        <div className="absolute left-[-210.08px] top-0 flex h-[220px] gap-[42px]">
          {WITHOUT_DESK.map((c, i) => (
            <DeskCardView key={i} c={c} tone="black" chip="red" />
          ))}
        </div>
      </div>
      <div className="absolute left-1/2 top-[371px] hidden h-[220px] w-1/2 overflow-clip lg:block">
        <div className="absolute left-[-231.08px] top-0 flex h-[220px] gap-[42px]">
          {WITH_DESK.map((c, i) => (
            <DeskCardView key={i} c={c} tone="glass" chip="green" />
          ))}
        </div>
      </div>

      {/* ── desktop: exact Figma frame 1:1498 (labels y277.38 · strips y371 ·
            divider y201.57 · promo y679 within the 1440×800 section) ───── */}
      <div className="relative mx-auto hidden h-[585.43px] w-full max-w-[1440px] lg:block">
        {/* labels (y277.38) */}
        <p className="absolute left-[279.47px] top-[62.81px] font-display text-[32px] font-semibold leading-[normal] tracking-[-0.64px] text-[#ccc]">
          Without Euler
        </p>
        <div className="absolute left-[987.92px] top-[62.81px] flex items-center gap-[14px]">
          <p className="font-display text-[32px] font-semibold leading-[normal] tracking-[-0.64px] text-white">With</p>
          <Image
            src="/assets/compare/logo-small.svg"
            alt="Euler"
            width={121}
            height={20}
            className="h-5 w-[120.741px]"
          />
        </div>

        {/* divider Line 93 — (719.92, 201.57), 598.5px tall, on the centre line */}
        <Image
          src="/assets/compare/divider-h.svg"
          alt=""
          width={2}
          height={599}
          aria-hidden
          className="pointer-events-none absolute left-[719.92px] top-[-13px] h-[598.535px] w-px"
        />

        {/* Neo promo — (359,679) 722×91, r16, p20, gap 82 (Figma 1:1587) */}
        <div className="absolute left-[359px] top-[464.43px] flex h-[91px] w-[722px] items-center gap-[82px] overflow-clip rounded-[16px] p-5">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(211.23deg, #0E2F6D 138.16%, #1D6FFF 87.019%), linear-gradient(174.6deg, #0E2F6D 0%, #114399 71.429%)",
            }}
          />
          <Image
            src="/assets/compare/neo-promo-bg.png"
            alt=""
            fill
            sizes="722px"
            aria-hidden
            className="object-cover opacity-20"
          />
          <div className="relative flex flex-col gap-1.5 whitespace-nowrap">
            <p className="text-[20px] font-semibold leading-[1.25] tracking-[-0.3px] text-white">
              Which vehicle fits your work?
            </p>
            <p className="text-[13px] font-normal leading-[1.5] text-on-dark-2">
              Sirf 5 questions, 30 seconds. No phone number needed.
            </p>
          </div>
          <Button variant="dark" arrow="white" className="relative">
            Take the 30 second test
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Desktop card — 291.776×220, r18, p24 (Figma 1:1521–1:1582) */
function DeskCardView({ c, tone, chip }: { c: DeskCard; tone: "black" | "glass"; chip: "red" | "green" }) {
  const photoTop = c.photo?.top;
  const [iconW, iconH] = c.icon ? (ICON_SIZE[c.icon] ?? [24, 24]) : [24, 24];
  return (
    <div
      className={`flex h-[220px] w-[291.776px] shrink-0 flex-col rounded-[18px] p-6 ${
        tone === "black" ? "bg-black" : "bg-white/[0.08]"
      } ${c.photo ? (photoTop ? "justify-between" : "justify-end gap-[18px]") : "justify-between"}`}
    >
      {c.icon && (
        <span
          className={`flex size-[52px] items-center justify-center rounded-[12px] ${
            chip === "red" ? "bg-chip-red/20" : "bg-chip-green/20"
          }`}
        >
          <Image src={c.icon} alt="" width={iconW} height={iconH} aria-hidden />
        </span>
      )}
      {c.photo && (
        /* Without-strip photos render at 80% opacity (Figma 1:1526/1:1529);
           With-strip photos are full opacity (1:1558/1:1562) */
        <span
          className={`relative block w-[85.086px] overflow-hidden ${tone === "black" ? "opacity-80" : ""}`}
          style={{ height: c.photo.h }}
        >
          <Image
            src="/assets/compare/truck-side.png"
            alt=""
            width={170}
            height={140}
            className="absolute max-w-none"
            style={{
              left: `${c.photo.crop[0]}%`,
              top: `${c.photo.crop[1]}%`,
              width: `${c.photo.crop[2]}%`,
              height: `${c.photo.crop[3]}%`,
            }}
          />
        </span>
      )}
      <p className="w-[243.776px] whitespace-pre-line text-[24px] font-bold leading-normal text-white">{c.text}</p>
    </div>
  );
}

/** Mobile card (mobile node 1:4703) — the mobile UI ships as the flat render
    of the composed frame, so no per-card mobile markup is needed. */
