"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type FooterColumn = {
  title: string;
  links: string[];
  openOnMobile: boolean;
};

const COLUMNS: FooterColumn[] = [
  {
    title: "Euler Motors",
    links: ["Storm EV LongRange 200", "Storm EV T1500", "HiLoad EV", "Turbo EV 1000"],
    openOnMobile: true,
  },
  { title: "Neo by Euler", links: ["HiRange", "HiCity"], openOnMobile: false },
  {
    title: "Support",
    links: ["Dealer Locator", "Service Centres", "Charging Stations Locator", "Downloads"],
    openOnMobile: false,
  },
  { title: "Resources", links: ["Blogs", "In press"], openOnMobile: false },
  { title: "Company", links: ["About us", "Careers", "Sitemap"], openOnMobile: false },
  {
    title: "Legal",
    links: ["Privacy policy", "Terms and conditions", "Cookie policy", "Refund policy"],
    openOnMobile: false,
  },
];

const SOCIALS = [
  /* the Figma sources for instagram/youtube are stored flipped and
     displayed with -rotate-180 -scale-x-100 (node 1:2235/39); X is upright */
  {
    icon: "/assets/footer/icon-facebook.svg",
    label: "Facebook",
    href: "https://www.facebook.com/EulerMotors/",
    flip: false,
  },
  {
    icon: "/assets/footer/icon-instagram.svg",
    label: "Instagram",
    href: "https://www.instagram.com/eulermotors/",
    flip: true,
  },
  {
    icon: "/assets/footer/icon-youtube.svg",
    label: "YouTube",
    href: "https://www.youtube.com/c/EulerMotors",
    flip: true,
  },
  {
    icon: "/assets/footer/icon-x.svg",
    label: "X",
    href: "https://twitter.com/Euler_Motors",
    flip: false,
  },
];

function getFooterHref(link: string): string {
  switch (link) {
    case "Dealer Locator":
      return "/dealer-locator";
    case "About us":
      return "/about";
    case "Service Centres":
      return "/service-centers";
    case "Charging Stations Locator":
      return "/charging-stations";
    case "Technology":
      return "/technology";
    default:
      return "/products";
  }
}

/* ------------------------------------------------------------------ *
 * Brand pronunciation — "OY-ler" (eulermotors.com: "The name Euler is
 * often mispronounced. The correct pronunciation is OY-ler, not YOU-ler").
 *
 * The spoken text is "Oiler", not the respelling "oy-ler": "oy-ler" is not
 * in any TTS lexicon, so engines improvise — they spell it out letter by
 * letter ("O Y L E R") or guess "you-ler". "Oiler" is a real English word
 * and an exact homophone of Euler (Wiktionary: /ˈɔɪlər/), so every voice
 * renders it as OY-ler.
 * ------------------------------------------------------------------ */
const PRONUNCIATION = "Oiler";

/* macOS/Chrome ship novelty voices (Albert, Bubbles, Cellos, Wobble, Zarvox…)
   that mangle brand names — never let one speak the logo. */
const NOVELTY_VOICES = new Set([
  "albert", "bahh", "bad news", "bells", "bing bong", "boing", "bubbles", "cellos",
  "elephant", "flo (english (uk))", "flo (english (us))", "fred", "good news",
  "grandma", "grandpa", "hysterical", "jester", "junior", "kathy", "organ",
  "oswald", "pipe organ", "prince hal", "ralph", "reed", "rocko", "sandy",
  "shelley", "superstar", "trinoids", "whisper", "wobble", "zarvox",
]);

/* Natural English voices, best first. Exact/prefix matches win, so a
   browser-specific suffix ("Google US English", "Microsoft Aria (Natural)")
   still resolves to the right family. */
const VOICE_PRIORITY = [
  "samantha", "alex", "ava", "allison", "serena", "karen", "moira", "daniel",
  "google us english", "google uk english female", "microsoft aria", "microsoft jenny",
  "microsoft sonia", "microsoft guy", "microsoft natasha", "aria", "jenny", "sonia",
  "swara", "neerja", "veena", "rishi", "shubham", "tessa", "fiona", "oliver",
];

function scoreVoice(v: SpeechSynthesisVoice): number {
  const name = v.name.toLowerCase();
  const lang = (v.lang || "").toLowerCase().replace("_", "-");
  let score = 0;

  const priority = VOICE_PRIORITY.findIndex((p) => name.includes(p));
  if (priority !== -1) score += 200 - priority;

  if (/natural|enhanced|premium|siri/.test(name)) score += 30;
  if (lang.startsWith("en")) score += 20;
  if (lang === "en-us") score += 10;
  else if (lang === "en-in") score += 8;
  else if (lang === "en-gb") score += 6;

  /* local voices need no network, so they are the safe default */
  if (v.localService) score += 40;

  return score;
}

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices.length) return null;
  const english = voices.filter((v) => (v.lang || "").toLowerCase().startsWith("en"));
  const pool = english.length ? english : voices;
  const usable = pool.filter((v) => !NOVELTY_VOICES.has(v.name.toLowerCase()));
  const candidates = usable.length ? usable : pool;
  return candidates.reduce((best, v) => (scoreVoice(v) > scoreVoice(best) ? v : best));
}

/**
 * Footer (desktop 1:2174 · mobile 1:5128 with accordion link columns).
 */
export default function Footer() {
  const [open, setOpen] = useState<string | null>(COLUMNS[0].title);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  /* bumped on every click so a cancelled utterance never re-speaks itself */
  const speakToken = useRef(0);

  /* The voice list loads asynchronously on Chrome — cache it on mount so
     the very first click already uses the right voice. */
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    const load = () => setVoices(synth.getVoices());
    load();
    synth.addEventListener("voiceschanged", load);
    return () => synth.removeEventListener("voiceschanged", load);
  }, []);

  /* logo + speaker control — click speaks the brand name via the browser's
     built-in TTS (no audio asset needed, works on desktop and mobile) */
  const speakEuler = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    const token = ++speakToken.current;

    /* `withVoice` is dropped on the fallback pass so a voice that turns out
       to be unavailable (network voices offline) still gets spoken by the
       engine's default English voice. */
    const speak = (withVoice: boolean, attempt: number) => {
      if (token !== speakToken.current) return;
      const u = new SpeechSynthesisUtterance(PRONUNCIATION);
      const voice = withVoice ? pickVoice(voices) : null;
      u.voice = voice;
      u.lang = voice ? (voice.lang || "en-US").replace("_", "-") : "en-US";
      u.rate = 0.95;
      u.pitch = 1;
      u.volume = 1;
      u.onerror = (e) => {
        if (token !== speakToken.current || attempt >= 2) return;
        /* Chrome can drop an utterance queued in the same tick as cancel() */
        if (e.error === "canceled" || e.error === "interrupted") {
          window.setTimeout(() => speak(withVoice, attempt + 1), 150);
        } else if (withVoice && (e.error === "voice-unavailable" || e.error === "synthesis-unavailable")) {
          window.setTimeout(() => speak(false, attempt + 1), 150);
        }
      };
      try {
        synth.speak(u);
      } catch {
        /* engine refused the utterance — nothing else to do */
      }
    };

    synth.cancel();
    if (synth.paused) synth.resume();
    speak(true, 0);
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* Play the authentic pronunciation audio file (falls back to TTS if needed) */
  const playEulerAudio = () => {
    if (typeof window === "undefined") return;
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio("/assets/footer/euler-audio.mp3");
      }
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Audio playback failed, falling back to TTS:", err);
          speakEuler();
        });
      }
    } catch {
      speakEuler();
    }
  };

  return (
    <footer className="relative overflow-clip lg:aspect-[1440/927] lg:[background:url('/assets/footer/bg.png')_lightgray_-34.444px_0.375px_/_103.326%_100%_no-repeat]">
      {/* desktop bg is a CSS background on <footer> (Figma 1:2174:
          url(bg.png) lightgray -34.444px 0.375px / 103.326% 100% no-repeat) */}
      {/* mobile bg — whole image scaled to the full width (no crop),
          bottom-anchored; its top cloud/sky edge fades into the white
          background above via a mask */}
      <Image
        src="/assets/footer/bg.png"
        alt=""
        width={1588}
        height={991}
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-0 h-auto w-full max-w-none object-cover lg:hidden max-lg:[mask-image:linear-gradient(to_bottom,transparent,black_22%)] max-lg:[-webkit-mask-image:linear-gradient(to_bottom,transparent,black_22%)]"
        priority={false}
      />
      {/* desktop washes — Figma 1:2176 white 3971×848 at (-1519, -351.73),
          blur 168.25 · Figma 1:2175 black 2509.121×754.59, centered, bottom
          -816.08, blur 102.15 (only its blurred tail rises into the frame) */}
      <div aria-hidden className="absolute left-[-1519px] top-[-351.73px] hidden h-[848px] w-[3971px] bg-white blur-[168.25px] lg:block" />
      <div aria-hidden className="absolute bottom-[-816.08px] left-[calc(50%-77.4px)] hidden h-[754.59px] w-[2509.121px] bg-black/20 blur-[102.15px] lg:block" />
      {/* bright-white fade from the footer top down to the middle of the image */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block lg:[background:linear-gradient(to_bottom,#fff_0%,#fff_38%,rgba(255,255,255,0)_68%)]" />

      {/* Figma 1:2174 — 1440×927 frame; the three content rows (header,
          columns, bottom bar) are w-1280 centered → 80px sides via px-[80px].
          Row anchors: header top 39.12 · links 42.93 below it · bottom bar
          38.05 above the frame bottom. Mobile (1:5128) keeps its own 1006px
          accordion layout */}
      <div className="relative z-10 mx-auto flex min-h-[1006px] max-w-[1440px] flex-col gap-8 px-5 pb-[260px] pt-[42px] lg:h-full lg:min-h-0 lg:gap-0 lg:px-[80px] lg:pb-[38.05px] lg:pt-[32px]">
        {/* header row */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-5 lg:gap-[38px]">
            <button
              type="button"
              onClick={playEulerAudio}
              aria-label="Euler Motors — pronounced &quot;oy-ler&quot;. Play pronunciation"
              className="group flex w-fit cursor-pointer items-center gap-[13.272px] lg:gap-4"
            >
              <Image src="/assets/footer/logo-dark.svg" alt="Euler Motors" width={145} height={24} className="h-[19.9px] w-[120.2px] lg:h-6 lg:w-[144.889px]" />
              <span className="flex items-center gap-1.5 text-[12px] font-medium leading-none text-ink">
                <Image
                  src="/assets/footer/icon-audio.svg"
                  alt=""
                  width={20}
                  height={17}
                  aria-hidden
                  className="h-[15px] w-[17.5px] transition-transform group-hover:scale-110 lg:h-[17.2px] lg:w-[20.1px]"
                />
                <span className="group-hover:underline">pronounced &quot;oy-ler&quot;</span>
              </span>
            </button>
            <p className="whitespace-pre-line font-display text-[20px] font-semibold leading-[1.4] tracking-[-0.4px] text-ink lg:text-[32px] lg:leading-[1.15] lg:tracking-[-0.64px]">
              {`Electric goods vehicles, \nIndia ke liye.  `}
            </p>
          </div>
          <div className="flex items-center gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex size-[38px] items-center justify-center rounded-[6.653px] bg-surface py-[6.4px] transition-transform hover:scale-105 active:scale-95"
              >
                <Image
                  src={s.icon}
                  alt=""
                  width={18}
                  height={18}
                  aria-hidden
                  className={`size-[18px] ${s.flip ? "-rotate-180 -scale-x-100" : ""}`}
                />
              </a>
            ))}
          </div>
        </div>

        {/* link columns — desktop grid / mobile accordion. */}
        <div className="hidden justify-between pt-[28px] lg:flex lg:w-[1280px] lg:items-start">
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-6">
              <h3 className="text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-ink">{col.title}</h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      href={getFooterHref(l)}
                      className="text-[14px] leading-none text-ink hover:underline"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* mobile — Figma 1:5157/1:5189/1:5190: accordion columns, the
            two-line imprint 20px below, crafted-by centered at frame bottom */}
        <div className="flex flex-col gap-5 lg:hidden">
          <div className="flex flex-col gap-3">
            {COLUMNS.map((col) => {
              const isOpen = open === col.title;
              return (
                <div key={col.title} className={`overflow-clip rounded-[8px] bg-surface ${isOpen ? "flex flex-col gap-3 p-3" : ""}`}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : col.title)}
                    className={`flex w-full items-center justify-between ${isOpen ? "pr-[8px]" : "py-[12px] pl-[12px] pr-[20px]"}`}
                  >
                    <span className={`text-[14px] leading-[1.15] tracking-[-0.28px] text-ink ${isOpen ? "font-bold" : "font-medium"}`}>{col.title}</span>
                    {/* Figma 1:5162/1:5172: caret-up glyph, flipped only when closed */}
                    <Image
                      src="/assets/footer/caret-up.svg"
                      alt=""
                      width={10}
                      height={6}
                      aria-hidden
                      className={`h-[4px] w-[9.333px] ${isOpen ? "" : "-scale-y-100"}`}
                    />
                  </button>
                  {isOpen && (
                    <>
                      {/* Line 86 (1:5163): white 0.7px hairline under the open title */}
                      <div aria-hidden className="h-[0.7px] w-full bg-white/80" />
                      <ul className="flex flex-col gap-3">
                        {col.links.map((l) => (
                          <li key={l}>
                            <Link
                              href={getFooterHref(l)}
                              className="text-[12px] font-medium text-ink hover:underline"
                            >
                              {l}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <p className="flex flex-col text-[12px] font-medium leading-[21px] text-ink">
            <span>© 2026 Euler Motors. All rights reserved.</span>
            <span>CIN U34100DL2018PTC000000.</span>
          </p>
        </div>

        {/* bottom bar — desktop row (Figma 1:2174) · mobile crafted-by sits
            centered at the frame bottom instead */}
        <div className="mt-auto hidden lg:flex lg:items-center lg:justify-between">
          <p className="text-[14px] font-medium leading-[21px] text-white">
            © 2026 Euler Motors. All rights reserved. CIN U34100DL2018PTC000000.
          </p>
          <CraftedBy />
        </div>
        <div className="mt-auto flex justify-center pb-3 lg:hidden">
          <CraftedBy />
        </div>
      </div>
    </footer>
  );
}

function CraftedBy() {
  return (
    <div className="flex items-center gap-1">
      <span className="font-inter text-[12px] leading-[1.3] text-white">Carefully crafted by</span>
      <span className="inline-flex items-center">
        <Image src="/assets/footer/crafted-1.svg" alt="" width={8} height={11} aria-hidden className="h-[11px] w-[8px]" />
        <Image src="/assets/footer/crafted-2.svg" alt="" width={43} height={12} aria-hidden className="ml-2.5 h-[12px] w-[43px]" />
      </span>
    </div>
  );
}
