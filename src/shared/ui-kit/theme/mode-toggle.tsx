import { MonitorSmartphone, Moon, Sun } from 'lucide-react';

import { Button } from '@/shared/ui-kit/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui-kit/components/ui/dropdown-menu';

import type { Theme } from './theme-provider.model';
import { useTheme } from './useTheme';

function ThemeIcon({ theme }: { theme: Theme }) {
  const Component = {
    light: Sun,
    dark: Moon,
    system: MonitorSmartphone,
  }[theme];

  return <Component className="h-[1.2rem] w-[1.2rem]" />;
}

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <ThemeIcon theme={theme} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <ThemeIcon theme="light" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <ThemeIcon theme="dark" /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <ThemeIcon theme="system" /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
