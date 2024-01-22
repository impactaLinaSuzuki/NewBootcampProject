import PacienteService from "app/services/paciente/PacienteService";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import BasicInfoTab from "./tabs/BasicInfoTab";
import AddressTab from "./tabs/AddressTab";
import { Carregando } from "app/main/components/Carregando";
import { PageCarded } from "app/main/components/Page";
import { Salvar, Voltar } from "app/main/components/BotaoAcao";
import { useErrorAPI } from "app/main/hooks";
import { Tabs } from "app/main/components/Tabs";
import HistoricoTab from "./tabs/HistoricoTab";

interface IPacienteCadastroProps {
  pacienteProps: IPaciente | null;
  onVoltarParaLista: () => void;
}

export default function PacienteCadastro({
  pacienteProps,
  onVoltarParaLista,
}: IPacienteCadastroProps) {
  const { t } = useTranslation();

  const { onRemoveRequiredFields, onAddListError } = useErrorAPI();

  const [existeAlteracao, setExisteAlteracao] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState<number>(0);
  const [paciente, setPaciente] = useState<IPaciente>(
    pacienteProps || ({} as IPaciente)
  );

  const [inclusao, setInclusao] = useState<boolean>(!!!pacienteProps);
  const [loading, setLoading] = useState<boolean>(false);

  const abas = useMemo(() => {
    const retorno = [];

    if (paciente) {
      retorno.push(
        {
          id: 0,
          descricao: t("Comum.basicInfo"),
          icone: "account_circle",
        },
        {
          id: 1,
          descricao: t("Comum.addressInfo"),
          icone: "public",
        }
      );
    }

    if (paciente.id) {
      retorno.push({
        id: 2,
        descricao: t("Historico.historico"),
        icone: "history",
      });
    }

    return retorno;
  }, [paciente]);

  useEffect(() => {
    if (existeAlteracao) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = null;
    }
    return () => {
      window.onbeforeunload = null;
    };
  }, [existeAlteracao]);

  const AlteraValorCampo = useCallback(
    (nomeCampo: string, valorCampo: any, valoresSpread: any | null) => {
      setExisteAlteracao(true);

      if (valoresSpread)
        setPaciente((prevState) => ({
          ...(prevState || {}),
          ...valoresSpread,
        }));
      else
        setPaciente((prevState) => ({
          ...(prevState || {}),
          [nomeCampo]: valorCampo,
        }));

      onRemoveRequiredFields(nomeCampo, []);
    },
    [onRemoveRequiredFields]
  );

  const SalvarCadastro = useCallback(
    (adicionar: boolean, novaAba: number) => {
      setLoading(true);

      let acao;

      if (adicionar) acao = PacienteService.addPaciente(paciente);
      else
        acao = PacienteService.updatePaciente(
          paciente,
          paciente.id ? paciente.id : 0
        );

      acao
        .then((response) => {
          setLoading(false);

          onAddListError([]);
          setInclusao(false);

          setPaciente((prevState) => ({
            ...(prevState || {}),
            id: response.data.id,
          }));

          setExisteAlteracao(false);
          if (novaAba) setTabValue(novaAba);
        })
        .catch(() => {
          setLoading(false);
        });
    },
    [paciente, t]
  );

  const addCadastro = useCallback(
    (novaAba: number) => SalvarCadastro(true, novaAba),
    [SalvarCadastro]
  );

  const updateCadastro = useCallback(
    () => SalvarCadastro(false, 0),
    [SalvarCadastro]
  );

  const RetornaAbas = useMemo(() => {
    switch (tabValue) {
      case 0:
        return (
          <BasicInfoTab
            paciente={paciente}
            AlteraValorCampo={AlteraValorCampo}
          />
        );

      case 1:
        return (
          <AddressTab paciente={paciente} AlteraValorCampo={AlteraValorCampo} />
        );

      case 2:
        return <HistoricoTab idPaciente={paciente.id || 0} />;

      default:
        return null;
    }
  }, [tabValue, paciente]);

  return (
    <>
      <PageCarded
        contentToolbar={
          <div className="flex flex-1 items-center justify-between overflow-x-auto">
            <Tabs
              value={tabValue}
              onChange={(_, newTabValue) => setTabValue(newTabValue)}
              abas={abas}
            />

            <div className="flex flex-row items-center justify-center">
              <>
                {!paciente ? (
                  <Voltar
                    onClick={onVoltarParaLista}
                    validaRascunho={existeAlteracao}
                  />
                ) : loading ? (
                  <Carregando />
                ) : (
                  <>
                    <Voltar
                      onClick={onVoltarParaLista}
                      validaRascunho={existeAlteracao}
                    />

                    {tabValue === 0 && (
                      <Salvar
                        onClick={
                          inclusao ? () => addCadastro(0) : updateCadastro
                        }
                      />
                    )}
                  </>
                )}
              </>
            </div>
          </div>
        }
        content={<div className="h-full">{RetornaAbas}</div>}
      />
    </>
  );
}
