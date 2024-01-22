import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Tabela } from "app/main/components/Tabela";
import { formataCpfCnpj, formataTelefone } from "app/utils/Formatacoes";

interface PacienteListaProps {
  pacientes: IPaciente[];
  onClickEditar: (Paciente: IPaciente) => void;
}

export default function PacienteLista({
  pacientes,
  onClickEditar,
}: PacienteListaProps) {
  const { t } = useTranslation();

  const colunas = useMemo(() => {
    return [
      {
        Header: t("Usuario.nome"),
        accessor: "name",
        filterable: true,
        sortable: true,
      },
      {
        Header: t("Usuario.CPF"),
        accessor: "cpfEditado",
        filterable: true,
        sortable: true,
      },
      {
        Header: t("Usuario.celular"),
        accessor: "cellPhoneEditado",
        filterable: true,
        sortable: true,
      },
    ];
  }, [t]);

  const linhas = useMemo(() => {
    if (!pacientes) return;

    return pacientes.map((item) => ({
      ...item,
      cpfEditado: formataCpfCnpj(item.cpf),
      cellPhoneEditado: formataTelefone(item.cellPhone),
    }));
  }, [pacientes]);

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
