import { useState, MouseEvent } from "react";
import { ConfirmarModal } from "app/interfaces/ConfirmarModal";

interface useButtonBaseProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  confirmar?: ConfirmarModal;
}

export function useButtonBase({
  loading,
  confirmar,
  onClick,
}: useButtonBaseProps) {
  const [exibeConfirmacao, setExibeConfirmacao] = useState(false);

  function onFechaConfirmacao() {
    setExibeConfirmacao(false);
  }

  function onConfirmar(e: MouseEvent<HTMLButtonElement>) {
    onFechaConfirmacao();

    if (onClick) onClick(e);
  }

  function _onClick(e: MouseEvent<HTMLButtonElement>) {
    if (loading) return;

    if (confirmar) {
      setExibeConfirmacao(true);
      return;
    }

    if (onClick) onClick(e);
  }

  return {
    exibeConfirmacao,
    onFechaConfirmacao,
    _onClick,
    onConfirmar,
  };
}
