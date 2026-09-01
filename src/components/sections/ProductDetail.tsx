import Link from 'next/link';
import { Container } from '@/src/components/layout/Container';
import { ContentBlocks } from './ContentBlocks';
import { assetSrc } from '@/src/lib/assets';
import { PRODUCT_CONTENT } from '@/src/lib/content/product-content';
import type { Product } from '@/src/lib/content/types';

export function ProductDetail({ product }: { product: Product }) {
  const content = PRODUCT_CONTENT[product.slug];

  return (
    <>
      <section className="bg-brand-header text-white">
        <Container className="py-16 sm:py-20">
          {product.image && (
            <span className="mb-5 flex size-16 items-center justify-center rounded-full bg-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={assetSrc(product.image)} alt="" className="size-9 object-contain" />
            </span>
          )}
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{product.name}</h1>
          <p className="mt-4 max-w-2xl text-base text-white/85">{product.blurb}</p>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          {content ? (
            <ContentBlocks blocks={content.blocks} />
          ) : (
            <p className="text-muted-foreground max-w-3xl text-base">{product.blurb}</p>
          )}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="bg-brand-header rounded-md px-4 py-2 text-sm font-medium text-white"
            >
              Get in touch
            </Link>
            <Link
              href="/#products"
              className="border-border text-foreground rounded-md border px-4 py-2 text-sm font-medium"
            >
              All products
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
