import { useEffect, useRef, useState } from 'react';

import type { EmbedConfig, TabValue } from '@/shared/lib/tiktok';
import { reloadEmbedScript } from '@/shared/lib/tiktok';

interface EmbedPreviewProps {
  activeTab: TabValue;
  config: EmbedConfig;
  iframeUrl: string;
  onConfigChange?: (partial: Partial<EmbedConfig>) => void;
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

export default function EmbedPreview({
  activeTab,
  config,
  iframeUrl,
  onConfigChange,
}: EmbedPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const container = useContainerSize(containerRef);
  const initialSyncDone = useRef(false);

  useEffect(() => {
    if (activeTab === 'oembed') {
      const timer = setTimeout(reloadEmbedScript, 50);
      return () => clearTimeout(timer);
    }
  }, [activeTab, config.videoId]);

  // Sync calculated size to config inputs on first render
  useEffect(() => {
    if (
      activeTab === 'iframe' &&
      container.width > 0 &&
      container.height > 0 &&
      onConfigChange &&
      !initialSyncDone.current
    ) {
      const aspect = config.width / config.height;
      let w = container.width;
      let h = w / aspect;
      if (h > container.height) {
        h = container.height;
        w = h * aspect;
      }
      const newW = Math.floor(w);
      const newH = Math.floor(h);
      if (newW !== config.width || newH !== config.height) {
        onConfigChange({ width: newW, height: newH });
      }
      initialSyncDone.current = true;
    }
  }, [activeTab, container, config.width, config.height, onConfigChange]);

  if (activeTab === 'iframe') {
    const aspect = config.width / config.height;
    let iframeW = container.width;
    let iframeH = iframeW / aspect;

    if (iframeH > container.height) {
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

  return (
    <div ref={containerRef} key={config.videoId} className="flex justify-center">
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
