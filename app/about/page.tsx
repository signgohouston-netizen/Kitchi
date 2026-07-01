import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "We're not a fast-food delivery app. We connect Houston with real kitchens, real cooks, and real food.",
  alternates: { canonical: "/about" },
};

const stats = [
  { num: "500+", lbl: "Home cooks" },
  { num: "30k+", lbl: "Meals delivered" },
  { num: "4.8★", lbl: "Average rating" },
  { num: "95%", lbl: "Satisfaction" },
];

const steps = [
  { h: "Browse local kitchens", p: "Search by cuisine, diet, or distance to find cooks near you." },
  { h: "Order or subscribe", p: "Grab a single meal or set up a weekly or monthly plan." },
  { h: "Cooked fresh", p: "Your cook prepares your food the same day, made to order." },
  { h: "Delivered hot", p: "Our riders bring it straight to your door, fresh and on time." },
];

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Real Kitchens. Real Cooks. Real Food.</h1>
          <p>We&apos;re not a fast-food delivery app. We&apos;re a marketplace built to celebrate the home cooks of Houston.</p>
        </div>
      </section>

      <section className="section">
        <div className="container prose reveal">
          <h2>Our story</h2>
          <p>
            Kitchi Kitchi started with a simple frustration: it&apos;s surprisingly hard to find honest,
            home-cooked food. The big delivery apps are full of the same reheated restaurant menus, high fees,
            and few options for people who eat halal, manage diabetes, or simply want a fresh meal made with care.
          </p>
          <p>
            So we built something different — a marketplace that puts neighborhood cooks first. Today we connect
            Houston families with hundreds of home kitchens, small vendors, and specialty cooks serving food that
            actually means something.
          </p>

          <h2>What we stand for</h2>
          <ul>
            <li><strong>Real food, not fast food.</strong> Every meal is freshly cooked, never mass-produced.</li>
            <li><strong>Fair to vendors.</strong> Low, transparent fees so cooks keep more of what they earn.</li>
            <li><strong>Made for your needs.</strong> Halal, diabetic-friendly, low-sodium, keto, and vegetarian options.</li>
            <li><strong>Community first.</strong> We help local cooks turn their passion into a living.</li>
          </ul>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="hero-stats reveal" style={{ justifyContent: "center", textAlign: "center", gap: 54 }}>
            {stats.map((s) => (
              <div key={s.lbl}>
                <div className="num" style={{ color: "var(--green)", fontSize: "2.4rem", fontFamily: "'Poppins'" }}>{s.num}</div>
                <div className="lbl" style={{ color: "var(--muted)" }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="how">
        <div className="container">
          <div className="section-head reveal">
            <span className="kicker">How it works</span>
            <h2>From kitchen to your door</h2>
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
            <Link href="/meal-plans" className="btn btn-primary">Explore meal plans</Link>
            <Link href="/become-a-cook" className="btn btn-ghost">Become a home cook</Link>
          </div>
        </div>
      </section>
    </>
  );
}
