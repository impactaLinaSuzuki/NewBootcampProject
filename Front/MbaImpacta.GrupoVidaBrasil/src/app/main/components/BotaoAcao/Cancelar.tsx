import { ButtonBase, ButtonBaseProps } from './ButtonBase';
import { ClassesBotao } from './ClassesBotao';

export function Cancelar({ onClick, loading, ...rest }: ButtonBaseProps) {
	return (
		<ButtonBase
			loading={loading}
			onClick={onClick}
			title="Comum.cancelar"
			className={ClassesBotao.warning}
			icon="cancel"
			{...rest}
		/>
	);
}
