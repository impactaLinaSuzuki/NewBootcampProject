import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Carregando } from "app/main/components/Carregando";
import PacienteLista from "./PacienteLista";
import PacienteService from "app/services/paciente/PacienteService";
import { PageCarded } from "app/main/components/Page";
import { HeaderTela } from "app/main/components/HeaderTela";
import { Adicionar } from "app/main/components/BotaoAcao";

interface IPacienteProps {
  onClickAdd: () => void;
  onClickEditar: (paciente: IPaciente) => void;
}

export default function Paciente({
  onClickAdd,
  onClickEditar,
}: IPacienteProps) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const [pacientes, setPacientes] = useState<IPaciente[]>([] as IPaciente[]);

  useEffect(() => {
    setLoading(true);
    PacienteService.listPacientes()
      .then((response) => {
        if (!response) {
          return;
        }

        setPacientes(response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const RetornaCadastrolista = useMemo(() => {
    if (loading) return <Carregando />;

    return (
      <PacienteLista pacientes={pacientes} onClickEditar={onClickEditar} />
    );
  }, [pacientes, loading]);

  return (
    <PageCarded
      header={
        <HeaderTela descricaoTela={t("Menu.paciente")}>
          <div className="flex flex-row">
            {<Adicionar onClick={onClickAdd} />}
          </div>
        </HeaderTela>
      }
      content={RetornaCadastrolista}
    />
  );
}
