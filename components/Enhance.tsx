"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Progressive enhancement for the server-rendered markup: scroll reveals,
// count-up numbers, chart/savings bars, and tabs. Re-runs on every route
// change so client-side navigation re-wires the new page's elements (otherwise
// the new page's `.reveal` items stay hidden until a full reload).
export default function Enhance() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observers: IntersectionObserver[] = [];

    // --- Scroll reveals ---
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      );
      observers.push(io);
      reveals.forEach((el) => {
        if (el.classList.contains("in")) return;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add("in");
        else io.observe(el);
      });
    }

    // --- Count-up numbers ---
    const countUp = (el: HTMLElement) => {
      const to = parseFloat(el.dataset.to || "0") || 0;
      const suffix = el.dataset.suffix || "";
      const prefix = el.dataset.prefix || "";
      const dec = parseInt(el.dataset.decimals || "0", 10);
      if (reduce) {
        el.textContent = prefix + to.toFixed(dec) + suffix;
        return;
      }
      let start: number | null = null;
      const dur = 1400;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + (to * eased).toFixed(dec) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = prefix + to.toFixed(dec) + suffix;
      };
      requestAnimationFrame(step);
    };
    const counts = document.querySelectorAll<HTMLElement>(".count");
    if ("IntersectionObserver" in window && !reduce) {
      const cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              countUp(e.target as HTMLElement);
              cio.unobserve(e.target);
            }
          });
        },
        { threshold: 0.6 },
      );
      observers.push(cio);
      counts.forEach((el) => cio.observe(el));
    } else {
      counts.forEach(countUp);
    }

    // --- Chart bars ---
    const setBars = (c: Element) =>
      c.querySelectorAll<HTMLElement>(".bar").forEach((b) => {
        b.style.height = (b.dataset.h || "60") + "%";
      });
    const charts = document.querySelectorAll<HTMLElement>(".chart");
    if ("IntersectionObserver" in window && !reduce) {
      const chio = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              requestAnimationFrame(() => setBars(e.target));
              chio.unobserve(e.target);
            }
          });
        },
        { threshold: 0.4 },
      );
      observers.push(chio);
      charts.forEach((c) => chio.observe(c));
    } else {
      charts.forEach(setBars);
    }

    // --- Savings bars ---
    const saveBars = document.querySelector(".save-bars");
    if (saveBars) {
      const loss = saveBars.querySelector<HTMLElement>(".save-fill-loss");
      const keep = saveBars.querySelector<HTMLElement>(".save-fill-keep");
      const fillSave = () => {
        if (loss) loss.style.width = "100%";
        if (keep) keep.style.width = "7%";
      };
      if (reduce || !("IntersectionObserver" in window)) {
        fillSave();
      } else {
        const sio = new IntersectionObserver(
          (en) => {
            en.forEach((e) => {
              if (e.isIntersecting) {
                fillSave();
                sio.disconnect();
              }
            });
          },
          { threshold: 0.4 },
        );
        observers.push(sio);
        sio.observe(saveBars);
      }
    }

    // --- Tabs ---
    const tabCleanups: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>("[data-tabs]").forEach((group) => {
      const tabs = group.querySelectorAll<HTMLElement>(".tab");
      const panels = group.querySelectorAll<HTMLElement>(".tab-panel");
      tabs.forEach((tab) => {
        const onClick = () => {
          tabs.forEach((t) => {
            t.classList.remove("is-active");
            t.setAttribute("aria-selected", "false");
          });
          panels.forEach((p) => {
            p.hidden = true;
          });
          tab.classList.add("is-active");
          tab.setAttribute("aria-selected", "true");
          const target = group.querySelector<HTMLElement>(`[data-panel="${tab.dataset.target}"]`);
          if (target) target.hidden = false;
        };
        tab.addEventListener("click", onClick);
        tabCleanups.push(() => tab.removeEventListener("click", onClick));
      });
    });

    return () => {
      observers.forEach((o) => o.disconnect());
      tabCleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
