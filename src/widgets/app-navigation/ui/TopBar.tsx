import type { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { ModeToggle } from '@/shared/ui-kit/theme';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

interface TopBarProps {
  items: readonly NavItem[];
}

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm transition-colors ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`;

export default function TopBar({ items }: TopBarProps) {
  return (
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b px-4 py-3 backdrop-blur">
      <div className="flex items-center justify-between">
        <NavLink to="/" end className="text-lg font-semibold hover:opacity-80">
          TikTok Embeds
        </NavLink>

        <div className="hidden items-center gap-5 md:flex">
          {items.map(({ to, label, end }) => (
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
