import { Input } from '@/shared/ui-kit/components/ui/input';
import { Label } from '@/shared/ui-kit/components/ui/label';
import { Switch } from '@/shared/ui-kit/components/ui/switch';
import { Typography } from '@/shared/ui-kit/components/ui/typography';

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
      <label className="flex items-center gap-1.5">
        <Switch size="sm" checked={checked} onCheckedChange={onChange} />
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

export default function EmbedConfigPanel({
  config,
  onConfigChange,
  activeTab,
  compact,
}: EmbedConfigPanelProps) {
  if (activeTab === 'code') return null;

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

  // iframe tab
  if (compact) {
    return (
      <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
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
    );
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
