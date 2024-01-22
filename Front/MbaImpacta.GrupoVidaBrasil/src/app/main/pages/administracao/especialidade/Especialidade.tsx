import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Carregando } from "app/main/components/Carregando";
import EspecialidadeLista from "./EspecialidadeLista";
import EspecialidadeService from "app/services/especialidade/EspecialidadeService";
import { PageCarded } from "app/main/components/Page";
import { HeaderTela } from "app/main/components/HeaderTela";
import { Adicionar } from "app/main/components/BotaoAcao";

interface IEspecialidadeProps {
  onClickAdd: () => void;
  onClickEditar: (especialidade: IEspecialidade) => void;
}

export default function Especialidade({
  onClickAdd,
  onClickEditar,
}: IEspecialidadeProps) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const [especialidades, setEspecialidades] = useState<IEspecialidade[]>(
    [] as IEspecialidade[]
  );

  useEffect(() => {
    setLoading(true);
    EspecialidadeService.listEspecialidades()
      .then((response) => {
        if (!response) {
          return;
        }

        setEspecialidades(response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const RetornaCadastrolista = useMemo(() => {
    if (loading) return <Carregando />;

    return (
      <EspecialidadeLista
        especialidades={especialidades}
        onClickEditar={onClickEditar}
      />
    );
  }, [especialidades, loading]);

  return (
    <PageCarded
      header={
        <HeaderTela descricaoTela={t("Menu.especialidade")}>
          <div className="flex flex-row">
            {<Adicionar onClick={onClickAdd} />}
          </div>
        </HeaderTela>
      }
      content={RetornaCadastrolista}
    />
  );
}
