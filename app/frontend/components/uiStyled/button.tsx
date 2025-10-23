import * as React from 'react';
import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '@/lib/utils/cn';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-white text-primary-foreground hover:bg-bg-alt',
        connect: 'bg-secondary text-white hover:bg-secondary-hover',
        rose: 'bg-primary text-text hover:bg-primary-hover hover:text-white',
        bleu: 'bg-secondary text-text hover:bg-secondary-hover hover:text-white',
        blanc: 'bg-bg text-text text-blue-500 hover:bg-blue-50',
        fake: 'bg-white text-primary-foreground',
        jaune: 'bg-accent text-text hover:bg-accent-hover hover:text-white',
        heroSection: 'bg-secondary text-white hover:bg-secondary-hover',
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
        blog: 'bg-primary text-white hover:bg-primary-hover hover:text-white',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-8 py-3 has-[>svg]:px-3',
        sm: 'h-8 rounded-full gap-1.5 px-3',
        lg: 'h-10 rounded-full px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  href,
  ...props
}: ButtonProps) {
  // If href is used button is an <a>
  const Comp = href ? 'a' : asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({variant, size, className}))}
      {...(href ? {href} : {})}
      {...props}
    />
  );
}

export {Button, buttonVariants};