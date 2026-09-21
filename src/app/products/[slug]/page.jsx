import ProductDetailPage from "./ProductDetailClient";
import { fetchProducts } from "@/lib/api";

const createSlug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * Required for `output: "export"` — prebuilds static HTML for each product slug.
 * Falls back to [] if API is unreachable so export still succeeds.
 */
export async function generateStaticParams() {
  try {
    const products = await fetchProducts();
    if (!Array.isArray(products) || products.length === 0) {
      return [];
    }

    const slugs = new Set();
    for (const product of products) {
      if (product?.name) {
        slugs.add(createSlug(product.name));
      }
    }

    return Array.from(slugs).map((slug) => ({ slug }));
  } catch (error) {
    console.error("generateStaticParams: failed to load products", error);
    return [];
  }
}

export default function Page() {
  return <ProductDetailPage />;
}
