"use client";

import { useEffect, useState } from "react";
import ServicePreventiveAdvice from "@/components/sections/ServicePreventiveAdvice";

export default function Preview() {
  const [geom, setGeom] = useState<string>("measuring...");

  useEffect(() => {
    const rect = (el: Element | null) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: +r.x.toFixed(2),
        y: +r.y.toFixed(2),
        w: +r.width.toFixed(2),
        h: +r.height.toFixed(2),
      };
    };
    const lineRects = (el: Element | null) => {
      if (!el) return null;
      const range = document.createRange();
      range.selectNodeContents(el);
      return Array.from(range.getClientRects()).map((r) => ({
        x: +r.x.toFixed(2),
        y: +r.y.toFixed(2),
        w: +r.width.toFixed(2),
        h: +r.height.toFixed(2),
      }));
    };
    const cs = (el: Element | null) => {
      if (!el) return null;
      const c = getComputedStyle(el);
      return {
        ml: c.marginLeft,
        mr: c.marginRight,
        pl: c.paddingLeft,
        w: c.width,
        font: c.fontFamily.split(",")[0],
        size: c.fontSize,
        lh: c.lineHeight,
        ls: c.letterSpacing,
        weight: c.fontWeight,
      };
    };

    const section = document.querySelector("section.preventive-bg");
    const h2 = section?.querySelector("h2") ?? null;
    const eyebrow = h2?.previousElementSibling ?? null;
    const subtitle = h2?.parentElement?.nextElementSibling ?? null;
    const row = document.getElementById("preventive-advice-row");
    const card1 = (row?.children[0] as HTMLElement | undefined) ?? null;

    const g = {
      vw: document.documentElement.clientWidth,
      section: rect(section),
      eyebrow: rect(eyebrow),
      h2: rect(h2),
      h2Lines: lineRects(h2),
      subtitle: rect(subtitle),
      subtitleLines: lineRects(subtitle),
      row: row
        ? { ...rect(row), scrollW: row.scrollWidth, clientW: row.clientWidth }
        : null,
      rowStyle: cs(row),
      card1: rect(card1),
      card1Icon: rect(card1?.querySelector(".relative") ?? null),
      card1H3: rect(card1?.querySelector("h3") ?? null),
      card1H3Lines: lineRects(card1?.querySelector("h3") ?? null),
      card1P: rect(card1?.querySelector("p") ?? null),
      card1PLines: lineRects(card1?.querySelector("p") ?? null),
      h2Style: cs(h2),
      subtitleStyle: cs(subtitle),
      eyebrowStyle: cs(eyebrow),
    };
    setGeom(JSON.stringify(g));
  }, []);

  return (
    <main>
      <ServicePreventiveAdvice />
      <pre
        id="geomdump"
        style={{
          display: "none",
        }}
      >
        {geom}
      </pre>
    </main>
  );
}
