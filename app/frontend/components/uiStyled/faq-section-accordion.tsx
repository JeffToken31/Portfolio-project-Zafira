'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionAccordionProps {
  items: FAQItem[];
}

export default function FAQSectionAccordion({ items }: FAQSectionAccordionProps) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      className="w-full text-left"
    >
      {items.map((item, index) => (
        <AccordionPrimitive.Item
          key={index}
          value={`item-${index}`}
          className="border-b border-gray-200 py-4"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger
              className={cn(
                'flex w-full items-center justify-between text-lg font-medium text-[var(--color-primary)]',
                'focus:outline-none transition-all hover:text-[var(--color-primary-hover)]'
              )}
            >
              {item.question}
              <ChevronDownIcon className="w-5 h-5 transition-transform duration-200 data-[state=open]:rotate-180" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>

          <AccordionPrimitive.Content
            className={cn(
              'mt-2 text-gray-600 overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up'
            )}
          >
            <div className="pt-2 text-base leading-relaxed">
              {item.answer}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
