import { useState, MouseEvent } from 'react';

interface useFecharProps {
	validaRascunho?: boolean;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function useFechar({ validaRascunho, onClick }: useFecharProps) {
	const [exibeConfirmacao, setExibeConfirmacao] = useState(false);

	function onExibeConfirmacao(e: MouseEvent<HTMLButtonElement>) {
		if (validaRascunho) setExibeConfirmacao(true);
		else if (onClick) onClick(e);
	}

	function onFechaConfirmacao() {
		setExibeConfirmacao(false);
	}

	function onConfirmarVoltar(e: MouseEvent<HTMLButtonElement>) {
		onFechaConfirmacao();

		if (onClick) onClick(e);
	}

	return {
		exibeConfirmacao,
		onExibeConfirmacao,
		onConfirmarVoltar,
		onFechaConfirmacao,
	};
}
