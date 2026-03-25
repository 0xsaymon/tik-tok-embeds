import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AlternativesPage } from '@/pages/alternatives';
import { GridPage } from '@/pages/grid';
import { PlaygroundPage } from '@/pages/playground';
import { ResearchPage } from '@/pages/research';
import { Toaster } from '@/shared/ui-kit/components/ui/sonner';
import { ThemeProvider } from '@/shared/ui-kit/theme';
import { AppNavigation } from '@/widgets/app-navigation';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
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
