import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";

type Card = { kind: "icon" | "photo"; icon?: string; text: string };

const WITHOUT: Card[] = [
  { kind: "icon", icon: "/assets/compare/icon-fuel.svg", text: "Diesel cost goes up every month" },
  { kind: "photo", text: "Breakdowns stop your work" },
  { kind: "photo", text: "Fewer trips, less earning" },
  { kind: "icon", icon: "/assets/compare/icon-swap.svg", text: "No easy way to compare vehicles" },
];

const WITH: Card[] = [
  { kind: "icon", icon: "/assets/compare/icon-cash.svg", text: "Running cost ₹1.05 per km" },
  { kind: "photo", text: "Service done in 48 hours" },
  { kind: "photo", text: "More trips, more earning" },
  { kind: "icon", icon: "/assets/compare/icon-truck.svg", text: "See your whole fleet on your phone" },
];

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
  { icon: "/assets/compare/icon-cash.svg", text: "Running cost ₹1.05 per km" },
  { photo: { h: 82, crop: [-117.95, -100, 210.91, 200] }, text: "Service done in 48 hours" },
  { photo: { h: 82, crop: [0, 0, 210.91, 200], top: true }, text: "More trips, more earning" },
  { icon: "/assets/compare/icon-truck.svg", text: "See your whole fleet on your phone" },
  { icon: "/assets/compare/icon-cash.svg", text: "Running cost ₹1.05 per km" },
  { icon: "/assets/compare/icon-clock.svg", text: "Service done in 48 hours" },
  { icon: "/assets/compare/icon-chart-up.svg", text: "More trips, more earning" },
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
      className="relative overflow-clip py-10 lg:py-0"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.4) 100%), linear-gradient(-87.02deg, #0E2F6D 63.511%, #1D6FFF 87.226%), linear-gradient(90deg, #E9EDF3 0%, #E9EDF3 100%)",
      }}
      aria-label="Why Euler"
    >
      {/* mobile: exact Figma render of the mobile top visual frame (1:4704) */}
      <div className="relative h-[418px] w-full lg:hidden">
        <Image src="/assets/compare/mobile-top.png" alt="Euler electric truck" fill sizes="100vw" className="object-cover" />
      </div>

      {/* decorative truck outlines (desktop) — Figma 1:1499 / 1:1585 */}
      <Image
        src="/assets/compare/truck-outline.svg"
        alt=""
        width={544}
        height={907}
        aria-hidden
        className="pointer-events-none absolute left-[720px] top-[-45px] hidden lg:block"
      />
      <Image
        src="/assets/compare/truck-big.svg"
        alt=""
        width={226}
        height={938}
        aria-hidden
        className="pointer-events-none absolute left-[720px] top-[50px] hidden lg:block"
      />

      {/* header — Figma 1:1600: eyebrow + 42px title (gap 16) · pills (gap 24) */}
      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center gap-[24px] px-5 pt-2 lg:pt-[62px]">
        <div className="flex flex-col items-center gap-4">
          <Eyebrow label="Why Euler" dark />
          <h2 className="text-center font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.84px] text-white lg:text-[42px] lg:leading-[normal]">
            What changes when you switch?
          </h2>
        </div>
        <div className="snap-row gap-3" role="tablist" aria-label="Audience">
          {AUDIENCE.map((a, i) => (
            <span
              key={a}
              role="tab"
              aria-selected={i === 0}
              className={`flex h-[42px] items-center justify-center whitespace-nowrap rounded-[32px] px-6 font-display text-[12px] font-semibold leading-none lg:text-[16px] ${
                i === 0
                  ? "border border-[rgba(18,18,18,0.5)] bg-white text-ink"
                  : "border border-white/10 bg-black text-white backdrop-blur-[10px]"
              }`}
            >
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* ── mobile: labels + snap carousels ─────────────────────────────── */}
      <div className="lg:hidden">
        <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 pt-[26px]">
          <p className="font-display text-[14px] font-semibold leading-none tracking-[-0.64px] text-white/80">
            Without Euler
          </p>
          <p className="flex items-center gap-2 font-display text-[14px] font-semibold leading-none tracking-[-0.64px] text-white">
            With
            <Image
              src="/assets/compare/logo-small.svg"
              alt="Euler"
              width={121}
              height={20}
              className="h-[16px] w-[120.741px]"
            />
          </p>
        </div>

        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-2 py-3">
          <div className="relative w-full overflow-clip">
            <div className="snap-row gap-[8px] px-5">
              {[...WITHOUT, ...WITHOUT].map((c, i) => (
                <MobileCard key={i} c={c} tone="black" chip="red" />
              ))}
            </div>
          </div>
          <div className="relative w-full overflow-clip">
            <div className="snap-row gap-[8px] px-5">
              {[...WITH, ...WITH].map((c, i) => (
                <MobileCard key={i} c={c} tone="glass" chip="green" />
              ))}
            </div>
          </div>
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

        {/* without strip — (0,371) 720×220, dimmed to 80% (Figma 1:1519) */}
        <div className="absolute left-0 top-[156.43px] h-[220px] w-[720px] overflow-clip opacity-80">
          <div className="absolute left-[-210.08px] top-0 flex h-[220px] gap-[42px]">
            {WITHOUT_DESK.map((c, i) => (
              <DeskCardView key={i} c={c} tone="black" chip="red" />
            ))}
          </div>
        </div>

        {/* divider Line 93 — (719.92, 201.57), 598.5px tall */}
        <Image
          src="/assets/compare/divider-h.svg"
          alt=""
          width={2}
          height={599}
          aria-hidden
          className="pointer-events-none absolute left-[719.92px] top-[-13px] h-[598.535px] w-px"
        />

        {/* with strip — (720,371) 740×220, bleeding past the right edge (Figma 1:1551) */}
        <div className="absolute left-[720px] top-[156.43px] h-[220px] w-[740px] overflow-clip">
          <div className="absolute left-[-231.08px] top-0 flex h-[220px] gap-[42px]">
            {WITH_DESK.map((c, i) => (
              <DeskCardView key={i} c={c} tone="glass" chip="green" />
            ))}
          </div>
        </div>

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
        <span className="relative block w-[85.086px] overflow-hidden" style={{ height: c.photo.h }}>
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
      <p className="w-[243.776px] text-[24px] font-bold leading-normal text-white">{c.text}</p>
    </div>
  );
}

/** Mobile card (mobile node 1:4703) */
function MobileCard({ c, tone, chip }: { c: Card; tone: "black" | "glass"; chip: "red" | "green" }) {
  return (
    <div
      className={`flex h-[102px] w-[136px] flex-col justify-between rounded-xl p-[11px] ${
        tone === "black" ? "bg-black" : "bg-white/[0.08]"
      }`}
    >
      {c.kind === "icon" ? (
        <span
          className={`flex size-8 items-center justify-center rounded-[7.5px] ${
            chip === "red" ? "bg-chip-red/20" : "bg-chip-green/20"
          }`}
        >
          <Image src={c.icon ?? ""} alt="" width={24} height={24} aria-hidden className="size-4" />
        </span>
      ) : (
        <span className={`relative block h-[32px] w-[33px] ${tone === "black" ? "opacity-80" : ""}`}>
          <Image src="/assets/compare/truck-side.png" alt="" fill sizes="90px" className="object-cover" />
        </span>
      )}
      <p className="text-[12px] font-bold leading-tight text-white">{c.text}</p>
    </div>
  );
}
