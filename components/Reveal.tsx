"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Adds the `in` class to any `.reveal` element as it scrolls into view. */
export default function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // The inline script in <head> adds `.js-reveal` before paint. If animations
    // are off (reduced motion / no observer), reveal everything immediately.
    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
