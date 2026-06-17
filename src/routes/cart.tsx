import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatINR, products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — FORMA" },
      { name: "description", content: "Review your selected objects before checkout." },
      { property: "og:title", content: "Cart — FORMA" },
      { property: "og:url", content: "/cart" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

const SHIPPING_THRESHOLD = 15000;
const SHIPPING_FEE = 350;

function CartPage() {
  const { detailed, subtotal, update, remove, itemCount } = useCart();

  if (detailed.length === 0) {
    const suggestions = products.slice(0, 4);
    return (
      <section className="px-5 md:px-10 py-20 md:py-28">
        <div className="text-center max-w-md mx-auto">
          <p className="eyebrow">Cart</p>
          <h1 className="font-display text-4xl md:text-5xl text-ink mt-4">
            Your cart is empty.
          </h1>
          <p className="mt-4 text-charcoal">
            A considered collection of objects — explore the catalogue to begin.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center bg-ink px-8 py-3 text-[12px] tracking-[0.18em] uppercase text-ivory hover:bg-charcoal transition-colors"
          >
            Browse the shop
          </Link>
        </div>
        <div className="mt-24">
          <p className="eyebrow text-center">A few suggestions</p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-12 md:gap-x-8">
            {suggestions.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const toFreeShipping = Math.max(0, SHIPPING_THRESHOLD - subtotal);

  return (
    <section className="px-5 md:px-10 pt-12 md:pt-20 pb-24">
      <header className="rule-b pb-8">
        <p className="eyebrow">Cart</p>
        <h1 className="font-display text-4xl md:text-5xl text-ink mt-3">
          Your bag · {itemCount} {itemCount === 1 ? "object" : "objects"}
        </h1>
      </header>

      <div className="mt-10 grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-start">
        <ul className="divide-y divide-rule rule-b">
          {detailed.map(({ product, quantity, lineTotal }) => (
            <li
              key={product.slug}
              className="grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr_auto] gap-5 md:gap-8 py-8"
            >
              <Link
                to="/products/$slug"
                params={{ slug: product.slug }}
                className="block"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={500}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover bg-stone-warm"
                />
              </Link>
              <div className="min-w-0">
                <Link
                  to="/products/$slug"
                  params={{ slug: product.slug }}
                  className="font-display text-xl md:text-2xl text-ink"
                >
                  {product.name}
                  <span className="text-charcoal/70"> · {product.series}</span>
                </Link>
                <p className="mt-1 text-[12px] tracking-wide text-charcoal">
                  {product.category} · {product.material.split(",")[0]}
                </p>
                <p className="mt-4 text-[13px] text-charcoal max-w-md hidden md:block">
                  {product.tagline}
                </p>
                <div className="mt-6 flex items-center gap-5">
                  <div className="inline-flex items-center border border-rule">
                    <button
                      type="button"
                      aria-label="Decrease"
                      onClick={() => update(product.slug, quantity - 1)}
                      className="px-2.5 py-2 text-ink/70 hover:text-ink"
                    >
                      <Minus className="h-3.5 w-3.5" strokeWidth={1.25} />
                    </button>
                    <span className="w-9 text-center text-[13px] tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase"
                      onClick={() => update(product.slug, quantity + 1)}
                      className="px-2.5 py-2 text-ink/70 hover:text-ink"
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={1.25} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(product.slug)}
                    className="inline-flex items-center gap-1.5 text-[12px] tracking-wide text-charcoal hover:text-ink"
                  >
                    <X className="h-3.5 w-3.5" strokeWidth={1.25} /> Remove
                  </button>
                </div>
              </div>
              <div className="col-span-2 md:col-span-1 md:text-right font-display text-xl text-ink tabular-nums">
                {formatINR(lineTotal)}
              </div>
            </li>
          ))}
        </ul>

        <aside className="bg-stone-warm/50 p-7 md:p-9">
          <p className="eyebrow">Order summary</p>
          <dl className="mt-6 space-y-3 text-[14px]">
            <div className="flex justify-between">
              <dt className="text-charcoal">Subtotal</dt>
              <dd className="text-ink tabular-nums">{formatINR(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-charcoal">Shipping</dt>
              <dd className="text-ink tabular-nums">
                {shipping === 0 ? "Complimentary" : formatINR(shipping)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-charcoal">Taxes</dt>
              <dd className="text-charcoal">Included</dd>
            </div>
          </dl>

          {toFreeShipping > 0 ? (
            <div className="mt-6">
              <div className="h-px bg-rule" />
              <p className="mt-4 text-[12px] text-charcoal leading-relaxed">
                Add <span className="text-ink">{formatINR(toFreeShipping)}</span> more
                for complimentary pan-India shipping.
              </p>
            </div>
          ) : (
            <p className="mt-6 text-[12px] text-charcoal">
              You've qualified for complimentary shipping.
            </p>
          )}

          <div className="mt-7 rule-t pt-5 flex items-baseline justify-between">
            <span className="eyebrow">Total</span>
            <span className="font-display text-2xl text-ink tabular-nums">
              {formatINR(total)}
            </span>
          </div>

          <Link
            to="/checkout"
            className="mt-7 flex items-center justify-center bg-ink py-4 text-[12px] tracking-[0.18em] uppercase text-ivory hover:bg-charcoal transition-colors"
          >
            Proceed to checkout
          </Link>
          <Link
            to="/shop"
            className="mt-3 flex items-center justify-center text-[12px] tracking-[0.18em] uppercase text-ink underline underline-offset-[6px] decoration-rule hover:decoration-ink"
          >
            Continue shopping
          </Link>

          <p className="mt-6 text-[11px] text-charcoal leading-relaxed">
            Secure checkout · UPI · Cards · Net Banking · Wallets
          </p>
        </aside>
      </div>
    </section>
  );
}