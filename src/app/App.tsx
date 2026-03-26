import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import { AlternativesPage } from '@/pages/alternatives';
import { GridPage } from '@/pages/grid';
import { PlaygroundPage } from '@/pages/playground';
import { ResearchPage } from '@/pages/research';
import { Toaster } from '@/shared/ui-kit/components/ui/sonner';
import { ThemeProvider } from '@/shared/ui-kit/theme';
import { AppNavigation } from '@/widgets/app-navigation';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Don't scroll if ?tab= is present — page handles its own scrolling
    const params = new URLSearchParams(search);
    if (!params.has('tab')) {
      window.scrollTo(0, 0);
    }
  }, [pathname, search]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollToTop />
        <AppNavigation />
        <div className="pb-16 md:pb-0">
          <Routes>
            <Route path="/" element={<PlaygroundPage />} />
            <Route path="/grid" element={<GridPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/alternatives" element={<AlternativesPage />} />
          </Routes>
        </div>
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
}
