import {
  memo,
  lazy,
  useEffect,
  useRef,
  useState,
  Suspense,
  useCallback,
} from "react";
import { styled } from "@mui/material/styles";
import { ButtonBase } from "@mui/material";
import {
  AutoSizer,
  List,
  CellMeasurerCache,
  CellMeasurer,
} from "react-virtualized";
import clsx from "clsx";

import TooltipPersonalizado from "./TooltipPersonalizado";
import { useWindowSize } from "app/main/hooks";

const LinhaExpansivelMiddleware = lazy(() =>
  import(
    /* webpackChunkName: "LinhaExpansivelMiddleware" */ "./LinhaExpansivelMiddleware"
  )
);

const Root = styled("div")(() => ({
  "& .linhaTabela": {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid #c7c8c7",
    fontWeight: "400",
  },
  "& .hoverLinhasClicaveis:hover": {
    borderRadius: 4,
    backgroundColor: "#f7f7f9",
  },
  "& .coluna": {
    borderBottom: "none",
  },
}));

const tamanhoMinimoColuna = 35;

function VirtualizedTable({
  onRowClick,
  linhas,
  colunas,
  LinhaExpansivel,
  campoID,
}) {
  const linhaRecalculada = useRef([]);

  const [linhaExpandida, setLinhaExpandida] = useState(null);
  const [qtdLinhas, setQtdLinhas] = useState(linhas.length);
  const { width: widthLinhaExpansivel } = useWindowSize("#divPaiTabela");

  const _cache = useRef(
    new CellMeasurerCache({ fixedWidth: true, tamanhoMinimoColuna })
  );

  useEffect(() => {
    linhaRecalculada.current = [];
    setQtdLinhas(linhas.length);
  }, [linhas]);

  const _onExpandeLinha = useCallback((newLinhaExpandida) => {
    setLinhaExpandida((old) => {
      linhaRecalculada.current[old] = false;
      return newLinhaExpandida;
    });

    linhaRecalculada.current[newLinhaExpandida] = false;
  }, []);

  const recalculaTamanho = useCallback((measure) => {
    setTimeout(() => {
      try {
        measure();
        // eslint-disable-next-line no-empty
      } catch (error) {}
    }, 1);
  }, []);

  const _rowRenderer = useCallback(
    ({ index, key, style, parent }) => {
      const datum = linhas[index];
      const inLinhaExpandidade = linhaExpandida === index;

      if (!datum) return null;

      // Tratativa para impedir alguns bugs de remoção do item da listagem
      const newKey = campoID ? datum[campoID] : key;

      function RetornaColunas() {
        let coluna0 = null;

        if (LinhaExpansivel && !datum.ocultaLinhaExpansivel) {
          coluna0 = (
            <div
              key={`${newKey}_coluna_0`}
              className="MuiTableCell-root items-center"
              style={{
                width: colunas[0].width,
                minWidth: colunas[0].width,
              }}
            >
              <IconButton
                className={datum.className}
                onClick={() =>
                  _onExpandeLinha(inLinhaExpandidade ? null : index)
                }
                icone={inLinhaExpandidade ? "expand_less" : "expand_more"}
              />
            </div>
          );
        }

        const colunasPrincipais = (
          <>
            {colunas.map((coluna, indexColuna) => {
              if (indexColuna === 0 && coluna0) return null;

              const conteudoColuna = coluna.contentComponent ? (
                datum[coluna.dataKey]
              ) : (
                <div>
                  {coluna.formataValor
                    ? coluna.formataValor(datum[coluna.dataKey], datum)
                    : datum[coluna.dataKey]}
                </div>
              );

              return (
                <div
                  key={`${newKey}_coluna_${indexColuna}`}
                  className={clsx(
                    "MuiTableCell-root h-full flex items-center justify-center p-8",
                    "coluna",
                    coluna.className
                  )}
                  style={{ width: coluna.width }}
                >
                  {coluna.tooltip ? (
                    <TooltipPersonalizado
                      coluna={coluna}
                      conteudoColuna={conteudoColuna}
                      datum={datum}
                      isConteudo
                    />
                  ) : (
                    conteudoColuna
                  )}
                </div>
              );
            })}
          </>
        );

        return (
          <>
            {coluna0}

            {onRowClick ? (
              <ButtonBase
                onClick={() =>
                  onRowClick(campoID ? datum[campoID] : datum, datum)
                }
                className="h-full hoverLinhasClicaveis"
              >
                {colunasPrincipais}
              </ButtonBase>
            ) : (
              colunasPrincipais
            )}
          </>
        );
      }

      return (
        <CellMeasurer
          key={newKey}
          cache={_cache.current}
          columnIndex={0}
          rowIndex={index}
          parent={parent}
        >
          {({ measure, registerChild }) => {
            if (!linhaRecalculada.current[index]) {
              linhaRecalculada.current[index] = true;
              recalculaTamanho(measure);
            }

            return (
              <Root ref={registerChild} style={style}>
                <div
                  className={clsx(
                    "flex items-center text-center linhaTabela",
                    datum.className
                  )}
                  style={{
                    minHeight: `${tamanhoMinimoColuna}px`,
                    background: datum.isDestaque
                      ? datum.corDestaque || "#ffd260"
                      : "none",
                  }}
                >
                  {RetornaColunas()}
                </div>

                {inLinhaExpandidade && (
                  <div
                    className="flex-1"
                    style={{
                      width: widthLinhaExpansivel - 80,
                    }}
                  >
                    <Suspense fallback={<Carregando />}>
                      <LinhaExpansivelMiddleware
                        LinhaExpansivel={LinhaExpansivel}
                        colunas={colunas}
                        recalculaTamanho={() => recalculaTamanho(measure)}
                        measure={measure}
                        datum={datum}
                      />
                    </Suspense>
                  </div>
                )}
              </Root>
            );
          }}
        </CellMeasurer>
      );
    },
    [
      linhaExpandida,
      LinhaExpansivel,
      _onExpandeLinha,
      colunas,
      linhas,
      onRowClick,
      campoID,
      recalculaTamanho,
    ]
  );

  return (
    <AutoSizer>
      {({ width, height }) => (
        <List
          height={height}
          width={width}
          overscanRowCount={2}
          noRowsRenderer={() => (
            <div className="w-full text-center items-center pt-12">
              Sem dados para exibição
            </div>
          )}
          rowCount={qtdLinhas}
          rowRenderer={_rowRenderer}
          deferredMeasurementCache={_cache.current}
          rowHeight={_cache.current.rowHeight}
        />
      )}
    </AutoSizer>
  );
}

export default VirtualizedTable;
