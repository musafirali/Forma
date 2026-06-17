import { createFileRoute, Link } from "@tanstack/react-router";
import materialsImg from "@/assets/materials.jpg";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — FORMA" },
      {
        name: "description",
        content:
          "Notes from the FORMA studio on materials, makers and the objects we keep.",
      },
      { property: "og:title", content: "Journal — FORMA" },
      { property: "og:url", content: "/journal" },
    ],
    links: [{ rel: "canonical", href: "/journal" }],
  }),
  component: Journal,
});

const entries = [
  {
    title: "Working with travertine",
    excerpt:
      "A short note on why we chose Italian travertine for our desk pieces, and what to expect from a stone that quietly changes over time.",
    date: "April 2026",
    image: materialsImg,
  },
  {
    title: "Inside the Moradabad foundry",
    excerpt:
      "Our brass pieces are cast by a third-generation foundry in Moradabad. We visited in March to walk through the casting and finishing process.",
    date: "March 2026",
    image: heroImg,
  },
];

function Journal() {
  return (
    <section className="px-5 md:px-10 pt-16 md:pt-24 pb-24 max-w-5xl mx-auto">
      <p className="eyebrow">Journal</p>
      <h1 className="font-display text-4xl md:text-6xl text-ink mt-4 leading-[1.05]">
        Notes from the studio.
      </h1>
      <div className="mt-16 grid md:grid-cols-2 gap-12 md:gap-16">
        {entries.map((e) => (
          <article key={e.title}>
            <Link to="/journal" className="block group">
              <img
                src={e.image}
                alt=""
                width={1200}
                height={900}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover bg-stone-warm transition-opacity group-hover:opacity-90"
              />
              <p className="eyebrow mt-6">{e.date}</p>
              <h2 className="font-display text-2xl text-ink mt-3">{e.title}</h2>
              <p className="mt-3 text-[14px] text-charcoal leading-relaxed">
                {e.excerpt}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}