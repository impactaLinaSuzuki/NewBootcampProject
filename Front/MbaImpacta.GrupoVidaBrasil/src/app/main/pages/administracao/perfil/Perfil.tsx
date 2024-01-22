import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Carregando } from "app/main/components/Carregando";
import PerfilLista from "./PerfilLista";
import PerfilService from "app/services/perfil/PerfilService";
import { PageCarded } from "app/main/components/Page";
import { HeaderTela } from "app/main/components/HeaderTela";
import { Adicionar } from "app/main/components/BotaoAcao";

interface IPefilProps {
  onClickAdd: () => void;
  onClickEditar: (pefil: IPerfil) => void;
}

export default function Perfil({ onClickAdd, onClickEditar }: IPefilProps) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const [perfils, setPerfils] = useState<IPerfil[]>([] as IPerfil[]);

  useEffect(() => {
    setLoading(true);
    PerfilService.listPerfils()
      .then((response) => {
        if (!response) {
          return;
        }

        setPerfils(response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const RetornaCadastrolista = useMemo(() => {
    if (loading) return <Carregando />;

    return <PerfilLista perfils={perfils} onClickEditar={onClickEditar} />;
  }, [perfils, loading]);

  return (
    <PageCarded
      header={
        <HeaderTela descricaoTela={t("Menu.perfil")}>
          <div className="flex flex-row">
            {<Adicionar onClick={onClickAdd} />}
          </div>
        </HeaderTela>
      }
      content={RetornaCadastrolista}
    />
  );
}
