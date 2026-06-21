"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/para-tus-clientes", label: "Para tus clientes" },
  { href: "/para-tu-negocio", label: "Para tu negocio" },
  { href: "/precios", label: "Precios" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={open ? "nav open" : "nav"}>
      <div className="wrap-wide nav-in">
        <Link className="brand" href="/" aria-label="Skipfee inicio">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/skipfeeIconMain.png" alt="" width={60} height={60} style={{ display: "block", flex: "none" }} />
          Skip<span className="green">Fee</span>
        </Link>

        <nav className="nav-links" aria-label="Principal">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-cta">
          <Link className="btn btn-ghost sm hide-mob" href="/pre-registro">Pre-registro</Link>
          <Link className="btn btn-primary sm" href="/onboarding">Crea tu tienda</Link>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
