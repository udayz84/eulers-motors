/* eslint-disable @next/next/no-img-element */

/**
 * About Neo — Figma 4064:14314 (desktop, 1440 × 720) and
 * 4064:16241 (mobile, 393 × 488).
 *
 * Both breakpoints share one composition: a full-bleed NEO scene photo that
 * is only revealed in two windows (the road strip along the bottom and a
 * masked "shard" on the right), the transparent vehicle cut-out layered over
 * it, and a soft white blur that fades the scene out at the bottom. Every
 * window uses the same percentages in both frames, so the layout is defined
 * once in `SceneWindow` and only the frame size changes.
 *
 * Desktop keeps the design's native 1440px canvas; the project's tablet
 * scale-to-fit script (app/layout.tsx) renders it 1:1 between 768–1279px.
 */

import ResponsiveFigmaCanvas from "@/components/sections/ResponsiveFigmaCanvas";

const A = "/assets/neo/";
const ABOUT = `${A}about/`;
const LOGO = `${A}main-image/logo.svg`;
const ARROW = `${A}main-image/arrow.svg`;

const DESCRIPTION =
  "Neo is Euler Motors' EV brand for drivers on the road. Each vehicle is designed for their routes and work to help them earn more.";

const CTA_GRADIENT = {
  desktop:
    "linear-gradient(106.1308085256502deg, rgb(0, 255, 135) 28.559%, rgb(29, 111, 255) 124.97%)",
  mobile:
    "linear-gradient(103.22397754394427deg, rgb(0, 255, 135) 28.559%, rgb(29, 111, 255) 124.97%)",
};

const maskStyle: React.CSSProperties = {
  maskImage: `url("${ABOUT}scene-mask.svg")`,
  maskRepeat: "no-repeat",
  maskSize: "100% 100%",
  WebkitMaskImage: `url("${ABOUT}scene-mask.svg")`,
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskSize: "100% 100%",
};

/**
 * The photo composition, sized entirely in percentages so it reproduces the
 * same crop at 1440 × 720 and at 555.28 × 277.64.
 */
function SceneWindow({ blur }: { blur: number }) {
  return (
    <>
      {/* Photo window — road strip along the bottom edge */}
      <div
        aria-hidden
        className="absolute left-0 top-[75.5967%] h-[24.4033%] w-full overflow-hidden bg-[#d9d9d9]"
        data-node-id="4064:14333"
      >
        <img
          alt=""
          className="absolute left-[0.04%] top-[-365.19%] h-[477.13%] w-[116%] max-w-none"
          src={`${ABOUT}scene.png`}
        />
      </div>

      {/* Photo window — masked shard on the right */}
      <div
        aria-hidden
        className="absolute left-[65.1484%] top-[44.1135%] h-[31.8585%] w-[25.6986%] overflow-hidden"
        data-node-id="4064:14336"
        style={maskStyle}
      >
        <img
          alt=""
          className="absolute left-[-253.35%] top-[-180.91%] h-[365.46%] w-[451.39%] max-w-none"
          src={`${ABOUT}scene.png`}
        />
      </div>

      {/* Transparent vehicle cut-out */}
      <img
        alt=""
        aria-hidden
        className="absolute left-[0.04%] top-[-13.52%] h-[116.43%] w-[116%] max-w-none"
        src={`${ABOUT}vehicles.png`}
      />

      {/* Soft white fade over the bottom of the scene */}
      <div
        aria-hidden
        className="absolute left-[-8.1406%] top-[91.6539%] h-[22.0142%] w-[119.4903%] bg-white"
        style={{ filter: `blur(${blur}px)` }}
      />
    </>
  );
}

function AboutEyebrow({ size }: { size: "desktop" | "mobile" }) {
  const desktop = size === "desktop";
  return (
    <div className={`flex items-center ${desktop ? "gap-[12px]" : "gap-[6px]"}`}>
      <img
        alt=""
        className="block size-[14px]"
        height={14}
        src={LOGO}
        width={14}
      />
      <p
        className={`font-sans leading-[normal] text-[#121212] ${
          desktop ? "text-[16px]" : "text-[12px]"
        }`}
      >
        ABOUT NEO
      </p>
    </div>
  );
}

function AboutButton({ size }: { size: "desktop" | "mobile" }) {
  const desktop = size === "desktop";
  return (
    <a
      className={`flex w-fit items-center justify-center rounded-[4px] outline-offset-2 transition-[filter] hover:brightness-[1.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d6fff] ${
        desktop
          ? "h-[42px] gap-[20px] pl-[24px] pr-[2px]"
          : "gap-[8px] py-[2px] pl-[12px] pr-[2px]"
      }`}
      href="/about"
      style={{ backgroundImage: desktop ? CTA_GRADIENT.desktop : CTA_GRADIENT.mobile }}
      data-node-id={desktop ? "4064:14322" : "4064:16249"}
    >
      <span
        className={`font-display font-semibold leading-none text-white whitespace-nowrap ${
          desktop ? "text-[16px]" : "text-[12px]"
        }`}
      >
        About Neo
      </span>
      <span
        className={`flex flex-col items-center justify-center bg-[#121212] ${
          desktop
            ? "size-[38px] rounded-[2px]"
            : "size-[32px] rounded-[1.684px]"
        }`}
      >
        <span
          className={`relative block shrink-0 ${
            desktop ? "h-[14px] w-[22px]" : "h-[11.789px] w-[18.526px]"
          }`}
        >
          <span className="absolute inset-[-16.4%_-1.68%_-22.89%_-3.41%]">
            <img alt="" className="block size-full max-w-none" src={ARROW} />
          </span>
        </span>
      </span>
    </a>
  );
}

export function NeoAbout() {
  return (
    <section aria-label="About Neo" className="w-full bg-white">
      <ResponsiveFigmaCanvas>
      <div
        className="relative mx-auto h-[720px] w-full max-w-[1440px] overflow-hidden bg-white"
        data-node-id="4064:14314"
        data-name="Background Image"
      >
        <div className="pointer-events-none absolute inset-0">
          <SceneWindow blur={31.8} />
        </div>

        <div
          className="absolute left-[80px] top-[62px] z-10 flex w-[636px] flex-col gap-[14px]"
          data-node-id="4064:14315"
        >
          <AboutEyebrow size="desktop" />
          <h2
            className="font-display text-[42px] font-semibold leading-[1.15] tracking-[-0.84px] text-[#121212]"
            data-node-id="4064:14320"
          >
            Built around
            <br />
            real drives.
          </h2>
          <p
            className="w-[368.4px] font-sans text-[16px] leading-[normal] text-[#121212]"
            data-node-id="4064:14321"
          >
            {DESCRIPTION}
          </p>
          <AboutButton size="desktop" />
        </div>
      </div>
      </ResponsiveFigmaCanvas>
    </section>
  );
}

export function NeoAboutMobile() {
  return (
    <section
      aria-label="About Neo"
      className="relative overflow-hidden bg-white pt-[42px]"
      data-node-id="4064:16241"
      data-name="banner"
    >
      <div
        className="relative z-10 mx-auto flex w-full max-w-[393px] flex-col items-start gap-[14px] px-5 min-[640px]:max-[1023px]:max-w-[760px] min-[640px]:max-[1023px]:px-8"
        data-node-id="4064:16242"
      >
        <AboutEyebrow size="mobile" />
        <h2
          className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-[#121212] min-[640px]:max-[1023px]:text-[36px] min-[640px]:max-[1023px]:tracking-[-0.72px]"
          data-node-id="4064:16247"
        >
          Built around real drives.
        </h2>
        <p
          className="w-[325.103px] max-w-full font-sans text-[12px] leading-[normal] text-[#121212] min-[640px]:max-[1023px]:w-full min-[640px]:max-[1023px]:max-w-[650px] min-[640px]:max-[1023px]:text-[14px]"
          data-node-id="4064:16248"
        >
          {DESCRIPTION}
        </p>
        <AboutButton size="mobile" />
      </div>

      {/* 555.28 × 277.64 scene frame (x −144.64), pulled 21px up under the CTA.
          Height must stay 70.6465vw: the scene inside is sized in percentages
          that only keep their 2:1 design aspect when the frame scales with vw. */}
      <div aria-hidden className="relative z-0 -mt-[21px] h-[70.6465vw] w-full">
        <div className="absolute left-[-36.8042%] top-0 h-full w-[141.2934%] overflow-hidden">
          <SceneWindow blur={12.262} />
        </div>
      </div>

      <div aria-hidden className="h-[15px]" />
    </section>
  );
}

export default NeoAbout;
