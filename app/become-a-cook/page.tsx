import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/forms";

export const metadata: Metadata = {
  title: "Become a Home Cook",
  description:
    "Turn your cooking into income. Join Houston's home food marketplace, set your own prices, and reach customers near you.",
  alternates: { canonical: "/become-a-cook" },
};

const benefits = [
  { ico: "💲", h: "Set your own prices", p: "You decide your menu and pricing. Keep more of every order with fair, low fees." },
  { ico: "🔍", h: "Get discovered", p: "Reach hungry customers searching for halal, keto, diabetic-friendly and home-style food." },
  { ico: "🗓️", h: "Flexible schedule", p: "Cook when it suits you. Open and close your kitchen with a single tap." },
  { ico: "📦", h: "Delivery handled", p: "Our rider network picks up and delivers, so you can focus on the food." },
  { ico: "📊", h: "Insights & reviews", p: "Track orders, earnings, and customer feedback from one simple dashboard." },
  { ico: "💸", h: "Weekly payouts", p: "Get paid reliably every week — no chasing invoices, no surprises." },
];

const steps = [
  { h: "Apply online", p: "Tell us about your kitchen and the food you make. It takes about 5 minutes." },
  { h: "Get verified", p: "We review your details and food-safety credentials to keep customers safe." },
  { h: "Build your menu", p: "Add dishes, photos, and prices. Set your hours and delivery zones." },
  { h: "Start cooking", p: "Go live, accept orders, and watch your kitchen grow." },
];

export default function BecomeACook() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Turn Your Cooking Into Income</h1>
          <p>Join 500+ home cooks earning on their own terms. Set your prices, build a following, and share the food you love.</p>
          <div className="cta-row center mt-32">
            <Link href="#apply" className="btn btn-white">Apply to cook</Link>
            <Link href="#earnings" className="btn btn-outline-white">See earnings</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="kicker">Why cook with us</span>
            <h2>Built to be vendor-friendly</h2>
            <p>Fair pricing, real support, and tools that help your kitchen grow.</p>
          </div>
          <div className="feature-grid">
            {benefits.map((b) => (
              <div className="feature reveal" key={b.h}>
                <div className="ico">{b.ico}</div>
                <h3>{b.h}</h3>
                <p>{b.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft" id="earnings">
        <div className="container">
          <div className="split">
            <div className="opp-card kitchen reveal">
              <div className="opp-emoji">📈</div>
              <h3>Real earnings, real cooks</h3>
              <p>Our most active kitchens turn weekend cooking into a full-time income.</p>
              <div className="opp-stats">
                <div><div className="num">$2,500+</div><div className="lbl">Avg. monthly earnings</div></div>
                <div><div className="num">500+</div><div className="lbl">Active vendors</div></div>
                <div><div className="num">95%</div><div className="lbl">Cook satisfaction</div></div>
              </div>
              <Link href="#apply" className="btn btn-white">Start earning</Link>
            </div>
            <div className="reveal" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div className="section-head" style={{ textAlign: "left", margin: "0 0 18px" }}>
                <span className="kicker">What you&apos;ll need</span>
                <h2>Getting started is easy</h2>
              </div>
              <div className="prose" style={{ margin: 0 }}>
                <ul>
                  <li>A home kitchen and a passion for cooking</li>
                  <li>Your local food handler / safety certification</li>
                  <li>A few signature dishes to start your menu</li>
                  <li>A smartphone to manage orders</li>
                </ul>
                <p style={{ color: "var(--muted)" }}>
                  Not certified yet? No problem — we&apos;ll guide you through the steps in your area.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="kicker">How it works</span>
            <h2>From application to first order</h2>
          </div>
          <div className="steps">
            {steps.map((s) => (
              <div className="step reveal" key={s.h}>
                <div className="n"></div>
                <div><h3>{s.h}</h3><p>{s.p}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cream" id="apply">
        <div className="container">
          <div className="newsletter reveal" style={{ background: "linear-gradient(150deg,var(--green-dark),var(--green-darker))" }}>
            <h2>Ready to open your kitchen?</h2>
            <p>Drop your email and our vendor team will reach out with next steps.</p>
            <NewsletterForm okMsg="🎉 Application started! We'll email you within 1–2 business days." button="Apply to cook" />
          </div>
        </div>
      </section>
    </>
  );
}
