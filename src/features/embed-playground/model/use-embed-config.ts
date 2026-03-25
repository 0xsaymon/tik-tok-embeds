import { useEffect, useMemo, useState } from 'react';

import { parseTikTokUrl } from '../lib/parse-tiktok-url';
import { DEFAULT_VIDEO_ID } from './constants';
import type { EmbedConfig, TabValue } from './types';

export function useEmbedConfig() {
  const [config, setConfig] = useState<EmbedConfig>({
    videoId: DEFAULT_VIDEO_ID,
    width: 325,
    height: 700,
    hideAuthor: false,
    hideCaption: false,
    hideMusic: false,
    autoplay: false,
    controls: true,
  });

  const [url, setUrl] = useState('');
  const [activeTab, setActiveTab] = useState<TabValue>('oembed');

  useEffect(() => {
    const existingScript = document.querySelector('script[src*="tiktok.com/embed.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const iframeUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (config.hideMusic) params.set('music_info', '0');
    if (config.hideCaption) params.set('description', '0');
    if (config.controls) params.set('controls', '1');
    return `https://www.tiktok.com/player/v1/${config.videoId}?${params.toString()}`;
  }, [config]);

  const oEmbedHtml = `<blockquote
  class="tiktok-embed"
  cite="https://www.tiktok.com/@user/video/${config.videoId}"
  data-video-id="${config.videoId}"
  style="max-width: ${config.width}px; min-width: 325px;"
>
  <section></section>
</blockquote>
<script async src="https://www.tiktok.com/embed.js"></script>`;

  const handleUrlSubmit = () => {
    const input = url || config.videoId;
    const videoId = parseTikTokUrl(input);
    if (videoId) {
      setConfig(prev => ({ ...prev, videoId }));
    }
  };

  const updateConfig = (partial: Partial<EmbedConfig>) => {
    setConfig(prev => ({ ...prev, ...partial }));
  };

  return {
    config,
    updateConfig,
    url,
    setUrl,
    activeTab,
    setActiveTab,
    iframeUrl,
    oEmbedHtml,
    handleUrlSubmit,
  };
}
