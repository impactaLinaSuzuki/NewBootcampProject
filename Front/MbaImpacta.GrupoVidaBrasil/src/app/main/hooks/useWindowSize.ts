import { useState, useEffect, RefObject } from 'react';

interface useWindowSizeProps {
	element?: string;
	elementRef?: RefObject<HTMLElement>;
}

interface WindowSize {
	width: number | null;
	height: number | null;
}

export function useWindowSize({ element, elementRef }: useWindowSizeProps) {
	// Initialize state with undefined width/height so server and client renders match
	// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: null,
		height: null,
	} as WindowSize);

	useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			// Set window width/height to state
			if (element) {
				const selectorElement = document.querySelector(element);
				if (selectorElement) {
					setWindowSize({
						width: selectorElement.clientWidth,
						height: selectorElement.clientHeight,
					});
				}
			} else if (elementRef && elementRef.current) {
				setWindowSize({
					width: elementRef.current.clientWidth,
					height: elementRef.current.clientHeight,
				});
			} else {
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
				});
			}
		}

		// Add event listener
		window.addEventListener('resize', handleResize);

		// Call handler right away so state gets updated with initial window size
		handleResize();

		// Remove event listener on cleanup
		return () => window.removeEventListener('resize', handleResize);
	}, [element, elementRef]);

	return windowSize;
}
