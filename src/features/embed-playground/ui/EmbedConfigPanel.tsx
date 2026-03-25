import { Input } from '@/shared/ui-kit/components/ui/input';
import { Label } from '@/shared/ui-kit/components/ui/label';
import { Switch } from '@/shared/ui-kit/components/ui/switch';
import { Typography } from '@/shared/ui-kit/components/ui/typography';

import type { EmbedConfig } from '../model/types';

interface EmbedConfigPanelProps {
  config: EmbedConfig;
  onConfigChange: (partial: Partial<EmbedConfig>) => void;
}

export default function EmbedConfigPanel({ config, onConfigChange }: EmbedConfigPanelProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Video ID</Label>
        <Input value={config.videoId} onChange={e => onConfigChange({ videoId: e.target.value })} />
      </div>
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
      <div className="space-y-3 pt-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="hide-author">Hide Author</Label>
          <Switch
            id="hide-author"
            checked={config.hideAuthor}
            onCheckedChange={checked => onConfigChange({ hideAuthor: checked })}
          />
        </div>
        <Typography variant="small" className="text-muted-foreground text-xs">
          Note: Not officially supported via embed.js. May require iframe approach.
        </Typography>
        <div className="flex items-center justify-between">
          <Label htmlFor="hide-caption">Hide Caption</Label>
          <Switch
            id="hide-caption"
            checked={config.hideCaption}
            onCheckedChange={checked => onConfigChange({ hideCaption: checked })}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="hide-music">Hide Music Info</Label>
          <Switch
            id="hide-music"
            checked={config.hideMusic}
            onCheckedChange={checked => onConfigChange({ hideMusic: checked })}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="controls">Show Controls</Label>
          <Switch
            id="controls"
            checked={config.controls}
            onCheckedChange={checked => onConfigChange({ controls: checked })}
          />
        </div>
      </div>
    </div>
  );
}
