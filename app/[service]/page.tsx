import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceDetail } from '@/src/components/sections/ServiceDetail';
import { SERVICE_PAGES } from '@/src/lib/content/services';

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ service: s.href!.replace(/^\//, '') }));
}

function find(slug: string) {
  return SERVICE_PAGES.find((s) => s.href === `/${slug}`);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const match = find(service);
  if (!match) return {};
  return {
    title: `${match.name} — xFlow Tech`,
    description: match.blurb,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const match = find(service);
  if (!match) notFound();
  return <ServiceDetail service={match} />;
}
