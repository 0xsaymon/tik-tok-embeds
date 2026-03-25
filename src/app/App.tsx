import { Button } from '@/shared/ui-kit/components/ui/button';
import { Toaster } from '@/shared/ui-kit/components/ui/sonner';
import { ThemeProvider } from '@/shared/ui-kit/theme';
import ChangeBackgroundSheet from '@/widgets/change-background';

import AppLayout from './layouts/app-layout';

export default function App() {
  return (
    <ThemeProvider>
      <AppLayout>
        <div className="flex flex-1 items-center justify-center">
          <ChangeBackgroundSheet>
            <Button>Change avatar background</Button>
          </ChangeBackgroundSheet>
        </div>
      </AppLayout>
      <Toaster />
    </ThemeProvider>
  );
}
