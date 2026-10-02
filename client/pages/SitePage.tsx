import { FormEvent, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import {
  Banknote,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Landmark,
  Lock,
  Mail,
  Menu,
  Minus,
  Phone,
  Plus,
  Search,
  ShoppingBag,
  Smartphone,
  Star,
  Trash2,
  UserRound,
  Waves,
  X,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useContactInfo } from "../hooks/useContactInfo";

export const productLinks = [
  ["Our Products", "/products"],
  ["Meat Products", "/products/meat"],
  ["Poultry Products", "/products/poultry"],
  ["Fish Products", "/products/fish"],
  ["Seafood Products", "/products/seafood"],
  ["Processed Products", "/products/processed"],
];
export const aboutLinks = [
  ["About Us", "/about"],
  ["Quality & Hygiene", "/quality-hygiene"],
  ["Sourcing & Procurement", "/sourcing"],
  ["Our Facilities", "/facilities"],
  ["Why Choose Us", "/why-choose-us"],
  ["Our Commitment", "/commitment"],
  ["Sustainability", "/sustainability"],
  ["Food Safety", "/food-safety"],
  ["Certifications & Compliance", "/certifications"],
];
export const companyLinks = [
  ["Blog / News", "/blog"],
  ["Careers", "/careers"],
  ["FAQ", "/faq"],
  ["Contact Us", "/contact"],
];
const legalLinks = [
  ["Privacy Policy", "/privacy"],
  ["Terms & Conditions", "/terms"],
  ["Disclaimer", "/disclaimer"],
  ["Shipping & Delivery Policy", "/shipping"],
  ["Return & Refund Policy", "/returns"],
];

export function Dropdown({
  label,
  links,
}: {
  label: string;
  links: string[][];
}) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 py-3 text-sm font-semibold text-[#476568] hover:text-[#0b3d5c]">
        {label}
        <ChevronDown size={14} />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 rounded-2xl border border-[#dfe6e3] bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
        {links.map(([name, path]) => (
          <Link
            key={path}
            to={path}
            className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#476568] hover:bg-[#edf5f1] hover:text-[#0b3d5c]"
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#212529]">
      <div className="bg-[#0b3d5c] px-4 py-2 text-center text-[11px] font-semibold tracking-[0.12em] text-white sm:text-xs">
        FRESH CATCH, DELIVERED DAILY{" "}
        <span className="mx-2 text-[#55d8be]">•</span> FSSAI CERTIFIED{" "}
        <span className="mx-2 text-[#55d8be]">•</span> CASH ON DELIVERY
        AVAILABLE
      </div>
      <header className="sticky top-0 z-40 border-b border-[#dfe6e3] bg-[#f8f7f4]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-4 lg:px-8">
          <button
            aria-label="Open menu"
            className="rounded-lg p-2 text-[#0b3d5c] lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link to="/" className="shrink-0 leading-none">
            <span className="block text-[17px] font-black tracking-[0.15em] text-[#0b3d5c] sm:text-xl">
              PARIYANI
            </span>
            <span className="mt-1 flex items-center gap-1 text-[9px] font-bold tracking-[0.42em] text-[#1fa98f]">
              <Waves size={12} /> OCEANS
            </span>
          </Link>
          <div className="relative hidden max-w-sm flex-1 md:block">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c9695]"
              size={18}
            />
            <input
              placeholder="Search fresh cuts..."
              className="h-11 w-full rounded-full border border-[#d9e3df] bg-white pl-11 pr-4 text-sm outline-none focus:border-[#1fa98f]"
            />
          </div>
          <nav className="ml-auto hidden items-center gap-5 lg:flex">
            <Link
              to="/"
              className="text-sm font-semibold text-[#476568] hover:text-[#0b3d5c]"
            >
              Home
            </Link>
            <Dropdown label="Products" links={productLinks} />
            <Dropdown label="About" links={aboutLinks} />
            <Dropdown label="Company" links={companyLinks} />
          </nav>
          <Link
            to="/account"
            className="hidden rounded-full p-2 text-[#0b3d5c] sm:block"
            aria-label="My account"
          >
            <UserRound size={20} />
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center gap-2 rounded-full bg-[#ff6b4a] px-4 py-2.5 text-sm font-bold text-white"
          >
            <ShoppingBag size={19} />
            <span className="hidden sm:inline">Cart</span>
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0b3d5c] px-1 text-[10px]">
              {cartCount}
            </span>
          </Link>
        </div>
        {menuOpen && (
          <div className="border-t border-[#dfe6e3] bg-white px-5 py-4 lg:hidden">
            <div className="flex gap-5 text-sm font-semibold">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        )}
      </header>
      {children}
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#062e46] px-5 pb-8 pt-14 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="text-xl font-black tracking-[0.15em]">
              PARIYANI
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-[#9bb9b9]">
              Premium meat and seafood, sourced with care and delivered fresh
              across Mumbai.
            </p>
            <div className="mt-5 space-y-2 text-sm text-[#9bb9b9]">
              <a
                href="tel:+919653111297"
                className="flex items-center gap-2 hover:text-white"
              >
                <Phone className="h-4 w-4" /> +91 96531 11297
              </a>
              <a
                href="mailto:support@pariyanioceans.store"
                className="flex items-center gap-2 hover:text-white"
              >
                <Mail className="h-4 w-4" /> support@pariyanioceans.store
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold">Products</h3>
            {productLinks.slice(1).map(([name, path]) => (
              <Link
                className="block py-1.5 text-sm text-[#9bb9b9] hover:text-white"
                key={path}
                to={path}
              >
                {name}
              </Link>
            ))}
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold">Company</h3>
            {companyLinks.map(([name, path]) => (
              <Link
                className="block py-1.5 text-sm text-[#9bb9b9] hover:text-white"
                key={path}
                to={path}
              >
                {name}
              </Link>
            ))}
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold">Legal & support</h3>
            {legalLinks.map(([name, path]) => (
              <Link
                className="block py-1.5 text-sm text-[#9bb9b9] hover:text-white"
                key={path}
                to={path}
              >
                {name}
              </Link>
            ))}
            <p className="mt-4 text-xs font-semibold text-[#ff8a70]"></p>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-7 text-xs text-[#86a7a8] sm:flex-row sm:justify-between">
          <p>© 2026 PARIYANI OCEANS PRIVATE LIMITED. All Rights Reserved.</p>
          <p>
            Registered Office: Rapid Heights, Pydhonie, Mumbai – 400003 · COD
            only
          </p>
        </div>
      </div>
    </footer>
  );
}

export const productCatalog: Record<string, string[]> = {
  Meat: [
    "Mutton Curry Cut",
    "Mutton Boneless Cubes",
    "Mutton Mince",
    "Mutton Chops",
    "Mutton Liver",
    "Mutton Leg Whole",
    "Mutton Ribs",
    "Buffalo Boneless",
  ],
  Poultry: [
    "Chicken Curry Cut Skin-on",
    "Chicken Curry Cut Skinless",
    "Chicken Breast Boneless",
    "Chicken Leg Boneless",
    "Chicken Whole",
    "Chicken Wings",
    "Chicken Mince",
    "Chicken Lollipop",
    "Chicken Liver",
    "Chicken Sausages",
  ],
  Fish: [
    "Pomfret Whole",
    "Rohu Curry Cut",
    "Bangda / Mackerel",
    "Surmai / King Fish Slices",
    "Bombay Duck",
    "Rawas Slices",
    "Tilapia Fillet",
    "Basa Fillet",
    "Katla Curry Cut",
    "Anchovies / Mandeli",
    "Tuna Steaks",
    "Sardines / Tarli",
  ],
  Seafood: [
    "Medium Prawns",
    "Jumbo Tiger Prawns",
    "Mud Crab",
    "Blue Swimmer Crab",
    "Squid Rings",
    "Mussels",
    "Lobster Tail",
  ],
  Processed: ["Chicken Sausages Pack", "Fish Fingers", "Seafood Party Pack"],
};
const productImages = [
  "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=85",
];

const productImageFiles: Record<string, string> = {
  "Mutton Curry Cut": "Mutton Curry Cut.jpeg",
  "Mutton Boneless Cubes": "Mutton Boneless Cubes.jpeg",
  "Mutton Mince": "Mutton Mince.jpeg",
  "Mutton Chops": "Mutton Chops.jpeg",
  "Mutton Liver": "Mutton Liver.webp",
  "Mutton Leg Whole": "Mutton Leg Whole.jpeg",
  "Mutton Ribs": "Mutton Ribs.jpg",
  "Buffalo Boneless": "Buffalo Boneless.jpeg",
  "Chicken Curry Cut Skin-on": "Chicken Curry Cut Skin-on.jpeg",
  "Chicken Curry Cut Skinless": "Chicken Curry Cut Skinless.jpeg",
  "Chicken Breast Boneless": "Chicken Breast Boneless.jpeg",
  "Chicken Leg Boneless": "Chicken Leg Boneless.jpeg",
  "Chicken Whole": "Chicken Whole.jpeg",
  "Chicken Wings": "Chicken Wings.jpeg",
  "Chicken Mince": "Chicken Mince.jpg",
  "Chicken Lollipop": "Chicken Lollipop.webp",
  "Chicken Liver": "Chicken Liver.webp",
  "Chicken Sausages": "Chicken Sausages.webp",
  "Pomfret Whole": "Pomfret Whole.webp",
  "Rohu Curry Cut": "Rohu Curry Cut.jpeg",
  "Bangda / Mackerel": "Bangda : Mackerel.jpeg",
  "Surmai / King Fish Slices": "Surmai : King Fish Slices.webp",
  "Bombay Duck": "Bombay Duck.webp",
  "Rawas Slices": "Rawas Slices.jpg",
  "Tilapia Fillet": "Tilapia Fillet.webp",
  "Basa Fillet": "Basa Fillet.webp",
  "Katla Curry Cut": "Katla Curry Cut.jpg",
  "Anchovies / Mandeli": "Anchovies : Mandeli.webp",
  "Tuna Steaks": "Tuna Steaks.jpeg",
  "Sardines / Tarli": "Sardines : Tarli.webp",
  "Medium Prawns": "Medium Prawns.jpg",
  "Jumbo Tiger Prawns": "Jumbo Tiger Prawns.jpeg",
  "Mud Crab": "Mud Crab.jpg",
  "Blue Swimmer Crab": "Blue Swimmer Crab.webp",
  "Squid Rings": "Squid Rings.jpeg",
  Mussels: "Mussels.jpg",
  "Lobster Tail": "Lobster Tail.jpg",
  "Chicken Sausages Pack": "Chicken Sausages Pack.webp",
  "Fish Fingers": "Fish Fingers.jpg",
  "Seafood Party Pack": "Seafood Party Pack.jpg",
};
export function getProductImage(name: string, fallbackIndex = 0): string {
  const file = productImageFiles[name];
  return file
    ? encodeURI(`/${file}`)
    : productImages[fallbackIndex % productImages.length];
}

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return hash;
}

export function getProductPrice(name: string): number {
  const price = 100 + (hashName(name) % 401);
  return Math.round(price / 10) * 10;
}

export function getProductMrp(name: string): number {
  return Math.round((getProductPrice(name) * 1.2) / 10) * 10;
}

export function ProductCard({ name, index }: { name: string; index: number }) {
  const [weight, setWeight] = useState("500g");
  const { items, addItem, decrementItem } = useCart();
  const cartQty =
    items.find((item) => item.name === name && item.weight === weight)
      ?.qty ?? 0;
  return (
    <article className="rounded-2xl bg-white p-3 shadow-sm">
      <Link to={`/product/${encodeURIComponent(name)}`} className="block">
        <div className="relative aspect-[1.1] overflow-hidden rounded-xl bg-[#edf3f0]">
          <img
            src={getProductImage(name, index)}
            alt={name}
            className="h-full w-full object-cover"
          />
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-[#8b2e2e]">
            <span className="h-2 w-2 rounded-sm bg-[#8b2e2e]" /> Non-veg
          </span>
        </div>
        <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#1fa98f]">
          Fresh today · 500g
        </p>
        <h3 className="mt-1 min-h-10 font-bold text-[#0b3d5c] hover:text-[#ff6b4a]">
          {name}
        </h3>
      </Link>
      <div className="mt-2 flex items-center gap-1 text-xs text-[#e49a27]">
        ★★★★★ <span className="text-[#91a4a0]">4.8</span>
      </div>
      <p className="mt-2 text-lg font-black text-[#0b3d5c]">
        ₹{getProductPrice(name)}{" "}
        <span className="text-xs font-medium text-[#91a4a0] line-through">
          ₹{getProductMrp(name)}
        </span>
      </p>
      <div className="mt-3 flex gap-1">
        {["250g", "500g", "1kg"].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setWeight(option)}
            aria-pressed={weight === option}
            className={`flex-1 rounded-md border py-1.5 text-[10px] font-semibold transition ${weight === option ? "border-[#ff6b4a] bg-[#fff1ec] text-[#ff6b4a]" : "border-[#d9e3df] text-[#476568]"}`}
          >
            {option}
          </button>
        ))}
      </div>
      {cartQty > 0 ? (
        <div className="mt-3 flex w-full items-center justify-between rounded-xl bg-[#ff6b4a] py-1.5 text-white">
          <button
            type="button"
            onClick={() => decrementItem(name, weight)}
            aria-label="Decrease quantity"
            className="flex h-8 w-8 items-center justify-center"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-xs font-bold">{cartQty}</span>
          <button
            type="button"
            onClick={() => addItem(name, weight)}
            aria-label="Increase quantity"
            className="flex h-8 w-8 items-center justify-center"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => addItem(name, weight)}
          className="mt-3 w-full rounded-xl bg-[#ff6b4a] py-2.5 text-xs font-bold text-white"
        >
          Add to Cart
        </button>
      )}
    </article>
  );
}

export function ProductListingPage({ category }: { category?: string }) {
  const names = category
    ? productCatalog[category]
    : Object.values(productCatalog).flat();
  return (
    <SiteLayout>
      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1fa98f]">
          Pariyani Oceans · {category || "All categories"}
        </p>
        <h1 className="mt-3 text-4xl font-black text-[#0b3d5c]">
          {category ? `${category} Products` : "Our Products"}
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-[#587371]">
          Fresh, non-vegetarian products cleaned and packed with care. Choose
          your preferred weight and pay by Cash on Delivery.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {names.map((name, index) => (
            <ProductCard key={name} name={name} index={index} />
          ))}
        </div>
      </main>
    </SiteLayout>
  );
}

const content: Record<
  string,
  {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    body: string;
    bullets: string[];
  }
> = {
  about: {
    eyebrow: "The Pariyani story",
    title: "Good food starts with good sourcing.",
    description:
      "PARIYANI OCEANS PRIVATE LIMITED brings premium meat and seafood from trusted farms and coastal partners to homes across Mumbai.",
    image: productImages[1],
    body: "We started Pariyani Oceans to make the everyday purchase of meat and seafood feel more transparent, hygienic and dependable. Our teams combine local knowledge with modern cold-chain handling so families can cook with confidence.",
    bullets: [
      "Carefully selected farm and ocean partners",
      "Fresh cleaning and packing for every order",
      "Serving select Mumbai pin codes with same-day delivery",
    ],
  },
  "quality-hygiene": {
    eyebrow: "Quality & hygiene",
    title: "Care in every cut.",
    description:
      "Our hygienic processing, food-grade packaging and chilled cold chain keep freshness protected from source to doorstep.",
    image: productImages[0],
    body: "Products move through dedicated cleaning, portioning and packing steps. Teams follow documented hygiene routines, use food-grade materials and keep products chilled throughout handling.",
    bullets: [
      "Food-grade, leak-proof packaging",
      "Temperature-conscious handling",
      "Quality checks before dispatch",
    ],
  },
  sourcing: {
    eyebrow: "Sourcing & procurement",
    title: "From trusted farms & ocean fresh catch.",
    description:
      "We work with a carefully selected network of responsible farms, fishermen and suppliers who meet our quality standards.",
    image: productImages[2],
    body: "Our procurement team looks for consistent quality, responsible practices and reliable traceability. Relationships are reviewed regularly so freshness and supply standards stay dependable.",
    bullets: [
      "Partner evaluation and product checks",
      "Seasonal sourcing for better freshness",
      "Transparent supplier relationships",
    ],
  },
  facilities: {
    eyebrow: "Our facilities",
    title: "Built around freshness.",
    description:
      "Temperature-controlled handling, dedicated cleaning zones and trained teams help us deliver safe, consistent products.",
    image: productImages[3],
    body: "Our operating model separates receiving, cleaning, portioning and dispatch. Cold-chain discipline and trained people help us protect quality through the last mile.",
    bullets: [
      "Dedicated preparation areas",
      "Chilled dispatch workflow",
      "Trained handling teams",
    ],
  },
  "why-choose-us": {
    eyebrow: "Why choose us",
    title: "Freshness you can trust.",
    description:
      "Pariyani combines local sourcing knowledge with a polished, reliable home-delivery experience.",
    image: productImages[0],
    body: "We make the essentials simple: clear product information, careful preparation, predictable delivery slots and COD at the door.",
    bullets: [
      "Freshness guarantee",
      "Clear weight and price details",
      "Support from 9am to 9pm",
    ],
  },
  commitment: {
    eyebrow: "Our commitment",
    title: "A better standard for everyday food.",
    description:
      "We are committed to honest information, careful handling and service that respects every customer.",
    image: productImages[2],
    body: "Our commitment is practical: listen to feedback, improve our processes and make it easy for customers to understand what they are buying and how it reaches them.",
    bullets: [
      "Customer-first service",
      "Continuous process improvement",
      "Responsible product communication",
    ],
  },
  sustainability: {
    eyebrow: "Sustainability",
    title: "Better choices for tomorrow.",
    description:
      "We are building more responsible sourcing and packaging practices while supporting the communities that bring food to our tables.",
    image: productImages[1],
    body: "We are working toward lower-waste packing, better supplier conversations and thoughtful route planning. Sustainability is an ongoing responsibility, not a campaign.",
    bullets: [
      "Reduce unnecessary packaging",
      "Source with long-term relationships",
      "Improve delivery efficiency",
    ],
  },
  "food-safety": {
    eyebrow: "Food safety",
    title: "Safety is part of the recipe.",
    description:
      "From receiving to delivery, food safety practices guide how products are handled and communicated.",
    image: productImages[3],
    body: "We focus on clean preparation, chilled handling, clear storage guidance and prompt support when customers have questions about an order.",
    bullets: [
      "Hygiene-led preparation",
      "Cold-chain awareness",
      "Clear storage instructions",
    ],
  },
  certifications: {
    eyebrow: "Certifications & compliance",
    title: "Built for accountable growth.",
    description:
      "We are aligning our operations with applicable food-safety requirements and will publish license details as they are obtained.",
    image: productImages[0],
    body: "Regulatory compliance matters to us. Our FSSAI license number will be displayed here once issued, alongside any applicable certifications and audit information.",
    bullets: [
      "",
      "Applicable legal pages reviewed before launch",
      "Traceable operational standards",
    ],
  },
};

const faqItems = [
  "Which areas do you deliver to and how long does delivery take?",
  "How do you guarantee freshness?",
  "Can I cancel an order or request a refund?",
  "How does Cash on Delivery work?",
  "How are products packaged?",
  "How do I place an order?",
  "What are your customer support hours?",
  "Can I choose a weight or cut type?",
  "What should I do if I receive the wrong product?",
  "Are your products vegetarian?",
  "Do you offer same-day delivery?",
  "How should I store my order after delivery?",
];
const reviews = [
  {
    name: "Ayesha K.",
    city: "Mumbai",
    rating: 5,
    text: "The fish arrived perfectly chilled and cleaned exactly as requested.",
  },
  {
    name: "Rohan M.",
    city: "Mumbai",
    rating: 5,
    text: "The chicken was fresh, neatly packed and delivered right on time.",
  },
  {
    name: "Nadia S.",
    city: "Thane",
    rating: 4,
    text: "Really good quality cuts and the COD process was very easy.",
  },
  {
    name: "Imran P.",
    city: "Mumbai",
    rating: 5,
    text: "The mutton curry cut made our family dinner special.",
  },
  {
    name: "Vikram D.",
    city: "Mumbai",
    rating: 4,
    text: "Fresh seafood, reliable delivery and helpful support.",
  },
  {
    name: "Sara N.",
    city: "Navi Mumbai",
    rating: 5,
    text: "Loved the packaging and freshness guarantee.",
  },
];

function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState<{
    name: string;
    rating: number;
    comment: string;
  } | null>(null);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !comment.trim() || rating < 1) return;
    setSubmitted({ name: name.trim(), rating, comment: comment.trim() });
    setOpen(false);
    setName("");
    setComment("");
  };
  return (
    <div className="mt-5">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full bg-[#ff6b4a] px-4 py-2.5 text-xs font-bold text-white"
      >
        {open ? "Close review form" : "Write a Review"}
      </button>
      {submitted && (
        <p className="mt-3 rounded-xl bg-[#e6f5ed] px-4 py-3 text-sm font-semibold text-[#2e7d32]">
          Thank you for your review, {submitted.name}!
        </p>
      )}
      {submitted && (
        <article className="mt-3 rounded-2xl border border-[#dfe6e3] bg-white p-4">
          <b className="text-[#0b3d5c]">{submitted.name}</b>
          <div className="mt-2 text-[#e49a27]">
            {"★".repeat(submitted.rating)}
            {"☆".repeat(5 - submitted.rating)}
          </div>
          <p className="mt-2 text-sm text-[#587371]">“{submitted.comment}”</p>
        </article>
      )}
      {open && (
        <form
          onSubmit={submit}
          className="mt-4 grid max-w-lg gap-3 rounded-2xl border border-[#dfe6e3] bg-white p-5"
        >
          <div>
            <p className="text-sm font-bold text-[#0b3d5c]">Your rating</p>
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  type="button"
                  aria-label={`${value} stars`}
                  key={value}
                  onClick={() => setRating(value)}
                  className={`text-2xl ${value <= rating ? "text-[#e49a27]" : "text-[#c5d1ce]"}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className="rounded-xl border border-[#d9e3df] px-4 py-3 text-sm"
          />
          <textarea
            required
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Share your experience"
            rows={4}
            className="rounded-xl border border-[#d9e3df] px-4 py-3 text-sm"
          />
          <button
            type="submit"
            className="rounded-full bg-[#0b3d5c] py-3 text-sm font-bold text-white"
          >
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
}

export function ReviewsBlock({ product = false }: { product?: boolean }) {
  const [filter, setFilter] = useState("all");
  const filtered =
    filter === "all"
      ? reviews
      : reviews.filter((review) => review.rating === Number(filter));
  return (
    <section
      className={
        product
          ? "mt-12 border-t border-[#dfe6e3] pt-10"
          : "mt-14 rounded-[28px] bg-[#fffaf5] p-7 sm:p-10"
      }
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1fa98f]">
            Real words from real homes
          </p>
          <h2 className="mt-2 text-3xl font-black text-[#0b3d5c]">
            {product ? "Reviews & Ratings" : "What Our Customers Say"}
          </h2>
          <p className="mt-3 text-sm text-[#587371]">
            4.6 ★ based on 1,200+ reviews
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-full border border-[#d3dfdb] bg-white px-4 py-2 text-xs font-semibold"
          >
            <option value="all">All ratings</option>
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
          </select>
          <ReviewForm />
        </div>
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {filtered.map((review) => (
          <article
            key={review.name}
            className="rounded-2xl bg-white p-5 shadow-sm"
          >
            <div className="flex justify-between">
              <b className="text-[#0b3d5c]">{review.name}</b>
              <span className="text-xs text-[#91a4a0]">{review.city}</span>
            </div>
            <div className="mt-3 flex text-[#e49a27]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  fill={star <= review.rating ? "currentColor" : "none"}
                />
              ))}
            </div>
            <p className="mt-3 text-sm leading-6 text-[#587371]">
              “{review.text}”
            </p>
            <p className="mt-3 text-[11px] text-[#91a4a0]">
              Verified customer · 12 Jun 2026
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SiteLayout>
      <main className="mx-auto max-w-4xl px-5 py-12 lg:px-8 lg:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1fa98f]">
          Need to know
        </p>
        <h1 className="mt-3 text-5xl font-black text-[#0b3d5c]">
          Frequently Asked Questions
        </h1>
        <p className="mt-5 leading-7 text-[#587371]">
          Everything you need to know about ordering fresh meat and seafood from
          Pariyani Oceans.
        </p>
        <div className="mt-10 divide-y divide-[#dfe6e3] rounded-2xl bg-white px-6">
          {faqItems.map((question, index) => (
            <div key={question}>
              <button
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-bold text-[#0b3d5c]"
                onClick={() => setOpen(open === index ? null : index)}
              >
                {question}
                <ChevronRight
                  className={`transition ${open === index ? "rotate-90 text-[#ff6b4a]" : "text-[#1fa98f]"}`}
                  size={18}
                />
              </button>
              {open === index && (
                <p className="pb-5 pr-8 text-sm leading-6 text-[#587371]">
                  We currently serve select Mumbai and surrounding pin codes.
                  Choose your delivery slot at checkout; products are packed in
                  food-grade insulated packaging. For cancellations, refunds or
                  support, contact us within the timelines in our policies.
                </p>
              )}
            </div>
          ))}
        </div>
      </main>
    </SiteLayout>
  );
}

function BlogPage() {
  const posts = [
    [
      "How to store fresh seafood at home",
      "Keep seafood chilled, sealed and separate from ready-to-eat foods.",
    ],
    [
      "Choosing the right cut for every recipe",
      "A simple guide to curry cuts, boneless pieces and family portions.",
    ],
    [
      "Five easy weeknight recipes",
      "Make dinner easier with fresh ingredients and a little planning.",
    ],
  ];
  return (
    <SiteLayout>
      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1fa98f]">
          From our journal
        </p>
        <h1 className="mt-3 text-5xl font-black text-[#0b3d5c]">Blog / News</h1>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.map(([title, text], index) => (
            <article className="rounded-2xl bg-white p-6 shadow-sm" key={title}>
              <div className="flex h-40 items-end rounded-xl bg-[#dcece5] p-4 text-sm font-bold text-[#0b3d5c]">
                Pariyani journal · 0{index + 1}
              </div>
              <h2 className="mt-5 text-xl font-black text-[#0b3d5c]">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#587371]">{text}</p>
              <button className="mt-5 text-sm font-bold text-[#ff6b4a]">
                Read article <ChevronRight className="inline" size={14} />
              </button>
            </article>
          ))}
        </div>
      </main>
    </SiteLayout>
  );
}

function ContactPage() {
  const { contactInfo } = useContactInfo();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3003/api/contact/dispute", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, subject, message }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
      setEmail("");
      setSubject("");
      setMessage("");
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      alert("Error submitting dispute. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SiteLayout>
      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1fa98f]">
              We’re here to help
            </p>
            <h1 className="mt-3 text-5xl font-black text-[#0b3d5c]">
              Contact Us
            </h1>
            <p className="mt-5 leading-7 text-[#587371]">
              Questions about an order, delivery or freshness? Our team is
              available daily from 9am to 9pm.
            </p>
            <div className="mt-8 space-y-4 text-sm text-[#476568]">
              <p>
                <b className="text-[#0b3d5c]">Registered office:</b> 7th Floor,
                706, Rapid Heights, Kolsa Street, near Mohammed Ali Road,
                Pydhonie, Mumbai – 400003
              </p>
              <p>
                <b className="text-[#0b3d5c]">Phone:</b> +91 96531 11297
              </p>
              <p>
                <b className="text-[#0b3d5c]">Support Email:</b>{" "}
                {contactInfo?.support || "support@pariyanioceans.store"}
              </p>
              <p>
                <b className="text-[#0b3d5c]">Dispute Email:</b>{" "}
                <span className="text-orange-600 font-semibold">
                  {contactInfo?.dispute || "dispute@pariyanioceans.store"}
                </span>
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black text-[#0b3d5c]">
              Report a dispute
            </h2>
            {submitted && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                ✓ Your dispute has been submitted successfully
              </div>
            )}
            <div className="mt-6 grid gap-4">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="rounded-xl border border-[#d9e3df] px-4 py-3 text-sm"
              />
              <input
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Dispute subject"
                className="rounded-xl border border-[#d9e3df] px-4 py-3 text-sm"
              />
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your dispute..."
                rows={5}
                className="rounded-xl border border-[#d9e3df] px-4 py-3 text-sm"
              />
              <button
                disabled={isLoading}
                className="rounded-full bg-[#ff6b4a] py-3.5 text-sm font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Submitting..." : "Submit Dispute"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </SiteLayout>
  );
}

function CareersPage() {
  return (
    <SiteLayout>
      <main className="mx-auto max-w-4xl px-5 py-12 lg:px-8 lg:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1fa98f]">
          Join the team
        </p>
        <h1 className="mt-3 text-5xl font-black text-[#0b3d5c]">Careers</h1>
        <div className="mt-8 rounded-3xl bg-[#edf3f0] p-7">
          <h2 className="text-2xl font-black text-[#0b3d5c]">
            No current openings
          </h2>
          <p className="mt-3 leading-7 text-[#587371]">
            We are growing our operations in Mumbai. Send your profile and we’ll
            keep it on file for future customer care, procurement and operations
            roles.
          </p>
          <form className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              required
              placeholder="Your email"
              className="flex-1 rounded-full border-0 px-5 py-3 text-sm"
            />
            <button className="rounded-full bg-[#ff6b4a] px-5 py-3 text-sm font-bold text-white">
              Share profile
            </button>
          </form>
        </div>
      </main>
    </SiteLayout>
  );
}

const legalContent: Record<
  string,
  { title: string; sections: { heading: string; body: string[] }[] }
> = {
  privacy: {
    title: "Privacy Policy",
    sections: [
      {
        heading: "Information We Collect",
        body: [
          "We collect information you give us directly, such as your name, phone number, email address, delivery address and order details, when you place an order, create an account or contact customer support.",
          "We also collect limited technical information automatically, including your IP address, browser type, device information and pages visited, to help us operate and improve the website.",
        ],
      },
      {
        heading: "How We Use Your Information",
        body: [
          "Your information is used to process and deliver orders, send order updates, respond to support requests, personalise your experience and improve our products and services.",
          "We may also use your contact details to send order confirmations, delivery updates and, where you have opted in, occasional offers or promotions. You can opt out of promotional messages at any time.",
        ],
      },
      {
        heading: "Cookies & Tracking",
        body: [
          "We use cookies and similar technologies to keep you signed in, remember your preferences and understand how the website is used. You can control cookies through your browser settings, though some features may not work correctly if cookies are disabled.",
        ],
      },
      {
        heading: "Sharing Your Information",
        body: [
          "We do not sell your personal data. Information may be shared with delivery and logistics partners solely to fulfil your order, with payment or support service providers who help us operate the business, or with authorities where legally required.",
          "Any third party we share data with is expected to protect your information and use it only for the purpose it was shared.",
        ],
      },
      {
        heading: "Data Security",
        body: [
          "We use reasonable technical and organisational measures, including restricted access and secure storage, to protect your information from unauthorised access, loss or misuse. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
        ],
      },
      {
        heading: "Your Rights & Choices",
        body: [
          "You may request access to, correction of, or deletion of your personal information, or ask us to restrict how it is used, by contacting our support team at support@pariyanioceans.store.",
          "We will respond to verified requests within a reasonable timeframe, subject to any legal or operational requirements that may limit deletion of certain records.",
        ],
      },
      {
        heading: "Data Retention",
        body: [
          "We retain personal information for as long as necessary to fulfil orders, comply with legal, accounting or reporting obligations, and resolve disputes, after which it is securely deleted or anonymised.",
        ],
      },
      {
        heading: "Children's Privacy",
        body: [
          "Our services are intended for users who are at least 18 years old. We do not knowingly collect personal information from children, and we will delete any such information if we become aware of it.",
        ],
      },
      {
        heading: "Changes to This Policy",
        body: [
          "We may update this policy from time to time to reflect changes in our practices or legal requirements. The updated version will be posted on this page with a revised effective date.",
        ],
      },
      {
        heading: "Contact Us",
        body: [
          "If you have any questions about this Privacy Policy or how your data is handled, please reach out to us at support@pariyanioceans.store or through our Contact page. This policy should be reviewed by qualified counsel before publication.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    sections: [
      {
        heading: "Acceptance of Terms",
        body: [
          "By accessing or using the Pariyani Oceans website, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.",
        ],
      },
      {
        heading: "Eligibility",
        body: [
          "By using Pariyani Oceans, you confirm that you are at least 18 years old, capable of entering into a legally binding agreement, and that you will use the service lawfully and in good faith.",
        ],
      },
      {
        heading: "Account Registration",
        body: [
          "You are responsible for maintaining the confidentiality of your account details and for all activity that occurs under your account. Please notify us immediately of any unauthorised use.",
        ],
      },
      {
        heading: "Orders & Pricing",
        body: [
          "Product weights, cuts and appearance may vary naturally, as our products are fresh and prepared to order. Prices, availability and delivery times are subject to change without prior notice and are confirmed at checkout.",
          "We reserve the right to refuse or cancel any order, including in cases of pricing errors, suspected fraud, or if a product becomes unavailable after the order is placed.",
        ],
      },
      {
        heading: "Payment Terms",
        body: [
          "Orders are currently accepted through Cash on Delivery only. Additional payment modes such as UPI, cards and net banking are planned and will be enabled here once available.",
        ],
      },
      {
        heading: "Product Availability",
        body: [
          "Meat and seafood are perishable and subject to seasonal and supply availability. If an item you ordered is unavailable, we will contact you to offer a substitute, partial delivery or refund adjustment.",
        ],
      },
      {
        heading: "User Conduct",
        body: [
          "You agree not to misuse the website, interfere with its operation, or use it for any unlawful purpose, including submitting false information or attempting to access data that does not belong to you.",
        ],
      },
      {
        heading: "Intellectual Property",
        body: [
          "All content on this website, including text, images, logos and design, is the property of PARIYANI OCEANS PRIVATE LIMITED or its licensors and may not be copied or reused without permission.",
        ],
      },
      {
        heading: "Limitation of Liability",
        body: [
          "To the extent permitted by law, Pariyani Oceans is not liable for indirect or consequential losses arising from the use of our website or products, beyond the value of the order in question.",
        ],
      },
      {
        heading: "Governing Law",
        body: [
          "These terms are governed by the laws of India, with courts in Mumbai having exclusive jurisdiction over any disputes. Please obtain legal review before publishing this page.",
        ],
      },
      {
        heading: "Changes to Terms",
        body: [
          "We may revise these Terms & Conditions periodically. Continued use of the website after changes are posted constitutes acceptance of the updated terms.",
        ],
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    sections: [
      {
        heading: "General Information",
        body: [
          "The information on this website is provided in good faith for general informational purposes only. While we strive to keep content accurate and up to date, we make no representations or warranties of any kind about its completeness or accuracy.",
        ],
      },
      {
        heading: "Product Representation",
        body: [
          "Product images are for representation only and actual appearance, cut, size and packaging may vary. Meat and seafood are perishable, non-vegetarian products and should be stored and cooked according to the instructions provided with your order.",
        ],
      },
      {
        heading: "No Professional Advice",
        body: [
          "Information on this website, including any content about nutrition, storage or preparation, is not intended as legal, medical, dietary or food-safety advice. Please consult a qualified professional for guidance specific to your circumstances.",
        ],
      },
      {
        heading: "Third-Party Links",
        body: [
          "Our website may contain links to third-party sites that are not owned or controlled by Pariyani Oceans. We are not responsible for the content, policies or practices of any third-party websites.",
        ],
      },
      {
        heading: "Limitation of Liability",
        body: [
          "Under no circumstances shall Pariyani Oceans be liable for any loss or damage arising from reliance on information provided on this website. This content is a professional-quality template and should be reviewed by qualified counsel before publication.",
        ],
      },
    ],
  },
  shipping: {
    title: "Shipping & Delivery Policy",
    sections: [
      {
        heading: "Delivery Areas",
        body: [
          "We currently deliver to select Mumbai and surrounding pin codes. You can check serviceability for your area by entering your pincode at checkout.",
        ],
      },
      {
        heading: "Delivery Timelines",
        body: [
          "Delivery is typically same-day or within your chosen slot, subject to availability, weather conditions and traffic. Estimated delivery windows are shown at checkout and may occasionally shift during high-demand periods.",
        ],
      },
      {
        heading: "Packaging Standards",
        body: [
          "Products are packed in food-grade, leak-proof, insulated packaging with ice packs where appropriate, to maintain freshness and hygiene from our facility to your doorstep.",
        ],
      },
      {
        heading: "Delivery Charges",
        body: [
          "Free delivery applies above ₹499; a nominal delivery fee applies to smaller orders and is clearly shown at checkout before you confirm your order.",
        ],
      },
      {
        heading: "Failed Deliveries",
        body: [
          "If delivery cannot be completed due to an incorrect address, unavailability at the doorstep, or refusal to accept the order, we may charge a re-delivery fee or cancel the order at our discretion.",
        ],
      },
      {
        heading: "Order Tracking",
        body: [
          "You will receive updates on your order status via SMS or call. Please keep exact cash ready for Cash on Delivery when possible, and contact support promptly if a delivery is delayed or an order arrives damaged.",
        ],
      },
    ],
  },
  returns: {
    title: "Return & Refund Policy",
    sections: [
      {
        heading: "Eligibility for Returns",
        body: [
          "Because meat, poultry, fish and seafood are perishable, accepted products cannot be returned for preference, change of mind or over-ordering once delivered in good condition.",
        ],
      },
      {
        heading: "Reporting Issues",
        body: [
          "Please report damaged, spoiled, expired or incorrect products within 2–4 hours of delivery, along with clear photographs, by contacting our Customer Care team through the Contact page or phone.",
        ],
      },
      {
        heading: "Refund Process",
        body: [
          "If your report is verified, we may offer a replacement of the affected item or a refund, depending on availability and the nature of the issue. Our team will confirm the resolution with you directly.",
          "Approved refunds for Cash on Delivery orders are generally issued as store credit or another arrangement agreed with Customer Care, typically processed within 3–7 business days.",
        ],
      },
      {
        heading: "Non-Returnable Items",
        body: [
          "Products that have been opened, partially used or stored incorrectly after delivery are not eligible for return or refund, unless the issue is due to a verified quality or handling error on our part.",
        ],
      },
      {
        heading: "Cancellations",
        body: [
          "Orders can be cancelled free of charge before they are dispatched for delivery. Once an order has been packed or dispatched, cancellation may not be possible due to the perishable nature of our products.",
        ],
      },
    ],
  },
};

function ReviewsBlockLegacy({ product = false }: { product?: boolean }) {
  return (
    <section
      className={
        product
          ? "mt-12 border-t border-[#dfe6e3] pt-10"
          : "mt-14 rounded-[28px] bg-[#fffaf5] p-7 sm:p-10"
      }
    >
      <h2 className="text-3xl font-black text-[#0b3d5c]">
        {product ? "Reviews & Ratings" : "What Our Customers Say"}
      </h2>
      <p className="mt-3 text-sm text-[#587371]">
        4.6 ★ based on 1,200+ reviews
      </p>
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <article
            key={review.name}
            className="rounded-2xl bg-white p-5 shadow-sm"
          >
            <b className="text-[#0b3d5c]">{review.name}</b>
            <span className="ml-2 text-xs text-[#91a4a0]">{review.city}</span>
            <div className="mt-3 text-[#e49a27]">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>
            <p className="mt-3 text-sm leading-6 text-[#587371]">
              “{review.text}”
            </p>
            <p className="mt-3 text-[11px] text-[#91a4a0]">
              12 Jun 2026 · Verified customer
            </p>
          </article>
        ))}
      </div>
      <button className="mt-6 rounded-full bg-[#ff6b4a] px-5 py-3 text-xs font-bold text-white">
        Write a Review
      </button>
    </section>
  );
}

export function ProductPage({ title }: { title: string }) {
  const [weight, setWeight] = useState("500g");
  const { items, addItem, decrementItem } = useCart();
  const cartQty =
    items.find((item) => item.name === title && item.weight === weight)
      ?.qty ?? 0;
  return (
    <SiteLayout>
      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-20">
        <section className="grid gap-10 lg:grid-cols-2">
          <img
            src={getProductImage(title, 1)}
            alt={title}
            className="aspect-square w-full rounded-[28px] object-cover"
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1fa98f]">
              Fresh today · Non-veg
            </p>
            <h1 className="mt-3 text-4xl font-black text-[#0b3d5c]">{title}</h1>
            <p className="mt-5 text-3xl font-black text-[#0b3d5c]">
              ₹{getProductPrice(title)}{" "}
              <span className="text-base font-medium line-through">
                ₹{getProductMrp(title)}
              </span>
            </p>
            <div className="mt-6 flex gap-2">
              {["250g", "500g", "1kg"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setWeight(option)}
                  aria-pressed={weight === option}
                  className={`rounded-lg border px-5 py-3 text-sm font-bold transition ${weight === option ? "border-[#ff6b4a] bg-[#fff1ec] text-[#ff6b4a]" : "border-[#d9e3df] text-[#476568]"}`}
                >
                  {option}
                </button>
              ))}
            </div>
            {cartQty > 0 ? (
              <div className="mt-8 flex w-full items-center justify-between rounded-full bg-[#ff6b4a] py-2 text-white">
                <button
                  type="button"
                  onClick={() => decrementItem(title, weight)}
                  aria-label="Decrease quantity"
                  className="flex h-10 w-10 items-center justify-center"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="text-sm font-bold">{cartQty}</span>
                <button
                  type="button"
                  onClick={() => addItem(title, weight)}
                  aria-label="Increase quantity"
                  className="flex h-10 w-10 items-center justify-center"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => addItem(title, weight)}
                className="mt-8 w-full rounded-full bg-[#ff6b4a] py-4 text-sm font-bold text-white"
              >
                Add to Cart
              </button>
            )}
            <p className="mt-5 leading-7 text-[#587371]">
              Hygienically prepared, chilled and packed for freshness. This
              product is non-vegetarian and suitable for Cash on Delivery.
            </p>
          </div>
        </section>
        <ReviewsBlock product />
      </main>
    </SiteLayout>
  );
}

export function CartPage() {
  const { items, cartCount, addItem, decrementItem, removeItem } = useCart();
  const total = items.reduce(
    (sum, item) => sum + item.qty * getProductPrice(item.name),
    0,
  );
  return (
    <SiteLayout>
      <main className="mx-auto max-w-4xl px-5 py-12 lg:px-8 lg:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1fa98f]">
          Pariyani Oceans
        </p>
        <h1 className="mt-3 text-5xl font-black text-[#0b3d5c]">Your Cart</h1>
        {items.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-[#edf3f0] p-10 text-center">
            <p className="font-bold text-[#0b3d5c]">Your cart is empty</p>
            <p className="mt-2 text-sm text-[#587371]">
              Browse our products and add your favourites.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex rounded-full bg-[#ff6b4a] px-6 py-3 text-sm font-bold text-white"
            >
              Shop Products
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-10 divide-y divide-[#dfe6e3] rounded-2xl bg-white px-6">
              {items.map((item) => (
                <div
                  key={`${item.name}-${item.weight}`}
                  className="flex items-center gap-4 py-5"
                >
                  <img
                    src={getProductImage(item.name)}
                    alt={item.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-[#0b3d5c]">{item.name}</p>
                    <p className="text-xs text-[#91a4a0]">{item.weight}</p>
                    <div className="mt-2 flex items-center gap-3 rounded-full bg-[#edf3f0] px-1 py-1 w-fit">
                      <button
                        type="button"
                        onClick={() => decrementItem(item.name, item.weight)}
                        aria-label="Decrease quantity"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0b3d5c] shadow-sm"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-sm font-bold text-[#0b3d5c]">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => addItem(item.name, item.weight)}
                        aria-label="Increase quantity"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0b3d5c] shadow-sm"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="font-black text-[#0b3d5c]">
                    ₹{item.qty * getProductPrice(item.name)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.name, item.weight)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[#91a4a0] hover:bg-[#fff1ec] hover:text-[#ff6b4a]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between rounded-2xl bg-[#edf3f0] p-6">
              <p className="font-bold text-[#0b3d5c]">
                Total ({cartCount} items)
              </p>
              <p className="text-2xl font-black text-[#0b3d5c]">₹{total}</p>
            </div>
            <Link
              to="/checkout"
              className="mt-6 flex w-full items-center justify-center rounded-full bg-[#ff6b4a] py-4 text-sm font-bold text-white"
            >
              Proceed to Checkout
            </Link>
          </>
        )}
      </main>
    </SiteLayout>
  );
}

const paymentModes = [
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay in cash when your order arrives",
    icon: Banknote,
    enabled: true,
  },
  {
    id: "upi",
    label: "UPI",
    description: "Coming soon",
    icon: Smartphone,
    enabled: false,
  },
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "Coming soon",
    icon: CreditCard,
    enabled: false,
  },
  {
    id: "netbanking",
    label: "Net Banking",
    description: "Coming soon",
    icon: Landmark,
    enabled: false,
  },
];

export function CheckoutPage() {
  const { items, cartCount, clearCart } = useCart();
  const { user } = useAuth();
  const [payment, setPayment] = useState("cod");
  const [placed, setPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });
  const total = items.reduce(
    (sum, item) => sum + item.qty * getProductPrice(item.name),
    0,
  );

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.pincode.trim()
    )
      return;
    if (payment !== "cod") return;

    setIsLoading(true);
    try {
      // Submit order to backend
      const res = await fetch("http://localhost:3003/api/orders", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          customer: form.name,
          phone: form.phone,
          address: form.address,
          pincode: form.pincode,
          items: items.map(item => ({
            name: item.name,
            qty: item.qty,
            price: getProductPrice(item.name),
          })),
          total,
          paymentMode: payment,
        }),
      });

      if (res.ok) {
        clearCart();
        setPlaced(true);
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (err) {
      alert("Error placing order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user is logged in
  if (!user) {
    return (
      <SiteLayout>
        <main className="mx-auto max-w-2xl px-5 py-20 text-center lg:px-8">
          <div className="rounded-xl border-2 border-[#ff6b4a] bg-[#fff0ed] p-8">
            <h1 className="text-2xl font-black text-[#0b3d5c]">Login Required</h1>
            <p className="mt-3 text-[#587371]">You need to sign in to place an order</p>
            <Link
              to="/login"
              className="mt-6 inline-block rounded-full bg-[#1fa98f] px-6 py-3 font-bold text-white hover:bg-[#168575] transition"
            >
              Sign In Now
            </Link>
          </div>
        </main>
      </SiteLayout>
    );
  }

  if (placed) {
    return (
      <SiteLayout>
        <main className="mx-auto max-w-2xl px-5 py-20 text-center lg:px-8">
          <CheckCircle2 className="mx-auto text-[#1fa98f]" size={56} />
          <h1 className="mt-5 text-4xl font-black text-[#0b3d5c]">
            Order placed!
          </h1>
          <p className="mt-4 leading-7 text-[#587371]">
            Thanks {form.name}, your order will be delivered to {form.address}.
            Pay by Cash on Delivery when it arrives.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-full bg-[#ff6b4a] px-6 py-3 text-sm font-bold text-white"
          >
            Back to Home
          </Link>
        </main>
      </SiteLayout>
    );
  }

  if (items.length === 0) {
    return (
      <SiteLayout>
        <main className="mx-auto max-w-2xl px-5 py-20 text-center lg:px-8">
          <h1 className="text-4xl font-black text-[#0b3d5c]">
            Your cart is empty
          </h1>
          <p className="mt-4 leading-7 text-[#587371]">
            Add products to your cart before checking out.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-flex rounded-full bg-[#ff6b4a] px-6 py-3 text-sm font-bold text-white"
          >
            Shop Products
          </Link>
        </main>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <main className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1fa98f]">
          Pariyani Oceans
        </p>
        <h1 className="mt-3 text-4xl font-black text-[#0b3d5c] sm:text-5xl">
          Checkout
        </h1>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={submit} className="space-y-8">
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-black text-[#0b3d5c]">
                Delivery details
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <input
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  placeholder="Full name"
                  className="rounded-xl border border-[#d9e3df] px-4 py-3 text-sm sm:col-span-2"
                />
                <input
                  required
                  value={form.phone}
                  onChange={(event) =>
                    setForm({ ...form, phone: event.target.value })
                  }
                  placeholder="Phone number"
                  className="rounded-xl border border-[#d9e3df] px-4 py-3 text-sm"
                />
                <input
                  required
                  value={form.pincode}
                  onChange={(event) =>
                    setForm({ ...form, pincode: event.target.value })
                  }
                  placeholder="Pincode"
                  className="rounded-xl border border-[#d9e3df] px-4 py-3 text-sm"
                />
                <textarea
                  required
                  value={form.address}
                  onChange={(event) =>
                    setForm({ ...form, address: event.target.value })
                  }
                  placeholder="Full delivery address"
                  rows={3}
                  className="rounded-xl border border-[#d9e3df] px-4 py-3 text-sm sm:col-span-2"
                />
              </div>
            </section>
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-black text-[#0b3d5c]">
                Payment mode
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {paymentModes.map((mode) => {
                  const Icon = mode.icon;
                  const selected = payment === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      disabled={!mode.enabled}
                      aria-pressed={selected}
                      onClick={() => mode.enabled && setPayment(mode.id)}
                      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${!mode.enabled ? "cursor-not-allowed border-[#e5eae8] bg-[#f5f7f6] opacity-60" : selected ? "border-[#ff6b4a] bg-[#fff1ec]" : "border-[#d9e3df] hover:border-[#ff6b4a]"}`}
                    >
                      <Icon
                        size={20}
                        className={
                          selected && mode.enabled
                            ? "text-[#ff6b4a]"
                            : "text-[#476568]"
                        }
                      />
                      <span className="flex-1">
                        <span className="flex items-center gap-2 text-sm font-bold text-[#0b3d5c]">
                          {mode.label}
                          {!mode.enabled && (
                            <Lock size={12} className="text-[#91a4a0]" />
                          )}
                        </span>
                        <span className="mt-0.5 block text-xs text-[#91a4a0]">
                          {mode.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
            <button
              type="submit"
              disabled={isLoading || items.length === 0}
              className="w-full rounded-full bg-[#ff6b4a] py-4 text-sm font-bold text-white hover:bg-[#ff5633] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Placing Order...
                </span>
              ) : (
                `Place Order · Pay ₹${total} on Delivery`
              )}
            </button>
          </form>
          <aside className="h-fit rounded-2xl bg-[#edf3f0] p-6">
            <h2 className="text-lg font-black text-[#0b3d5c]">Order summary</h2>
            <div className="mt-5 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.name}-${item.weight}`}
                  className="flex items-center gap-3"
                >
                  <img
                    src={getProductImage(item.name)}
                    alt={item.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#0b3d5c]">
                      {item.name}
                    </p>
                    <p className="text-xs text-[#91a4a0]">
                      {item.weight} · Qty {item.qty}
                    </p>
                  </div>
                  <p className="text-sm font-black text-[#0b3d5c]">
                    ₹{item.qty * getProductPrice(item.name)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-[#dfe6e3] pt-4">
              <p className="font-bold text-[#0b3d5c]">
                Total ({cartCount} items)
              </p>
              <p className="text-xl font-black text-[#0b3d5c]">₹{total}</p>
            </div>
          </aside>
        </div>
      </main>
    </SiteLayout>
  );
}

export function SitePage({
  pageKey,
  title,
}: {
  pageKey?: string;
  title: string;
}) {
  if (pageKey === "faq") return <FAQPage />;
  if (pageKey === "blog") return <BlogPage />;
  if (pageKey === "contact") return <ContactPage />;
  if (pageKey === "careers") return <CareersPage />;
  if (pageKey && legalContent[pageKey]) {
    const legal = legalContent[pageKey];
    return (
      <SiteLayout>
        <main className="mx-auto max-w-3xl px-5 py-12 lg:px-8 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1fa98f]">
            PARIYANI OCEANS PRIVATE LIMITED
          </p>
          <h1 className="mt-3 text-5xl font-black text-[#0b3d5c]">
            {legal.title}
          </h1>
          <p className="mt-4 text-sm text-[#91a4a0]">
            Effective date: To be confirmed
          </p>
          <div className="mt-10 space-y-8 rounded-3xl bg-white p-7 sm:p-10">
            {legal.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-lg font-black text-[#0b3d5c]">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3 leading-7 text-[#587371]">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </SiteLayout>
    );
  }
  const data = pageKey ? content[pageKey] : undefined;
  return (
    <SiteLayout>
      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-20">
        {data ? (
          <>
            <section className="grid items-center gap-10 rounded-[30px] bg-[#0b3d5c] p-7 text-white sm:p-12 lg:grid-cols-2 lg:p-16">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#62dfc2]">
                  {data.eyebrow}
                </p>
                <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
                  {data.title}
                </h1>
                <p className="mt-6 max-w-lg leading-7 text-[#c9e1e1]">
                  {data.description}
                </p>
              </div>
              <img
                src={data.image}
                alt={data.title}
                className="h-[310px] w-full rounded-[22px] object-cover"
              />
            </section>
            <section className="mx-auto mt-12 max-w-3xl">
              <h2 className="text-2xl font-black text-[#0b3d5c]">
                {data.eyebrow}
              </h2>
              <p className="mt-4 leading-7 text-[#587371]">{data.body}</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {data.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="rounded-2xl bg-white p-5 text-sm font-semibold leading-6 text-[#0b3d5c]"
                  >
                    {bullet}
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="rounded-[30px] bg-[#edf3f0] px-7 py-16 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1fa98f]">
              PARIYANI OCEANS
            </p>
            <h1 className="mt-4 text-5xl font-black text-[#0b3d5c]">{title}</h1>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-[#587371]">
              This page is ready for your next content update. Explore our
              products or contact the Pariyani Oceans team for help.
            </p>
          </section>
        )}
      </main>
    </SiteLayout>
  );
}
