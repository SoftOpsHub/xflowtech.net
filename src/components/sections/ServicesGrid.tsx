import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from '@/src/components/layout/Container';
import { SectionHeading } from '@/src/components/SectionHeading';
import { ServiceIcon } from './ServiceIcon';
import { SERVICES } from '@/src/lib/content/services';
import type { Service } from '@/src/lib/content/types';

function Card({ service }: { service: Service }) {
  const inner: ReactNode = (
    <>
      <span className="bg-brand-header flex size-16 shrink-0 items-center justify-center rounded-full">
        <ServiceIcon icon={service.icon} className="size-8" />
      </span>
      <span className="text-foreground group-hover:text-brand-accent mt-3 block text-sm font-semibold">
        {service.name}
      </span>
    </>
  );

  const className = 'group block';

  if (!service.href) return <div className={className}>{inner}</div>;
  if (service.href.startsWith('/')) {
    return (
      <Link href={service.href} className={className}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={service.href} target="_blank" rel="noreferrer noopener" className={className}>
      {inner}
    </a>
  );
}

export function ServicesGrid() {
  return (
    <section id="services" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          align="start"
          title="Areas of Expertise"
          intro="xFlow specialises in advanced telecom and cloud infrastructure, custom software development, and data analytics — spanning NFV/SDN, DevOps, testing, cyber security, and open-source collaboration."
        />
        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <Card service={service} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
