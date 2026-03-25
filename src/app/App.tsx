import { useEffect } from 'react';

import { Toaster } from '@/shared/ui-kit/components/ui/sonner';
import { ThemeProvider } from '@/shared/ui-kit/theme';

import AppLayout from './layouts/app-layout';

const TIKTOK_VIDEO_ID = '7469092959268498718';

export default function App() {
  useEffect(() => {
    const existing = document.querySelector('script[src*="tiktok.com/embed.js"]');
    if (existing) return;

    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <ThemeProvider>
      <AppLayout>
        <div className="flex flex-1 items-center justify-center p-8">
          <blockquote
            className="tiktok-embed"
            cite={`https://www.tiktok.com/video/${TIKTOK_VIDEO_ID}`}
            data-video-id={TIKTOK_VIDEO_ID}
            style={{ maxWidth: 605, minWidth: 325 }}
          >
            <section />
          </blockquote>
        </div>
      </AppLayout>
      <Toaster />
    </ThemeProvider>
  );
}
