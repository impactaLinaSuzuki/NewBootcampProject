import { ButtonBase, ButtonBaseProps } from './ButtonBase';
import { ClassesBotao } from './ClassesBotao';

export function Buscar({ onClick, loading, ...rest }: ButtonBaseProps) {
	return (
		<ButtonBase
			loading={loading}
			onClick={onClick}
			title="Comum.buscar"
			className={ClassesBotao.info}
			icon="search"
			{...rest}
		/>
	);
}
