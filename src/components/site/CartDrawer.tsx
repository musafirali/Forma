import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { X, Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/products";

export function CartDrawer() {
  const { isOpen, close, detailed, subtotal, update, remove, itemCount } =
    useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  return (
    <>
      <div
        aria-hidden={!isOpen}
        onClick={close}
        className={`fixed inset-0 z-50 bg-ink/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-[440px] bg-ivory shadow-[ -20px_0_60px_-30px_rgba(0,0,0,0.25)] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between px-6 h-16 rule-b">
            <span className="eyebrow">Cart · {itemCount}</span>
            <button
              type="button"
              onClick={close}
              aria-label="Close cart"
              className="p-1 text-ink/70 hover:text-ink"
            >
              <X className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </header>

          {detailed.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
              <p className="font-display text-2xl text-ink">Your cart is empty.</p>
              <p className="mt-3 text-sm text-charcoal max-w-xs">
                A considered collection of objects — explore the catalogue to begin.
              </p>
              <Link
                to="/shop"
                onClick={close}
                className="mt-8 inline-flex items-center justify-center bg-ink px-8 py-3 text-[12px] tracking-[0.18em] uppercase text-ivory hover:bg-charcoal transition-colors"
              >
                Browse the shop
              </Link>
            </div>
          ) : (
            <>
              <ul className="flex-1 overflow-y-auto divide-y divide-rule px-6">
                {detailed.map(({ product, quantity, lineTotal }) => (
                  <li key={product.slug} className="flex gap-4 py-5">
                    <Link
                      to="/products/$slug"
                      params={{ slug: product.slug }}
                      onClick={close}
                      className="shrink-0"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        width={96}
                        height={120}
                        loading="lazy"
                        className="h-[120px] w-[96px] object-cover bg-stone-warm"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link
                            to="/products/$slug"
                            params={{ slug: product.slug }}
                            onClick={close}
                            className="font-display text-[17px] text-ink truncate"
                          >
                            {product.name}
                          </Link>
                          <p className="text-[12px] text-charcoal mt-0.5">
                            {product.series} · {product.category}
                          </p>
                        </div>
                        <p className="text-[13px] text-ink tabular-nums shrink-0">
                          {formatINR(lineTotal)}
                        </p>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <div className="inline-flex items-center border border-rule">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => update(product.slug, quantity - 1)}
                            className="px-2.5 py-1.5 text-ink/70 hover:text-ink"
                          >
                            <Minus className="h-3.5 w-3.5" strokeWidth={1.25} />
                          </button>
                          <span className="w-7 text-center text-[13px] tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => update(product.slug, quantity + 1)}
                            className="px-2.5 py-1.5 text-ink/70 hover:text-ink"
                          >
                            <Plus className="h-3.5 w-3.5" strokeWidth={1.25} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(product.slug)}
                          className="text-[12px] tracking-wide text-charcoal underline-offset-4 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <footer className="rule-t px-6 py-5 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow">Subtotal</span>
                  <span className="font-display text-xl text-ink tabular-nums">
                    {formatINR(subtotal)}
                  </span>
                </div>
                <p className="text-[12px] text-charcoal">
                  Shipping and taxes calculated at checkout. Complimentary delivery on orders above ₹15,000.
                </p>
                <Link
                  to="/checkout"
                  onClick={close}
                  className="flex items-center justify-center bg-ink py-4 text-[12px] tracking-[0.18em] uppercase text-ivory hover:bg-charcoal transition-colors"
                >
                  Checkout
                </Link>
                <Link
                  to="/cart"
                  onClick={close}
                  className="flex items-center justify-center border border-ink/80 py-4 text-[12px] tracking-[0.18em] uppercase text-ink hover:bg-ink hover:text-ivory transition-colors"
                >
                  View cart
                </Link>
              </footer>
            </>
          )}
        </div>
      </aside>
    </>
  );
}