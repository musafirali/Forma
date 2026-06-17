import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { formatINR } from "@/lib/products";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-warm">
        <img
          src={product.image}
          alt={product.name}
          width={1080}
          height={1350}
          loading={index < 4 ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-[17px] text-ink truncate">
            {product.name}
            <span className="text-charcoal/70"> · {product.series}</span>
          </h3>
          <p className="mt-1 text-[12px] tracking-wide text-charcoal">
            {product.category}
          </p>
        </div>
        <p className="text-[13px] text-ink tabular-nums shrink-0 mt-0.5">
          {formatINR(product.price)}
        </p>
      </div>
    </Link>
  );
}