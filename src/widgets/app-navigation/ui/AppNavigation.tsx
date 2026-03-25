import { FlaskConical, Grid3X3, LayoutGrid, Play } from 'lucide-react';

import BottomNav from './BottomNav';
import type { NavItem } from './TopBar';
import TopBar from './TopBar';

const NAV_ITEMS: readonly NavItem[] = [
  { to: '/', label: 'Пісочниця', icon: Play, end: true },
  { to: '/grid', label: 'Сітка', icon: Grid3X3 },
  { to: '/research', label: 'Дослідження', icon: FlaskConical },
  { to: '/alternatives', label: 'Альтернативи', icon: LayoutGrid },
];

export default function AppNavigation() {
  return (
    <>
      <TopBar items={NAV_ITEMS} />
      <BottomNav items={NAV_ITEMS} />
    </>
  );
}
