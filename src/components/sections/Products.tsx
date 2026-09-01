import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from '@/src/components/layout/Container';
import { SectionHeading } from '@/src/components/SectionHeading';
import { assetSrc } from '@/src/lib/assets';
import { PRODUCTS } from '@/src/lib/content/products';
import type { Product } from '@/src/lib/content/types';

function Card({ product }: { product: Product }) {
  const inner: ReactNode = (
    <>
      {product.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={assetSrc(product.image)} alt="" className="mb-4 size-24 object-contain" />
      ) : null}
      <h3 className="text-foreground group-hover:text-brand-accent font-semibold">{product.name}</h3>
      <p className="text-muted-foreground mt-1 text-sm">{product.blurb}</p>
    </>
  );

  const className = 'group flex flex-col items-center text-center';

  if (product.href?.startsWith('/')) {
    return (
      <Link href={product.href} className={className}>
        {inner}
      </Link>
    );
  }
  return <div className={className}>{inner}</div>;
}

export function Products() {
  return (
    <section id="products" className="border-border border-t py-16 sm:py-20">
      <Container>
        <SectionHeading align="start" title="Products" />
        <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <li key={product.slug}>
              <Card product={product} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
