import { useState, MouseEvent } from 'react';

export function useAprovar(onClick?: (e: MouseEvent<HTMLButtonElement>) => void) {
	const [exibeConfirmacao, setExibeConfirmacao] = useState(false);

	function onExibeConfirmacao() {
		setExibeConfirmacao(true);
	}

	function onFechaConfirmacao() {
		setExibeConfirmacao(false);
	}

	function onConfirmarExclusao(e: MouseEvent<HTMLButtonElement>) {
		onFechaConfirmacao();

		if (typeof onClick === 'function') onClick(e);
	}

	return {
		exibeConfirmacao,
		onExibeConfirmacao,
		onFechaConfirmacao,
		onConfirmarExclusao,
	};
}
