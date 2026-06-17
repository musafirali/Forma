import { createFileRoute, Link } from "@tanstack/react-router";
import materialsImg from "@/assets/materials.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Studio — FORMA" },
      {
        name: "description",
        content:
          "FORMA is a small design studio in Bengaluru making contemporary objects in stone, brass, ceramic and wood.",
      },
      { property: "og:title", content: "Studio — FORMA" },
      {
        property: "og:description",
        content: "A small design studio in Bengaluru.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <section className="px-5 md:px-10 pt-16 md:pt-24 pb-24 max-w-5xl mx-auto">
      <p className="eyebrow">The Studio</p>
      <h1 className="font-display text-4xl md:text-6xl text-ink mt-4 leading-[1.05]">
        A small studio,<br />a short list of materials.
      </h1>
      <div className="mt-12 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
        <div>
          <img
            src={materialsImg}
            alt="Travertine, brushed brass, walnut and unglazed ceramic side by side."
            width={1600}
            height={1100}
            loading="lazy"
            className="aspect-[5/4] w-full object-cover bg-stone-warm"
          />
        </div>
        <div className="space-y-6 text-[15px] leading-[1.75] text-charcoal max-w-prose">
          <p>
            FORMA was founded in Bengaluru in 2023. The studio designs and
            produces contemporary objects for everyday use — vessels, trays,
            lighting and small sculptural pieces — in limited runs.
          </p>
          <p>
            We work with a short list of materials: Italian travertine, basalt,
            hand-thrown stoneware, solid brass cast at a single foundry in
            Moradabad, and oiled American walnut. Nothing is plated; nothing is
            veneered.
          </p>
          <p>
            Each object is inspected, signed, and packed by hand at our studio
            before it ships. We restock slowly. Many pieces sell out before they
            are remade.
          </p>
        </div>
      </div>

      <div className="mt-20 grid md:grid-cols-3 gap-10 rule-t pt-12">
        {[
          {
            t: "Shipping",
            b: "Insured courier across India. 3–5 business days. Complimentary above ₹15,000.",
          },
          {
            t: "Returns",
            b: "14 days on unused objects in original packaging. Made-to-order pieces are final sale.",
          },
          {
            t: "Trade & Press",
            b: "Architects, interior designers and editorial enquiries: studio@forma.in",
          },
        ].map((b) => (
          <div key={b.t}>
            <p className="eyebrow">{b.t}</p>
            <p className="mt-3 text-[14px] text-charcoal leading-relaxed">{b.b}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          to="/shop"
          className="inline-flex items-center bg-ink px-9 py-4 text-[12px] tracking-[0.18em] uppercase text-ivory hover:bg-charcoal transition-colors"
        >
          View the collection
        </Link>
      </div>
    </section>
  );
}