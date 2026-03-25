import { FlaskConical, LayoutGrid, Play } from 'lucide-react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import AlternativesPage from '@/pages/AlternativesPage';
import Home from '@/pages/Home';
import ResearchPage from '@/pages/ResearchPage';
import { Toaster } from '@/shared/ui-kit/components/ui/sonner';
import { ModeToggle, ThemeProvider } from '@/shared/ui-kit/theme';

const NAV_ITEMS = [
  { to: '/', label: 'Playground', icon: Play, end: true },
  { to: '/research', label: 'Research', icon: FlaskConical },
  { to: '/alternatives', label: 'Alternatives', icon: LayoutGrid },
] as const;

function TopBar() {
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm transition-colors ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`;

  return (
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b px-4 py-3 backdrop-blur">
      <div className="flex items-center justify-between">
        <NavLink to="/" end className="text-lg font-semibold hover:opacity-80">
          TikTok Embeds
        </NavLink>

        <div className="hidden items-center gap-5 md:flex">
          {NAV_ITEMS.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={navItemClass}>
              {label}
            </NavLink>
          ))}
        </div>

        <ModeToggle />
      </div>
    </nav>
  );
}

function BottomNav() {
  return (
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed right-0 bottom-0 left-0 z-50 border-t backdrop-blur md:hidden">
      <div className="flex items-center justify-around py-2">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1 text-xs transition-colors ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground'}`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <TopBar />
        <div className="pb-16 md:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/alternatives" element={<AlternativesPage />} />
          </Routes>
        </div>
        <BottomNav />
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
}
