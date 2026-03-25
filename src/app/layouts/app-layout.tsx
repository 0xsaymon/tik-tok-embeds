import type { PropsWithChildren } from 'react';

import { AppHeader } from '@/widgets/app-header';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-dvh w-full flex-col">
      <AppHeader />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
