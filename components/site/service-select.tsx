'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type ServiceSelectProps = {
  id: string
  name: string
  options: string[]
  placeholder?: string
  invalid?: boolean
  describedBy?: string
}

export function ServiceSelect({
  id,
  name,
  options,
  placeholder = 'Select a service',
  invalid,
  describedBy,
}: ServiceSelectProps) {
  return (
    <SelectPrimitive.Root name={name} required>
      <SelectPrimitive.Trigger
        id={id}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className={cn(
          'group flex w-full items-center justify-between gap-2 rounded-xl border border-white/10 bg-[#0A0D14] px-4 py-3 text-left text-sm text-slate-200 outline-none transition-all',
          'hover:border-white/20 focus-visible:border-brand-cyan/50 focus-visible:ring-2 focus-visible:ring-brand-cyan/20',
          'data-[state=open]:border-brand-cyan/50 data-[state=open]:ring-2 data-[state=open]:ring-brand-cyan/20',
          'data-[placeholder]:text-muted-foreground/70 aria-invalid:border-destructive/60',
        )}
      >
        <span className="truncate">
          <SelectPrimitive.Value placeholder={placeholder} />
        </span>
        <SelectPrimitive.Icon asChild>
          <ChevronDown
            aria-hidden="true"
            className="size-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:text-brand-cyan group-data-[state=open]:rotate-180 group-data-[state=open]:text-brand-cyan"
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={8}
          className={cn(
            'relative z-[100] max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-brand-cyan/25 bg-[#0A0D14]/85 p-1.5 text-slate-200 shadow-2xl shadow-brand-cyan/10 backdrop-blur-xl',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
          )}
        >
          <SelectPrimitive.Viewport className="flex flex-col gap-0.5">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option}
                value={option}
                className={cn(
                  'relative flex cursor-pointer select-none items-center rounded-lg py-2.5 pr-9 pl-3 text-sm text-slate-200 outline-none transition-colors',
                  'hover:bg-white/10 data-[highlighted]:bg-brand-cyan/10 data-[highlighted]:text-white',
                  'data-[state=checked]:font-medium data-[state=checked]:text-brand-cyan',
                )}
              >
                <SelectPrimitive.ItemText>{option}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute right-3 inline-flex items-center">
                  <Check aria-hidden="true" className="size-4 text-brand-cyan" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
