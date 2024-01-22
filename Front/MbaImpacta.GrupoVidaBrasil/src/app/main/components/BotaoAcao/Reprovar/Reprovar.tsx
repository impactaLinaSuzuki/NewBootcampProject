import { useTranslation } from "react-i18next";
import { ModalConfirmar } from "app/main/components/ModalConfirmar";
import { ButtonBase, ButtonBaseProps } from "../ButtonBase";
import { IconButton } from "../IconButton";
import { ClassesBotao } from "../ClassesBotao";

import { useReprovar } from "./useReprovar";

interface ReprovarProps extends ButtonBaseProps {
  iconButton?: boolean;
}

export function Reprovar({
  onClick,
  loading,
  iconButton,
  ...rest
}: ReprovarProps) {
  const { t } = useTranslation();

  const {
    exibeConfirmacao,
    onExibeConfirmacao,
    onFechaConfirmacao,
    onConfirmarExclusao,
  } = useReprovar(onClick);

  return (
    <>
      {iconButton ? (
        <IconButton
          onClick={onExibeConfirmacao}
          icone="close"
          className="text-red-600"
        />
      ) : (
        <ButtonBase
          loading={loading}
          onClick={onExibeConfirmacao}
          title="Comum.reprovar"
          className={ClassesBotao.warning}
          icon="close"
          {...rest}
        />
      )}

      {exibeConfirmacao && (
        <ModalConfirmar
          titulo={t("Comum.confirmarReprovar")}
          descricao={t("Comum.mensagemConfirmarReprovar")}
          onCancelar={onFechaConfirmacao}
          onConfirmar={onConfirmarExclusao}
        />
      )}
    </>
  );
}
