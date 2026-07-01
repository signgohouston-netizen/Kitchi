// Central site config. Set NEXT_PUBLIC_SITE_URL in your hosting env to your real
// domain (e.g. https://kitchikitchi.com) so canonical URLs, sitemap, Open Graph,
// and structured data all point at the right place.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://kitchikitchi.com").replace(/\/$/, "");

export const SITE = {
  name: "Kitchi Kitchi",
  shortName: "KitchiKitchi",
  tagline: "Homemade Food. Healthy Choices. Local Love.",
  brandTagline: "Homemade food, made with love, just for you",
  description:
    "Homemade food made with love. Discover home chefs, halal & vegan kitchens, bakers, tiffin services, fitness and medical-diet meals, and food trucks near you.",
  locale: "en_US",
  twitter: "@kitchikitchi",
  email: "hello@kitchikitchi.com",
  phone: "+1-713-555-0142",
  city: "Houston",
  region: "TX",
  country: "US",
};

export const ogImage = (title: string) =>
  `${SITE_URL}/opengraph-image?title=${encodeURIComponent(title)}`;
