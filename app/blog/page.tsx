import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, formatDate } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — Tips, Stories & Local Flavor",
  description:
    "Guides for eating well, ordering smarter, and growing a home kitchen business in Houston. Halal food, meal plans, healthy eating, and cook resources.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Kitchi Kitchi Blog — Tips, Stories & Local Flavor",
    description:
      "Guides for eating well, ordering smarter, and growing a home kitchen business in Houston.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default function BlogIndex() {
  const all = getAllPosts();
  const [featured, ...rest] = all;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>The Kitchi Kitchi Blog</h1>
          <p>Tips for eating well, ordering smarter, and growing your home kitchen business.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Featured post */}
          <Link href={`/blog/${featured.slug}`} className="blog-feature reveal">
            <div className="blog-feature-media">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                sizes="(max-width: 900px) 100vw, 560px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div className="blog-feature-body">
              <span className="kicker">{featured.category}</span>
              <h2>{featured.title}</h2>
              <p>{featured.description}</p>
              <div className="blog-meta">
                <span>{formatDate(featured.date)}</span><span>{featured.readTime}</span>
              </div>
              <span className="blog-more">Read article →</span>
            </div>
          </Link>

          {/* Rest */}
          <div className="blog-grid" style={{ marginTop: 40 }}>
            {rest.map((p) => (
              <article className="blog-card reveal" key={p.slug}>
                <Link href={`/blog/${p.slug}`} aria-label={p.title}>
                  <div className="blog-media" style={{ position: "relative" }}>
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 360px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </Link>
                <div className="blog-body">
                  <div className="blog-meta"><span>{formatDate(p.date)}</span><span>{p.readTime}</span></div>
                  <h3><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3>
                  <p>{p.description}</p>
                  <Link href={`/blog/${p.slug}`} className="blog-more">Read more →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
