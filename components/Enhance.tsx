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
    const cleanups: Array<() => void> = [];

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

    // --- Savings calculator (interactive) ---
    const calc = document.querySelector<HTMLElement>(".panel.calc");
    const calcInput = calc?.querySelector<HTMLInputElement>(".calc-input");
    if (calc && calcInput) {
      const rate = parseFloat(calc.dataset.rate || "4000") || 4000; // COP per USD (approx.)
      const comm = parseFloat(calc.dataset.comm || "0.28") || 0.28; // delivery-app commission
      const planUsd = parseFloat(calc.dataset.planUsd || "99") || 99;
      const planName = calc.dataset.planName || "Negocio";
      const cost = planUsd * rate; // fixed Skipfee cost in COP/month
      const min = parseFloat(calcInput.min) || 0;
      const max = parseFloat(calcInput.max) || 100;

      const fmt = (n: number) => "$" + Math.round(n).toLocaleString("es-CO");
      const fmtM = (n: number) =>
        (n / 1e6).toLocaleString("es-CO", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

      const scope = (calc.closest(".reveal") as HTMLElement | null) || document;
      const q = <T extends HTMLElement>(root: ParentNode, s: string) => root.querySelector<T>(s);
      const revEl = q(calc, ".calc-rev");
      const lossEl = q(calc, ".calc-loss");
      const costEl = q(calc, ".calc-cost");
      const planEl = q(calc, ".calc-plan");
      const lossFill = q<HTMLElement>(calc, ".save-fill-loss");
      const keepFill = q<HTMLElement>(calc, ".save-fill-keep");
      const saveMEl = q(scope, ".calc-save-m");
      const saveYEl = q(scope, ".calc-save-y");
      const sentenceEl = q(scope, ".calc-sentence");

      if (planEl) planEl.textContent = planName;
      if (costEl) costEl.textContent = "−" + fmt(cost);
      if (keepFill) keepFill.style.width = "8%";

      const update = () => {
        const rev = parseFloat(calcInput.value) || 0;
        const loss = rev * comm;
        const save = Math.max(0, loss - cost);
        const pct = max > min ? ((rev - min) / (max - min)) * 100 : 0;
        calcInput.style.background = `linear-gradient(90deg, var(--green) ${pct}%, #e7ece6 ${pct}%)`;
        if (revEl) revEl.textContent = Math.round(rev).toLocaleString("es-CO");
        if (lossEl) lossEl.textContent = "−" + fmt(loss);
        if (saveMEl) saveMEl.textContent = fmtM(save);
        if (saveYEl) saveYEl.textContent = fmtM(save * 12);
        if (lossFill) lossFill.style.width = "100%";
        if (keepFill) keepFill.style.width = Math.max(8, Math.min(100, (cost / loss) * 100)) + "%";
        if (sentenceEl)
          sentenceEl.innerHTML =
            `Vendiendo <b style="color:var(--ink)">${fmt(rev)}/mes</b>, una app de delivery se queda <b style="color:var(--coral)">${fmt(loss)}</b>. ` +
            `Con Skipfee pagas <b style="color:var(--green-ink)">${fmt(cost)}</b> fijos (el plan ${planName}) y te quedan <b style="color:var(--ink)">~$${fmtM(save)} millones</b> más en el bolsillo cada mes.`;
      };
      calcInput.addEventListener("input", update);
      update();
      cleanups.push(() => calcInput.removeEventListener("input", update));
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
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
