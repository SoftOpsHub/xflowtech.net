import { Container } from '@/src/components/layout/Container';
import { SectionHeading } from '@/src/components/SectionHeading';
import { cn } from '@/src/lib/utils';
import { assetSrc } from '@/src/lib/assets';
import type { AssetKey } from '@/src/lib/content/types';

interface LogoItem {
  name: string;
  logo: AssetKey | null;
  url?: string | null;
}

interface LogoWallProps {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  items: readonly LogoItem[];
  /** Render each logo on a dark chip — for monochrome/white icons. */
  chip?: boolean;
  /** Large-screen column count (default 4). */
  columns?: 4 | 5;
}

export function LogoWall({
  id,
  eyebrow,
  title,
  intro,
  items,
  chip = false,
  columns = 4,
}: LogoWallProps) {
  return (
    <section id={id} className="border-border border-t py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
        <ul
          className={cn(
            'mt-12 grid grid-cols-2 items-stretch gap-x-8 gap-y-10 sm:grid-cols-3',
            columns === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4',
          )}
        >
          {items.map((item) => {
            const img = item.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={assetSrc(item.logo)}
                alt={item.name}
                className={cn(
                  'w-auto object-contain',
                  chip ? 'max-h-12' : 'max-h-14 opacity-80 transition-opacity hover:opacity-100',
                )}
              />
            ) : (
              <span className="text-muted-foreground text-sm font-medium">{item.name}</span>
            );
            const content = item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer noopener"
                title={item.name}
                className="flex h-full items-center justify-center"
              >
                {img}
              </a>
            ) : (
              img
            );
            return (
              <li
                key={item.name}
                className={cn(
                  'flex items-center justify-center',
                  chip ? 'bg-brand-header rounded-lg p-6' : '',
                )}
              >
                {content}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
