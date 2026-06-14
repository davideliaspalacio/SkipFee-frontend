// Extracts the <main> content + page <style> from each static prototype page,
// rewrites internal links to clean Next.js routes, and writes them under content/.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "..");
const SRC = path.join(ROOT, "landing");
const DST = process.cwd();

const PAGES = [
  { file: "index.html", out: "home" },
  { file: "clientes.html", out: "clientes" },
  { file: "negocio.html", out: "negocio" },
  { file: "precios.html", out: "precios" },
];

const LINKS = {
  './index.html': '/',
  './clientes.html': '/para-tus-clientes',
  './negocio.html': '/para-tu-negocio',
  './precios.html': '/precios',
};

fs.mkdirSync(path.join(DST, "content"), { recursive: true });

let css = "";
const meta = {};

for (const p of PAGES) {
  let html = fs.readFileSync(path.join(SRC, p.file), "utf8");

  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "";
  const desc = (html.match(/<meta name="description" content="([\s\S]*?)"\s*\/?>/) || [])[1] || "";

  const styleM = html.match(/<style>([\s\S]*?)<\/style>/);
  if (styleM) css += `\n/* ===== ${p.out} ===== */\n${styleM[1].trim()}\n`;

  let main = (html.match(/<main>([\s\S]*?)<\/main>/) || [])[1] || "";
  for (const [from, to] of Object.entries(LINKS)) {
    main = main.split(`href="${from}"`).join(`href="${to}"`);
  }

  fs.writeFileSync(path.join(DST, "content", `${p.out}.html`), main.trim() + "\n");
  meta[p.out] = { title, desc };
}

fs.writeFileSync(path.join(DST, "content", "_page-styles.css"), css.trim() + "\n");
fs.writeFileSync(path.join(DST, "content", "_meta.json"), JSON.stringify(meta, null, 2));
console.log("Extracted:", Object.keys(meta).join(", "));
for (const k of Object.keys(meta)) console.log(` - ${k}: "${meta[k].title.slice(0, 60)}…"`);
