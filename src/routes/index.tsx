import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/site/ProductCard";
import { products, categories } from "@/lib/products";
import heroImg from "@/assets/hero.jpg";
import materialsImg from "@/assets/materials.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FORMA — Contemporary objects for modern living" },
      {
        name: "description",
        content:
          "Sculptural home objects, tabletop pieces, lighting and desk objects. Made in small runs in Bengaluru.",
      },
      { property: "og:title", content: "FORMA — Contemporary objects for modern living" },
      {
        property: "og:description",
        content:
          "Sculptural home objects, tabletop pieces, lighting and desk objects.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const featured = products.slice(0, 4);
  const bestsellers = products.filter((p) => p.bestseller);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-0 items-stretch min-h-[78vh]">
          <div className="order-2 lg:order-1 flex flex-col justify-end px-6 md:px-12 lg:px-16 py-12 lg:py-20">
            <p className="eyebrow">Volume Ⅰ — Spring Collection</p>
            <h1 className="font-display mt-6 text-[44px] leading-[1.02] md:text-[64px] lg:text-[76px] text-ink">
              Objects, considered<br />
              and made to last.
            </h1>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-charcoal">
              FORMA is a small studio in Bengaluru making contemporary objects in
              stone, brass, ceramic and wood. Each piece is produced in a limited
              run and finished by hand.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center bg-ink px-9 py-4 text-[12px] tracking-[0.18em] uppercase text-ivory hover:bg-charcoal transition-colors"
              >
                Shop the collection
              </Link>
              <Link
                to="/about"
                className="text-[12px] tracking-[0.18em] uppercase text-ink underline-offset-[6px] underline decoration-rule hover:decoration-ink"
              >
                The studio
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative bg-stone-warm">
            <img
              src={heroImg}
              alt="A travertine plinth holding a ceramic vessel and a brass bowl in a quiet, naturally lit room."
              width={1920}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Objects */}
      <section className="px-5 md:px-10 mt-24 md:mt-32">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="eyebrow">Featured</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink mt-3">
              New this season.
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:inline-block text-[12px] tracking-[0.18em] uppercase text-ink underline underline-offset-[6px] decoration-rule hover:decoration-ink"
          >
            View all eight objects
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-12 md:gap-x-8">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mt-32 md:mt-40 px-5 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-5 rule-t rule-b divide-x divide-rule">
          {categories.map((c) => (
            <Link
              key={c}
              to="/shop"
              search={{ c }}
              className="group block px-4 py-8 md:py-12 text-center hover:bg-stone-warm/60 transition-colors"
            >
              <p className="font-display text-xl md:text-2xl text-ink">{c}</p>
              <p className="eyebrow mt-2 opacity-70 group-hover:opacity-100">Browse</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Materials & Craftsmanship */}
      <section className="mt-32 md:mt-40 px-5 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="aspect-[5/4] bg-stone-warm overflow-hidden">
            <img
              src={materialsImg}
              alt="Travertine, brushed brass, walnut and unglazed ceramic side by side in warm directional light."
              width={1600}
              height={1100}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="max-w-lg">
            <p className="eyebrow">Materials</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink mt-3">
              Honest materials, finished by hand.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-charcoal">
              We work with a short list of materials we trust: Italian travertine,
              hand-thrown stoneware, solid brass cast at a single foundry in
              Moradabad, and oiled American walnut. Nothing is plated, nothing is
              veneered.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-y-8 gap-x-10 text-sm">
              {[
                ["Stone", "Travertine, basalt, concrete"],
                ["Metal", "Solid brass, brushed steel"],
                ["Wood", "American black walnut"],
                ["Ceramic", "High-fired stoneware"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-2 text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="px-5 md:px-10 mt-32 md:mt-40">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="eyebrow">Most ordered</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink mt-3">
              Quietly best-selling.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-12 md:gap-x-8">
          {bestsellers.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Philosophy / Final CTA */}
      <section className="mt-32 md:mt-40 px-5 md:px-10">
        <div className="mx-auto max-w-3xl text-center py-20 md:py-28 border-y border-rule">
          <p className="eyebrow">Design philosophy</p>
          <p className="font-display text-3xl md:text-[44px] leading-[1.15] text-ink mt-6">
            “We make objects we want to keep — quiet, useful, and built to outlast
            the year we were designed.”
          </p>
          <Link
            to="/shop"
            className="mt-10 inline-flex items-center justify-center bg-ink px-9 py-4 text-[12px] tracking-[0.18em] uppercase text-ivory hover:bg-charcoal transition-colors"
          >
            Shop all objects
          </Link>
        </div>
      </section>
    </>
  );
}
