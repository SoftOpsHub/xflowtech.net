import { Container } from '@/src/components/layout/Container';
import { assetSrc } from '@/src/lib/assets';
import { OFFICES } from '@/src/lib/content/offices';
import type { OfficeLocation } from '@/src/lib/content/types';

function OfficeBlock({ office }: { office: OfficeLocation }) {
  return (
    <div>
      <h2 className="text-foreground font-semibold">{office.entity}</h2>
      <address className="text-muted-foreground mt-1 text-sm not-italic">
        {office.addressLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </address>
      {office.email ? (
        <a
          href={`mailto:${office.email}`}
          className="text-brand-accent mt-2 inline-block text-sm font-medium underline underline-offset-4"
        >
          {office.email}
        </a>
      ) : null}
    </div>
  );
}

export function OfficeList() {
  // Group consecutive offices that share a logo into one column.
  const columns: { logo: string; offices: OfficeLocation[] }[] = [];
  for (const office of OFFICES) {
    const last = columns.at(-1);
    if (last && last.logo === office.logo) last.offices.push(office);
    else columns.push({ logo: office.logo, offices: [office] });
  }

  return (
    <section id="offices" className="py-14 sm:py-16">
      <Container>
        <h1 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h1>
        <div
          className={
            columns.length > 1
              ? 'mx-auto mt-12 grid max-w-4xl gap-12 sm:grid-cols-2'
              : 'mx-auto mt-12 flex max-w-4xl justify-center'
          }
        >

          {columns.map((col) => (
            <div
              key={col.offices.map((o) => o.entity).join('|')}
              className="text-center sm:text-start"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetSrc(col.logo)}
                alt=""
                className="mx-auto mb-5 h-16 w-auto object-contain sm:mx-0"
              />
              <div className="space-y-6">
                {col.offices.map((office) => (
                  <OfficeBlock key={office.entity} office={office} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
