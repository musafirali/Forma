import stoneTray from "@/assets/product-stone-tray.jpg";
import columnVessel from "@/assets/product-column-vessel.jpg";
import arcIncense from "@/assets/product-arc-incense.jpg";
import deskObject from "@/assets/product-desk-object.jpg";
import monolithBookend from "@/assets/product-monolith-bookend.jpg";
import linearLamp from "@/assets/product-linear-lamp.jpg";
import brassCatchall from "@/assets/product-brass-catchall.jpg";
import ridgeTray from "@/assets/product-ridge-tray.jpg";

export type Category =
  | "Vessels"
  | "Tabletop"
  | "Desk"
  | "Lighting"
  | "Objects";

export interface Product {
  slug: string;
  name: string;
  series: string; // e.g. "No. 02"
  category: Category;
  price: number; // INR
  image: string;
  tagline: string;
  description: string;
  material: string;
  dimensions: string;
  weight: string;
  finish: string;
  care: string;
  inStock: boolean;
  bestseller?: boolean;
}

export const products: Product[] = [
  {
    slug: "stone-tray-no-02",
    name: "Stone Tray",
    series: "No. 02",
    category: "Tabletop",
    price: 6800,
    image: stoneTray,
    tagline: "Cast concrete tray with a raised lip and chamfered edge.",
    description:
      "A weighted rectangular tray cast in a single pour. The interior holds keys, jewellery or a small stack of papers; the matte exterior settles into a room without asking for attention.",
    material: "Hand-cast concrete, sealed",
    dimensions: "240 × 140 × 32 mm",
    weight: "1.4 kg",
    finish: "Natural matte, lightly sealed",
    care: "Wipe with a soft, dry cloth. Avoid prolonged contact with water.",
    inStock: true,
    bestseller: true,
  },
  {
    slug: "column-vessel",
    name: "Column Vessel",
    series: "Tall",
    category: "Vessels",
    price: 9400,
    image: columnVessel,
    tagline: "Wheel-thrown stoneware vessel with a soft ivory glaze.",
    description:
      "Thrown on the wheel and trimmed by hand, the Column Vessel carries the maker's marks across its surface. Suitable for dry arrangements or as a standalone object.",
    material: "High-fired stoneware, food-safe ivory glaze",
    dimensions: "Ø 120 × 280 mm",
    weight: "1.9 kg",
    finish: "Soft matte ivory",
    care: "Hand wash only. Not microwave safe.",
    inStock: true,
    bestseller: true,
  },
  {
    slug: "arc-incense-holder",
    name: "Arc Incense Holder",
    series: "Brass",
    category: "Objects",
    price: 4200,
    image: arcIncense,
    tagline: "Solid brass holder turned from a single billet.",
    description:
      "A sculptural counterweight to a single stick of incense. The brushed brass surface will develop a quiet patina over time; left alone, it darkens to a warm bronze.",
    material: "Solid brushed brass",
    dimensions: "110 × 110 × 28 mm",
    weight: "640 g",
    finish: "Brushed, unlacquered",
    care: "Wipe with a soft cloth. Patina is intended; polish only if desired.",
    inStock: true,
  },
  {
    slug: "forma-desk-object",
    name: "Desk Object",
    series: "Travertine",
    category: "Desk",
    price: 5600,
    image: deskObject,
    tagline: "Carved travertine paperweight with a single channel.",
    description:
      "Cut from a solid block of Italian travertine, the Desk Object holds a stack of paper or a single pen. Each piece varies in the depth and pattern of its natural veining.",
    material: "Solid travertine, raw cut",
    dimensions: "90 × 70 × 80 mm",
    weight: "1.1 kg",
    finish: "Honed natural",
    care: "Dust with a dry cloth. Avoid acidic liquids.",
    inStock: true,
  },
  {
    slug: "monolith-bookend",
    name: "Monolith Bookend",
    series: "Pair",
    category: "Objects",
    price: 7800,
    image: monolithBookend,
    tagline: "Pair of split basalt bookends with a raw chiselled face.",
    description:
      "Hand-split from a single block, each pair shares a matching fracture line. The dense weight keeps even the largest art books in place without backing supports.",
    material: "Natural basalt, split-face",
    dimensions: "150 × 90 × 220 mm (each)",
    weight: "3.2 kg (pair)",
    finish: "Raw split, unsealed",
    care: "Wipe with a dry cloth. Felt pads included for delicate shelving.",
    inStock: true,
    bestseller: true,
  },
  {
    slug: "linear-table-lamp",
    name: "Linear Table Lamp",
    series: "01",
    category: "Lighting",
    price: 18900,
    image: linearLamp,
    tagline: "Slender brushed-steel column with a linen drum shade.",
    description:
      "Drawn steel, weighted base, and a warm-toned linen shade that diffuses light evenly across a side table. Wired for the Indian standard with an in-line switch.",
    material: "Brushed steel, linen-wrapped shade",
    dimensions: "Ø 180 × 520 mm",
    weight: "2.4 kg",
    finish: "Brushed nickel, natural linen",
    care: "Dust shade lightly. Use 40W E27 bulb, sold separately.",
    inStock: true,
  },
  {
    slug: "cast-brass-catchall",
    name: "Cast Brass Catchall",
    series: "Small",
    category: "Desk",
    price: 3600,
    image: brassCatchall,
    tagline: "A small brass dish for keys, coins, or a wristwatch.",
    description:
      "Sand-cast in solid brass and hand-finished at the rim. Sits comfortably on a console, bedside table, or the corner of a desk.",
    material: "Sand-cast brass",
    dimensions: "Ø 130 × 28 mm",
    weight: "480 g",
    finish: "Brushed, unlacquered",
    care: "Patina will develop with use. Polish with brass cleaner if a bright finish is preferred.",
    inStock: true,
  },
  {
    slug: "ridge-serving-tray",
    name: "Ridge Serving Tray",
    series: "Walnut",
    category: "Tabletop",
    price: 8400,
    image: ridgeTray,
    tagline: "Solid walnut tray with carved channel handles.",
    description:
      "Milled from a single board of American black walnut and finished with a food-safe oil. Substantial enough for a full pot and two cups; quiet enough to leave on the counter.",
    material: "Solid American black walnut",
    dimensions: "420 × 240 × 38 mm",
    weight: "1.6 kg",
    finish: "Hand-oiled, food-safe",
    care: "Hand wash with mild soap. Re-oil twice a year.",
    inStock: true,
  },
];

export const categories: Category[] = [
  "Vessels",
  "Tabletop",
  "Desk",
  "Lighting",
  "Objects",
];

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, limit = 4): Product[] {
  const current = getProduct(slug);
  if (!current) return [];
  return products
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aMatch = a.category === current.category ? 0 : 1;
      const bMatch = b.category === current.category ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, limit);
}