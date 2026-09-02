import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceDetail } from '@/src/components/sections/ServiceDetail';
import { ProductDetail } from '@/src/components/sections/ProductDetail';
import { SERVICE_PAGES } from '@/src/lib/content/services';
import { PRODUCT_PAGES } from '@/src/lib/content/products';

export const dynamicParams = false;

export function generateStaticParams() {
  return [...SERVICE_PAGES, ...PRODUCT_PAGES].map((entry) => ({
    slug: entry.href!.replace(/^\//, ''),
  }));
}

function findService(slug: string) {
  return SERVICE_PAGES.find((s) => s.href === `/${slug}`);
}

function findProduct(slug: string) {
  return PRODUCT_PAGES.find((p) => p.href === `/${slug}`);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const match = findService(slug) ?? findProduct(slug);
  if (!match) return {};
  return {
    title: `${match.name} — xFlow`,
    description: match.blurb,
  };
}

export default async function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const service = findService(slug);
  if (service) return <ServiceDetail service={service} />;

  const product = findProduct(slug);
  if (product) return <ProductDetail product={product} />;

  notFound();
}
