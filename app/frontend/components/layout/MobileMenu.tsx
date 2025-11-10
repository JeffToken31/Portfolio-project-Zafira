'use client';

import * as React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { Menu } from 'lucide-react';
import { Button } from '../uiStyled/button';
import {cn} from '@/lib/utils/cn';

export default function MobileMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default" size="sm">
          <Menu />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={5}
        className={cn(
          'relative z-50 flex flex-col bg-white p-4 rounded-lg shadow-lg min-w-[180px]',
          'space-y-3'
        )}
      >
        <a
          href="#actions"
          className="text-text hover:text-primary transition-colors"
        >
          Actions
        </a>
        <a
          href="#about"
          className="text-text hover:text-primary transition-colors"
        >
          À propos
        </a>
        <a
          href="#contact"
          className="text-text hover:text-primary transition-colors"
        >
          Contact
        </a>
      </PopoverContent>
    </Popover>
  );
}
