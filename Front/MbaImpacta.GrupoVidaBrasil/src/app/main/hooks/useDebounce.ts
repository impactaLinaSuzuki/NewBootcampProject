import { useRef } from 'react';

export function useDebounce(fn: (...args: any[]) => void, delay: number) {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	function debouncedFn(...args: any[]) {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			fn(...args);
		}, delay);
	}

	return debouncedFn;
}
