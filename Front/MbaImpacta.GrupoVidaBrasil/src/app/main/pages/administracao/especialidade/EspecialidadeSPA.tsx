import { useState, useCallback } from "react";
import Especialidade from "./Especialidade";
import EspecialidadeCadastro from "./EspecialidadeCadastro";

export default function EspecialidadeSPA() {
  const [cadastrando, setCadastrando] = useState<boolean>(false);
  const [especialidadeEditando, setEspecialidadeEditando] =
    useState<IEspecialidade | null>(null);

  const onClickAdd = useCallback(() => {
    setCadastrando(true);
    setEspecialidadeEditando(null);
  }, []);

  const onClickEditar = useCallback((especialidade: IEspecialidade) => {
    setCadastrando(true);
    setEspecialidadeEditando(especialidade);
  }, []);

  const onVoltarParaLista = useCallback(() => {
    setCadastrando(false);
    setEspecialidadeEditando(null);
  }, []);

  if (cadastrando) {
    return (
      <EspecialidadeCadastro
        especialidadeProps={especialidadeEditando}
        onVoltarParaLista={onVoltarParaLista}
      />
    );
  }
  return (
    <Especialidade onClickAdd={onClickAdd} onClickEditar={onClickEditar} />
  );
}
