export interface EmbedConfig {
  videoId: string;
  width: number;
  height: number;
  // Iframe player params (/player/v1/)
  autoplay: boolean;
  muted: boolean;
  loop: boolean;
  musicInfo: boolean;
  description: boolean;
  rel: boolean;
  controls: boolean;
  progressBar: boolean;
  playButton: boolean;
  volumeControl: boolean;
  fullscreenButton: boolean;
  timestamp: boolean;
}

export type TabValue = 'oembed' | 'iframe' | 'code';
