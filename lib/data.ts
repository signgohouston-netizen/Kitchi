export type CartItem = {
  name: string;
  price: number;
  emoji: string;
  qty: number;
};

export type Vendor = {
  name: string;
  cuisine: string;
  tag: string;
  rating: string;
  delivery: string;
  min: string;
  distance: string;
  img: string;
  item: { name: string; price: number; emoji: string };
};

export const vendors: Vendor[] = [
  {
    name: "Fatima's Halal Kitchen",
    cuisine: "Pakistani & Desi · 320 reviews",
    tag: "Halal · Home Cook",
    rating: "4.9",
    delivery: "🛵 Free delivery",
    min: "💵 $15 min",
    distance: "📍 1.2 mi",
    img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=700&q=80",
    item: { name: "Chicken Biryani — Fatima's", price: 13.99, emoji: "🍛" },
  },
  {
    name: "Sarah's Keto Kitchen",
    cuisine: "Low-carb & High-protein · 198 reviews",
    tag: "Keto · Home Cook",
    rating: "4.8",
    delivery: "🛵 $2.99 delivery",
    min: "💵 $20 min",
    distance: "📍 2.0 mi",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&q=80",
    item: { name: "Keto Power Bowl — Sarah's", price: 14.99, emoji: "🥗" },
  },
  {
    name: "Smokehouse BBQ",
    cuisine: "Texas Smoked & Grilled · 412 reviews",
    tag: "BBQ · Restaurant",
    rating: "4.7",
    delivery: "🛵 $3.49 delivery",
    min: "💵 $25 min",
    distance: "📍 3.4 mi",
    img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=700&q=80",
    item: { name: "Smoked Brisket Plate — Smokehouse", price: 18.99, emoji: "🍖" },
  },
  {
    name: "Halal Express",
    cuisine: "Mediterranean & Shawarma · 276 reviews",
    tag: "Halal · Restaurant",
    rating: "4.6",
    delivery: "🛵 Free delivery",
    min: "💵 $12 min",
    distance: "📍 0.9 mi",
    img: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=700&q=80",
    item: { name: "Chicken Shawarma — Halal Express", price: 11.99, emoji: "🌯" },
  },
  {
    name: "Sweet Treats Bakery",
    cuisine: "Cakes, Cookies & Desserts · 154 reviews",
    tag: "Bakery · Home Cook",
    rating: "4.9",
    delivery: "🛵 $2.49 delivery",
    min: "💵 $10 min",
    distance: "📍 1.7 mi",
    img: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=700&q=80",
    item: { name: "Cake Slice — Sweet Treats", price: 7.99, emoji: "🍰" },
  },
  {
    name: "Fresh Start Breakfast",
    cuisine: "Morning Plates & Brunch · 231 reviews",
    tag: "Breakfast · Catering",
    rating: "4.8",
    delivery: "🛵 Free delivery",
    min: "💵 $14 min",
    distance: "📍 2.6 mi",
    img: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=700&q=80",
    item: { name: "Big Brunch Plate — Fresh Start", price: 12.99, emoji: "🍳" },
  },
];

export const categories = [
  { icon: "🩺", name: "Diabetic Friendly" },
  { icon: "🧂", name: "Low Salt / BP" },
  { icon: "🕌", name: "Halal Home Cooked" },
  { icon: "📅", name: "Monthly Plans" },
  { icon: "🥗", name: "Vegetarian" },
];

export const blog = [
  {
    date: "Mar 15, 2024",
    read: "5 min read",
    title: "10 Best Halal Food Options in Your Area",
    excerpt: "A neighborhood guide to the freshest halal home kitchens worth ordering from this month.",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=80",
  },
  {
    date: "Mar 10, 2024",
    read: "8 min read",
    title: "How to Start Your Home Kitchen Business",
    excerpt: "From permits to pricing — everything you need to launch a profitable home kitchen.",
    img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=700&q=80",
  },
  {
    date: "Mar 5, 2024",
    read: "4 min read",
    title: "Tips for Ordering Food Delivery During Peak Hours",
    excerpt: "Beat the rush and keep your meals hot with these simple ordering strategies.",
    img: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=700&q=80",
  },
];

export type Plan = {
  name: string;
  price: string;
  per: string;
  desc: string;
  features: string[];
  featured?: boolean;
  emoji: string;
  priceNum: number;
};

export const plans: Plan[] = [
  {
    name: "Weekly Taster",
    price: "$59",
    per: "/week",
    desc: "Perfect for trying out home cooks near you.",
    features: ["5 chef-cooked meals", "Choose 1 kitchen", "Free delivery 2 days/week", "Pause anytime"],
    emoji: "📅",
    priceNum: 59,
  },
  {
    name: "Monthly Family",
    price: "$199",
    per: "/month",
    desc: "Healthy, home-style meals for the whole household.",
    features: ["20 chef-cooked meals", "Mix up to 3 kitchens", "Free delivery, all week", "Dietary customization", "Priority support"],
    featured: true,
    emoji: "👨‍👩‍👧",
    priceNum: 199,
  },
  {
    name: "Diet Specialist",
    price: "$249",
    per: "/month",
    desc: "Doctor-friendly plates tuned to your needs.",
    features: ["20 specialized meals", "Diabetic / low-sodium / keto", "Nutritionist-reviewed menus", "Free delivery, all week", "Dedicated cook match"],
    emoji: "🩺",
    priceNum: 249,
  },
];

// To receive real emails, set this to your Formspree endpoint, e.g.
// "https://formspree.io/f/your-id". Leave blank for demo mode.
export const FORM_ENDPOINT = "";
export const DELIVERY_FEE = 2.99;
