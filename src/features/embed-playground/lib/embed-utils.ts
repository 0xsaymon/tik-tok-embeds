import type { EmbedConfig } from '../model/types';

export function buildIframeUrl(config: EmbedConfig): string {
  const params = new URLSearchParams();
  if (config.hideMusic) params.set('music_info', '0');
  if (config.hideCaption) params.set('description', '0');
  if (config.controls) params.set('controls', '1');
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
