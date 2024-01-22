import { Badge, BadgeProps } from "@mui/material";

interface BadgePersonlizadoProps extends BadgeProps {
  maxNumber?: number;
}

const MAX_NUMBER_BADGE = 999;

export function BadgePersonalizado({
  badgeContent,
  color,
  maxNumber,
  children,
  ...rest
}: BadgePersonlizadoProps) {
  return (
    <Badge
      badgeContent={badgeContent || 0}
      color={color || "secondary"}
      max={maxNumber || MAX_NUMBER_BADGE}
      {...rest}
    >
      {children}
    </Badge>
  );
}
