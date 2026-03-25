import type { EmbedConfig } from '@/shared/lib/tiktok';

export interface GridVideo {
  id: string;
  videoId: string;
  url: string;
  configOverrides?: Partial<Omit<EmbedConfig, 'videoId' | 'width' | 'height'>>;
}
