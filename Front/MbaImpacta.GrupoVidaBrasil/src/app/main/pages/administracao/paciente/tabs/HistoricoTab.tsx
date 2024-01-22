import {
  Adicionar,
  Apagar,
  Cancelar,
  Salvar,
} from "app/main/components/BotaoAcao";
import { CardDados } from "app/main/components/CardDados";
import { Carregando } from "app/main/components/Carregando";
import { CheckBox, Input } from "app/main/components/Core";
import GridPersonalizado from "app/main/components/Grid";
import { Tabela } from "app/main/components/Tabela";
import { useErrorAPI } from "app/main/hooks";
import HistoricoService from "app/services/historico/HistoricoService";
import { ExibirMensagem } from "app/utils/ExibirMensagem";
import { formataData } from "app/utils/Formatacoes";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface IHistorivoTabProps {
  idPaciente: number;
}

function HistoricoTab({ idPaciente }: IHistorivoTabProps) {
  const { t } = useTranslation();

  const {
    onReturnMessageError,
    onAddListError,
    onAddError,
    onRemoveRequiredFields,
  } = useErrorAPI();

  const [efetuaBusca, setEfetuaBusca] = useState<boolean>(true);
  const [carregandoLista, setCarregandoLista] = useState<boolean>(false);
  const [historico, setHistorico] = useState<IHistorico>({} as IHistorico);
  const [listHistorico, setListHistorico] = useState<IHistorico[]>(
    [] as IHistorico[]
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (efetuaBusca) {
      setCarregandoLista(true);

      HistoricoService.listHistoricosByPaciente(idPaciente)
        .then((response) => {
          setListHistorico(response);
        })
        .finally(() => {
          setCarregandoLista(false);
          setEfetuaBusca(false);
        });
    }
  }, [idPaciente, efetuaBusca]);

  function ValidaCamposObrigatorios() {
    let continua = true;

    if (!historico.annotation) {
      onAddError("annotation", t("Comum.Mensagem.campoObrigatorio"));
      continua = false;
    }

    if (!continua) {
      ExibirMensagem("", t("Comum.Mensagem.informacoesIncorretas"), "warning");
      return false;
    }

    return true;
  }

  const onRemove = useCallback((id: number) => {
    if (!id) return;

    setLoading(true);

    HistoricoService.deleteHistorico(id)
      .then((response) => {
        setEfetuaBusca(true);
      })
      .finally(() => {
        setEfetuaBusca(true);
        setLoading(false);
      });
  }, []);

  function onAddConfiguracao() {
    if (!ValidaCamposObrigatorios()) return;

    const dadosEnvio = {
      ...historico,
      patientId: idPaciente,
    };

    HistoricoService.addHistorico(dadosEnvio)
      .then((response) => {
        setEfetuaBusca(true);

        setHistorico({} as IHistorico);
      })
      .finally();
  }

  function onUpdateConfiguracao() {
    if (!ValidaCamposObrigatorios()) return;

    const dadosEnvio = {
      ...historico,
      patientId: idPaciente,
    };

    HistoricoService.updateHistorico(
      dadosEnvio,
      historico.id ? historico.id : 0
    )
      .then((response) => {
        setEfetuaBusca(true);

        setHistorico({} as IHistorico);
      })
      .finally(() => setLoading(false));
  }

  const onCancelEditConfiguracao = useCallback(() => {
    setHistorico({} as IHistorico);
  }, []);

  const onEditConfiguracao = useCallback((item: IHistorico) => {
    setHistorico(item);
  }, []);

  const retornaLinhas = useMemo(() => {
    if (!listHistorico) return [];

    return listHistorico.map((item) => ({
      ...item,
      dataFormatada: formataData(item.createdDate),

      remover: (
        <Apagar
          iconButton
          onClick={() => onRemove(item.id ? item.id : 0)}
          loading={loading}
        />
      ),
      editar: (
        <CheckBox
          checked={historico.id === item.id}
          onChange={(value) =>
            value ? onEditConfiguracao(item) : onCancelEditConfiguracao()
          }
        />
      ),
    }));
  }, [
    listHistorico,
    loading,
    onEditConfiguracao,
    onCancelEditConfiguracao,
    historico,
  ]);

  function onChangeForm(nomeCampo: string, valorCampo: any) {
    setHistorico((prevState) => ({
      ...(prevState || {}),
      [nomeCampo]: valorCampo,
    }));

    onRemoveRequiredFields(nomeCampo, []);
  }

  const retornaTabelaConfiguracao = useMemo(() => {
    if (carregandoLista) return <Carregando />;

    return (
      <Tabela
        colunas={[
          {
            Header: t("Comum.editar"),
            accessor: "editar",
            width: 80,
            filterable: false,
            contentComponent: true,
          },
          {
            Header: t("Comum.remover"),
            accessor: "remover",
            width: 80,
            filterable: false,
            contentComponent: true,
          },
          {
            Header: t("Historico.anotacao"),
            accessor: "annotation",
            filterable: true,
            sortable: true,
          },
          {
            Header: t("Historico.dataInclusao"),
            accessor: "dataFormatada",
            filterable: true,
            sortable: true,
          },
        ]}
        linhas={retornaLinhas}
        onClick={null}
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
    );
  }, [retornaLinhas, t]);

  return (
    <div className="w-full h-full flex flex-col">
      <CardDados grid titulo={t("Historico.historico")} icone="settings">
        <Input
          grid
          md={12}
          multiline
          label={t("Historico.anotacao")}
          value={historico?.annotation}
          onChange={(value) => onChangeForm("annotation", value)}
          mensagemErro={onReturnMessageError("annotation") || ""}
        />

        <GridPersonalizado item md={3}>
          {historico?.id ? (
            <div className="flex flex-row">
              <Salvar
                onClick={() => onUpdateConfiguracao()}
                loading={loading}
              />
              <Cancelar onClick={onCancelEditConfiguracao} />
            </div>
          ) : (
            <Adicionar onClick={onAddConfiguracao} loading={loading} />
          )}
        </GridPersonalizado>
      </CardDados>
      <div className="flex flex-1 mt-16">{retornaTabelaConfiguracao}</div>
    </div>
  );
}

export default HistoricoTab;
