import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Tabela } from "app/main/components/Tabela";
import { IconPersonalizado } from "app/main/components/Icon";
import { formataCpfCnpj } from "app/utils/Formatacoes";

interface UserListaProps {
  users: IUser[];
  onClickEditar: (user: IUser) => void;
}

export default function UserLista({ users, onClickEditar }: UserListaProps) {
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
        Header: t("Usuario.ativo"),
        accessor: "active",
        filterable: true,
        sortable: true,
      },
    ];
  }, [t]);

  const linhas = useMemo(() => {
    if (!users) return;

    return users.map((item) => ({
      ...item,
      name: item.people.name,
      cpfEditado: formataCpfCnpj(item.people.cpf),
      active: item.isActive ? (
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
  }, [users]);

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
