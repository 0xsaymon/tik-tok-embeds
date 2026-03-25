import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import AlternativesPage from '@/pages/AlternativesPage';
import Home from '@/pages/Home';
import ResearchPage from '@/pages/ResearchPage';
import { Toaster } from '@/shared/ui-kit/components/ui/sonner';
import { ModeToggle, ThemeProvider } from '@/shared/ui-kit/theme';

function Navigation() {
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm transition-colors ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`;

  return (
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b px-4 py-3 backdrop-blur">
      <div className="relative flex items-center justify-between">
        <NavLink to="/" end className="text-lg font-semibold hover:opacity-80">
          TikTok Embeds
        </NavLink>

        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-5">
          <NavLink to="/" end className={navItemClass}>
            Playground
          </NavLink>
          <NavLink to="/research" className={navItemClass}>
            Research
          </NavLink>
          <NavLink to="/alternatives" className={navItemClass}>
            Alternatives
          </NavLink>
        </div>

        <ModeToggle />
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/alternatives" element={<AlternativesPage />} />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
}
