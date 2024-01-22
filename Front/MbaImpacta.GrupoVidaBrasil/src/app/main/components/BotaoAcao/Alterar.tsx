import { ButtonBase, ButtonBaseProps } from './ButtonBase';
import { ClassesBotao } from './ClassesBotao';

export function Alterar({ onClick, loading, ...rest }: ButtonBaseProps) {
	return (
		<ButtonBase
			loading={loading}
			onClick={onClick}
			title="Comum.alterar"
			className={ClassesBotao.default}
			icon="edit"
			{...rest}
		/>
	);
}
