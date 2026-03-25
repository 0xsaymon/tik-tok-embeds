import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

import { ScrollArea } from '@/shared/ui-kit/components/ui/scroll-area';
import { Typography } from '@/shared/ui-kit/components/ui/typography';
import { cn } from '@/shared/ui-kit/lib/utils';

import { useBackgroundGeneratorStore } from '../model/background-generator.store';
import { BackgroundGeneratorCard } from './background-generator-card';

const COLUMNS = 3;
const ROW_HEIGHT = 198; // px — card height
const GAP = 12; // gap between cards

export function BackgroundGeneratorGallery({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'section'>) {
  const backgrounds = useBackgroundGeneratorStore(state => state.backgrounds);
  const viewportRef = useRef<HTMLDivElement>(null);

  const rowCount = Math.ceil(backgrounds.length / COLUMNS);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => viewportRef.current,
    estimateSize: () => ROW_HEIGHT + GAP,
    overscan: 2,
    useFlushSync: false,
    paddingEnd: GAP,
  });

  return (
    <section className={cn('flex min-h-0 flex-1 flex-col', className)} {...props}>
      <Typography variant="small" className="leading-4.25 font-semibold tracking-normal">
        Your backgrounds
      </Typography>

      <ScrollArea viewportRef={viewportRef} className="mt-2.5 min-h-0 flex-1">
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const startIndex = virtualRow.index * COLUMNS;
            const rowItems = backgrounds.slice(startIndex, startIndex + COLUMNS);

            return (
              <div
                key={virtualRow.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: virtualRow.size - GAP,
                  transform: `translateY(${virtualRow.start}px)`,
                  display: 'grid',
                  gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
                  gap: GAP,
                }}
              >
                {rowItems.map(background => (
                  <BackgroundGeneratorCard key={background.id} background={background} />
                ))}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </section>
  );
}
