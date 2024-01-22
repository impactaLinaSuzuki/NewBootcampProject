import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { ButtonBase, ButtonBaseProps } from './ButtonBase';
import { IconButton } from './IconButton';
import { ClassesBotao } from './ClassesBotao';

interface ApagarProps extends ButtonBaseProps {
	iconButton?: boolean;
}

export function Apagar({ onClick, loading, iconButton, className, ...rest }: ApagarProps) {
	const { t } = useTranslation();

	return (
		<>
			{iconButton ? (
				<IconButton
					onClick={onClick}
					icone="delete_forever"
					className={clsx('text-red-600', className)}
					confirmar={{
						titulo: t('Comum.confirmarExclusao'),
						descricao: t('Comum.mensagemConfirmaExcluir'),
					}}
					{...rest}
				/>
			) : (
				<ButtonBase
					loading={loading}
					onClick={onClick}
					title="Comum.apagar"
					className={clsx(ClassesBotao.warning, className)}
					icon="delete"
					confirmar={{
						titulo: t('Comum.confirmarExclusao'),
						descricao: t('Comum.mensagemConfirmaExcluir'),
					}}
					{...rest}
				/>
			)}
		</>
	);
}
