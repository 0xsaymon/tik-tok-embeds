import { XIcon } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import {
  BackgroundGeneratorForm,
  BackgroundGeneratorGallery,
} from '@/features/background-generator';
import { Sheet, SheetClose } from '@/shared/ui-kit/components/ui/sheet';
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui-kit/components/ui/sheet';
import { Typography } from '@/shared/ui-kit/components/ui/typography';

export default function ChangeBackgroundSheet({ children }: PropsWithChildren) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="gap-6 overflow-hidden border-l-0 px-5 sm:max-w-100"
        showCloseButton={false}
      >
        <SheetHeader className="p-0 pt-8">
          <div className="flex items-center justify-between">
            <SheetTitle asChild>
              <Typography as="h2" variant="h3">
                Change background
              </Typography>
            </SheetTitle>
            <SheetClose>
              <XIcon className="size-6" />
            </SheetClose>
          </div>
        </SheetHeader>
        <BackgroundGeneratorForm />
        <BackgroundGeneratorGallery className="mt-4" />
      </SheetContent>
    </Sheet>
  );
}
