import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ProductCard } from "@/components/site/ProductCard";
import { products, categories, type Category } from "@/lib/products";

const searchSchema = z.object({
  c: z.enum(["Vessels", "Tabletop", "Desk", "Lighting", "Objects"]).optional(),
  sort: z.enum(["featured", "price-asc", "price-desc"]).optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop — FORMA" },
      {
        name: "description",
        content:
          "Browse the FORMA collection of contemporary objects: vessels, tabletop pieces, desk objects, lighting and home objects.",
      },
      { property: "og:title", content: "Shop — FORMA" },
      {
        property: "og:description",
        content: "Browse the FORMA collection of contemporary objects.",
      },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Shop,
});

function Shop() {
  const { c: activeCat, sort = "featured" } = Route.useSearch();

  let list = activeCat
    ? products.filter((p) => p.category === activeCat)
    : products;
  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc")
    list = [...list].sort((a, b) => b.price - a.price);

  return (
    <>
      <header className="px-5 md:px-10 pt-12 md:pt-20 pb-10 rule-b">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 items-end">
          <div>
            <p className="eyebrow">The Collection</p>
            <h1 className="font-display mt-4 text-[40px] md:text-[56px] leading-[1.04] text-ink">
              {activeCat ?? "All objects"}
            </h1>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-charcoal">
            A small, curated collection of objects made in limited runs. Stock is
            replenished slowly; many pieces sell out before they are remade.
          </p>
        </div>
      </header>

      {/* Filter / Sort */}
      <div className="sticky top-16 md:top-20 z-30 bg-ivory/95 backdrop-blur rule-b">
        <div className="px-5 md:px-10 flex flex-wrap items-center gap-x-1 gap-y-2 py-3.5 text-[12px] tracking-[0.14em] uppercase">
          <Link
            to="/shop"
            search={{}}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              !activeCat ? "bg-ink text-ivory" : "text-ink/70 hover:text-ink"
            }`}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              to="/shop"
              search={{ c }}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                activeCat === c
                  ? "bg-ink text-ivory"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              {c}
            </Link>
          ))}
          <span className="ml-auto flex items-center gap-3 text-charcoal normal-case tracking-normal">
            <span className="hidden sm:inline">{list.length} objects</span>
            <SortLink current={sort} value="featured" activeCat={activeCat}>
              Featured
            </SortLink>
            <SortLink current={sort} value="price-asc" activeCat={activeCat}>
              Price ↑
            </SortLink>
            <SortLink current={sort} value="price-desc" activeCat={activeCat}>
              Price ↓
            </SortLink>
          </span>
        </div>
      </div>

      <section className="px-5 md:px-10 mt-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-14 md:gap-x-8 md:gap-y-20">
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
        {list.length === 0 && (
          <p className="text-center text-charcoal py-20">
            No objects in this category yet.
          </p>
        )}
      </section>
    </>
  );
}

function SortLink({
  current,
  value,
  activeCat,
  children,
}: {
  current: string;
  value: "featured" | "price-asc" | "price-desc";
  activeCat?: Category;
  children: React.ReactNode;
}) {
  const active = current === value;
  return (
    <Link
      to="/shop"
      search={{ c: activeCat, sort: value }}
      className={`text-[12px] tracking-wide ${
        active ? "text-ink underline underline-offset-[6px]" : "hover:text-ink"
      }`}
    >
      {children}
    </Link>
  );
}