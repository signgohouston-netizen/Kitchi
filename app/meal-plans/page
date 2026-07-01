import type { Metadata } from "next";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { plans, categories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Meal Plans",
  description:
    "Weekly and monthly home-cooked meal plans in Houston. Halal, keto, diabetic-friendly and vegetarian subscriptions delivered fresh.",
  alternates: { canonical: "/meal-plans" },
};

const steps = [
  { h: "Pick your plan & diet", p: "Tell us your preferences — halal, keto, diabetic, vegetarian and more." },
  { h: "We match you with kitchens", p: "Get paired with top-rated home cooks who specialize in your needs." },
  { h: "Fresh meals arrive", p: "Cooked the same day and delivered hot on your chosen schedule." },
  { h: "Adjust anytime", p: "Swap meals, pause, or change kitchens whenever you like." },
];

export default function MealPlans() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Meal Plans Built Around You</h1>
          <p>Fresh, home-cooked meals delivered on a schedule that works for your life — and your diet.</p>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="chips">
            {categories.map((c) => (
              <span className="chip reveal" key={c.name}>
                <span className="ico">{c.icon}</span>
                <span className="name">{c.name}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="kicker">Subscriptions</span>
            <h2>Choose your plan</h2>
            <p>Cancel or switch kitchens anytime. No lock-in, ever.</p>
          </div>
          <div className="plan-grid">
            {plans.map((p) => (
              <div className={"plan reveal" + (p.featured ? " featured" : "")} key={p.name}>
                {p.featured && <span className="badge">Most Popular</span>}
                <h3>{p.name}</h3>
                <div className="price">{p.price}<span>{p.per}</span></div>
                <p className="desc">{p.desc}</p>
                <ul>
                  {p.features.map((f) => (
                    <li key={f}><span className="tick">✓</span> {f}</li>
                  ))}
                </ul>
                <AddToCartButton
                  className={"btn btn-block " + (p.featured ? "btn-primary" : "btn-ghost")}
                  name={p.name + " Plan"}
                  price={p.priceNum}
                  emoji={p.emoji}
                >
                  Start Plan
                </AddToCartButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-head reveal">
            <span className="kicker">Simple by design</span>
            <h2>How meal plans work</h2>
          </div>
          <div className="steps">
            {steps.map((s) => (
              <div className="step reveal" key={s.h}>
                <div className="n"></div>
                <div><h3>{s.h}</h3><p>{s.p}</p></div>
              </div>
            ))}
          </div>
          <div className="cta-row center mt-32">
            <Link href="/contact" className="btn btn-primary">Talk to us about a custom plan</Link>
          </div>
        </div>
      </section>
    </>
  );
}
