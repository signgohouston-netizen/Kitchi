export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO (YYYY-MM-DD)
  readTime: string;
  author: string;
  category: string;
  image: string;
  imageAlt: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "best-halal-food-options-houston",
    title: "10 Best Halal Food Options in Houston",
    description:
      "A neighborhood guide to the freshest halal home kitchens and dishes in Houston — from biryani to shawarma — and how to order them fresh.",
    date: "2024-03-15",
    readTime: "5 min read",
    author: "The Kitchi Kitchi Team",
    category: "Halal Food",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80",
    imageAlt: "A spread of freshly cooked halal dishes",
    body: [
      { type: "p", text: "Finding genuinely good halal food in a city the size of Houston can feel overwhelming. There are hundreds of options, but the best meals often come from small home kitchens you'd never find on a big delivery app. Here are ten halal dishes — and the kinds of cooks behind them — worth seeking out." },
      { type: "h2", text: "Why home-cooked halal is different" },
      { type: "p", text: "Restaurant halal food is convenient, but home cooks tend to use fresher spices, smaller batches, and family recipes passed down for generations. The result is food that tastes personal rather than mass-produced." },
      { type: "ul", items: [
        "Chicken biryani — fragrant, slow-cooked, and never dry",
        "Beef nihari — a rich, slow-simmered breakfast stew",
        "Chicken shawarma wraps — marinated overnight and grilled to order",
        "Lamb karahi — cooked fresh in a wok-style pan",
        "Haleem — a hearty lentil and meat porridge",
        "Seekh kebabs — hand-rolled and char-grilled",
        "Chana chaat — a tangy chickpea snack",
        "Mutton pulao — lighter than biryani, deeply savory",
        "Falafel platters — crisp outside, soft inside",
        "Gulab jamun — warm syrup-soaked dessert to finish",
      ]},
      { type: "h2", text: "How to order it fresh" },
      { type: "p", text: "The trick to great halal delivery is timing. Order from cooks who prepare meals the same day rather than reheating, and ask about pickup windows so your food arrives hot. On Kitchi Kitchi you can filter directly for halal home kitchens near you and see when each cook is taking orders." },
      { type: "p", text: "Whether you're feeding a family or just craving a proper plate of biryani, supporting local halal home cooks means fresher food and a stronger neighborhood food community." },
    ],
  },
  {
    slug: "how-to-start-a-home-kitchen-business",
    title: "How to Start Your Home Kitchen Business",
    description:
      "From permits and food-safety certification to pricing and your first customers — a practical guide to launching a profitable home kitchen in Texas.",
    date: "2024-03-10",
    readTime: "8 min read",
    author: "The Kitchi Kitchi Team",
    category: "For Cooks",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80",
    imageAlt: "A home cook preparing food in a bright kitchen",
    body: [
      { type: "p", text: "If friends and family keep telling you to sell your food, they might be onto something. Turning home cooking into a real business is more achievable than ever — but a little planning up front saves a lot of headaches later. Here's how to start." },
      { type: "h2", text: "1. Understand your local cottage food rules" },
      { type: "p", text: "In Texas, cottage food laws let individuals sell certain foods made in a home kitchen directly to customers. Rules vary by what you make and how you sell it, so check current state and county guidance before you launch, and keep your paperwork organized from day one." },
      { type: "h2", text: "2. Get food-safety certified" },
      { type: "p", text: "A food handler's certification is inexpensive, quick to earn online, and builds trust with customers. Many home cooks also choose to take a more advanced food manager course as their business grows." },
      { type: "h2", text: "3. Build a tight, repeatable menu" },
      { type: "p", text: "Resist the urge to offer everything. Three to five dishes you can cook consistently and price well will serve you far better than a sprawling menu. Pick recipes that hold up well during delivery." },
      { type: "ul", items: [
        "Choose dishes with stable ingredient costs",
        "Test how each recipe travels before selling it",
        "Standardize portion sizes so pricing stays predictable",
        "Photograph every dish in good natural light",
      ]},
      { type: "h2", text: "4. Price for profit, not just costs" },
      { type: "p", text: "Add up ingredients, packaging, and your time, then build in a margin. Underpricing is the most common mistake new cooks make. Customers who value home-cooked food expect to pay fairly for it." },
      { type: "h2", text: "5. Find your first customers" },
      { type: "p", text: "A marketplace like Kitchi Kitchi handles discovery, payments, and delivery so you can focus on cooking. Set your own prices, open your kitchen when it suits you, and let nearby customers find you. Weekly payouts mean you're never chasing invoices." },
      { type: "p", text: "Start small, stay consistent, and let word of mouth do the rest. Many of our top cooks began with a single weekend menu and grew from there." },
    ],
  },
  {
    slug: "ordering-food-delivery-peak-hours",
    title: "Tips for Ordering Food Delivery During Peak Hours",
    description:
      "Beat the dinner rush and keep your meals hot with these simple strategies for ordering food delivery when everyone else is, too.",
    date: "2024-03-05",
    readTime: "4 min read",
    author: "The Kitchi Kitchi Team",
    category: "Ordering Tips",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1200&q=80",
    imageAlt: "A delivery rider with an insulated food bag",
    body: [
      { type: "p", text: "Friday at 7 p.m. is the worst time to be hungry and unprepared. When everyone in the neighborhood orders at once, wait times stretch and food can arrive lukewarm. A few small habits make peak-hour ordering painless." },
      { type: "h2", text: "Order ahead when you can" },
      { type: "p", text: "Many home cooks let you schedule an order hours in advance. Locking in your dinner at 4 p.m. for a 7 p.m. delivery means you skip the queue entirely and your cook can plan their batch around you." },
      { type: "h2", text: "Pick kitchens close to you" },
      { type: "p", text: "The shorter the delivery distance, the hotter your food arrives. Filtering by distance is the single easiest way to improve a peak-hour order." },
      { type: "ul", items: [
        "Schedule orders earlier in the day during busy evenings",
        "Choose cooks within a couple of miles when speed matters",
        "Look for dishes that travel well, like stews and rice plates",
        "Add clear delivery notes to avoid back-and-forth",
      ]},
      { type: "h2", text: "Consider a meal plan" },
      { type: "p", text: "If peak-hour ordering is a regular struggle, a weekly or monthly meal plan removes the decision entirely. Your meals arrive on a schedule you set — no scrambling at dinnertime. It's the calmest way to eat well on busy nights." },
    ],
  },
  {
    slug: "diabetic-friendly-meal-planning-guide",
    title: "Diabetic-Friendly Meal Planning: A Beginner's Guide",
    description:
      "Practical, doctor-friendly tips for building balanced, blood-sugar-conscious meals — and how home cooks can make eating well easier.",
    date: "2024-02-26",
    readTime: "6 min read",
    author: "The Kitchi Kitchi Team",
    category: "Healthy Eating",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80",
    imageAlt: "A colorful, balanced plate of vegetables and grains",
    body: [
      { type: "p", text: "Eating well with diabetes doesn't mean bland food or endless restrictions. With a little planning, you can enjoy flavorful, satisfying meals that keep blood sugar steadier. This guide covers the basics — always follow your own doctor's or dietitian's advice for your situation." },
      { type: "h2", text: "Build the plate, not just the recipe" },
      { type: "p", text: "A helpful rule of thumb is to fill half your plate with non-starchy vegetables, a quarter with lean protein, and a quarter with high-fiber carbohydrates. This balance slows how quickly sugars hit your bloodstream." },
      { type: "ul", items: [
        "Favor whole grains over refined ones",
        "Pair carbs with protein and healthy fats",
        "Watch portion sizes rather than banning foods",
        "Stay consistent with meal timing",
      ]},
      { type: "h2", text: "Let someone else do the math" },
      { type: "p", text: "Planning balanced meals every day is work. Home cooks who specialize in diabetic-friendly cooking already know how to season without excess sugar and salt, and how to portion sensibly. On Kitchi Kitchi you can filter for diabetic-friendly and low-sodium kitchens, or set up a specialist meal plan tuned to your needs." },
      { type: "p", text: "Small, consistent choices add up. The easier you make healthy eating, the more likely you are to stick with it." },
    ],
  },
  {
    slug: "why-home-cooked-meal-plans-beat-takeout",
    title: "Why Home-Cooked Meal Plans Beat Takeout",
    description:
      "Subscriptions to local home cooks can be cheaper, healthier, and tastier than nightly takeout. Here's the case for meal plans.",
    date: "2024-02-18",
    readTime: "5 min read",
    author: "The Kitchi Kitchi Team",
    category: "Meal Plans",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80",
    imageAlt: "A set of home-cooked meals packed for the week",
    body: [
      { type: "p", text: "Nightly takeout is easy, but it adds up fast — in cost, in calories, and in the sheer mental load of deciding what to eat every single day. A home-cooked meal plan solves all three." },
      { type: "h2", text: "It's usually cheaper per meal" },
      { type: "p", text: "Because cooks plan and batch ahead, meal plans typically cost less per serving than one-off delivery, and you skip the surprise fees that pile onto single orders." },
      { type: "h2", text: "It's better for you" },
      { type: "p", text: "Home cooks use real ingredients and can adapt to your diet — halal, keto, low-sodium, vegetarian. You know who made your food and what's in it, which is hard to say for most takeout." },
      { type: "ul", items: [
        "Predictable weekly cost",
        "Meals tailored to your dietary needs",
        "Less food waste and fewer impulse orders",
        "No nightly 'what's for dinner?' decision",
      ]},
      { type: "h2", text: "It supports your neighbors" },
      { type: "p", text: "Every meal-plan order goes to a local cook building a small business, not a faceless chain. It's a small switch that keeps more money in your community — and gets you fresher food in the process." },
      { type: "p", text: "Ready to try it? Browse meal plans from home cooks near you and pick a schedule that fits your week." },
    ],
  },
];

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
