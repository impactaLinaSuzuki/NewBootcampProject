import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Tabela } from "app/main/components/Tabela";
import { IconPersonalizado } from "app/main/components/Icon";

interface PerfilListaProps {
  perfils: IPerfil[];
  onClickEditar: (perfil: IPerfil) => void;
}

export default function EspecialidadeLista({
  perfils,
  onClickEditar,
}: PerfilListaProps) {
  const { t } = useTranslation();

  const colunas = useMemo(() => {
    return [
      {
        Header: t("Comum.descricao"),
        accessor: "name",
        filterable: true,
        sortable: true,
      },
      {
        Header: t("Comum.ativo"),
        accessor: "ativo",
        filterable: true,
        sortable: true,
      },
    ];
  }, [t]);

  const linhas = useMemo(() => {
    if (!perfils) return;

    return perfils.map((item) => ({
      ...item,
      ativo: item.isInternal ? (
        <IconPersonalizado
          iconName="check_box"
          colorIcon="green"
          className="opacity-50"
        />
      ) : (
        <IconPersonalizado
          iconName="disabled_by_default"
          colorIcon="gray"
          className="opacity-50"
        />
      ),
    }));
  }, [perfils]);

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
