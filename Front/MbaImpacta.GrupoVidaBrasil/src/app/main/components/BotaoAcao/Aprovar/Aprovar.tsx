import { useTranslation } from "react-i18next";
import { ModalConfirmar } from "app/main/components/ModalConfirmar";
import { ButtonBase, ButtonBaseProps } from "../ButtonBase";
import { IconButton } from "../IconButton";
import { ClassesBotao } from "../ClassesBotao";

import { useAprovar } from "./useAprovar";

interface AprovarProps extends ButtonBaseProps {
  iconButton?: boolean;
  tituloConfirmacao?: string;
  msgConfirmacao?: string;
}

export function Aprovar({
  onClick,
  loading,
  iconButton,
  tituloConfirmacao,
  msgConfirmacao,
  ...rest
}: AprovarProps) {
  const { t } = useTranslation();
  const {
    exibeConfirmacao,
    onExibeConfirmacao,
    onFechaConfirmacao,
    onConfirmarExclusao,
  } = useAprovar(onClick);

  return (
    <>
      {iconButton ? (
        <IconButton
          onClick={onExibeConfirmacao}
          icone="check"
          className="text-red-600"
        />
      ) : (
        <ButtonBase
          loading={loading}
          onClick={onExibeConfirmacao}
          title="Comum.aprovar"
          className={ClassesBotao.success}
          icon="check"
          {...rest}
        />
      )}

      {exibeConfirmacao && (
        <ModalConfirmar
          titulo={tituloConfirmacao || t("Comum.confirmarAprovar")}
          descricao={msgConfirmacao || t("Comum.mensagemConfirmarAprovar")}
          onCancelar={onFechaConfirmacao}
          onConfirmar={onConfirmarExclusao}
        />
      )}
    </>
  );
}
