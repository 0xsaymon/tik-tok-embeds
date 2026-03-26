import type { EmbedConfig } from './types';

export function buildIframeUrl(config: EmbedConfig): string {
  const params = new URLSearchParams({
    autoplay: config.autoplay ? '1' : '0',
    muted: config.muted ? '1' : '0',
    loop: config.loop ? '1' : '0',
    music_info: config.musicInfo ? '1' : '0',
    description: config.description ? '1' : '0',
    rel: config.rel ? '1' : '0',
    controls: config.controls ? '1' : '0',
    timestamp: config.timestamp ? '1' : '0',
  });
  return `https://www.tiktok.com/player/v1/${config.videoId}?${params.toString()}`;
}

export function buildOEmbedHtml(config: EmbedConfig): string {
  return `<blockquote
  class="tiktok-embed"
  cite="https://www.tiktok.com/@user/video/${config.videoId}"
  data-video-id="${config.videoId}"
  style="max-width: ${config.width}px; min-width: 325px;"
>
  <section></section>
</blockquote>
<script async src="https://www.tiktok.com/embed.js"></script>`;
}

/**
 * Re-triggers TikTok embed.js to process new blockquote elements.
 * embed.js only processes elements once on load, so we need to
 * remove and re-add the script when the videoId changes.
 */
export function reloadEmbedScript(): void {
  const existing = document.querySelector('script[src*="tiktok.com/embed.js"]');
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.src = 'https://www.tiktok.com/embed.js';
  script.async = true;
  document.body.appendChild(script);
}
