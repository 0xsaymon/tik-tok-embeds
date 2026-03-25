import { Typography } from '@/shared/ui-kit/components/ui/typography';
import { ModeToggle } from '@/shared/ui-kit/theme';

export default function AppHeader() {
  return (
    <header className="flex items-center justify-between gap-4 border-b p-4">
      <Typography variant="h1" className="text-lg">
        TikTok Embeds
      </Typography>
      <ModeToggle />
    </header>
  );
}
