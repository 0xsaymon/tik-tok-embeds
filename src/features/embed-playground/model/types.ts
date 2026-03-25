export interface EmbedConfig {
  videoId: string;
  width: number;
  height: number;
  hideAuthor: boolean;
  hideCaption: boolean;
  hideMusic: boolean;
  autoplay: boolean;
  controls: boolean;
}

export type TabValue = 'oembed' | 'iframe' | 'code';
