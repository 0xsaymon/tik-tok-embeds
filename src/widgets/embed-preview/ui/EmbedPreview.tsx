import { useEffect, useRef, useState } from 'react';

import type { EmbedConfig, TabValue } from '@/shared/lib/tiktok';
import { reloadEmbedScript } from '@/shared/lib/tiktok';

interface EmbedPreviewProps {
  activeTab: TabValue;
  config: EmbedConfig;
  iframeUrl: string;
}

function useContainerSize(ref: React.RefObject<HTMLDivElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry) {
        setSize({
          width: Math.floor(entry.contentRect.width),
          height: Math.floor(entry.contentRect.height),
        });
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}

export default function EmbedPreview({ activeTab, config, iframeUrl }: EmbedPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const container = useContainerSize(containerRef);

  useEffect(() => {
    if (activeTab === 'oembed') {
      const timer = setTimeout(reloadEmbedScript, 50);
      return () => clearTimeout(timer);
    }
  }, [activeTab, config.videoId]);

  if (activeTab === 'iframe') {
    // Fit iframe in container preserving config aspect ratio
    const aspect = config.width / config.height;
    let iframeW = container.width;
    let iframeH = iframeW / aspect;

    if (iframeH > container.height && container.height > 0) {
      iframeH = container.height;
      iframeW = iframeH * aspect;
    }

    return (
      <div ref={containerRef} className="flex h-full w-full items-center justify-center">
        {container.width > 0 && (
          <iframe
            key={iframeUrl}
            src={iframeUrl}
            allow="fullscreen"
            className="rounded-lg"
            width={Math.floor(iframeW)}
            height={Math.floor(iframeH)}
            title="TikTok Video"
          />
        )}
      </div>
    );
  }

  // oEmbed — scrollable, TikTok controls height
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
