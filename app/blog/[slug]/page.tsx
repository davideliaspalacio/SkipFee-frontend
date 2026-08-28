import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  blogPosts,
  getBlogPost,
  getBlogUrl,
  getCategoryLabel,
  getRelatedPosts,
  type BlogPost,
} from "@/lib/blog";
import { SITE } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: "Equipo Skipfee" }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: ["Equipo Skipfee"],
      siteName: SITE.name,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Bogota",
  }).format(new Date(`${value}T12:00:00-05:00`));
}

function sectionId(index: number): string {
  return `seccion-${index + 1}`;
}

function articleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${getBlogUrl(post.slug)}#article`,
    headline: post.title,
    description: post.description,
    image: `${SITE.url}/opengraph-image`,
    datePublished: post.date,
    dateModified: post.updated,
    inLanguage: "es-CO",
    mainEntityOfPage: getBlogUrl(post.slug),
    keywords: post.keywords.join(", "),
    author: {
      "@type": "Organization",
      name: "Skipfee",
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE.url}/#org`,
      name: "Skipfee",
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/skipfeeIconMain.png`,
      },
    },
    articleSection: getCategoryLabel(post.category),
  };
}

function breadcrumbJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: getBlogUrl(post.slug) },
    ],
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd([articleJsonLd(post), breadcrumbJsonLd(post)]) }}
      />
      <main>
        <article>
          <header className="band article-hero grid-bg">
            <div className="wrap article-head reveal">
              <Link className="article-back" href="/blog">
                Blog
              </Link>
              <div className="kicker">
                <span className="dot" style={{ background: "var(--green)" }} />
                {getCategoryLabel(post.category)}
                {post.city ? <span className="city-chip">{post.city}</span> : null}
              </div>
              <h1>{post.title}</h1>
              <p>{post.description}</p>
              <div className="article-meta" aria-label="Datos del artículo">
                <span>{post.readTime}</span>
                <span>Publicado {formatDate(post.date)}</span>
                <span>Actualizado {formatDate(post.updated)}</span>
              </div>
              <div className="article-promise">{post.heroStat}</div>
            </div>
          </header>

          <section className="band">
            <div className="wrap article-layout">
              <aside className="article-sidebar reveal" aria-label="Índice del artículo">
                <div className="toc">
                  <b>En esta guía</b>
                  {post.sections.map((section, index) => (
                    <a key={section.heading} href={`#${sectionId(index)}`}>
                      {section.heading}
                    </a>
                  ))}
                  {post.checklist ? <a href="#checklist">Checklist</a> : null}
                </div>
                <div className="article-side-cta">
                  <span>¿Quieres verlo en tu restaurante?</span>
                  <Link className="btn btn-primary sm" href="/pre-registro">
                    Pre-registro
                  </Link>
                </div>
              </aside>

              <div className="article-prose reveal">
                <p className="article-intro">{post.excerpt}</p>
                {post.sections.map((section, index) => (
                  <section id={sectionId(index)} key={section.heading}>
                    <h2>{section.heading}</h2>
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.list ? (
                      <ul>
                        {section.list.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                    {section.note ? <p className="article-note">{section.note}</p> : null}
                  </section>
                ))}

                {post.checklist ? (
                  <section id="checklist" className="article-checklist">
                    <h2>Checklist rápido</h2>
                    <ul>
                      {post.checklist.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                ) : null}
              </div>
            </div>
          </section>
        </article>

        <section className="band s2">
          <div className="wrap-wide">
            <div className="sec-head reveal">
              <div className="kicker">
                <span className="dot" style={{ background: "var(--green)" }} />
                Sigue leyendo
              </div>
              <h2>Más guías para vender directo.</h2>
            </div>
            <div className="blog-grid compact">
              {related.map((item) => (
                <article className="blog-card compact reveal" key={item.slug}>
                  <Link href={`/blog/${item.slug}`}>
                    <span className="tag">{getCategoryLabel(item.category)}</span>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band tight">
          <div className="wrap-wide">
            <div className="cta reveal">
              <h2>De guía a pedidos reales.</h2>
              <p>
                Monta tu canal directo por WhatsApp, cobra en línea y maneja cocina,
                rutas y recompra desde un solo panel.
              </p>
              <Link className="btn btn-light" href="/pre-registro">
                Apartar cupo gratis
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
