import UserService from "app/services/user/UserService";
import { ExibirMensagem } from "app/utils/ExibirMensagem";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import BasicInfoTab from "./tabs/BasicInfoTab";
import AddressTab from "./tabs/AddressTab";
import { Carregando } from "app/main/components/Carregando";
import { PageCarded } from "app/main/components/Page";
import { Salvar, Voltar } from "app/main/components/BotaoAcao";
import { useErrorAPI } from "app/main/hooks";
import { Tabs } from "app/main/components/Tabs";

interface IUserCadastroProps {
  userProps: IUser | null;
  onVoltarParaLista: () => void;
}

export default function UserCadastro({
  userProps,
  onVoltarParaLista,
}: IUserCadastroProps) {
  const { t } = useTranslation();

  const { onRemoveRequiredFields, onAddListError } = useErrorAPI();

  const [existeAlteracao, setExisteAlteracao] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState<number>(0);
  const [user, setUser] = useState<IUser>(userProps || ({} as IUser));

  const [inclusao, setInclusao] = useState<boolean>(!!!userProps);
  const [loading, setLoading] = useState<boolean>(false);

  const abas = useMemo(() => {
    const retorno = [];

    if (user) {
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

    return retorno;
  }, [user?.id]);

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
        setUser((prevState) => ({
          ...(prevState || {}),
          ...valoresSpread,
        }));
      else
        setUser((prevState) => ({
          ...(prevState || {}),
          [nomeCampo]: valorCampo,
        }));

      onRemoveRequiredFields(nomeCampo, []);
    },
    [onRemoveRequiredFields]
  );

  const AlteraValorCampoPessoa = useCallback(
    (nomeCampo: string, valorCampo: any, valoresSpread: any | null) => {
      setExisteAlteracao(true);

      if (valoresSpread)
        setUser((prevState) => ({
          ...(prevState || {}),
          people: {
            ...(prevState?.people || {}),
            ...valoresSpread,
          },
        }));
      else
        setUser((prevState) => ({
          ...(prevState || {}),
          people: {
            ...(prevState?.people || {}),
            [nomeCampo]: valorCampo,
          },
        }));

      onRemoveRequiredFields(nomeCampo, []);
    },
    [onRemoveRequiredFields]
  );

  const SalvarCadastro = useCallback(
    (adicionar: boolean, novaAba: number) => {
      setLoading(true);
      let acao;

      if (adicionar) acao = UserService.addUser(user);
      else acao = UserService.updateUser(user, user.id ? user.id : 0);

      acao
        .then((response) => {
          setLoading(false);

          onAddListError([]);
          setInclusao(false);

          setUser((prevState) => ({
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
    [user, t]
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
            user={user}
            AlteraValorCampo={AlteraValorCampo}
            AlteraValorCampoPessoa={AlteraValorCampoPessoa}
            inclusao={inclusao}
          />
        );

      case 1:
        return (
          <AddressTab
            user={user}
            AlteraValorCampoPessoa={AlteraValorCampoPessoa}
          />
        );

      default:
        return null;
    }
  }, [tabValue, user]);

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
                {!user ? (
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
