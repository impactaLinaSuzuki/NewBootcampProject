import { ButtonBase, ButtonBaseProps } from './ButtonBase';
import { ClassesBotao } from './ClassesBotao';

export function Adicionar({ onClick, loading, ...rest }: ButtonBaseProps) {
	return (
		<ButtonBase
			loading={loading}
			onClick={onClick}
			title="Comum.adicionar"
			className={ClassesBotao.success}
			icon="add_circle_outline"
			{...rest}
		/>
	);
}
