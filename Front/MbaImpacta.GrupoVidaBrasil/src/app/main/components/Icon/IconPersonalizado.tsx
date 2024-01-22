import { useMemo, ReactNode } from "react";
import clsx from "clsx";

import { BadgePersonalizado } from "app/main/components/Badge";
import { Tooltip, Icon } from "@mui/material";

import { IIcon } from "./styles";

interface IconProps {
  iconName: string;
  iconeSvg?: boolean;
  tooltip?: string | ReactNode;
  size?: string | number;
  style?: any;
  countBadge?: number | ReactNode;
  colorIcon?: string;
  className?: string;
}

export function IconPersonalizado({
  iconName,
  tooltip,
  iconeSvg,
  size = "2.4rem",
  style,
  countBadge,
  colorIcon,
  ...rest
}: IconProps) {
  const Icone = useMemo(() => {
    if (iconeSvg)
      return (
        <img
          src={`assets/images/icons/${iconName}.svg`}
          alt={iconName}
          style={{ width: size, ...style }}
          {...rest}
        />
      );

    if (iconName && iconName.startsWith("icon-"))
      return (
        <IIcon
          className={clsx(iconName, rest.className)}
          style={{ fontSize: size, ...style }}
        />
      );

    return (
      <Icon
        style={{ fontSize: size, ...style }}
        sx={{ color: colorIcon }}
        {...rest}
      >
        {iconName}
      </Icon>
    );
  }, [iconName, iconeSvg, size, rest, style, colorIcon]);

  const canPossuiBadge = countBadge !== null && countBadge !== undefined;

  const BadgeIcon = (
    <BadgePersonalizado
      badgeContent={countBadge}
      className="flex items-center justify-center"
    >
      {Icone}
    </BadgePersonalizado>
  );

  const TooltipIcon = (
    <Tooltip title={tooltip || ""}>
      <span className="flex items-center justify-center">
        {canPossuiBadge ? BadgeIcon : Icone}
      </span>
    </Tooltip>
  );

  return tooltip ? TooltipIcon : canPossuiBadge ? BadgeIcon : Icone;
}
