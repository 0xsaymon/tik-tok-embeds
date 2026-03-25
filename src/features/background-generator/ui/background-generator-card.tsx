import { useState } from 'react';

import { Badge } from '@/shared/ui-kit/components/ui/badge';
import { cn } from '@/shared/ui-kit/lib/utils';
import { getNoun } from '@/shared/utils/localization';

import characterImg from '../assets/images/character.png';
import { getBackgroundImageUrl } from '../lib/background-image-url';
import { useBackgroundGeneratorStore } from '../model/background-generator.store';
import type { Background } from '../model/background-generator.types';
import { CircularProgress } from './circular-progress';

type BackgroundGeneratorCardProps = {
  background: Background;
};

function formatEta(etaSeconds: number) {
  if (etaSeconds <= 0) return 'Almost done';

  const minutes = Math.ceil(etaSeconds / 60);
  return `${minutes} ${getNoun(minutes, ['minute', 'minutes'])} left`;
}

const figureStyle =
  'bg-card text-muted-foreground flex aspect-9/16 items-center justify-center overflow-hidden rounded-xl';

export function BackgroundGeneratorCard({ background }: BackgroundGeneratorCardProps) {
  const setDefaultBackground = useBackgroundGeneratorStore(state => state.setDefaultBackground);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (background.status === 'generating') {
    return (
      <figure className={figureStyle}>
        <div className="dark:bg-foreground relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-black">
          <div className="relative">
            <CircularProgress progress={background.progress} />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] text-sm leading-none font-medium text-white dark:text-black">
              {Math.round(background.progress)}%
            </span>
          </div>
          <span className="absolute bottom-3 text-xs text-white dark:text-black">
            {formatEta(background.etaSeconds)}
          </span>
        </div>
      </figure>
    );
  }

  if (background.status === 'failed') {
    return (
      <figure className={figureStyle}>
        <div className="dark:bg-foreground relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-black">
          <div className="relative">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] text-sm leading-none font-medium text-white dark:text-black">
              Failed
            </span>
          </div>
        </div>
      </figure>
    );
  }

  return (
    <figure
      onClick={() => background.status === 'completed' && setDefaultBackground(background.id)}
      className={figureStyle}
    >
      <div
        className={cn(
          'animate-in fade-in zoom-in-95 relative h-full w-full overflow-hidden rounded-xl duration-700',
          background.isDefault &&
            "after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-xl after:shadow-[inset_0_0_0_2px_black] after:content-[''] dark:after:shadow-[inset_0_0_0_2px_white]",
        )}
      >
        {background.isDefault && (
          <Badge className="absolute top-2 left-2 z-3 h-4.75 rounded-[5px] border-0 bg-white px-1 py-1.5 text-[10px] leading-none font-bold text-gray-500 uppercase shadow-[0_0_0_1px_rgba(0,0,0,0.05)] backdrop-blur-[15px]">
            Default
          </Badge>
        )}
        <img
          src={getBackgroundImageUrl(background.seed)}
          alt="Character background"
          onLoad={() => setIsImageLoaded(true)}
          className={cn(
            'absolute z-1 aspect-video h-full w-full object-cover transition-all duration-1000',
            isImageLoaded ? 'blur-0 opacity-100' : 'opacity-0 blur-lg',
          )}
        />
        <img
          src={characterImg}
          alt="Character"
          className="absolute bottom-0 z-2 aspect-video h-full w-26 object-cover"
        />
      </div>
    </figure>
  );
}
