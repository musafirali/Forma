import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — FORMA" },
      { name: "description", content: "Complete your FORMA order securely." },
      { property: "og:title", content: "Checkout — FORMA" },
      { property: "og:url", content: "/checkout" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: CheckoutPage,
});

type Step = "contact" | "shipping" | "payment";
type Pay = "upi" | "card" | "netbanking" | "cod";

const SHIPPING_FEE = 350;
const SHIPPING_THRESHOLD = 15000;

function CheckoutPage() {
  const { detailed, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("contact");
  const [pay, setPay] = useState<Pay>("upi");
  const [submitted, setSubmitted] = useState(false);
  const [orderId] = useState(
    () => "F" + Math.random().toString(36).slice(2, 8).toUpperCase(),
  );

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  if (submitted) {
    return (
      <section className="px-5 md:px-10 py-24 md:py-32 text-center max-w-xl mx-auto">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-ink text-ivory">
          <Check className="h-6 w-6" strokeWidth={1.25} />
        </div>
        <p className="eyebrow mt-8">Order confirmed</p>
        <h1 className="font-display text-4xl md:text-5xl text-ink mt-4 leading-[1.05]">
          Thank you.
        </h1>
        <p className="mt-6 text-charcoal leading-relaxed">
          Your order <span className="text-ink">{orderId}</span> has been received.
          A confirmation has been sent to your email. Pieces will be carefully
          packed and shipped within 3–5 business days.
        </p>
        <Link
          to="/shop"
          className="mt-10 inline-flex items-center bg-ink px-8 py-3 text-[12px] tracking-[0.18em] uppercase text-ivory hover:bg-charcoal transition-colors"
        >
          Continue shopping
        </Link>
      </section>
    );
  }

  if (detailed.length === 0) {
    return (
      <section className="px-5 md:px-10 py-32 text-center">
        <p className="eyebrow">Checkout</p>
        <h1 className="font-display text-4xl text-ink mt-4">
          There is nothing to check out.
        </h1>
        <Link
          to="/shop"
          className="mt-10 inline-flex items-center bg-ink px-8 py-3 text-[12px] tracking-[0.18em] uppercase text-ivory hover:bg-charcoal transition-colors"
        >
          Browse the shop
        </Link>
      </section>
    );
  }

  const steps: { id: Step; label: string }[] = [
    { id: "contact", label: "Contact" },
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
  ];

  const stepIndex = steps.findIndex((s) => s.id === step);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "contact") setStep("shipping");
    else if (step === "shipping") setStep("payment");
    else {
      setSubmitted(true);
      clear();
    }
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="grid lg:grid-cols-[1.3fr_1fr]">
      {/* Form column */}
      <div className="px-5 md:px-10 lg:px-16 pt-12 md:pt-20 pb-24">
        <Link
          to="/"
          className="font-display text-[22px] tracking-[0.18em] text-ink"
        >
          FORMA
        </Link>

        {/* Stepper */}
        <ol className="mt-12 flex items-center gap-3 text-[12px] tracking-[0.16em] uppercase">
          {steps.map((s, i) => {
            const done = i < stepIndex;
            const active = i === stepIndex;
            return (
              <li key={s.id} className="flex items-center gap-3">
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-[11px] ${
                    active
                      ? "bg-ink text-ivory border-ink"
                      : done
                        ? "bg-ink/10 text-ink border-ink/30"
                        : "border-rule text-charcoal"
                  }`}
                >
                  {done ? <Check className="h-3 w-3" strokeWidth={1.5} /> : i + 1}
                </span>
                <span className={active ? "text-ink" : "text-charcoal"}>
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <span className="h-px w-8 bg-rule" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>

        <form onSubmit={handleSubmit} className="mt-12 max-w-xl space-y-10">
          {step === "contact" && (
            <fieldset className="space-y-5">
              <legend className="font-display text-2xl text-ink mb-4">
                Contact details
              </legend>
              <Field id="email" label="Email" type="email" placeholder="you@example.com" required />
              <Field id="phone" label="Mobile number" type="tel" placeholder="+91" required />
              <label className="flex items-center gap-3 text-[13px] text-charcoal">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 accent-ink"
                />
                Email me about new objects (occasional, no marketing noise).
              </label>
            </fieldset>
          )}

          {step === "shipping" && (
            <fieldset className="space-y-5">
              <legend className="font-display text-2xl text-ink mb-4">
                Shipping address
              </legend>
              <div className="grid grid-cols-2 gap-4">
                <Field id="first" label="First name" required />
                <Field id="last" label="Last name" required />
              </div>
              <Field id="addr1" label="Address" required />
              <Field id="addr2" label="Apartment, suite (optional)" />
              <div className="grid grid-cols-2 gap-4">
                <Field id="city" label="City" required />
                <Field id="pin" label="PIN code" required inputMode="numeric" />
              </div>
              <Field id="state" label="State" required />
              <p className="text-[12px] text-charcoal">
                We ship across India via insured courier. Delivery in 3–5 business days.
              </p>
            </fieldset>
          )}

          {step === "payment" && (
            <fieldset className="space-y-5">
              <legend className="font-display text-2xl text-ink mb-4">
                Payment
              </legend>
              <div className="rule-t rule-b divide-y divide-rule">
                {(
                  [
                    { id: "upi", label: "UPI", desc: "GPay, PhonePe, Paytm and others" },
                    { id: "card", label: "Credit or debit card", desc: "Visa, Mastercard, RuPay, Amex" },
                    { id: "netbanking", label: "Net banking", desc: "All major Indian banks" },
                    { id: "cod", label: "Cash on delivery", desc: "Available on orders under ₹20,000" },
                  ] as { id: Pay; label: string; desc: string }[]
                ).map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-start gap-4 py-4 cursor-pointer ${pay === opt.id ? "text-ink" : "text-charcoal"}`}
                  >
                    <input
                      type="radio"
                      name="pay"
                      value={opt.id}
                      checked={pay === opt.id}
                      onChange={() => setPay(opt.id)}
                      className="mt-1 h-4 w-4 accent-ink"
                    />
                    <span>
                      <span className="block text-[14px] text-ink">{opt.label}</span>
                      <span className="block text-[12px] text-charcoal mt-0.5">
                        {opt.desc}
                      </span>
                    </span>
                  </label>
                ))}
              </div>

              {pay === "upi" && (
                <Field id="upi" label="UPI ID" placeholder="name@bank" required />
              )}
              {pay === "card" && (
                <div className="space-y-4">
                  <Field id="card" label="Card number" inputMode="numeric" placeholder="•••• •••• •••• ••••" required />
                  <div className="grid grid-cols-2 gap-4">
                    <Field id="exp" label="Expiry (MM/YY)" required />
                    <Field id="cvc" label="CVC" required />
                  </div>
                  <Field id="name" label="Cardholder name" required />
                </div>
              )}
            </fieldset>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            {step !== "contact" ? (
              <button
                type="button"
                onClick={() =>
                  setStep(step === "payment" ? "shipping" : "contact")
                }
                className="text-[12px] tracking-[0.18em] uppercase text-ink underline underline-offset-[6px] decoration-rule hover:decoration-ink"
              >
                ← Back
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate({ to: "/cart" })}
                className="text-[12px] tracking-[0.18em] uppercase text-ink underline underline-offset-[6px] decoration-rule hover:decoration-ink"
              >
                ← Return to cart
              </button>
            )}
            <button
              type="submit"
              className="bg-ink px-9 py-4 text-[12px] tracking-[0.18em] uppercase text-ivory hover:bg-charcoal transition-colors"
            >
              {step === "payment" ? `Pay ${formatINR(total)}` : "Continue"}
            </button>
          </div>
        </form>
      </div>

      {/* Summary column */}
      <aside className="bg-stone-warm/40 border-l border-rule px-5 md:px-10 lg:px-12 pt-12 md:pt-20 pb-24">
        <p className="eyebrow">Order summary</p>
        <ul className="mt-6 divide-y divide-rule">
          {detailed.map(({ product, quantity, lineTotal }) => (
            <li key={product.slug} className="flex gap-4 py-5">
              <div className="relative h-[88px] w-[72px] shrink-0 bg-stone-warm">
                <img
                  src={product.image}
                  alt={product.name}
                  width={144}
                  height={176}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="absolute -top-2 -right-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1.5 text-[11px] text-ivory tabular-nums">
                  {quantity}
                </span>
              </div>
              <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display text-[15px] text-ink truncate">
                    {product.name}
                  </p>
                  <p className="text-[11px] text-charcoal mt-0.5 tracking-wide">
                    {product.series} · {product.category}
                  </p>
                </div>
                <p className="text-[13px] text-ink tabular-nums shrink-0">
                  {formatINR(lineTotal)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <dl className="mt-6 space-y-3 text-[14px] rule-t pt-6">
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

        <div className="mt-5 rule-t pt-5 flex items-baseline justify-between">
          <span className="eyebrow">Total</span>
          <span className="font-display text-2xl text-ink tabular-nums">
            {formatINR(total)}
          </span>
        </div>
      </aside>
    </section>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  placeholder,
  inputMode,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  inputMode?:
    | "text"
    | "search"
    | "email"
    | "tel"
    | "url"
    | "numeric"
    | "decimal"
    | "none";
}) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-[11px] tracking-[0.14em] uppercase text-charcoal mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        inputMode={inputMode}
        className="w-full border-0 border-b border-rule bg-transparent py-3 text-[15px] text-ink placeholder:text-charcoal/50 focus:border-ink focus:outline-none focus:ring-0 transition-colors"
      />
    </div>
  );
}