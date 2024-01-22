import { useTranslation } from "react-i18next";
import { IconPersonalizado } from "app/main/components/Icon";
import { Carregando } from "app/main/components/Carregando";

import { Button, ButtonProps } from "@mui/material";
import { ModalConfirmar } from "app/main/components/ModalConfirmar";
import clsx from "clsx";
import { ConfirmarModal } from "app/interfaces/ConfirmarModal";

import { useButtonBase } from "./useButtonBase";
import { Container } from "./styles";

export interface ButtonBaseProps extends ButtonProps {
  loading?: boolean;
  icon?: string;
  confirmar?: ConfirmarModal;
}

export function ButtonBase({
  onClick,
  loading,
  className,
  icon,
  title,
  id,
  confirmar,
  disabled,
  ...rest
}: ButtonBaseProps) {
  const { t } = useTranslation();

  const { exibeConfirmacao, _onClick, onFechaConfirmacao, onConfirmar } =
    useButtonBase({
      loading,
      onClick,
      confirmar,
    });

  return (
    <Container>
      <Button
        onClick={_onClick}
        variant="contained"
        color="inherit"
        className={clsx("botao mx-6", className)}
        id={id}
        {...rest}
        disabled={loading || disabled}
      >
        {loading ? (
          <Carregando small size={25} className="m-0 p-0" />
        ) : (
          <>
            {icon && <IconPersonalizado iconName={icon} className="mr-4" />}
            {title && t(title)}
          </>
        )}
      </Button>

      {exibeConfirmacao && (
        <ModalConfirmar
          titulo={confirmar?.titulo}
          descricao={confirmar?.descricao}
          descricaoComponent={confirmar?.descricaoComponent}
          onCancelar={onFechaConfirmacao}
          onConfirmar={onConfirmar}
        />
      )}
    </Container>
  );
}
