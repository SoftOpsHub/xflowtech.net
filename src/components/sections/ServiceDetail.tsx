import Link from 'next/link';
import { Container } from '@/src/components/layout/Container';
import { ServiceIcon } from './ServiceIcon';
import type { Service } from '@/src/lib/content/types';

export function ServiceDetail({ service }: { service: Service }) {
  return (
    <>
      <section className="bg-brand-header text-white">
        <Container className="py-16 sm:py-20">
          <span className="mb-5 flex size-16 items-center justify-center rounded-full bg-white/10">
            <ServiceIcon icon={service.icon} className="size-8" />
          </span>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{service.name}</h1>
          <p className="mt-4 max-w-2xl text-base text-white/85">{service.blurb}</p>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          <p className="text-muted-foreground max-w-3xl text-base">
            xFlow Tech delivers {service.name.toLowerCase()} as part of its network
            infrastructure and cloud services practice — from early proof of concept through to
            production rollout and ongoing support.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="bg-brand-header rounded-md px-4 py-2 text-sm font-medium text-white"
            >
              Get in touch
            </Link>
            <Link
              href="/#services"
              className="border-border text-foreground rounded-md border px-4 py-2 text-sm font-medium"
            >
              All areas of expertise
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
