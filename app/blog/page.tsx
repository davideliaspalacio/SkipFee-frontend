import type { Metadata } from "next";
import Link from "next/link";
import { blogCategories, blogPosts, getBlogUrl, getCategoryLabel } from "@/lib/blog";
import { SITE } from "@/lib/site";

const title = "Blog para restaurantes: WhatsApp, domicilios y ventas directas";
const description =
  "Guías SEO para restaurantes en Colombia: vender por WhatsApp, reducir comisiones de delivery, abrir domicilios directos y recuperar clientes propios.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title, description, url: "/blog", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE.url}/blog#blog`,
  name: title,
  description,
  url: `${SITE.url}/blog`,
  inLanguage: "es-CO",
  publisher: { "@id": `${SITE.url}/#org` },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: getBlogUrl(post.slug),
    datePublished: post.date,
    dateModified: post.updated,
    keywords: post.keywords.join(", "),
  })),
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
  ],
};

function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function BlogPage() {
  const featured = blogPosts.filter((post) => post.featured);
  const rest = blogPosts.filter((post) => !post.featured);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd([jsonLd, breadcrumbLd]) }}
      />
      <main>
        <section className="band blog-hero grid-bg">
          <div className="wrap-wide blog-hero-grid">
            <div className="reveal">
              <div className="kicker">
                <span className="dot" style={{ background: "var(--green)" }} />
                Guías para crecer directo
              </div>
              <h1>Blog para restaurantes que quieren vender directo, cuidar margen y recuperar clientes.</h1>
              <p>
                Contenido práctico para restaurantes en Colombia: WhatsApp, domicilios,
                comisiones, SEO local, operación y recompra. Sin relleno para buscadores:
                guías que tu equipo puede usar.
              </p>
              <div className="blog-hero-actions">
                <Link className="btn btn-primary" href="/pre-registro">
                  Evaluar mi restaurante
                  <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
                <Link className="btn btn-ghost" href="#guias">
                  Ver guías
                </Link>
              </div>
            </div>
            <div className="blog-kpis reveal zoom" aria-label="Temas del blog">
              <div>
                <b>{blogPosts.length}</b>
                <span>guías base</span>
              </div>
              <div>
                <b>4</b>
                <span>líneas SEO</span>
              </div>
              <div>
                <b>es-CO</b>
                <span>Colombia</span>
              </div>
              <div>
                <b>0%</b>
                <span>comisión por pedido</span>
              </div>
            </div>
          </div>
        </section>

        <section className="band tight">
          <div className="wrap-wide">
            <div className="blog-category-strip reveal">
              {blogCategories.map((category) => (
                <a key={category.id} href={`#${category.id}`} className="blog-category">
                  <span>{category.label}</span>
                  <small>{category.description}</small>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="guias" className="band s2">
          <div className="wrap-wide">
            <div className="sec-head reveal">
              <div className="kicker">
                <span className="dot" style={{ background: "var(--green)" }} />
                Lecturas recomendadas
              </div>
              <h2>Empieza por las guías con más intención de compra.</h2>
              <p>
                Organizamos el contenido por problemas reales: vender por WhatsApp,
                bajar comisiones, abrir domicilios directos y construir presencia local.
              </p>
            </div>
            <div className="blog-grid featured">
              {featured.map((post) => (
                <article className="blog-card reveal" key={post.slug}>
                  <Link href={`/blog/${post.slug}`} aria-label={post.title}>
                    <span className="tag">{getCategoryLabel(post.category)}</span>
                    {post.city ? <span className="city-chip">{post.city}</span> : null}
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <small>{post.readTime} · Actualizado {post.updated}</small>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band">
          <div className="wrap-wide blog-sections">
            {blogCategories.map((category) => {
              const posts = blogPosts.filter((post) => post.category === category.id);
              return (
                <div className="blog-section" id={category.id} key={category.id}>
                  <div className="sec-head reveal">
                    <div className="kicker">
                      <span className="dot" style={{ background: "var(--green)" }} />
                      {category.label}
                    </div>
                    <h2>{category.description}</h2>
                  </div>
                  <div className="blog-grid compact">
                    {posts.map((post) => (
                      <article className="blog-card compact reveal" key={`${category.id}-${post.slug}`}>
                        <Link href={`/blog/${post.slug}`}>
                          <span className="tag">{post.intent}</span>
                          <h3>{post.title}</h3>
                          <p>{post.description}</p>
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="band tight">
          <div className="wrap-wide">
            <div className="cta reveal">
              <h2>Convierte el tráfico en pedidos directos.</h2>
              <p>
                El SEO atrae demanda; Skipfee ayuda a cerrarla por WhatsApp, cobrarla
                en línea y llevarla a cocina sin comisión por venta.
              </p>
              <Link className="btn btn-light" href="/pre-registro">
                Quiero vender directo
                <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
