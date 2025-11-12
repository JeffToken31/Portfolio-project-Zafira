'use client';

import * as React from 'react';
import {Popover, PopoverTrigger, PopoverContent} from '@radix-ui/react-popover';
import {Menu} from 'lucide-react';
import {Button} from '../uiStyled/button';
import {cn} from '@/lib/utils/cn';

interface MobileMenuProps {
  handleNavigation: (sectionId: string) => void;
}

export default function MobileMenu({handleNavigation}: MobileMenuProps) {
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
        <button
          onClick={() => handleNavigation('#hero')}
          className="text-text hover:text-primary transition-colors"
        >
          Accueil
        </button>
        <button
          onClick={() => handleNavigation('#mission')}
          className="text-text hover:text-primary transition-colors"
        >
          À propos
        </button>
        <button
          onClick={() => handleNavigation('#actions')}
          className="text-text hover:text-primary transition-colors"
        >
          Actions
        </button>
        <button
          onClick={() => handleNavigation('#blog')}
          className="text-text hover:text-primary transition-colors"
        >
          Actualités
        </button>
        <button
          onClick={() => handleNavigation('#faq')}
          className="text-text hover:text-primary transition-colors"
        >
          FAQ
        </button>
        <button
          onClick={() => handleNavigation('#participation')}
          className="text-text hover:text-primary transition-colors"
        >
          Dons
        </button>
      </PopoverContent>
    </Popover>
  );
}
