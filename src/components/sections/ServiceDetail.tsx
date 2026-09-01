import Link from 'next/link';
import { Container } from '@/src/components/layout/Container';
import { ServiceIcon } from './ServiceIcon';
import { SERVICE_CONTENT } from '@/src/lib/content/service-content';
import type { InlineRun, Service, ServiceBlock } from '@/src/lib/content/types';

function Runs({ runs }: { runs: InlineRun[] }) {
  return (
    <>
      {runs.map((run, i) => {
        if (typeof run === 'string') return <span key={i}>{run}</span>;
        if ('b' in run)
          return (
            <strong key={i} className="text-foreground font-semibold">
              {run.b}
            </strong>
          );
        return <em key={i}>{run.i}</em>;
      })}
    </>
  );
}

function ServiceBody({ blocks }: { blocks: ServiceBlock[] }) {
  return (
    <div className="max-w-3xl space-y-5">
      {blocks.map((block, i) => {
        if (block.type === 'heading') {
          return (
            <h2 key={i} className="text-foreground pt-2 text-xl font-semibold tracking-tight">
              {block.text}
            </h2>
          );
        }
        if (block.type === 'list') {
          const List = block.ordered ? 'ol' : 'ul';
          return (
            <List
              key={i}
              className={
                block.ordered
                  ? 'text-muted-foreground list-decimal space-y-2 pl-5 text-base'
                  : 'space-y-2'
              }
            >
              {block.items.map((item, j) => (
                <li
                  key={j}
                  className={
                    block.ordered ? 'text-base' : 'text-muted-foreground flex gap-3 text-base'
                  }
                >
                  {!block.ordered && (
                    <span
                      aria-hidden
                      className="bg-brand-accent mt-2 size-1.5 shrink-0 rounded-full"
                    />
                  )}
                  <span>
                    <Runs runs={item} />
                  </span>
                </li>
              ))}
            </List>
          );
        }
        return (
          <p key={i} className="text-muted-foreground text-base">
            <Runs runs={block.runs} />
          </p>
        );
      })}
    </div>
  );
}

export function ServiceDetail({ service }: { service: Service }) {
  const content = SERVICE_CONTENT[service.slug];

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
          {content ? (
            <ServiceBody blocks={content.blocks} />
          ) : (
            <p className="text-muted-foreground max-w-3xl text-base">{service.blurb}</p>
          )}
          <div className="mt-10 flex flex-wrap gap-4">
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
