import { ReactNode, MouseEvent } from "react";
import { Typography, TypographyProps } from "@mui/material";

import { useTranslation } from "react-i18next";

import { Header } from "./styles";
import { IconButton } from "../BotaoAcao";
import { IconPersonalizado } from "../Icon";
import { CardBordered } from "../CardBordered";
import GridPersonalizado from "../Grid";

interface CardDadosProps {
  classTitulo?: string;
  titulo: string | ReactNode;
  sizeIcone?: number;
  icone?: string;
  children: ReactNode;
  classeContent?: string;
  grid?: boolean;
  className?: string;
  onClickAdicionar?: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickEditar?: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickInfo?: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickExcluir?: (e: MouseEvent<HTMLButtonElement>) => void;
  tituloAdicional?: ReactNode | null;
  buttonAdicional?: ReactNode | null;
  headerBackground?: string;
  headerColor?: string;
  iconeSvg?: boolean;
}

export function CardDados({
  classTitulo,
  sizeIcone,
  titulo,
  icone,
  children,
  classeContent,
  grid,
  className,
  onClickAdicionar,
  onClickEditar,
  onClickInfo,
  onClickExcluir,
  tituloAdicional = null,
  buttonAdicional = null,
  headerBackground,
  headerColor,
  iconeSvg,
}: CardDadosProps) {
  const { t } = useTranslation();

  const variant = classTitulo || "body1";

  return (
    <CardBordered className={className}>
      <Header
        className="flex w-full items-center p-4 rounded-t-md"
        headerbackground={headerBackground}
        headercolor={headerColor}
      >
        {!!icone && (
          <IconPersonalizado
            iconName={icone}
            size={sizeIcone ? sizeIcone : 15}
            iconeSvg={iconeSvg}
          />
        )}

        {typeof titulo === "string" ? (
          <Typography
            variant={variant as TypographyProps["variant"]}
            className="flex flex-1 items-center ml-4"
          >
            {titulo}
          </Typography>
        ) : (
          titulo
        )}

        <div className="flex flex-row ml-4">
          {tituloAdicional}

          {buttonAdicional}

          {!!onClickInfo && (
            <IconButton
              className="iconeAction"
              onClick={onClickInfo}
              icone="info"
              tooltip={t("Atendimento.Abertura.dadosAdicionais")}
            />
          )}

          {!!onClickEditar && (
            <IconButton
              className="iconeAction"
              onClick={onClickEditar}
              icone="edit"
              tooltip={t("Comum.editar")}
            />
          )}

          {!!onClickExcluir && (
            <IconButton
              className="iconeAction"
              onClick={onClickExcluir}
              icone="delete_forever"
              tooltip={t("Comum.excluir")}
              confirmar={{
                titulo: t("Comum.excluir"),
                descricao: t("Comum.confirmarExclusao"),
              }}
            />
          )}

          {!!onClickAdicionar && (
            <IconButton
              className="iconeAction"
              onClick={onClickAdicionar}
              icone="add"
              tooltip={t("Comum.adicionar")}
            />
          )}
        </div>
      </Header>

      {grid ? (
        <GridPersonalizado
          container
          spacing={1}
          className={classeContent || "p-8"}
        >
          {children}
        </GridPersonalizado>
      ) : (
        children
      )}
    </CardBordered>
  );
}
