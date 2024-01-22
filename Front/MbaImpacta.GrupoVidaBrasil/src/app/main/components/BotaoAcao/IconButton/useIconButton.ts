import { useState, MouseEvent } from "react";
import { ConfirmarModal } from "app/interfaces/ConfirmarModal";

interface useIconButtonProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  confirmar?: ConfirmarModal;
}

export function useIconButton({ confirmar, onClick }: useIconButtonProps) {
  const [exibeConfirmacao, setExibeConfirmacao] = useState(false);

  function onFechaConfirmacao() {
    setExibeConfirmacao(false);
  }

  function onConfirmar(e: MouseEvent<HTMLButtonElement>) {
    onFechaConfirmacao();

    if (onClick) onClick(e);
  }

  function _onClick(e: MouseEvent<HTMLButtonElement>) {
    if (confirmar) {
      setExibeConfirmacao(true);
      return;
    }

    if (onClick) onClick(e);
  }

  return {
    exibeConfirmacao,
    onFechaConfirmacao,
    onConfirmar,
    _onClick,
  };
}
