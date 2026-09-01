import type { InlineRun, ServiceBlock } from '@/src/lib/content/types';
import { Gallery } from './Gallery';
import { MapTabs } from './MapTabs';

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

/** Renders the shared block model used by service and product pages. */
export function ContentBlocks({ blocks }: { blocks: ServiceBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (block.type === 'heading') {
          return (
            <h2
              key={i}
              className="text-foreground max-w-3xl pt-2 text-xl font-semibold tracking-tight"
            >
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
                  ? 'text-muted-foreground max-w-3xl list-decimal space-y-2 pl-5 text-base'
                  : 'max-w-3xl space-y-2'
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

        if (block.type === 'gallery') {
          return <Gallery key={i} items={block.items} />;
        }

        if (block.type === 'embed') {
          return (
            <div key={i} className="max-w-5xl">
              {block.title && (
                <h2 className="text-foreground pt-2 pb-3 text-xl font-semibold tracking-tight">
                  {block.title}
                </h2>
              )}
              <MapTabs frames={block.frames} />
            </div>
          );
        }

        return (
          <p key={i} className="text-muted-foreground max-w-3xl text-base">
            <Runs runs={block.runs} />
          </p>
        );
      })}
    </div>
  );
}
