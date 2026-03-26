export interface EmbedConfig {
  videoId: string;
  width: number;
  height: number;
  // Iframe player params (/player/v1/) — verified working
  autoplay: boolean;
  muted: boolean;
  loop: boolean;
  musicInfo: boolean;
  description: boolean;
  rel: boolean;
  controls: boolean;
  timestamp: boolean;
  closedCaption: boolean;
  nativeContextMenu: boolean;
}

export type TabValue = 'iframe' | 'oembed';
