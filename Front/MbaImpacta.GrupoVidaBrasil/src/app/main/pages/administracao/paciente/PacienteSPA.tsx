import { useState, useCallback } from "react";
import Paciente from "./Paciente";
import PacienteCadastro from "./PacienteCadastro";

export default function PacienteSPA() {
  const [cadastrando, setCadastrando] = useState<boolean>(false);
  const [pacienteEditando, setPacienteEditando] = useState<IPaciente | null>(
    null
  );

  const onClickAdd = useCallback(() => {
    setCadastrando(true);
    setPacienteEditando(null);
  }, []);

  const onClickEditar = useCallback((paciente: IPaciente) => {
    setCadastrando(true);
    setPacienteEditando(paciente);
  }, []);

  const onVoltarParaLista = useCallback(() => {
    setCadastrando(false);
    setPacienteEditando(null);
  }, []);

  if (cadastrando) {
    return (
      <PacienteCadastro
        pacienteProps={pacienteEditando}
        onVoltarParaLista={onVoltarParaLista}
      />
    );
  }
  return <Paciente onClickAdd={onClickAdd} onClickEditar={onClickEditar} />;
}
