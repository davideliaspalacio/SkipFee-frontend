import fs from "node:fs";
import path from "node:path";

// Reads a pre-extracted HTML partial (the <main> of each prototype page) at build time.
// Server Components call this so the markup is server-rendered (SSG) → great for SEO.
export function readContent(name: "home" | "clientes" | "negocio" | "precios" | "terminos" | "privacidad"): string {
  return fs.readFileSync(
    path.join(process.cwd(), "content", `${name}.html`),
    "utf8",
  );
}
