"use client";

import Image from "next/image";

const SOCIALS = [
  ["Instagram", "/assets/social/icon-instagram.svg"],
  ["LinkedIn", "/assets/social/icon-linkedin.svg"],
  ["YouTube", "/assets/social/icon-youtube.svg"],
  ["X", "/assets/social/icon-x.svg"],
] as const;

export default function InsightShareButtons() {
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: document.title, url }).catch(() => undefined);
      return;
    }
    await navigator.clipboard?.writeText(url);
  };

  return (
    <div className="flex items-center gap-5" aria-label="Share this article">
      {SOCIALS.map(([label, icon]) => (
        <button
          key={label}
          type="button"
          aria-label={`Share article using ${label}`}
          onClick={share}
          className="flex size-[38px] items-center justify-center rounded-[7px] bg-[#f3f4f5] transition-opacity hover:opacity-75"
        >
          <Image src={icon} alt="" width={18} height={18} />
        </button>
      ))}
    </div>
  );
}
