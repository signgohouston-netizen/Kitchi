import type { Metadata } from "next";
import { ContactForm } from "@/components/forms";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Kitchi Kitchi. Questions about ordering, meal plans, becoming a cook, or riding with us — we're here to help.",
  alternates: { canonical: "/contact" },
};

const info = [
  { ico: "📍", h: "Location", p: "Serving the Greater Houston area, Texas" },
  { ico: "✉️", h: "Email", p: "hello@kitchencircle.com" },
  { ico: "📞", h: "Phone", p: "(713) 555-0142" },
  { ico: "🕘", h: "Support hours", p: "Mon–Sun · 9:00 AM – 9:00 PM CT" },
];

export default function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>Questions about an order, a meal plan, or joining as a cook or rider? We&apos;d love to hear from you.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info reveal">
              <div className="section-head" style={{ textAlign: "left", margin: "0 0 26px" }}>
                <span className="kicker">Reach us</span>
                <h2>We&apos;re here to help</h2>
              </div>
              {info.map((i) => (
                <div className="info-item" key={i.h}>
                  <div className="ico">{i.ico}</div>
                  <div><h4>{i.h}</h4><p>{i.p}</p></div>
                </div>
              ))}
            </div>

            <div className="form-card reveal">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
