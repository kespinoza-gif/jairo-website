import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.name} · Gabo en Asia` : "Product not found" };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
