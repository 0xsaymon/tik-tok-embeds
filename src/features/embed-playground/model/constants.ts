import type { TabValue } from './types';

export const DEFAULT_VIDEO_ID = '7613863332826729761';

export const TABS: { value: TabValue; label: string }[] = [
  { value: 'oembed', label: 'oEmbed' },
  { value: 'iframe', label: 'Iframe' },
  { value: 'code', label: 'Code' },
];
