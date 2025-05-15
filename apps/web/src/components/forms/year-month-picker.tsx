'use client';

import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

type YearMonth = { year: number; month: number };

type YearMonthPickerProps = {
  value?: YearMonth;
  onChange: (val: YearMonth) => void;
};

export function YearMonthPicker({ value, onChange }: YearMonthPickerProps) {
  const [open, setOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const selected = value ?? { year: currentYear, month: new Date().getMonth() + 1 };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {`${selected.year}-${String(selected.month).padStart(2, '0')}`}
          <CalendarIcon className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex justify-between items-center mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChange({ ...selected, year: selected.year - 1 })}
          >
            ‹
          </Button>
          <span className="text-sm font-medium">{selected.year}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChange({ ...selected, year: selected.year + 1 })}
          >
            ›
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {months.map((m, i) => {
            const monthNumber = i + 1; // 1-based
            return (
              <Button
                key={m}
                variant={monthNumber === selected.month ? 'default' : 'outline'}
                onClick={() => {
                  onChange({ year: selected.year, month: monthNumber });
                  setOpen(false);
                }}
              >
                {m.slice(0, 3)}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
