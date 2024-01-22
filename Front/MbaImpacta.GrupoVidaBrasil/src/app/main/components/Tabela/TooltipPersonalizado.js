import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";
import { IconPersonalizado } from "app/main/components/Icon";

function TooltipPersonalizado({
  coluna,
  isColuna = false,
  isConteudo = false,
  conteudoColuna,
  datum,
}) {
  const { t } = useTranslation();

  const exibeTootipObject = useMemo(() => {
    if (typeof coluna.tooltip !== "object") return false;

    return coluna.tooltip.Tooltip.TooltipConfig.some((item) =>
      coluna.dataKey
        .toUpperCase()
        .replaceAll("_", " ")
        .includes(`${item.Aba} ${item.ColunaPrincipal.toUpperCase()}`)
    );
  }, [coluna]);

  const exibeTootipFunction = useMemo(() => {
    return typeof coluna.tooltip === "function";
  }, [coluna]);

  const icon = (
    <IconPersonalizado tooltip={t("Tabela.possuiTooltip")} iconName="info" />
  );

  if (exibeTootipObject) {
    if (isColuna) {
      return icon;
    }
  } else if (exibeTootipFunction) {
    if (isConteudo) {
      return (
        <Tooltip
          title={coluna.tooltip(datum[coluna.dataKey], datum) || ""}
          arrow
        >
          {conteudoColuna}
        </Tooltip>
      );
    }
    if (isColuna) {
      return icon;
    }
  } else if (coluna.tooltip) {
    return icon;
  }

  return null;
}

export default memo(TooltipPersonalizado);
