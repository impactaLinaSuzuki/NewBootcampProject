import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Carregando } from "app/main/components/Carregando";
import { PageCarded } from "app/main/components/Page";
import { Salvar, Voltar } from "app/main/components/BotaoAcao";
import { useErrorAPI } from "app/main/hooks";
import { Tabs } from "app/main/components/Tabs";
import EspecialidadeService from "app/services/especialidade/EspecialidadeService";
import Grid from "app/main/components/Grid";
import { Input } from "app/main/components/Core";
import { CardDados } from "app/main/components/CardDados";

interface IEspecialidadeCadastroProps {
  especialidadeProps: IEspecialidade | null;
  onVoltarParaLista: () => void;
}

export default function EspecialidadeCadastro({
  especialidadeProps,
  onVoltarParaLista,
}: IEspecialidadeCadastroProps) {
  const { t } = useTranslation();

  const { onRemoveRequiredFields, onAddListError } = useErrorAPI();

  const [existeAlteracao, setExisteAlteracao] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState<number>(0);
  const [especialidade, setEspecialidade] = useState<IEspecialidade>(
    especialidadeProps || ({} as IEspecialidade)
  );

  const [inclusao, setInclusao] = useState<boolean>(!!!especialidadeProps);
  const [loading, setLoading] = useState<boolean>(false);

  const abas = useMemo(() => {
    const retorno = [];

    if (especialidade) {
      retorno.push({
        id: 0,
        descricao: t("Comum.basicInfo"),
        icone: "edit",
      });
    }

    return retorno;
  }, [especialidade]);

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
        setEspecialidade((prevState) => ({
          ...(prevState || {}),
          ...valoresSpread,
        }));
      else
        setEspecialidade((prevState) => ({
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

      if (adicionar)
        acao = EspecialidadeService.addEspecialidade(especialidade);
      else
        acao = EspecialidadeService.updateEspecialidade(
          especialidade,
          especialidade.id ? especialidade.id : 0
        );

      acao
        .then((response) => {
          setLoading(false);

          onAddListError([]);
          setInclusao(false);

          setEspecialidade((prevState) => ({
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
    [especialidade, t]
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
          <CardDados grid titulo={t("Comum.basicInfo")} icone="edit">
            <Grid container spacing={2} className="flex flex-1 ml-1 mb-2">
              <Grid item md={12} className="mt-12">
                <Input
                  onChange={(value) => AlteraValorCampo("name", value, null)}
                  value={especialidade.name}
                  required
                  label={t("Comum.descricao")}
                  id="name"
                />
              </Grid>
            </Grid>
          </CardDados>
        );

      default:
        return null;
    }
  }, [tabValue, especialidade]);

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
                {!especialidade ? (
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
