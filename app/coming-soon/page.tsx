import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/src/components/layout/Container';

export const metadata: Metadata = {
  title: 'Coming Soon — xFlow Tech',
};

export default function ComingSoonPage() {
  return (
    <Container className="py-24">
      <p className="text-brand-accent text-sm font-semibold tracking-wide uppercase">Coming soon</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">This page is on its way</h1>
      <p className="text-muted-foreground mt-3">
        We&apos;re still putting this one together. In the meantime, get in touch and we&apos;ll be
        happy to help.
      </p>
      <Link
        href="/contact"
        className="bg-brand-header mt-6 inline-block rounded-md px-4 py-2 text-sm font-medium text-white"
      >
        Contact us
      </Link>
    </Container>
  );
}
