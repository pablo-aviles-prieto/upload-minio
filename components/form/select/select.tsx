'use client';

import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Options = {
  value: string;
  label: string;
};

interface SelectScrollableProps {
  placeholder: string;
  options: Options[];
  selectedOption: string;
  onChange: (opt: string) => void;
  defaultOption?: string;
  classes?: string;
  maxWidth?: string;
}

export const SelectScrollable = ({
  placeholder,
  options,
  selectedOption,
  onChange,
  defaultOption,
  classes,
  maxWidth,
}: SelectScrollableProps) => {
  const maxWidthClass = React.useMemo(() => maxWidth ?? 'w-full', [maxWidth]);

  return (
    <Select
      defaultValue={defaultOption}
      value={selectedOption}
      onValueChange={onChange}
    >
      <SelectTrigger className={`${classes} ${maxWidthClass}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={`max-h-[200px] ${maxWidthClass}`}>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
