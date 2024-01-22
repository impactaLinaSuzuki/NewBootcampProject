import { useState, MouseEvent } from 'react';

export function useReprovar(onClick?: (e: MouseEvent<HTMLButtonElement>) => void) {
	const [exibeConfirmacao, setExibeConfirmacao] = useState(false);

	function onExibeConfirmacao() {
		setExibeConfirmacao(true);
	}

	function onFechaConfirmacao() {
		setExibeConfirmacao(false);
	}

	function onConfirmarExclusao(e: MouseEvent<HTMLButtonElement>) {
		onFechaConfirmacao();

		if (onClick) onClick(e);
	}

	return {
		exibeConfirmacao,
		onExibeConfirmacao,
		onFechaConfirmacao,
		onConfirmarExclusao,
	};
}
