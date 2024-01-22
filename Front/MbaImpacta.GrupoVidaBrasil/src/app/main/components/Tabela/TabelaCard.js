import { memo, lazy, useEffect, useState, useMemo, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Paper, Typography } from "@mui/material";
import { executeSearch } from "app/utils/Search";
import { IconPersonalizado } from "../Icon";
import { InputSearch } from "../InputSearch";
import { Carregando } from "../Carregando";

const TabelaMansory = lazy(() =>
  import(/* webpackChunkName: "TabelaMansory" */ "./TabelaMansory")
);
const VirtualizedList = lazy(() =>
  import(/* webpackChunkName: "VirtualizedList" */ "./VirtualizedList")
);

function TabelaCard({
  linhas,
  colunas,
  CardItem,
  onClick,
  columnWidth,
  campoID,
  isTabelaMansory,
  minHeightCard,
  ocultaTotalLinhas,
  buttonChangeViewTable,
  exibeBusca = true,
  onRetornaListaFiltrada,
  ocultarTableView,
  OcultarBotaoExcel,
}) {
  const { t } = useTranslation();

  const [linhasFiltro, setLinhasFiltro] = useState(linhas);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    if (typeof onRetornaListaFiltrada === "function") {
      onRetornaListaFiltrada(linhasFiltro);
    }
  }, [linhasFiltro, onRetornaListaFiltrada]);

  useEffect(() => {
    setLinhasFiltro(linhas);
    setFiltro("");
  }, [linhas]);

  const onFiltraLinhas = (novoTextoFiltro) => {
    if (novoTextoFiltro === "") return setLinhasFiltro(linhas);

    setFiltro(novoTextoFiltro?.trim());
    const textoPesquisa = novoTextoFiltro?.trim();

    const colunasKey = colunas
      .filter((coluna) => coluna.filterable)
      .map((coluna) => coluna.key);

    const newLinhas = executeSearch(linhas, colunasKey, textoPesquisa);

    setLinhasFiltro(newLinhas);
  };

  const totalLinhas = useMemo(() => {
    if (!linhasFiltro || ocultaTotalLinhas) return null;

    return (
      <Typography variant="body1">
        {t("Tabela.totalRegistros")}: {linhasFiltro.length}
      </Typography>
    );
  }, [linhasFiltro, ocultaTotalLinhas, t]);

  return (
    <div className="h-full flex flex-1 flex-col">
      {exibeBusca && (
        <div className="flex mb-4 border-b-1 pb-4">
          <Paper
            className="flex items-center w-full p-6 rounded-8"
            elevation={1}
          >
            <IconPersonalizado iconName="search" color="action" />

            <InputSearch
              value={filtro}
              placeholder={t("Tabela.filterCards")}
              fullWidth
              variant="standard"
              onChange={onFiltraLinhas}
              InputProps={{
                disableUnderline: true,
                inputProps: {
                  "aria-label": "Search",
                },
              }}
            />
          </Paper>
        </div>
      )}

      <div className="flex-1">
        {isTabelaMansory ? (
          <Suspense fallback={<Carregando />}>
            <TabelaMansory
              linhas={linhasFiltro}
              CardItem={CardItem}
              onClick={onClick}
              columnWidth={columnWidth}
              campoID={campoID}
              minHeightCard={minHeightCard}
            />
          </Suspense>
        ) : (
          <Suspense fallback={<Carregando />}>
            <VirtualizedList
              linhas={linhasFiltro}
              CardItem={CardItem}
              onClick={onClick}
              campoID={campoID}
            />
          </Suspense>
        )}
      </div>

      {!OcultarBotaoExcel && (
        <div
          className="flex items-center pl-8 mt-4"
          style={{ height: 40, borderTop: "1px solid #c7c8c7" }}
        >
          {totalLinhas}

          {!ocultarTableView && (
            <div className="flex-1 flex justify-end">
              {buttonChangeViewTable}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TabelaCard;
