"use client";

import { useState } from "react";
import Image from "next/image";

const ACTIONS = [
  { icon: "/assets/widget/icon-calculator.svg", label: "Savings Calculator", size: 18 },
  { icon: "/assets/widget/icon-download.svg", label: "Download Brochure", size: 20 },
  { icon: "/assets/widget/icon-call.svg", label: "1800-1238-1238", size: 16 },
  { icon: "/assets/widget/icon-test-drive.svg", label: "Book a Test Drive", size: 20 },
];

/**
 * Floating quick-action rail (Figma "Component 31" 1:2258 — five 50px rows:
 * calculator · download · call · test drive · WhatsApp, uniform 4px gaps).
 * WhatsApp = green logo (image 686) in a white ring, on every breakpoint.
 * Mobile: collapsed by default — chevron toggle + WhatsApp only (rail 1:5427,
 * 116px tall, hanging 29.5px off the right edge); expanding reveals just the
 * four icon buttons — no text labels, no blurred backdrop (per request).
 * Desktop keeps the full rail open (278px) with no toggle or labels.
 * Rendered inside the Hero section, so it only exists while the hero is on
 * screen (Figma places it in the hero frame).
 */
export default function FloatingWidget() {
  const [open, setOpen] = useState(false);

  // desktop: rail hangs 30px off the right edge so its black right pad is
  // cropped (Figma 1:2258 — rail spans x 1372–1470 in the 1440px frame);
  // vertically at 50% — Figma's y=400 of the 800px hero frame — so it stays
  // proportional when the hero scales with viewport width
  return (
    <div className="absolute bottom-[72px] right-[-29.53px] z-40 lg:bottom-auto lg:right-[-30px] lg:top-1/2">
      <div className="relative flex items-end gap-[19px]">
        {/* rail — black glass, rounded on the left only (Figma 1:5427) */}
        <aside
          aria-label="Quick actions"
          className="flex w-[98px] flex-col overflow-clip rounded-l-[32px] bg-black/80 py-[6px] pl-[6px] pr-[42px]"
        >
          {/* expand/collapse toggle — mobile only; chevron flips when open */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="floating-actions"
            aria-label={open ? "Hide quick actions" : "Show quick actions"}
            className="mb-[4px] lg:hidden"
          >
            <Image
              src="/assets/widget/icon-chevron.svg"
              alt=""
              width={50}
              height={50}
              className={`size-[50px] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>

          {/* calculator / brochure / call / test drive — collapsed on mobile, open on desktop */}
          <div
            id="floating-actions"
            className={`flex flex-col gap-[4px] overflow-hidden pb-0 transition-[max-height,padding-bottom,opacity] duration-300 lg:max-h-none lg:overflow-visible lg:pb-[4px] lg:opacity-100 ${open ? "max-h-[220px] pb-[4px] opacity-100" : "max-h-0 pb-0 opacity-0"
              }`}
          >
            {ACTIONS.map((a) => (
              <button
                key={a.label}
                type="button"
                aria-label={a.label}
                className="glass-shine flex size-[50px] items-center justify-center rounded-full bg-white/[0.12] backdrop-blur-[20px]"
              >
                <Image
                  src={a.icon}
                  alt=""
                  width={a.size}
                  height={a.size}
                  aria-hidden
                  style={{ width: a.size, height: a.size }}
                />
              </button>
            ))}
          </div>

          {/* WhatsApp — persistent bottom CTA; green logo in a white ring on all
              breakpoints (Figma 1:2511–12 — image 686 zoomed 123.61%, clipped) */}
          <button
            type="button"
            aria-label="Chat on WhatsApp"
            className="flex size-[50px] shrink-0 items-center justify-center rounded-full bg-white p-[2px]"
          >
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full">
              <Image
                src="/assets/widget/whatsapp.png"
                alt="WhatsApp"
                width={46}
                height={46}
                className="h-full w-full scale-[1.24] object-cover"
              />
            </div>
          </button>
        </aside>
      </div>
    </div>
  );
}
