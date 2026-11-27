"use client";

import { useEffect, useRef, type ReactNode } from "react";

const FIGMA_WIDTH = 1440;

/** Keeps a 1440px Figma composition proportional on wider desktop viewports. */
export default function ResponsiveFigmaCanvas({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCanvasScale = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const availableWidth = document.documentElement.clientWidth;
      // On desktop (>=1024px), scale proportionally so the 1440px composition
      // never squishes or misaligns on any viewport width (1280px, 1440px, 1920px+).
      // Note: 768-1279px on tablet has documentElement zoom in app/layout.tsx
      // where clientWidth already reflects 1440px.
      const shouldScale = availableWidth >= 1024;
      const scale = shouldScale ? availableWidth / FIGMA_WIDTH : 1;
      canvas.style.width = `${FIGMA_WIDTH}px`;
      canvas.style.zoom = scale !== 1 ? String(scale) : "1";
    };

    updateCanvasScale();
    window.addEventListener("resize", updateCanvasScale);
    return () => window.removeEventListener("resize", updateCanvasScale);
  }, []);

  return (
    <div ref={canvasRef} className={`mx-auto w-full max-w-[1440px] ${className}`}>
      {children}
    </div>
  );
}
