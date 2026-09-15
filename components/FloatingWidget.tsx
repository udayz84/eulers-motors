import Image from "next/image";

const ACTIONS = [
  { icon: "/assets/widget/icon-calculator.svg", label: "Savings Calculator" },
  { icon: "/assets/widget/icon-download.svg", label: "Download Brochure" },
  { icon: "/assets/widget/icon-call.svg", label: "1800-1238-1238" },
];

/**
 * Floating quick-action rail (Figma "Component 31" / mobile instance 1:5205).
 * Black glass rail with circular buttons, rounded on the left side only.
 */
export default function FloatingWidget() {
  return (
    <aside
      aria-label="Quick actions"
      className="fixed right-0 top-[506px] z-40 flex flex-col overflow-clip rounded-l-[32px] bg-black/80 py-1.5 pl-1.5 pr-[42px] max-lg:top-[430px] max-lg:py-1.5 max-lg:pl-1.5 max-lg:pr-10 lg:top-[400px]"
    >
      <div className="flex flex-col gap-2.5 max-lg:gap-2.5">
        {ACTIONS.map((a) => (
          <button
            key={a.label}
            type="button"
            aria-label={a.label}
            className="flex size-[50px] items-center justify-center rounded-full border border-white/10 bg-white/[0.12]"
          >
            <Image src={a.icon} alt="" width={18} height={18} aria-hidden className="size-[16px] lg:size-[18px]" />
          </button>
        ))}
        {/* whatsapp svg button (Figma property1 = Frame 1984081025) */}
        <button type="button" aria-label="Chat on WhatsApp" className="relative size-[50px]">
          <Image src="/assets/widget/icon-whatsapp.svg" alt="" width={50} height={50} className="size-[50px]" />
        </button>
        {/* test drive avatar button */}
        <button
          type="button"
          aria-label="Book a Test Drive"
          className="flex size-[50px] items-center justify-center rounded-full bg-white p-[1.667px]"
        >
          <span className="relative block size-[46.667px] overflow-hidden rounded-[27.5px]">
            <Image src="/assets/widget/avatar.png" alt="" fill sizes="48px" className="object-cover" />
          </span>
        </button>
      </div>
    </aside>
  );
}
