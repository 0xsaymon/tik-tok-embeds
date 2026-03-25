import { FlaskConical, Grid3X3, LayoutGrid, Play } from 'lucide-react';

import BottomNav from './BottomNav';
import type { NavItem } from './TopBar';
import TopBar from './TopBar';

const NAV_ITEMS: readonly NavItem[] = [
  { to: '/', label: 'Playground', icon: Play, end: true },
  { to: '/grid', label: 'Сітка', icon: Grid3X3 },
  { to: '/research', label: 'Research', icon: FlaskConical },
  { to: '/alternatives', label: 'Alternatives', icon: LayoutGrid },
];

export default function AppNavigation() {
  return (
    <>
      <TopBar items={NAV_ITEMS} />
      <BottomNav items={NAV_ITEMS} />
    </>
  );
}
