import { useEffect } from 'react';

import { reloadEmbedScript } from '../lib/embed-utils';
import type { EmbedConfig, TabValue } from '../model/types';

interface EmbedPreviewProps {
  activeTab: TabValue;
  config: EmbedConfig;
  iframeUrl: string;
}

export default function EmbedPreview({ activeTab, config, iframeUrl }: EmbedPreviewProps) {
  useEffect(() => {
    if (activeTab === 'oembed') {
      const timer = setTimeout(reloadEmbedScript, 50);
      return () => clearTimeout(timer);
    }
  }, [activeTab, config.videoId]);

  if (activeTab === 'iframe') {
    return (
      <div className="flex h-full items-start justify-center">
        <iframe
          key={iframeUrl}
          src={iframeUrl}
          allow="fullscreen"
          className="h-full w-full rounded-lg md:h-auto md:w-auto"
          style={{
            maxWidth: config.width,
            aspectRatio: `${config.width} / ${config.height}`,
          }}
          width={config.width}
          height={config.height}
          title="TikTok Video"
        />
      </div>
    );
  }

  return (
    <div key={config.videoId} className="flex justify-center">
      <blockquote
        className="tiktok-embed"
        cite={`https://www.tiktok.com/video/${config.videoId}`}
        data-video-id={config.videoId}
        style={{ maxWidth: config.width, minWidth: 325 }}
      >
        <section />
      </blockquote>
    </div>
  );
}
