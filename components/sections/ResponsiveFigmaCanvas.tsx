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
      const shouldScale = availableWidth > FIGMA_WIDTH;
      canvas.style.width = shouldScale ? `${FIGMA_WIDTH}px` : "100%";
      canvas.style.zoom = shouldScale
        ? String(availableWidth / FIGMA_WIDTH)
        : "1";
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
