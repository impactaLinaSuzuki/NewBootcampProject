import { useTranslation } from "react-i18next";
import { ButtonBase, ButtonBaseProps } from "../ButtonBase";
import { ClassesBotao } from "../ClassesBotao";
import { ModalConfirmar } from "app/main/components/ModalConfirmar";

import { useVoltar } from "./useVoltar";

interface VoltarProps extends ButtonBaseProps {
  validaRascunho?: boolean;
}

export function Voltar({ onClick, validaRascunho, ...rest }: VoltarProps) {
  const { t } = useTranslation();

  const {
    exibeConfirmacao,
    onExibeConfirmacao,
    onFechaConfirmacao,
    onConfirmarVoltar,
  } = useVoltar({
    validaRascunho,
    onClick,
  });

  return (
    <>
      <ButtonBase
        onClick={onExibeConfirmacao}
        title="Comum.voltar"
        className={ClassesBotao.default}
        icon="arrow_back"
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
