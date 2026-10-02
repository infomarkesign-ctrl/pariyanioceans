import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  LogOut,
  Mail,
  Menu,
  PackageCheck,
  Phone,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  UserRound,
  Waves,
  X,
} from "lucide-react";
import {
  Dropdown,
  ProductCard,
  ReviewsBlock,
  aboutLinks,
  companyLinks,
  productCatalog,
  productLinks,
} from "./SitePage";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const images = [
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1920&q=90",
  "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=1920&q=90",
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=90",
  "https://images.unsplash.com/photo-1588347818036-558601350947?auto=format&fit=crop&w=1920&q=90",
];
const slides = [
  [
    "Ocean fresh, always",
    "Ocean Fresh Seafood, Delivered to Your Door",
    "Hand-selected catch, delivered same day",
    "Shop Seafood",
    "/products/seafood",
  ],
  [
    "Farm to family",
    "Farm Fresh Chicken & Poultry, Every Day",
    "Hygienically processed, delivered chilled",
    "Shop Poultry",
    "/products/poultry",
  ],
  [
    "Premium cuts",
    "Premium Mutton & Meat Cuts",
    "Sourced fresh, cut to your preference",
    "Shop Meat",
    "/products/meat",
  ],
  [
    "Our standards",
    "Hygienically Packed. FSSAI Certified.",
    "Freshness guaranteed on every order",
    "Learn About Our Quality",
    "/quality-hygiene",
  ],
] as const;
const allProducts = Object.entries(productCatalog).flatMap(
  ([category, names]) =>
    names.map((name, index) => ({ name, category, index })),
);
const categoryImages: Record<string, string> = {
  Meat: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=800&q=85",
  Poultry:
    "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=85",
  Fish: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=85",
  Seafood:
    "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=85",
  Processed:
    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85",
};

function Footer() {
  const legal = [
    ["Privacy Policy", "/privacy"],
    ["Terms & Conditions", "/terms"],
    ["Disclaimer", "/disclaimer"],
    ["Shipping & Delivery Policy", "/shipping"],
    ["Return & Refund Policy", "/returns"],
  ];
  return (
    <footer
      id="footer"
      className="bg-[#062e46] px-5 pb-8 pt-14 text-white lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="text-xl font-black tracking-[0.15em]">
              PARIYANI OCEANS
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
                key={path}
                to={path}
                className="block py-1.5 text-sm text-[#9bb9b9] hover:text-white"
              >
                {name}
              </Link>
            ))}
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold">Company</h3>
            {companyLinks
              .concat([["About Us", "/about"]])
              .map(([name, path]) => (
                <Link
                  key={path}
                  to={path}
                  className="block py-1.5 text-sm text-[#9bb9b9] hover:text-white"
                >
                  {name}
                </Link>
              ))}
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold">Policies & support</h3>
            {legal.map(([name, path]) => (
              <Link
                key={path}
                to={path}
                className="block py-1.5 text-sm text-[#9bb9b9] hover:text-white"
              >
                {name}
              </Link>
            ))}
            <p className="mt-4 text-sm text-[#9bb9b9]">
              7th Floor, 706, Rapid Heights, Kolsa Street, Pydhonie, Mumbai –
              400003
            </p>
            <p className="mt-3 text-sm text-[#9bb9b9]">
              Customer care · 9am–9pm
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-7 text-xs text-[#86a7a8] sm:flex-row sm:justify-between">
          <p>© 2026 PARIYANI OCEANS PRIVATE LIMITED | GST: 27AARCP2277N1ZK | All Rights Reserved</p>
          <p>Cash on Delivery only.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [menu, setMenu] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!paused) setSlide((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused]);
  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allProducts.filter(
      (product) =>
        (category === "All" || product.category === category) &&
        (!query ||
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)),
    );
  }, [search, category]);
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const current = slides[slide];
  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#212529]">
      <div className="bg-[#0b3d5c] px-4 py-2 text-center text-[11px] font-bold tracking-[0.12em] text-white">
        FRESH CATCH, DELIVERED DAILY{" "}
        <span className="mx-2 text-[#55d8be]">•</span> FSSAI CERTIFIED{" "}
        <span className="mx-2 text-[#55d8be]">•</span> CASH ON DELIVERY
        AVAILABLE
      </div>
      <header className="sticky top-0 z-40 border-b border-[#dfe6e3] bg-[#f8f7f4]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-4 lg:px-8">
          <button
            aria-label="Open menu"
            className="p-2 lg:hidden"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link to="/" className="shrink-0 leading-none">
            <span className="block text-[17px] font-black tracking-[0.15em] text-[#0b3d5c] sm:text-xl">
              PARIYANI
            </span>
            <span className="mt-1 flex items-center gap-1 text-[9px] font-bold tracking-[0.42em] text-[#1fa98f]">
              <Waves size={12} /> OCEANS
            </span>
          </Link>
          <div className="relative hidden max-w-md flex-1 md:block">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c9695]"
              size={18}
            />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                scrollTo("shop");
              }}
              placeholder="Search for chicken, fish, prawns..."
              className="h-11 w-full rounded-full border border-[#d9e3df] bg-white pl-11 pr-4 text-sm outline-none focus:border-[#1fa98f]"
            />
          </div>
          <nav className="ml-auto hidden items-center gap-5 lg:flex">
            <Link to="/" className="text-sm font-semibold text-[#476568]">
              Home
            </Link>
            <Dropdown label="Products" links={productLinks} />
            <Dropdown label="About" links={aboutLinks} />
            <Dropdown label="Company" links={companyLinks} />
          </nav>
          {user ? (
            <div className="hidden items-center gap-3 sm:flex">
              <div className="text-right">
                <p className="text-xs font-medium text-[#0b3d5c]">{user.name || user.identifier.split("@")[0]}</p>
                <p className="text-[10px] text-[#7c9695]">{user.identifier}</p>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="p-2 text-[#0b3d5c] hover:text-[#1fa98f] hover:bg-[#f0f3f1] rounded-lg transition"
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden rounded-full bg-[#1fa98f] px-4 py-2 text-sm font-bold text-white hover:bg-[#16a78a] transition sm:block"
            >
              Login
            </button>
          )}
          <Link
            to="/account"
            className="hidden p-2 text-[#0b3d5c] sm:block"
            aria-label="Wishlist"
          >
            <Heart size={19} />
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center gap-2 rounded-full bg-[#ff6b4a] px-4 py-2.5 text-sm font-bold text-white"
          >
            <ShoppingBag size={18} />
            <span className="hidden sm:inline">Cart</span>
            <span className="absolute -right-2 -top-2 rounded-full bg-[#0b3d5c] px-1.5 py-1 text-[10px]">
              {cartCount}
            </span>
          </Link>
        </div>
        {menu && (
          <div className="border-t bg-white px-5 py-4 lg:hidden">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2"
                size={16}
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search fresh cuts"
                className="h-10 w-full rounded-lg border pl-9"
              />
            </div>
            <div className="mt-3 flex gap-5 text-sm font-semibold">
              <Link to="/products">Products</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        )}
      </header>
      <main>
        <section
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mx-auto max-w-7xl overflow-hidden px-5 pb-12 pt-7 lg:px-8 lg:pb-20"
        >
          <div className="relative min-h-[490px] overflow-hidden rounded-[28px] px-8 py-12 text-white sm:min-h-[570px] sm:px-14">
            <img
              src={images[slide]}
              alt={current[1]}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b3d5c] via-[#0b3d5c]/80 to-[#0b3d5c]/20" />
            <div className="relative z-10 flex min-h-[390px] max-w-3xl flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#62dfc2]">
                {current[0]}
              </p>
              <h1 className="mt-5 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                {current[1]}
              </h1>
              <p className="mt-6 max-w-md text-base text-[#c9e1e1] sm:text-lg">
                {current[2]}
              </p>
              <Link
                to={current[4]}
                className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#ff6b4a] px-6 py-3.5 font-bold"
              >
                {current[3]} <ArrowRight size={18} />
              </Link>
            </div>
            <div className="absolute bottom-7 right-7 z-20 flex items-center gap-3">
              <button
                aria-label="Previous slide"
                onClick={() =>
                  setSlide((slide - 1 + slides.length) % slides.length)
                }
                className="rounded-full bg-white/15 p-2"
              >
                <ChevronLeft size={18} />
              </button>
              {slides.map((item, index) => (
                <button
                  aria-label={`Go to slide ${index + 1}`}
                  key={item[1]}
                  onClick={() => setSlide(index)}
                  className={`h-2 rounded-full ${slide === index ? "w-8 bg-[#ff6b4a]" : "w-2 bg-white/60"}`}
                />
              ))}
              <button
                aria-label="Next slide"
                onClick={() => setSlide((slide + 1) % slides.length)}
                className="rounded-full bg-white/15 p-2"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>
        <section className="border-y border-[#dfe6e3] bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y px-5 py-5 sm:grid-cols-4 lg:px-8">
            {[
              [Sparkles, "100% Fresh"],
              [ShieldCheck, "Hygienically packed"],
              [Truck, "Same-day delivery"],
              [PackageCheck, "COD available"],
            ].map(([Icon, title]) => (
              <div
                key={title as string}
                className="flex items-center gap-3 px-3 py-3 text-sm font-bold text-[#0b3d5c]"
              >
                <Icon size={21} className="text-[#1fa98f]" />
                {title as string}
              </div>
            ))}
          </div>
        </section>
        <section
          id="categories"
          className="mx-auto max-w-7xl px-5 py-16 lg:px-8"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1fa98f]">
            Find your favourite
          </p>
          <h2 className="mt-2 text-4xl font-black text-[#0b3d5c]">
            Shop by category
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {Object.keys(productCatalog).map((name) => (
              <button
                key={name}
                onClick={() => {
                  setCategory(name);
                  scrollTo("shop");
                }}
                className="group relative aspect-square overflow-hidden rounded-2xl text-left"
              >
                <img
                  src={categoryImages[name]}
                  alt={name}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b3d5c]/80 to-transparent" />
                <span className="absolute bottom-4 left-4 text-lg font-bold text-white">
                  {name}
                </span>
              </button>
            ))}
          </div>
        </section>
        <section id="shop" className="bg-[#edf3f0] px-5 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1fa98f]">
                  Fresh picks
                </p>
                <h2 className="mt-2 text-4xl font-black text-[#0b3d5c]">
                  Bestsellers
                </h2>
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {["All", ...Object.keys(productCatalog)].map((name) => (
                  <button
                    key={name}
                    onClick={() => setCategory(name)}
                    className={`rounded-full px-4 py-2 text-xs font-bold ${category === name ? "bg-[#0b3d5c] text-white" : "bg-white text-[#476568]"}`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
            {visible.length ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {visible.slice(0, 12).map((product) => (
                  <ProductCard
                    key={product.name}
                    name={product.name}
                    index={product.index}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl bg-white p-10 text-center">
                <p className="font-bold text-[#0b3d5c]">
                  No products found for “{search}”
                </p>
                <p className="mt-2 text-sm text-[#587371]">
                  Try browsing one of the categories above.
                </p>
              </div>
            )}
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            <Link to="/sustainability" className="rounded-3xl bg-[#dcece5] p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1fa98f]">
                Our commitment
              </p>
              <h2 className="mt-3 text-3xl font-black text-[#0b3d5c]">
                Better food, better future.
              </h2>
              <p className="mt-4 leading-7 text-[#587371]">
                Responsible sourcing and thoughtful packaging are part of every
                step.
              </p>
            </Link>
            <Link
              to="/quality-hygiene"
              className="rounded-3xl bg-[#0b3d5c] p-8 text-white"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-[#62dfc2]">
                Quality & food safety
              </p>
              <h2 className="mt-3 text-3xl font-black">Clean by design.</h2>
              <p className="mt-4 leading-7 text-[#c9e1e1]">
                Hygienic processing, FSSAI compliance and cold-chain care.
              </p>
            </Link>
          </div>
          <ReviewsBlock />
        </section>
      </main>
      <Footer />
    </div>
  );
}
