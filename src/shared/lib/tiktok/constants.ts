import type { EmbedConfig, TabValue } from './types';

export const TABS: { value: TabValue; label: string }[] = [
  { value: 'iframe', label: 'Iframe' },
  { value: 'oembed', label: 'oEmbed' },
];

export const DEFAULT_IFRAME_CONFIG: Omit<
  EmbedConfig,
  'videoId' | 'width' | 'height' | 'oembedMaxWidth'
> = {
  autoplay: false,
  muted: false,
  loop: false,
  musicInfo: true,
  description: true,
  rel: true,
  controls: true,
  timestamp: true,
  closedCaption: true,
  nativeContextMenu: true,
};
