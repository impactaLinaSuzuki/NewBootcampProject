import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Tabela } from "app/main/components/Tabela";

interface EspecialidadeListaProps {
  especialidades: IEspecialidade[];
  onClickEditar: (especialidade: IEspecialidade) => void;
}

export default function EspecialidadeLista({
  especialidades,
  onClickEditar,
}: EspecialidadeListaProps) {
  const { t } = useTranslation();

  const colunas = useMemo(() => {
    return [
      {
        Header: t("Comum.descricao"),
        accessor: "name",
        filterable: true,
        sortable: true,
      },
    ];
  }, [t]);

  const linhas = useMemo(() => {
    if (!especialidades) return;

    return especialidades.map((item) => ({
      ...item,
    }));
  }, [especialidades]);

  return (
    <div className="flex flex-1 h-full p-16">
      <Tabela
        linhas={linhas}
        colunas={colunas}
        onClick={onClickEditar}
        CardItem={null}
        nomeArquivoDownload={""}
        isTabelaMansory
        columnWidth={null}
        minHeightCard={null}
        exibeBusca={false}
        campoID={null}
        LinhaExpansivel={null}
        OcultarBotaoExcel={false}
        ocultaTotalLinhas={false}
        totalPersonalizado={null}
        colunasExportacao={null}
        linhasExportacao={null}
        headerComBackground={false}
        onRetornaListaFiltrada={null}
        footerButton={null}
        limpaFiltroColuna={false}
        idTabela={undefined}
        ocultarExportarExcel={true}
        ocultarTableView={false}
      />
    </div>
  );
}
