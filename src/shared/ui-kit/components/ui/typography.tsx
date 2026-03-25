import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/ui-kit/lib/utils';

// Variants
const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold text-balance',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold first:mt-0',
      h3: 'scroll-m-20 text-[1.375rem] font-bold leading-[1.2]',
      h4: 'scroll-m-20 text-xl font-semibold',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
      'inline-code':
        'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
    },
  },
});

// Types
type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>['variant']>;

type TypographyAs =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'span'
  | 'div'
  | 'blockquote'
  | 'code'
  | 'small'
  | 'label';

type TypographyProps<T extends TypographyAs = 'p'> = {
  as?: T;
  variant?: TypographyVariant;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as'>;

// Default variant resolution
const defaultVariantMap: Partial<Record<TypographyAs, TypographyVariant>> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  blockquote: 'blockquote',
  code: 'inline-code',
  small: 'small',
};

function Typography<T extends TypographyAs = 'p'>({
  as,
  variant,
  className,
  ...props
}: TypographyProps<T>) {
  const Comp = (as ?? 'p') as React.ElementType;
  const resolvedVariant = variant ?? defaultVariantMap[as ?? 'p'];

  return (
    <Comp
      data-slot="typography"
      data-variant={resolvedVariant}
      className={cn(typographyVariants({ variant: resolvedVariant }), className)}
      {...props}
    />
  );
}

export { Typography, typographyVariants };
export type { TypographyAs, TypographyProps, TypographyVariant };
