import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import clsx from "clsx";
import { AutoSizer } from "react-virtualized";
import { CSVLink } from "react-csv";
import VirtualizedTable from "./VirtualizedTable";
import TabelaCard from "./TabelaCard";
import TooltipPersonalizado from "./TooltipPersonalizado";
import { ButtonBase, ClassesBotao } from "../BotaoAcao";
import { DropDown } from "../Core";
import { ExibirMensagem } from "app/utils/ExibirMensagem";
import { IconPersonalizado } from "../Icon";
import { multiSort } from "app/utils/Ordenacao";
import { executeSearch } from "app/utils/Search";
import { InputSearch } from "../InputSearch";
import { CardBordered } from "../CardBordered";

const tamanhotHead = 57;
const tamanhotHeadSemPesquisa = 35;

const StyledHead = styled("div")(({ theme }) => ({
  display: "flex",
  textAlign: "center",
  borderBottom: "1px solid #c7c8c7",
  height: `${tamanhotHead}px`,
  width: "100%",
  alignItems: "center",
  "& h6": {
    fontWeight: "800",
  },
  color: theme.palette.secondary.main,
  "&.sem-coluna-pesquisa": {
    height: `${tamanhotHeadSemPesquisa}px`,
  },
  "&.tHead-backgroundColor": {
    backgroundColor: theme.palette.primary.light,
  },
}));

const StyledCSVLink = styled(CSVLink)(() => ({
  textDecoration: "none!important",
}));

// Este componente utilize o "AutoSizer" para detectar o tamanho disponível, para um melhor funcionamento, declarar o tamanho dos pais com a classe "h-full"
function Tabela({
  linhas: propLinhas,
  colunas: propColunas,
  campoID,
  onClick,
  CardItem,
  LinhaExpansivel,
  OcultarBotaoExcel,
  ocultaTotalLinhas,
  totalPersonalizado,
  colunasExportacao,
  linhasExportacao,
  headerComBackground,
  nomeArquivoDownload = "download.csv",
  onRetornaListaFiltrada,
  columnWidth,
  minHeightCard,
  isTabelaMansory,
  footerButton,
  exibeBusca,
  limpaFiltroColuna,
  idTabela = -1,
  ocultarExportarExcel,
  ocultarTableView,
  defaultExibicaoEmTabela = undefined,
}) {
  const { t } = useTranslation();

  const [exibicaoEmTabela, setExibicaoEmTabela] = useState(false);
  const [colunas, setColunas] = useState([]);
  const [linhas, setLinhas] = useState([]);

  const [search, setSearch] = useState({});

  const [columnSortable, setColumnSortable] = useState([]);

  const canClearFilter = useRef(false);

  useEffect(() => {
    if (
      (defaultExibicaoEmTabela === false ||
        defaultExibicaoEmTabela === undefined) &&
      !CardItem
    ) {
      setExibicaoEmTabela(true);
      return;
    }

    if (
      defaultExibicaoEmTabela !== null &&
      defaultExibicaoEmTabela !== undefined
    ) {
      setExibicaoEmTabela(false);
      return;
    }

    setExibicaoEmTabela(false);
  }, [CardItem, defaultExibicaoEmTabela]);

  useEffect(() => {
    canClearFilter.current = true;
  }, [idTabela]);

  useEffect(() => {
    async function ExecuteSearch(newSearch) {
      const objectKeys = Object.keys(newSearch);

      if (objectKeys.length) {
        const arrayFilter = objectKeys
          .filter(
            (coluna) =>
              newSearch[coluna] !== null &&
              newSearch[coluna] !== undefined &&
              newSearch[coluna] !== ""
          )
          .map((coluna) => ({
            [coluna]: newSearch[coluna],
          }));

        const newLinhas = executeSearch(propLinhas, objectKeys, {
          $and: arrayFilter,
        });

        setLinhas(multiSort(columnSortable, newLinhas));
      } else {
        setLinhas(multiSort(columnSortable, propLinhas));
      }
    }

    // canClearFilter utilizado para lógica de limpar os filtros na troca de tabela da Tela Relatório Query
    if (limpaFiltroColuna && canClearFilter.current) {
      setSearch({});
      canClearFilter.current = false;
    } else {
      ExecuteSearch(search);
    }
  }, [propLinhas, search, columnSortable, colunas, limpaFiltroColuna]);

  useEffect(() => {
    if (typeof onRetornaListaFiltrada === "function") {
      onRetornaListaFiltrada(linhas);
    }
  }, [linhas, onRetornaListaFiltrada]);

  useEffect(() => {
    // Define o width das colunas conforme o tamanho do conteúdo
    function getColumnWidth(data, accessor, headerText, sortable) {
      let cellLength;

      let reduceCellLength = 0;

      if (data && data.length) {
        reduceCellLength = data.reduce((final, atual) => {
          if (atual[accessor] && atual[accessor].toString().length > final)
            return atual[accessor].toString().length;

          return final;
        }, 0);
      }

      // eslint-disable-next-line prefer-const
      cellLength = Math.max(reduceCellLength, headerText.length);

      const magicSpacing = cellLength > 200 ? 5 : 12;
      const retorno = cellLength * magicSpacing + (sortable ? 30 : 0); // Se a coluna tem sortable adiciona uns 30 px do icon button

      if (retorno < 50) return 50;

      if (retorno > 1000) return 1000;

      return retorno;
    }

    const colunasTratadas = [];

    if (LinhaExpansivel) {
      colunasTratadas.push({
        label: "",
        dataKey: "fixo_expandir",
        filterable: false,
        width: 50,
        widthInitial: 50,
        contentComponent: true,
      });
    }

    propColunas.forEach((coluna) => {
      const width =
        coluna.width ||
        getColumnWidth(
          propLinhas,
          coluna.accessor,
          coluna.Header,
          coluna.sortable
        );

      colunasTratadas.push({
        label: coluna.headerLabel || coluna.Header,
        dataKey: coluna.accessor,
        key: coluna.textSearch || coluna.accessor, // usado para exportação do CSV e Filtro de search
        filterable: coluna.filterable,
        widthInitial: width,
        width,
        headerComponent: coluna.headerComponent,
        contentComponent: coluna.contentComponent,
        formataValor: coluna.formataValor,
        tooltip: coluna.tooltip,
        className: coluna.className,
        textSearch: coluna.textSearch,
        textSortable: coluna.textSortable,
        sortable: coluna.sortable,
        filterableDropDown: coluna.filterableDropDown,
      });
    });

    setColunas(colunasTratadas);
  }, [propLinhas, propColunas, LinhaExpansivel]);

  const onResetFiltro = useCallback(() => {
    setSearch({});
    setLinhas(multiSort(columnSortable, propLinhas));
  }, [propLinhas, columnSortable]);

  const AlterarVisualizacaoTabelaCard = useCallback(
    (newExibeEmTabela) => {
      // Na mudança de visualização, reseta os filtros realizados
      onResetFiltro();

      setExibicaoEmTabela(newExibeEmTabela);

      let { preferenciasUsuario } = window.localStorage;

      if (!preferenciasUsuario) preferenciasUsuario = {};
      else preferenciasUsuario = JSON.parse(preferenciasUsuario);

      window.localStorage.setItem(
        "preferenciasUsuario",
        JSON.stringify(preferenciasUsuario)
      );
    },
    [onResetFiltro]
  );

  const RetornaBotaoExcel = useMemo(() => {
    const colunasTratadasExportacao =
      colunasExportacao ||
      colunas.filter(
        (x) => x.textSearch || (!x.headerComponent && !x.contentComponent)
      );

    if (colunasTratadasExportacao && colunasTratadasExportacao.length) {
      for (let i = 0; i < colunasTratadasExportacao.length; i++) {
        const item = colunasTratadasExportacao[i];

        if (!item.label) item.label = item.headerLabel || item.Header;

        if (!item.key) item.key = item.textSearch || item.accessor;
      }
    }

    const nomeArquivoTratado = nomeArquivoDownload.includes(".csv")
      ? nomeArquivoDownload
      : `${nomeArquivoDownload}.csv`;

    return (
      <StyledCSVLink
        data={linhasExportacao || linhas}
        headers={colunasTratadasExportacao}
        separator=";"
        filename={nomeArquivoTratado}
      >
        <ButtonBase
          icon="cloud_download"
          className={ClassesBotao.info}
          title={t("Comum.exportar")}
        />
      </StyledCSVLink>
    );
  }, [
    linhas,
    colunas,
    t,
    colunasExportacao,
    linhasExportacao,
    nomeArquivoDownload,
  ]);

  const buttonChangeViewTable = useMemo(() => {
    return (
      <ButtonBase
        icon={exibicaoEmTabela ? "view_agenda" : "list"}
        className={ClassesBotao.info}
        title={
          exibicaoEmTabela
            ? t("Tabela.visualizacaoCard")
            : t("Tabela.visualizacaoTabela")
        }
        onClick={() => AlterarVisualizacaoTabelaCard(!exibicaoEmTabela)}
      />
    );
  }, [exibicaoEmTabela, AlterarVisualizacaoTabelaCard, t]);

  const totalLinhas = useMemo(() => {
    if (totalPersonalizado) return totalPersonalizado;

    if (!linhas || ocultaTotalLinhas) return null;

    return (
      <Typography variant="body1">
        {t("Tabela.totalRegistros")}: {linhas.length}
      </Typography>
    );
  }, [linhas, ocultaTotalLinhas, totalPersonalizado, t]);

  const RetornaCards = useMemo(() => {
    return (
      <TabelaCard
        linhas={linhas}
        colunas={colunas}
        CardItem={CardItem}
        onClick={onClick}
        columnWidth={columnWidth}
        campoID={campoID}
        minHeightCard={minHeightCard}
        isTabelaMansory={isTabelaMansory}
        exibeBusca={exibeBusca}
        buttonChangeViewTable={buttonChangeViewTable}
        onRetornaListaFiltrada={onRetornaListaFiltrada}
        ocultarTableView={ocultarTableView}
        ocultaTotalLinhas={ocultaTotalLinhas}
        OcultarBotaoExcel={OcultarBotaoExcel}
      />
    );
  }, [
    linhas,
    CardItem,
    onClick,
    colunas,
    columnWidth,
    campoID,
    minHeightCard,
    isTabelaMansory,
    buttonChangeViewTable,
    exibeBusca,
    onRetornaListaFiltrada,
  ]);

  const AlteraSearch = useCallback((newValue, colunaKey) => {
    setSearch((prevState) => {
      // Caso o valor for vazio, remove a propriedade do objeto
      if (newValue === null || newValue === undefined || newValue === "") {
        delete prevState[colunaKey];
        return { ...prevState };
      }

      return { ...prevState, [colunaKey]: newValue };
    });
  }, []);

  const RetornaColunaSearch = useCallback(
    (coluna) => {
      if (coluna.filterableDropDown) {
        return (
          <DropDown
            listaItem={[
              ...new Set(propLinhas.map((item) => item[coluna.dataKey])),
            ].map((item) => ({
              id: item,
              descricao: String(item),
            }))}
            value={search[coluna.dataKey] || ""}
            onChange={(newValue) =>
              AlteraSearch(newValue ? newValue.id : null, coluna.key)
            }
            variant="standard"
          />
        );
      }

      if (!coluna.filterable) return null;

      return (
        <InputSearch
          value={search[coluna.dataKey] || ""}
          onChange={(newValue) => AlteraSearch(newValue?.trim(), coluna.key)}
          variant="standard"
          margin="dense"
          className="w-full px-4 m-0"
          autoComplete="off"
          InputProps={{
            inputProps: {
              className: "text-center",
            },
          }}
        />
      );
    },
    [search, AlteraSearch, propLinhas]
  );

  const handleSort = useCallback(
    (column, label) => {
      setColumnSortable((prevState) => {
        let sortBy = [];

        const currentColumn = prevState.find((x) => x.dataKey === column);
        if (currentColumn) {
          // Os registros com a quantidade de click 2, significa que está no terceiro click então retira a ordenção pela coluna
          sortBy = prevState
            .map((item) => {
              let { direction, qtdClick } = item;

              if (item.dataKey === column) {
                direction = currentColumn.direction === "ASC" ? "DESC" : "ASC";
                qtdClick = item.qtdClick + 1;
              }

              return {
                ...item,
                qtdClick,
                direction,
              };
            })
            // Colunas com 3 clicks devem desabilitar a ordenação por ela
            .filter((x) => x.qtdClick < 3);
        } else {
          sortBy = [
            ...prevState,
            {
              dataKey: column,
              direction: "ASC",
              qtdClick: 1,
              label,
            },
          ];
        }

        setLinhas([...multiSort(sortBy, linhas)]);

        if (sortBy.length > 0) {
          const mensagem = sortBy.map((item) => (
            <Typography key={item.dataKey}>
              {`${t("Tabela.coluna")} `}
              <b>{item.label}</b>
              {` ${t("Tabela.ordenado")} ${
                item.direction === "DESC"
                  ? t("Tabela.decrescente")
                  : t("Tabela.crescente")
              }`}
            </Typography>
          ));

          ExibirMensagem("", mensagem, "info");
        }

        return sortBy;
      });
    },
    [linhas, t]
  );

  const RetornaTabela = useMemo(() => {
    return (
      <div
        id="divPaiTabela"
        style={{
          height: "100%",
          width: "100%",
          overflowX: "auto",
          overflowY: "hidden",
          borderBottom: "1px solid #c7c8c7",
        }}
      >
        <AutoSizer>
          {({ width, height }) => {
            let colunasTratadas = [...colunas];
            if (colunasTratadas.length === 1) colunasTratadas[0].width = width;

            const widthColunas = colunasTratadas.reduce(
              (a, b) => a + b.widthInitial,
              0
            );

            if (widthColunas < width) {
              const widthColunasVariaveis = colunasTratadas
                .filter((coluna) => !coluna.contentComponent)
                .reduce(
                  (acumulador, coluna) => acumulador + coluna.widthInitial,
                  0
                );

              const widthColunasFixas = colunasTratadas
                .filter((coluna) => coluna.contentComponent)
                .reduce(
                  (acumulador, coluna) => acumulador + coluna.widthInitial,
                  0
                );

              colunasTratadas = colunasTratadas.map((coluna) => {
                if (!coluna.contentComponent) {
                  coluna.width =
                    (coluna.widthInitial / widthColunasVariaveis) *
                    (width - widthColunasFixas);
                }

                return coluna;
              });
            }

            const existeColunaPesquisa = colunasTratadas.some(
              (coluna) => coluna.filterable
            );

            return (
              <div
                style={{
                  width: widthColunas < width ? width : widthColunas,
                  height:
                    height -
                    (existeColunaPesquisa
                      ? tamanhotHead
                      : tamanhotHeadSemPesquisa),
                }}
              >
                <StyledHead
                  className={clsx(
                    !existeColunaPesquisa && "sem-coluna-pesquisa",
                    headerComBackground && "tHead-backgroundColor"
                  )}
                >
                  {colunasTratadas.map((coluna) => {
                    const dataKey =
                      coluna.textSortable ||
                      coluna.textSearch ||
                      coluna.dataKey;

                    const columnIndex = columnSortable.findIndex(
                      (x) => x.dataKey === dataKey
                    );

                    return (
                      <div key={`header_${dataKey}`} className="flex flex-col">
                        <div
                          className="flex flex-row items-center justify-center"
                          style={{
                            width: coluna.width,
                          }}
                        >
                          {coluna.headerComponent ? (
                            coluna.label
                          ) : (
                            <Typography variant="subtitle1">
                              {coluna.label}
                            </Typography>
                          )}

                          {!!coluna.tooltip && (
                            <TooltipPersonalizado coluna={coluna} isColuna />
                          )}

                          {coluna.sortable && (
                            <IconButton
                              size="small"
                              onClick={() => handleSort(dataKey, coluna.label)}
                            >
                              <IconPersonalizado
                                iconName={
                                  columnSortable[columnIndex]?.direction ===
                                  "DESC"
                                    ? "arrow_drop_down"
                                    : "arrow_drop_up"
                                }
                                style={{
                                  color: columnSortable[columnIndex]
                                    ? grey[900]
                                    : grey[300],
                                }}
                              />
                            </IconButton>
                          )}
                        </div>

                        {RetornaColunaSearch(coluna)}
                      </div>
                    );
                  })}
                </StyledHead>

                <VirtualizedTable
                  linhas={linhas}
                  colunas={colunasTratadas}
                  onRowClick={onClick}
                  LinhaExpansivel={LinhaExpansivel}
                  campoID={campoID}
                />
              </div>
            );
          }}
        </AutoSizer>
      </div>
    );
  }, [
    campoID,
    linhas,
    colunas,
    onClick,
    RetornaColunaSearch,
    LinhaExpansivel,
    headerComBackground,
    columnSortable,
    handleSort,
  ]);

  return (
    <CardBordered className="w-full h-full flex flex-col m-0">
      <div className="flex-1">
        {exibicaoEmTabela ? RetornaTabela : RetornaCards}
      </div>

      {exibicaoEmTabela && !OcultarBotaoExcel && (
        <div
          className="flex flex-row w-full overflow-x-auto items-center justify-between p-4"
          style={{ minHeight: 45 }}
        >
          {totalLinhas}

          <div className="flex flex-1 w-full overflow-x-auto flex-row items-center justify-end">
            {!!footerButton && footerButton}

            {!ocultarExportarExcel && RetornaBotaoExcel}

            {CardItem && buttonChangeViewTable}
          </div>
        </div>
      )}
    </CardBordered>
  );
}

export default Tabela;
