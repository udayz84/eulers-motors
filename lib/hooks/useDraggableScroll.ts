"use client";

import { useEffect, useRef, type RefObject } from "react";

interface DraggableOptions {
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

/**
 * Hook to enable smooth click-and-drag scrolling for horizontal containers on desktop/laptop.
 * Native touch scrolling remains 100% untouched.
 */
export function useDraggableScroll<T extends HTMLElement = HTMLDivElement>(
  externalRef?: RefObject<T | null>,
  options?: DraggableOptions
) {
  const localRef = useRef<T>(null);
  const ref = externalRef || localRef;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let hasMoved = false;

    const onMouseDown = (e: MouseEvent) => {
      // Only primary mouse button (left-click)
      if (e.button !== 0) return;

      // Allow clicks on interactive controls without initiating drag
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          "button, a, input, select, textarea, [role='button'], [role='tab']"
        )
      ) {
        return;
      }

      isDown = true;
      hasMoved = false;
      startX = e.pageX;
      scrollStart = el.scrollLeft;
      el.style.scrollBehavior = "auto";
      el.style.userSelect = "none";
      el.classList.add("cursor-grabbing");
      options?.onDragStart?.();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      const walk = e.pageX - startX;
      if (Math.abs(walk) > 4) {
        hasMoved = true;
      }
      el.scrollLeft = scrollStart - walk;
    };

    const onMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      el.style.scrollBehavior = "";
      el.style.userSelect = "";
      el.classList.remove("cursor-grabbing");
      options?.onDragEnd?.();

      if (hasMoved) {
        const preventClick = (clickEvent: MouseEvent) => {
          clickEvent.preventDefault();
          clickEvent.stopPropagation();
          window.removeEventListener("click", preventClick, true);
        };
        window.addEventListener("click", preventClick, true);
      }
    };

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [ref, options]);

  return ref;
}

