import { ReactNode } from "react";
import { IconButton, Tooltip, IconButtonProps } from "@mui/material";
import { IconPersonalizado } from "app/main/components/Icon";
import { BadgePersonalizado } from "app/main/components/Badge";
import { ModalConfirmar } from "app/main/components/ModalConfirmar";
import { ConfirmarModal } from "app/interfaces/ConfirmarModal";

import { useIconButton } from "./useIconButton";

interface IconButtonCoreProps extends IconButtonProps {
  icone: string;
  tooltip?: string | ReactNode;
  confirmar?: ConfirmarModal;
  countBadge?: number | ReactNode;
  colorIcon?: string;
}

function IconButtonCore({
  onClick,
  icone,
  tooltip,
  confirmar,
  countBadge,
  colorIcon,
  disabled,
  ...rest
}: IconButtonCoreProps) {
  const { exibeConfirmacao, _onClick, onFechaConfirmacao, onConfirmar } =
    useIconButton({ confirmar, onClick });

  const canPossuiBadge = countBadge !== null && countBadge !== undefined;

  const Icon = <IconPersonalizado iconName={icone} colorIcon={colorIcon} />;

  const BadgeIcon = (
    <BadgePersonalizado
      badgeContent={countBadge}
      className="flex flex-1 items-center justify-center"
    >
      {Icon}
    </BadgePersonalizado>
  );

  const IconButtonComponent = (
    <IconButton
      onClick={_onClick}
      size="small"
      color="inherit"
      disabled={disabled}
      {...rest}
    >
      {canPossuiBadge ? BadgeIcon : Icon}
    </IconButton>
  );

  const TooltipButton = (
    <Tooltip title={tooltip || ""} className="flex items-center justify-center">
      {IconButtonComponent}
    </Tooltip>
  );

  return (
    <>
      {tooltip && !disabled ? TooltipButton : IconButtonComponent}

      {exibeConfirmacao && (
        <ModalConfirmar
          titulo={confirmar?.titulo}
          descricao={confirmar?.descricao}
          onCancelar={onFechaConfirmacao}
          onConfirmar={onConfirmar}
        />
      )}
    </>
  );
}

export default IconButtonCore;
