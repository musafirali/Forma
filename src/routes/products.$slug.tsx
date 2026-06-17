import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Truck, ShieldCheck, Recycle } from "lucide-react";
import {
  formatINR,
  getProduct,
  relatedProducts,
  type Product,
} from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product, related: relatedProducts(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} ${product.series} — FORMA` },
        { name: "description", content: product.tagline },
        {
          property: "og:title",
          content: `${product.name} ${product.series} — FORMA`,
        },
        { property: "og:description", content: product.tagline },
        { property: "og:image", content: product.image },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${product.slug}` },
        { property: "product:price:amount", content: String(product.price) },
        { property: "product:price:currency", content: "INR" },
      ],
      links: [{ rel: "canonical", href: `/products/${product.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${product.name} ${product.series}`,
            description: product.tagline,
            category: product.category,
            material: product.material,
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: product.price,
              availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
          }),
        },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="px-5 md:px-10 py-32 text-center">
      <p className="eyebrow">Not found</p>
      <h1 className="font-display text-4xl text-ink mt-4">
        This object is no longer available.
      </h1>
      <Link
        to="/shop"
        className="mt-10 inline-flex items-center bg-ink px-8 py-3 text-[12px] tracking-[0.18em] uppercase text-ivory hover:bg-charcoal transition-colors"
      >
        Return to shop
      </Link>
    </div>
  ),
});

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // The catalogue ships with one primary image per product; we present the
  // same image with three crop framings to mirror a real PDP gallery.
  const gallery = [product.image, product.image, product.image];

  return (
    <>
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="px-5 md:px-10 pt-8 text-[12px] tracking-wide text-charcoal"
      >
        <ol className="flex items-center gap-2">
          <li>
            <Link to="/" className="hover:text-ink">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/shop" className="hover:text-ink">
              Shop
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              to="/shop"
              search={{ c: product.category }}
              className="hover:text-ink"
            >
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">{product.name}</li>
        </ol>
      </nav>

      <section className="px-5 md:px-10 pt-6 md:pt-10 grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-16">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="aspect-[4/5] bg-stone-warm overflow-hidden">
            <img
              src={gallery[activeImage]}
              alt={`${product.name} ${product.series}`}
              width={1280}
              height={1600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {gallery.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`aspect-[4/5] overflow-hidden bg-stone-warm transition-opacity ${
                  activeImage === i ? "opacity-100" : "opacity-60 hover:opacity-90"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <img
                  src={src}
                  alt=""
                  width={400}
                  height={500}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  style={{
                    objectPosition:
                      i === 0 ? "center" : i === 1 ? "top" : "bottom",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Buy Box */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">{product.category} · {product.series}</p>
          <h1 className="font-display text-4xl md:text-5xl text-ink mt-4 leading-[1.05]">
            {product.name}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-charcoal">
            {product.tagline}
          </p>

          <div className="mt-8 flex items-baseline gap-4">
            <p className="font-display text-2xl text-ink tabular-nums">
              {formatINR(product.price)}
            </p>
            <p className="text-[12px] text-charcoal tracking-wide">
              Inclusive of all taxes
            </p>
          </div>

          <div className="mt-8 flex items-center gap-2 text-[12px] tracking-wide">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-700"
              aria-hidden="true"
            />
            <span className="text-ink">
              In stock · ships in 3–5 business days
            </span>
          </div>

          <div className="mt-8 flex items-stretch gap-3">
            <div className="inline-flex items-center border border-ink/80">
              <button
                type="button"
                aria-label="Decrease"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3.5 py-3 text-ink/70 hover:text-ink"
              >
                <Minus className="h-3.5 w-3.5" strokeWidth={1.25} />
              </button>
              <span className="w-10 text-center text-[14px] tabular-nums">
                {qty}
              </span>
              <button
                type="button"
                aria-label="Increase"
                onClick={() => setQty((q) => q + 1)}
                className="px-3.5 py-3 text-ink/70 hover:text-ink"
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={1.25} />
              </button>
            </div>
            <button
              type="button"
              onClick={() => add(product.slug, qty)}
              className="flex-1 bg-ink text-ivory text-[12px] tracking-[0.18em] uppercase hover:bg-charcoal transition-colors"
            >
              Add to cart — {formatINR(product.price * qty)}
            </button>
          </div>

          {/* Specs */}
          <dl className="mt-12 divide-y divide-rule rule-t rule-b">
            <Spec label="Material" value={product.material} />
            <Spec label="Dimensions" value={product.dimensions} />
            <Spec label="Weight" value={product.weight} />
            <Spec label="Finish" value={product.finish} />
            <Spec label="Care" value={product.care} />
          </dl>

          {/* Description */}
          <div className="mt-10">
            <p className="eyebrow">About this object</p>
            <p className="mt-4 text-[15px] leading-[1.75] text-charcoal">
              {product.description}
            </p>
          </div>

          {/* Service */}
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-[12px] tracking-wide text-charcoal">
            <Service
              icon={<Truck className="h-4 w-4" strokeWidth={1.25} />}
              title="Shipping"
              text="Free pan-India shipping above ₹15,000"
            />
            <Service
              icon={<ShieldCheck className="h-4 w-4" strokeWidth={1.25} />}
              title="Quality"
              text="Inspected by hand at our studio"
            />
            <Service
              icon={<Recycle className="h-4 w-4" strokeWidth={1.25} />}
              title="Returns"
              text="14-day returns on unused pieces"
            />
          </ul>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="px-5 md:px-10 mt-32 md:mt-40">
          <div className="flex items-end justify-between gap-6 mb-10">
            <h2 className="font-display text-2xl md:text-3xl text-ink">
              Also from the collection
            </h2>
            <Link
              to="/shop"
              className="hidden md:inline-block text-[12px] tracking-[0.18em] uppercase text-ink underline underline-offset-[6px] decoration-rule hover:decoration-ink"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-12 md:gap-x-8">
            {related.map((p: Product, i: number) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-6 py-4">
      <dt className="eyebrow self-center">{label}</dt>
      <dd className="text-[14px] text-ink leading-relaxed">{value}</dd>
    </div>
  );
}

function Service({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <li>
      <div className="text-ink/80">{icon}</div>
      <p className="mt-3 text-ink text-[13px] tracking-wide">{title}</p>
      <p className="mt-1 text-charcoal text-[12px]">{text}</p>
    </li>
  );
}