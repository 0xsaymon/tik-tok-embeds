import { ChevronDown } from 'lucide-react';

import { Input } from '@/shared/ui-kit/components/ui/input';
import { Label } from '@/shared/ui-kit/components/ui/label';
import { Switch } from '@/shared/ui-kit/components/ui/switch';
import { Typography } from '@/shared/ui-kit/components/ui/typography';

import { useEmbedPlayground } from '../model/store';
import type { EmbedConfig, TabValue } from '../model/types';

interface EmbedConfigPanelProps {
  config: EmbedConfig;
  onConfigChange: (partial: Partial<EmbedConfig>) => void;
  activeTab: TabValue;
  compact?: boolean;
}

function SwitchRow({
  id,
  label,
  checked,
  onChange,
  compact,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <label className="flex min-h-[32px] items-center gap-2">
        <Switch checked={checked} onCheckedChange={onChange} />
        <span>{label}</span>
      </label>
    );
  }
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={id}>{label}</Label>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

const IFRAME_CONTROLS: {
  group: string;
  items: { id: string; label: string; key: keyof EmbedConfig }[];
}[] = [
  {
    group: 'Відтворення',
    items: [
      { id: 'autoplay', label: 'Autoplay', key: 'autoplay' },
      { id: 'muted', label: 'Muted', key: 'muted' },
      { id: 'loop', label: 'Loop', key: 'loop' },
    ],
  },
  {
    group: 'Інтерфейс',
    items: [
      { id: 'controls', label: 'Controls', key: 'controls' },
      { id: 'progress-bar', label: 'Progress Bar', key: 'progressBar' },
      { id: 'play-button', label: 'Play Button', key: 'playButton' },
      { id: 'volume-control', label: 'Volume', key: 'volumeControl' },
      { id: 'fullscreen-button', label: 'Fullscreen', key: 'fullscreenButton' },
    ],
  },
  {
    group: 'Контент',
    items: [
      { id: 'music-info', label: 'Music Info', key: 'musicInfo' },
      { id: 'description', label: 'Description', key: 'description' },
      { id: 'rel', label: 'Related Videos', key: 'rel' },
      { id: 'timestamp', label: 'Timestamp', key: 'timestamp' },
    ],
  },
];

function CompactIframeControls({
  config,
  onConfigChange,
}: {
  config: EmbedConfig;
  onConfigChange: (partial: Partial<EmbedConfig>) => void;
}) {
  const { controlsOpen, setControlsOpen } = useEmbedPlayground();
  const activeCount = IFRAME_CONTROLS.flatMap(g => g.items).filter(
    i => config[i.key] as boolean,
  ).length;
  const totalCount = IFRAME_CONTROLS.flatMap(g => g.items).length;

  return (
    <div>
      <button
        onClick={() => setControlsOpen(!controlsOpen)}
        className="text-muted-foreground flex w-full items-center justify-between py-1 text-xs"
      >
        <span>
          Параметри iframe ({activeCount}/{totalCount} увімкнено)
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${controlsOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {controlsOpen && (
        <div className="text-muted-foreground mt-2 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm min-[400px]:grid-cols-3">
          {IFRAME_CONTROLS.flatMap(group =>
            group.items.map(item => (
              <SwitchRow
                key={item.id}
                id={`m-${item.id}`}
                label={item.label}
                checked={config[item.key] as boolean}
                onChange={checked => onConfigChange({ [item.key]: checked })}
                compact
              />
            )),
          )}
        </div>
      )}
    </div>
  );
}

export default function EmbedConfigPanel({
  config,
  onConfigChange,
  activeTab,
  compact,
}: EmbedConfigPanelProps) {
  if (activeTab === 'oembed') {
    return (
      <div className={compact ? 'flex items-center gap-3' : 'space-y-4'}>
        <div className={compact ? 'flex items-center gap-2' : 'space-y-2'}>
          {!compact && <Label>Max Width (px)</Label>}
          <Input
            type="number"
            value={config.width}
            onChange={e => onConfigChange({ width: parseInt(e.target.value) })}
            className={compact ? 'h-8 w-20 text-xs' : ''}
            placeholder="Width"
          />
        </div>
        {!compact && (
          <Typography variant="small" className="text-muted-foreground text-xs">
            oEmbed не підтримує кастомізацію внутрішніх елементів. Можна змінити лише max-width
            контейнера. Висота визначається автоматично.
          </Typography>
        )}
      </div>
    );
  }

  // iframe tab - compact (mobile)
  if (compact) {
    return <CompactIframeControls config={config} onConfigChange={onConfigChange} />;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Width (px)</Label>
          <Input
            type="number"
            value={config.width}
            onChange={e => onConfigChange({ width: parseInt(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label>Height (px)</Label>
          <Input
            type="number"
            value={config.height}
            onChange={e => onConfigChange({ height: parseInt(e.target.value) })}
          />
        </div>
      </div>
      {IFRAME_CONTROLS.map(group => (
        <div key={group.group} className="space-y-3 pt-2">
          <Typography
            variant="small"
            className="text-muted-foreground text-xs font-semibold tracking-wider uppercase"
          >
            {group.group}
          </Typography>
          {group.items.map(item => (
            <SwitchRow
              key={item.id}
              id={item.id}
              label={item.label}
              checked={config[item.key] as boolean}
              onChange={checked => onConfigChange({ [item.key]: checked })}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
