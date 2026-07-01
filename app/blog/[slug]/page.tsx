import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import { SITE, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;

  // BlogPosting structured data so Google can show rich results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  // Breadcrumbs structured data.
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const related = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <article>
        <header className="article-hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link> <span>/</span> <Link href="/blog">Blog</Link>
            </nav>
            <span className="kicker">{post.category}</span>
            <h1>{post.title}</h1>
            <div className="article-meta">
              <span>{post.author}</span>
              <span>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        <div className="container">
          <div className="article-figure">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              sizes="(max-width: 800px) 100vw, 760px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <div className="prose article-prose">
            <p className="lede-text">{post.description}</p>
            {post.body.map((block, i) => {
              if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
              if (block.type === "ul")
                return (
                  <ul key={i}>
                    {block.items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                );
              return <p key={i}>{block.text}</p>;
            })}

            <div className="article-cta">
              <h3>Hungry yet?</h3>
              <p>Browse home cooks and meal plans near you and taste the difference real food makes.</p>
              <div className="cta-row">
                <Link href="/meal-plans" className="btn btn-primary">Explore meal plans</Link>
                <Link href="/" className="btn btn-ghost">Find food near you</Link>
              </div>
            </div>
          </div>

          <aside className="related">
            <h2>Keep reading</h2>
            <div className="blog-grid">
              {related.map((p) => (
                <article className="blog-card" key={p.slug}>
                  <Link href={`/blog/${p.slug}`} aria-label={p.title}>
                    <div className="blog-media" style={{ position: "relative" }}>
                      <Image src={p.image} alt={p.imageAlt} fill sizes="360px" style={{ objectFit: "cover" }} />
                    </div>
                  </Link>
                  <div className="blog-body">
                    <div className="blog-meta"><span>{formatDate(p.date)}</span><span>{p.readTime}</span></div>
                    <h3><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3>
                    <Link href={`/blog/${p.slug}`} className="blog-more">Read more →</Link>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
