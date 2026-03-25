import { NavLink } from 'react-router-dom';

import type { NavItem } from './TopBar';

interface BottomNavProps {
  items: readonly NavItem[];
}

export default function BottomNav({ items }: BottomNavProps) {
  return (
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed right-0 bottom-0 left-0 z-50 border-t backdrop-blur md:hidden">
      <div className="flex items-center justify-around py-2">
        {items.map(({ to, label, icon: Icon, end }) => (
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
