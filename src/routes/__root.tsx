import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { CartProvider } from "../lib/cart";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-6">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-display text-5xl text-ink">Not found.</h1>
        <p className="mt-4 text-sm text-charcoal">
          The page you're looking for has moved or no longer exists.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center bg-ink px-8 py-3 text-[12px] tracking-[0.18em] uppercase text-ivory hover:bg-charcoal transition-colors"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  // error reporting no-op retained.

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Error</p>
        <h1 className="mt-4 font-display text-3xl text-ink">
          This page didn't load.
        </h1>
        <p className="mt-3 text-sm text-charcoal">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-ink px-6 py-3 text-[12px] tracking-[0.18em] uppercase text-ivory hover:bg-charcoal transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-ink/80 px-6 py-3 text-[12px] tracking-[0.18em] uppercase text-ink hover:bg-ink hover:text-ivory transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FORMA — Contemporary objects for modern living" },
      {
        name: "description",
        content:
          "FORMA designs and makes sculptural home objects, tabletop pieces, and lighting. Considered, tactile, made in small runs.",
      },
      { name: "author", content: "FORMA" },
      { property: "og:title", content: "FORMA — Contemporary objects for modern living" },
      {
        property: "og:description",
        content:
          "Sculptural objects, vessels, lighting and desk pieces. Made in small runs in Bengaluru.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "FORMA" },
      { name: "twitter:card", content: "summary" },
      { name: "theme-color", content: "#f3eee4" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=DM+Sans:wght@300;400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-ivory text-ink">
          <Header />
          <main className="flex-1">
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}
