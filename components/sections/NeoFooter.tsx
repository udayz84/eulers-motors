"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ASSETS = "/assets/neo/footer/";

const FOOTER_COLUMNS = [
  {
    title: "Neo by Euler VEHICLES",
    links: ["HiRange", "HiCity"],
    nodeId: "4064:14581",
    mobileNodeId: "4064:16451",
  },
  {
    title: "Euler MOTOR VEHICLES",
    links: ["Storm EV LongRange 200", "Storm EV T1500", "HiLoad EV", "Turbo EV 1000"],
    nodeId: "4064:14586",
    mobileNodeId: "4064:16460",
  },
  {
    title: "Support",
    links: ["Dealer Locator", "Service Centres", "Charging Stations Locator", "Downloads"],
    nodeId: "4064:14593",
    mobileNodeId: "4064:16464",
  },
  { title: "Resources", links: ["Blogs", "In press"], nodeId: "4064:14600", mobileNodeId: "4064:16468" },
  { title: "Company", links: ["About us", "Careers", "Sitemap"], nodeId: "4064:14605", mobileNodeId: "4064:16472" },
  {
    title: "Legal",
    links: ["Privacy policy", "Terms and conditions", "Cookie policy", "Refund policy"],
    nodeId: "4064:14611",
    mobileNodeId: "4064:16476",
  },
] as const;

const FOOTER_HREFS: Record<string, string> = {
  HiRange: "/products/neo-hirange",
  HiCity: "/products/neo-hicity",
  "Storm EV LongRange 200": "/lr200",
  "Storm EV T1500": "/storm-ev-t1500",
  "HiLoad EV": "/hiload",
  "Turbo EV 1000": "/turbo",
  "Dealer Locator": "/dealer-locator",
  "Service Centres": "/service-centers",
  "Charging Stations Locator": "/charging-stations",
  Blogs: "/insights",
  "In press": "/in-press",
  "About us": "/about",
  Careers: "/careers",
  Sitemap: "/sitemap.xml",
  "Privacy policy": "/privacy-policy",
  "Terms and conditions": "/terms-conditions",
  "Refund policy": "/refund-policy",
};

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    src: `${ASSETS}instagram.svg`,
    href: "https://www.instagram.com/eulermotors/",
    width: 15.75,
    height: 15.75,
    flip: true,
  },
  {
    name: "LinkedIn",
    src: `${ASSETS}linkedin.svg`,
    href: "https://www.linkedin.com/company/euler-motors/",
    width: 15.75,
    height: 15.75,
    flip: true,
  },
  {
    name: "YouTube",
    src: `${ASSETS}youtube.svg`,
    href: "https://www.youtube.com/c/EulerMotors",
    width: 16.5003,
    height: 14.25,
    flip: true,
  },
  {
    name: "X",
    src: `${ASSETS}x.svg`,
    href: "https://twitter.com/Euler_Motors",
    width: 15,
    height: 15,
    flip: false,
  },
] as const;

function getFooterHref(label: string) {
  return FOOTER_HREFS[label] ?? "/products";
}

function NeoLogo({ mobile = false }: { mobile?: boolean }) {
  return (
    <Link href="/neo" aria-label="NEO by Euler home" className="block h-[42px] w-[150.263px] shrink-0">
      <span className="relative block h-full w-full overflow-hidden">
        <Image
          src={`${ASSETS}${mobile ? "mobile-logo.png" : "desktop-logo.png"}`}
          alt="NEO by Euler"
          width={335}
          height={597}
          priority={false}
          className="absolute left-0 top-[-268.34%] h-[637.58%] w-full max-w-none"
        />
      </span>
    </Link>
  );
}

function SocialLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav
      aria-label="Social media"
      className={`flex items-center gap-[20px] ${mobile ? "" : "shrink-0"}`}
      data-node-id={mobile ? "4064:16440" : "4064:14571"}
    >
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className="flex size-[38px] items-center justify-center overflow-hidden rounded-[6.653px] bg-[rgba(51,51,51,0.5)] transition-opacity hover:opacity-80"
        >
          <Image
            src={social.src}
            alt=""
            aria-hidden
            width={social.width}
            height={social.height}
            className={social.flip ? "[transform:rotate(180deg)_scaleX(-1)]" : ""}
          />
        </a>
      ))}
    </nav>
  );
}

function CraftedBy({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={`flex items-center gap-[4px] ${mobile ? "justify-center" : "shrink-0"}`}
      data-node-id={mobile ? "4064:16480" : "4064:14552"}
    >
      <span className="whitespace-nowrap font-inter text-[12px] font-normal leading-[1.3] text-white">
        Carefully crafted by
      </span>
      <span className="relative block h-[12px] w-[53.2px] shrink-0" aria-label="3minds">
        <Image
          src={`${ASSETS}crafted-mark-1.svg`}
          alt=""
          aria-hidden
          width={7.91093}
          height={11.1382}
          className="absolute left-0 top-[0.86px]"
        />
        <Image
          src={`${ASSETS}crafted-mark-2.svg`}
          alt=""
          aria-hidden
          width={43.1971}
          height={11.9838}
          className="absolute left-[10px] top-0"
        />
        <Image
          src={`${ASSETS}crafted-mark-dot.svg`}
          alt=""
          aria-hidden
          width={2.37912}
          height={2.60684}
          className="absolute left-[24.09px] top-[0.01px]"
        />
      </span>
    </div>
  );
}

function DesktopLinkColumn({ column }: { column: (typeof FOOTER_COLUMNS)[number] }) {
  return (
    <nav
      aria-label={column.title}
      className="flex flex-col items-start gap-[24px]"
      data-node-id={column.nodeId}
    >
      <h3 className="whitespace-nowrap font-sans text-[16px] font-bold leading-[1.15] tracking-[-0.32px] text-white">
        {column.title}
      </h3>
      <ul className="flex flex-col gap-[12px] font-sans text-[14px] font-normal leading-[normal] text-white">
        {column.links.map((label) => (
          <li key={label}>
            <Link className="hover:underline" href={getFooterHref(label)}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterArt({ mobile = false }: { mobile?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#121212]" />
      <Image
        src={`${ASSETS}${mobile ? "mobile-background.png" : "desktop-background.png"}`}
        alt=""
        aria-hidden
        width={2270}
        height={1461}
        className={
          mobile
            ? "absolute left-[-24.29%] top-[58.01%] h-[37.36%] w-[148.57%] max-w-none object-fill"
            : "absolute left-[0.01%] top-[0.01%] h-[99.97%] w-[99.99%] max-w-none object-fill"
        }
      />
      {mobile ? (
        <>
          <div className="absolute left-1/2 top-[343px] h-[352.443px] w-[1053.379px] -translate-x-1/2 bg-[#121212] blur-[44.6px]" />
          <div className="absolute left-[calc(50%+7.5px)] top-[892.23px] h-[352.443px] w-[1053.379px] -translate-x-1/2 bg-[#121212] blur-[44.6px]" />
        </>
      ) : (
        <>
          <div className="absolute left-[-1709.1px] top-[-401.73px] h-[929.189px] w-[4351.192px] bg-[#121212] blur-[168.25px]" />
          <div className="absolute bottom-[-680px] left-[-1709.1px] h-[929.189px] w-[4351.192px] bg-[#121212] blur-[168.25px]" />
        </>
      )}
    </div>
  );
}

function AccordionChevron({ open }: { open: boolean }) {
  return (
    <span className="relative block h-[4px] w-[9.333px] shrink-0 overflow-visible">
      <Image
        src={`${ASSETS}accordion-${open ? "up" : "down"}.svg`}
        alt=""
        aria-hidden
        width={10.8334}
        height={5.11952}
        className={`absolute left-[-0.75px] top-[-0.37px] ${open ? "" : "rotate-180"}`}
      />
    </span>
  );
}

function MobileAccordion({
  column,
  open,
  onToggle,
}: {
  column: (typeof FOOTER_COLUMNS)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `neo-footer-${column.nodeId.replace(":", "-")}`;

  return (
    <section
      className={`flex w-full flex-col rounded-[8px] bg-[#222] ${open ? "gap-[12px] p-[12px]" : ""}`}
      data-node-id={column.mobileNodeId}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={`flex w-full items-center justify-between text-left ${
          open ? "pr-[8px]" : "py-[12px] pl-[12px] pr-[20px]"
        }`}
      >
        <span
          className={`whitespace-nowrap font-sans text-[14px] leading-[1.15] tracking-[-0.28px] text-white ${
            open ? "font-bold" : "font-medium"
          }`}
        >
          {column.title}
        </span>
        <AccordionChevron open={open} />
      </button>
      {open && (
        <>
          <Image
            src={`${ASSETS}accordion-divider.svg`}
            alt=""
            aria-hidden
            width={329}
            height={0.7}
            className="max-w-full"
          />
          <ul
            id={panelId}
            className="flex flex-col gap-[12px] font-sans text-[12px] font-medium leading-[normal] text-white"
          >
            {column.links.map((label) => (
              <li key={label}>
                <Link className="hover:underline" href={getFooterHref(label)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export function NeoFooterDesktop() {
  return (
    <footer
      aria-label="NEO by Euler footer"
      className="relative h-[927px] w-full overflow-hidden bg-[#121212] text-white"
      data-node-id="4064:14546"
      id="neo-footer-desktop"
    >
      <FooterArt />
      <div
        className="absolute left-1/2 top-[62px] flex w-[calc(100%-40px)] max-w-[1280px] -translate-x-1/2 flex-col gap-[49px]"
        data-node-id="4064:14566"
      >
        <div
          className="flex w-full items-end justify-between gap-8"
          data-node-id="4064:14567"
        >
          <div className="flex w-[570.105px] max-w-full shrink flex-col items-start gap-[24px]">
            <div data-node-id="4064:14569">
              <NeoLogo />
            </div>
            <p className="whitespace-pre-line font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-white" data-node-id="4064:14570">
              {`Electric goods vehicles, \nIndia ke liye. `}
            </p>
          </div>
          <SocialLinks />
        </div>
        <div
          className="flex w-full items-start justify-between gap-5 text-white"
          data-node-id="4064:14580"
        >
          {FOOTER_COLUMNS.map((column) => (
            <DesktopLinkColumn key={column.title} column={column} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-[38.05px] left-1/2 flex w-[calc(100%-40px)] max-w-[1280px] -translate-x-1/2 items-center justify-between">
        <p className="font-sans text-[14px] font-medium leading-[21px] text-white" data-node-id="4064:14551">
          © 2026 Euler Motors. All rights reserved. CIN U34100DL2018PTC000000.
        </p>
        <CraftedBy />
      </div>
    </footer>
  );
}

export function NeoFooterMobile() {
  const [openColumn, setOpenColumn] = useState<string>(FOOTER_COLUMNS[0].title);

  return (
    <footer
      aria-label="NEO by Euler footer"
      className="relative min-h-[1006px] w-full overflow-hidden bg-[#121212] text-white min-[640px]:max-[1023px]:min-h-0 min-[640px]:max-[1023px]:pb-8"
      data-node-id="4064:16433"
      id="neo-footer-mobile"
    >
      <FooterArt mobile />
      <div
        className="relative z-[1] mx-auto flex w-[calc(100%-40px)] max-w-[353px] flex-col gap-[32px] pt-[42px] min-[640px]:max-[1023px]:w-[calc(100%-64px)] min-[640px]:max-[1023px]:max-w-[760px] min-[640px]:max-[1023px]:pt-12"
        data-node-id="4064:16436"
      >
        <div className="flex w-full flex-col items-start gap-[20px]" data-node-id="4064:16437">
          <div data-node-id="4064:16438">
            <NeoLogo mobile />
          </div>
          <p className="whitespace-pre-line font-display text-[20px] font-semibold leading-[1.4] tracking-[-0.4px] text-white" data-node-id="4064:16439">
            {`Electric goods vehicles, \nIndia ke liye.  `}
          </p>
          <SocialLinks mobile />
        </div>
        <div className="flex w-full flex-col gap-[20px]" data-node-id="4064:16449">
          <div className="flex w-full flex-col gap-[12px] min-[640px]:max-[1023px]:grid min-[640px]:max-[1023px]:grid-cols-2 min-[640px]:max-[1023px]:gap-4" data-node-id="4064:16450">
            {FOOTER_COLUMNS.map((column) => (
              <MobileAccordion
                key={column.title}
                column={column}
                open={openColumn === column.title}
                onToggle={() =>
                  setOpenColumn((current) => (current === column.title ? "" : column.title))
                }
              />
            ))}
          </div>
          <div className="flex w-full flex-col justify-center font-sans text-[12px] font-medium leading-[21px] text-white" data-node-id="4064:16479">
            <p>© 2026 Euler Motors. All rights reserved.</p>
            <p>CIN U34100DL2018PTC000000.</p>
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 top-[979px] z-[1] -translate-x-1/2 min-[640px]:max-[1023px]:bottom-6 min-[640px]:max-[1023px]:top-auto">
        <CraftedBy mobile />
      </div>
    </footer>
  );
}
