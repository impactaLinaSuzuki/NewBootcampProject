import { useEffect } from 'react';

interface useOnKeydownProps {
	listKeyCode: string[];
	callback: () => void;
	condition?: boolean;
}

export function useOnKeydown({ listKeyCode, callback, condition = true }: useOnKeydownProps) {
	useEffect(() => {
		if (!condition) return;
		function onKeydown(this: Window, ev: KeyboardEvent): any {
			if (listKeyCode.some(k => k === ev.code)) {
				callback();

				ev.preventDefault();
			}
		}

		window.addEventListener('keydown', onKeydown);

		return () => window.removeEventListener('keydown', onKeydown);
	}, [listKeyCode, callback, condition]);
}

export function useOnKeydownEnter(callback: () => void, condition = true) {
	return useOnKeydown({
		listKeyCode: ['Enter', 'NumpadEnter'],
		callback,
		condition,
	});
}
