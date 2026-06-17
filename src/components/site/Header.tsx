import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { CartDrawer } from "./CartDrawer";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "Collections", params: { search: { c: "Vessels" } } },
  { to: "/about", label: "About" },
  { to: "/journal", label: "Journal" },
];

export function Header() {
  const { itemCount, open } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur rule-b">
        <div className="mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 md:px-10 h-16 md:h-20">
          <div className="flex items-center gap-6">
            <button
              type="button"
              className="md:hidden -ml-1 p-1 text-ink"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" strokeWidth={1.25} />
            </button>
            <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-wide text-ink/80">
              <Link
                to="/shop"
                className="hover:text-ink transition-colors"
                activeProps={{ className: "text-ink" }}
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="hover:text-ink transition-colors"
                activeProps={{ className: "text-ink" }}
              >
                About
              </Link>
              <Link
                to="/journal"
                className="hover:text-ink transition-colors"
                activeProps={{ className: "text-ink" }}
              >
                Journal
              </Link>
            </nav>
          </div>

          <Link
            to="/"
            className="font-display text-[22px] md:text-[26px] tracking-[0.18em] text-ink font-medium"
            aria-label="FORMA — Home"
          >
            FORMA
          </Link>

          <div className="flex items-center justify-end gap-6 text-[13px] tracking-wide text-ink/80">
            <Link
              to="/about"
              className="hidden md:inline hover:text-ink transition-colors"
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={open}
              className="relative hover:text-ink transition-colors tabular-nums"
              aria-label={`Cart, ${itemCount} items`}
            >
              Cart <span className="text-ink">({itemCount})</span>
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-ivory animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-5 h-16 rule-b">
            <span className="font-display text-[22px] tracking-[0.18em] text-ink">
              FORMA
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="p-1 text-ink"
            >
              <X className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>
          <nav className="flex flex-col px-5">
            {[
              { to: "/shop", label: "Shop" },
              { to: "/about", label: "About" },
              { to: "/journal", label: "Journal" },
              { to: "/cart", label: "Cart" },
            ].map((item) => (
              <Link
                key={item.to + item.label}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="font-display text-3xl text-ink py-6 rule-b"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <CartDrawer />
    </>
  );
}

export { nav };