import Link from 'next/link';
import { Container } from '@/src/components/layout/Container';

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="text-brand-accent text-sm font-semibold tracking-wide uppercase">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground mt-3">
        The page you are looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="bg-brand-header mt-6 inline-block rounded-md px-4 py-2 text-sm font-medium text-white"
      >
        Go home
      </Link>
    </Container>
  );
}
