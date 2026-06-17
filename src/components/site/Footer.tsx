import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="rule-t mt-32 bg-ivory">
      <div className="mx-auto px-5 md:px-10 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-[28px] tracking-[0.18em] text-ink">FORMA</p>
            <p className="mt-4 max-w-xs text-sm text-charcoal leading-relaxed">
              Contemporary objects for modern living. Designed and made in small runs,
              shipped from our studio in Bengaluru.
            </p>
          </div>
          <FooterCol
            title="Shop"
            links={[
              { to: "/shop", label: "All Objects" },
              { to: "/shop", label: "Vessels", search: { c: "Vessels" } },
              { to: "/shop", label: "Tabletop", search: { c: "Tabletop" } },
              { to: "/shop", label: "Desk", search: { c: "Desk" } },
              { to: "/shop", label: "Lighting", search: { c: "Lighting" } },
            ]}
          />
          <FooterCol
            title="Studio"
            links={[
              { to: "/about", label: "About" },
              { to: "/journal", label: "Journal" },
              { to: "/about", label: "Contact" },
              { to: "/about", label: "Trade & Press" },
            ]}
          />
          <FooterCol
            title="Service"
            links={[
              { to: "/about", label: "Shipping" },
              { to: "/about", label: "Returns" },
              { to: "/about", label: "Care" },
              { to: "/about", label: "FAQ" },
            ]}
          />
        </div>

        <div className="mt-16 flex flex-col gap-4 rule-t pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[12px] text-charcoal tracking-wide">
            © {new Date().getFullYear()} FORMA Objects Pvt. Ltd. — Bengaluru, India
          </p>
          <p className="text-[12px] text-charcoal tracking-wide">
            Secure checkout · UPI · Cards · Net Banking · Wallets
          </p>
        </div>
      </div>
    </footer>
  );
}

interface FooterLink {
  to: string;
  label: string;
  search?: Record<string, string>;
}

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.to}
              search={l.search as never}
              className="text-sm text-ink/80 hover:text-ink transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}