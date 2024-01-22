import { ButtonBase, ButtonBaseProps } from './ButtonBase';
import { ClassesBotao } from './ClassesBotao';

export function Salvar({ onClick, loading, ...rest }: ButtonBaseProps) {
	return (
		<ButtonBase
			loading={loading}
			onClick={onClick}
			title="Comum.salvar"
			className={ClassesBotao.success}
			icon="save"
			{...rest}
		/>
	);
}
