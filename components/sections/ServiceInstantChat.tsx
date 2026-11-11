import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";

const ASSET = "/assets/service-page/";

/* Stacked-chevron arrow glyph — same source/slot as ServiceNextStep
   (mobile 18.857×12 · desktop 22×14). */
function ArrowIcon({ variant }: { variant: "dark" | "white" }) {
  return (
    <span className="relative h-3 w-[18.857px] shrink-0 lg:h-[14px] lg:w-[22px]">
      <Image
        src={`${ASSET}arrow-${variant}.svg`}
        alt=""
        width={23.1195}
        height={19.5}
        aria-hidden="true"
        className="absolute left-[-3.41%] top-[-19.64%] h-[16.7143px] w-[19.8167px] lg:h-[19.5px] lg:w-[23.1195px]"
      />
    </span>
  );
}

/**
 * Instant chat / helpline section — Figma desktop 3354:19621 · mobile 2828:11613.
 * Mobile: 393px frame, 32/20px vertical padding, 20px side padding.
 * Desktop: 1440×558.144 frame, 80px padding, 791px left column and a
 * 315.726px image column. Tablet (768–1279.98) renders the desktop layout
 * scaled to fit by the root zoom script, matching the rest of the site.
 */
export default function ServiceInstantChat() {
  return (
    <section className="relative isolate w-full bg-gradient-to-b from-white from-[18.312%] to-[#d4dbec] to-[38.301%] lg:from-[41.542%] lg:to-[77.639%]">
      {/* Full-width background; content centred & capped at 1440px so it stays responsive */}
      <div className="mx-auto max-w-[1440px] w-full px-5 pt-8 pb-5 sm:px-8 lg:px-20 lg:py-20">
        <div className="flex w-full flex-col items-center lg:flex-row lg:items-center lg:justify-between">
        {/* Left group — mobile: display:contents so the header and banner sit
            in the section column around the image/button; desktop: 791px stack */}
        <div className="contents lg:flex lg:w-[791px] lg:shrink-0 lg:flex-col lg:items-start lg:gap-8">
          {/* Header — mobile 2828:11615 · desktop 3354:19623 */}
          <div className="order-1 mb-[30px] flex w-full flex-col items-center justify-center gap-[14px] lg:order-none lg:mb-0 lg:w-[579.448px] lg:items-start lg:gap-4">
            <Eyebrow label="INSTANT CHAT HELP" />
            <h2 className="w-[279.376px] text-center font-display text-[28px] font-semibold leading-[32px] tracking-[-0.56px] text-[#121212] lg:w-full lg:text-left lg:text-[42px] lg:leading-[48px] lg:tracking-[-0.84px]">
              Need help? WhatsApp Euler.
            </h2>
            <p className="w-full text-center font-sans text-[12px] leading-[16px] text-[#121212] lg:text-left lg:text-[16px] lg:leading-[22px]">
              Get immediate diagnostics support, check your active service booking status, and
              directly text our certified technical desk right from your phone.
            </p>
          </div>

          {/* Customer support banner — mobile 2828:11632 · desktop 3354:19747 */}
          <div
            className="order-4 flex w-[calc(100%+20px)] flex-col items-center overflow-clip rounded-[12px] px-[19px] py-8 lg:order-none lg:w-[791px] lg:items-start lg:px-10 lg:py-8"
            style={{
              /* Figma 2828:11632 / 3354:19747 paint this as
                 `#0e2f6d 63.511% → #1d6fff 87.226%` under a 40% black overlay,
                 but its gradient handles extend far outside the frame, so the
                 converted CSS angle/percentages render as a flat block. These
                 stops reproduce the gradient Figma actually draws across the
                 banner (horizontal, ~#114399 → ~#0c2d67 after the overlay). */
              backgroundImage:
                "linear-gradient(90deg, #114399 0%, #103f90 25%, #0f3982 50%, #0d3375 75%, #0c2d67 100%)",
            }}
          >
            <div className="flex w-full flex-col items-center justify-center gap-[14px] lg:flex-row lg:items-center lg:gap-6">
              <div className="flex w-full flex-col items-center justify-center gap-[14px] lg:w-[414.434px] lg:shrink-0 lg:items-start lg:gap-4">
                <Eyebrow dark label="Customer Support" />
                <p className="w-[214.283px] text-center font-sans text-[16px] capitalize leading-[22px] text-white lg:w-full lg:font-display lg:text-[32px] lg:font-semibold lg:normal-case lg:leading-[38px] lg:tracking-[-0.64px]">
                  Need Emergency assistance right now?
                </p>
              </div>

              <div className="flex flex-col items-center gap-[14px] lg:items-start">
                <div className="hidden flex-col items-center gap-[2px] text-center text-white lg:flex lg:items-start lg:text-left">
                  <p className="font-sans text-[12px] leading-[16px]">Toll-Free Helpline</p>
                  <p className="font-display text-[18px] font-semibold leading-[21px] tracking-[-0.36px]">
                    1800-2128-2128
                  </p>
                </div>

                <p className="whitespace-nowrap font-display text-[28px] font-semibold leading-[34px] tracking-[-0.56px] text-white lg:hidden">
                  1800-2128-2128
                </p>

                <button className="flex h-11 items-center justify-center gap-2 rounded-[4px] bg-white px-5 lg:h-[50.477px] lg:px-6">
                  <span className="whitespace-nowrap font-display text-[12px] font-bold leading-none text-[#0e2f6d] lg:text-[16px] lg:font-semibold">
                    <span className="lg:hidden">Dial Helpline</span>
                    <span className="hidden lg:inline">See Euler Prime</span>
                  </span>
                  <ArrowIcon variant="dark" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right group — image + WhatsApp CTA (desktop 315.726px column) */}
        <div className="contents lg:flex lg:w-[315.726px] lg:shrink-0 lg:flex-col lg:items-center lg:gap-11">
          {/* Figma's 12px #d4dbec ring is an *outside* stroke: the QR keeps its
              full 246.141/304.145 box and the ring overflows it, so it must not
              shrink the image (a CSS border would). */}
          <div className="relative order-2 mb-[30px] size-[246.141px] shrink-0 overflow-hidden rounded-[8px] shadow-[0_0_0_12px_#d4dbec] lg:order-none lg:mb-0 lg:size-[304.145px] lg:rounded-[11.701px]">
            <Image
              src={`${ASSET}instant-chat/whatsapp-chat.png`}
              alt=""
              width={512}
              height={512}
              aria-hidden="true"
              className="absolute inset-0 size-full object-cover"
            />
          </div>

          <button className="order-3 mb-6 flex h-11 shrink-0 items-center justify-center gap-2 rounded-[4px] bg-[#121212] px-5 lg:order-none lg:mb-0 lg:h-[50px] lg:border-[0.5px] lg:border-solid lg:border-white lg:px-6">
            <span className="whitespace-nowrap font-display text-[12px] font-bold leading-none text-white lg:text-[16px] lg:font-semibold">
              Start WhatsApp Chat
            </span>
            <ArrowIcon variant="white" />
          </button>
        </div>
      </div>
      </div>
    </section>
  );
}
