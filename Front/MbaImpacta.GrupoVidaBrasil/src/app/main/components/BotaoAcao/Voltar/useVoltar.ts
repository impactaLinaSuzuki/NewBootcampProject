import { useState, MouseEvent } from 'react';

interface useVoltarProps {
	validaRascunho?: boolean;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function useVoltar({ validaRascunho, onClick }: useVoltarProps) {
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
		onFechaConfirmacao,
		onConfirmarVoltar,
	};
}
