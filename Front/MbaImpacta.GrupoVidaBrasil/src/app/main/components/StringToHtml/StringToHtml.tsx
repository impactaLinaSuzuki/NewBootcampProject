import { useMemo } from 'react';
import { Markup } from 'interweave';

import './styles.css';

interface StringToHtmlProps {
	content: string;
}
export function StringToHtml({ content }: StringToHtmlProps) {
	const newContent = useMemo(() => {
		//tratamento html encoding
		const txt = document.createElement('textarea');
		txt.innerHTML = content;

		return txt.value;
	}, [content]);

	return <Markup content={newContent} />;
}
