import Link from "next/link";
import HeroSearch from "@/components/HeroSearch";
import AddToCartButton from "@/components/AddToCartButton";
import { NewsletterForm } from "@/components/forms";
import Image from "next/image";
import { vendors, categories } from "@/lib/data";
import { getAllPosts, formatDate } from "@/lib/posts";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <span className="eyebrow">🍲 Real kitchens · Real cooks · Real food</span>
          <h1>Houston&apos;s Home Food <span className="accent">Marketplace</span></h1>
          <p className="lede">
            Not fast food. Real food made for you. Discover home cooks, halal kitchens, and meal plans
            crafted by real people in your neighborhood.
          </p>
          <HeroSearch />
          <div className="hero-stats">
            <div><div className="num">500+</div><div className="lbl">Active home cooks</div></div>
            <div><div className="num">30k+</div><div className="lbl">Meals delivered</div></div>
            <div><div className="num">4.8★</div><div className="lbl">Average rating</div></div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="kicker">Browse by need</span>
            <h2>Find food that fits your life</h2>
            <p>From doctor-friendly plates to faith-based kitchens, filter by what matters to you.</p>
          </div>
          <div className="chips">
            {categories.map((c) => (
              <Link href="/meal-plans" className="chip reveal" key={c.name}>
                <span className="ico">{c.icon}</span>
                <span className="name">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why different */}
      <section className="section section-soft">
        <div className="container">
          <div className="section-head reveal">
            <span className="kicker">The difference</span>
            <h2>Why Kitchi Kitchi is different</h2>
            <p>We&apos;re not a fast-food delivery app. We connect people with real kitchens, real cooks, and real food.</p>
          </div>
          <div className="compare">
            <div className="compare-card them reveal">
              <h3>Typical delivery apps</h3>
              <p className="sub">Built for volume, not for you</p>
              <ul className="compare-list">
                <li><span className="mark">✕</span> Reheated, mass-produced restaurant food</li>
                <li><span className="mark">✕</span> High fees that squeeze small vendors</li>
                <li><span className="mark">✕</span> No meal plans or subscriptions</li>
                <li><span className="mark">✕</span> One-size-fits-all menus</li>
                <li><span className="mark">✕</span> Hard to find halal or diet-specific food</li>
              </ul>
            </div>
            <div className="compare-card us reveal">
              <h3>Kitchi Kitchi</h3>
              <p className="sub">Built for real food and real people</p>
              <ul className="compare-list">
                <li><span className="mark">✓</span> Freshly cooked in local home kitchens</li>
                <li><span className="mark">✓</span> Vendor-friendly pricing that&apos;s fair</li>
                <li><span className="mark">✓</span> Weekly &amp; monthly meal plan subscriptions</li>
                <li><span className="mark">✓</span> Personalized for your diet &amp; culture</li>
                <li><span className="mark">✓</span> Halal, diabetic, low-sodium &amp; more</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured vendors */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="kicker">Featured cooks</span>
            <h2>Popular kitchens near you</h2>
            <p>Hand-picked home cooks and local vendors loved by your neighbors.</p>
          </div>
          <div className="vendor-grid">
            {vendors.map((v) => (
              <article className="vendor-card reveal" key={v.name}>
                <div className="vendor-media" style={{ backgroundImage: `url('${v.img}')` }}>
                  <span className="vendor-tag">{v.tag}</span>
                  <span className="vendor-rating"><span className="s">★</span> {v.rating}</span>
                </div>
                <div className="vendor-body">
                  <h3>{v.name}</h3>
                  <p className="vendor-cuisine">{v.cuisine}</p>
                  <div className="vendor-meta">
                    <span>{v.delivery}</span><span>{v.min}</span><span>{v.distance}</span>
                  </div>
                  <AddToCartButton
                    className="btn btn-primary btn-block"
                    name={v.item.name}
                    price={v.item.price}
                    emoji={v.item.emoji}
                  >
                    Order Now
                  </AddToCartButton>
                </div>
              </article>
            ))}
          </div>
          <div className="cta-row center mt-32">
            <Link href="/meal-plans" className="btn btn-ghost">View all kitchens</Link>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="section section-cream">
        <div className="container">
          <div className="split">
            <div className="opp-card kitchen reveal">
              <div className="opp-emoji">👩‍🍳</div>
              <h3>Add Your Kitchen</h3>
              <p>Turn your cooking into income. Reach hungry customers in your area and run your kitchen your way.</p>
              <ul className="opp-features">
                <li><span className="tick">✓</span> Set your own prices and menu</li>
                <li><span className="tick">✓</span> Get discovered by local customers</li>
                <li><span className="tick">✓</span> Cook on a flexible schedule</li>
              </ul>
              <div className="opp-stats">
                <div><div className="num">$2,500+</div><div className="lbl">Avg. monthly earnings</div></div>
                <div><div className="num">500+</div><div className="lbl">Active vendors</div></div>
                <div><div className="num">95%</div><div className="lbl">Satisfaction</div></div>
              </div>
              <Link href="/become-a-cook" className="btn btn-white">Become a Home Cook</Link>
            </div>

            <div className="opp-card rider reveal">
              <div className="opp-emoji">🛵</div>
              <h3>Deliver With Us</h3>
              <p>Earn on your own time. Pick up fresh, home-cooked meals and deliver smiles across Houston.</p>
              <ul className="opp-features">
                <li><span className="tick">✓</span> Competitive pay plus tips</li>
                <li><span className="tick">✓</span> Choose your own hours</li>
                <li><span className="tick">✓</span> Weekly payouts, no waiting</li>
              </ul>
              <div className="opp-stats">
                <div><div className="num">$22/hr</div><div className="lbl">Avg. with tips</div></div>
                <div><div className="num">Weekly</div><div className="lbl">Payouts</div></div>
                <div><div className="num">Flexible</div><div className="lbl">Schedule</div></div>
              </div>
              <Link href="/contact" className="btn btn-white">Become a Rider</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="kicker">From the blog</span>
            <h2>Tips, stories &amp; local flavor</h2>
            <p>Guides for eating well and growing your home kitchen business.</p>
          </div>
          <div className="blog-grid">
            {latestPosts.map((b) => (
              <article className="blog-card reveal" key={b.slug}>
                <Link href={`/blog/${b.slug}`} aria-label={b.title}>
                  <div className="blog-media" style={{ position: "relative" }}>
                    <Image
                      src={b.image}
                      alt={b.imageAlt}
                      fill
                      sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 360px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </Link>
                <div className="blog-body">
                  <div className="blog-meta"><span>{formatDate(b.date)}</span><span>{b.readTime}</span></div>
                  <h3><Link href={`/blog/${b.slug}`}>{b.title}</Link></h3>
                  <p>{b.description}</p>
                  <Link href={`/blog/${b.slug}`} className="blog-more">Read more →</Link>
                </div>
              </article>
            ))}
          </div>
          <div className="cta-row center mt-32">
            <Link href="/blog" className="btn btn-ghost">Visit the blog</Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section">
        <div className="container">
          <div className="newsletter reveal">
            <h2>Get fresh deals in your inbox</h2>
            <p>Join our newsletter for new kitchens, seasonal menus, and member-only offers.</p>
            <NewsletterForm okMsg="🎉 Thanks for subscribing! Check your inbox to confirm." />
          </div>
        </div>
      </section>
    </>
  );
}
