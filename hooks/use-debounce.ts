import { useCallback, useRef } from 'react';

export const useDebounce = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback(
    (func: (...args: any[]) => void, delay: number) => {
      return (...args: any[]) => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          func(...args);
        }, delay);
      };
    },
    []
  );

  return debounce;
};
