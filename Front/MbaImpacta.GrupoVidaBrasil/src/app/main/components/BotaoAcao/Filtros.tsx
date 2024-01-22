import { ButtonBase, ButtonBaseProps } from './ButtonBase';
import { ClassesBotao } from './ClassesBotao';

export function Filtros({ onClick, loading, ...rest }: ButtonBaseProps) {
	return (
		<ButtonBase
			id="btnOpenFilters"
			loading={loading}
			onClick={onClick}
			title="Comum.filtros"
			className={ClassesBotao.info}
			icon="filter_list"
			{...rest}
		/>
	);
}
