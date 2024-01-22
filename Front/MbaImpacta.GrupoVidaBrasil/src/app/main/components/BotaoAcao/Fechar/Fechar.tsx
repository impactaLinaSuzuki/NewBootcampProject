import { useTranslation } from "react-i18next";
import { ModalConfirmar } from "app/main/components/ModalConfirmar";
import { ButtonBase, ButtonBaseProps } from "../ButtonBase";
import { ClassesBotao } from "../ClassesBotao";

import { useFechar } from "./useFechar";

interface FecharProps extends ButtonBaseProps {
  validaRascunho?: boolean;
}

export function Fechar({ onClick, validaRascunho, ...rest }: FecharProps) {
  const { t } = useTranslation();

  const {
    exibeConfirmacao,
    onExibeConfirmacao,
    onConfirmarVoltar,
    onFechaConfirmacao,
  } = useFechar({
    validaRascunho,
    onClick,
  });

  return (
    <>
      <ButtonBase
        onClick={onExibeConfirmacao}
        title="Comum.fechar"
        className={ClassesBotao.fechar}
        icon="close"
        variant="outlined"
        color="primary"
        {...rest}
      />

      {exibeConfirmacao && (
        <ModalConfirmar
          titulo={t("Comum.tituloSalvarRascunho")}
          descricao={t("Comum.mensagemSalvarRascunho")}
          onCancelar={onFechaConfirmacao}
          onConfirmar={onConfirmarVoltar}
        />
      )}
    </>
  );
}
