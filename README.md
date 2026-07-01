# Let's Do Kitchen — Next.js

Houston's home food marketplace, built with **Next.js 15 (App Router) + TypeScript + React 19**.

## Run it

```bash
cd letsdo-kitchen
npm install      # already done
npm run dev      # http://localhost:3000
```

Production:
```bash
npm run build && npm start
```

## Structure

```
app/
  layout.tsx          Root layout — fonts, providers, header/footer/cart/toast
  globals.css         Full design system (ported 1:1 from the static site)
  page.tsx            Home
  meal-plans/         /meal-plans
  become-a-cook/      /become-a-cook
  about/              /about
  contact/            /contact
components/
  CartProvider.tsx    React Context cart (localStorage-persisted)
  CartDrawer.tsx      Slide-out cart + checkout
  Header.tsx          Sticky nav, active-link state, mobile menu, cart button
  Footer.tsx
  AddToCartButton.tsx Client button wired to the cart
  HeroSearch.tsx      Search → /meal-plans
  forms.tsx           Newsletter + Contact forms (Formspree-ready)
  Reveal.tsx          Scroll-reveal animations
  Toast.tsx           Add-to-cart toast
lib/
  data.ts             Vendors, plans, categories, blog + config
```

## Cart
Shared via React Context, persisted in `localStorage`. Any page can add items with
`<AddToCartButton name=… price=… emoji=… />`. The 🛒 in the header opens the drawer
(quantities, totals, checkout).

## Forms / email
Newsletter, contact, and apply forms run in demo mode. To receive real emails, set your
[Formspree](https://formspree.io) endpoint in `lib/data.ts`:
```ts
export const FORM_ENDPOINT = "https://formspree.io/f/your-id";
```

## Images
Vendor/blog photos are hotlinked from Unsplash placeholders in `lib/data.ts`. Swap those URLs
(or drop files in `public/` and reference `/your-image.jpg`) for production.

> The original hand-built static version lives one folder up (`../index.html`, `../css`, `../js`).
