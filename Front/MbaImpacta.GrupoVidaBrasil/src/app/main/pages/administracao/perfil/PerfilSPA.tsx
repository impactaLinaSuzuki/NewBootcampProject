import { useState, useCallback } from "react";
import Perfil from "./Perfil";
import PerfilCadastro from "./PerfilCadastro";

export default function PerfilSPA() {
  const [cadastrando, setCadastrando] = useState<boolean>(false);
  const [perfilEditando, setPerfilEditando] = useState<IPerfil | null>(null);

  const onClickAdd = useCallback(() => {
    setCadastrando(true);
    setPerfilEditando(null);
  }, []);

  const onClickEditar = useCallback((perfil: IPerfil) => {
    setCadastrando(true);
    setPerfilEditando(perfil);
  }, []);

  const onVoltarParaLista = useCallback(() => {
    setCadastrando(false);
    setPerfilEditando(null);
  }, []);

  if (cadastrando) {
    return (
      <PerfilCadastro
        perfilProps={perfilEditando}
        onVoltarParaLista={onVoltarParaLista}
      />
    );
  }
  return <Perfil onClickAdd={onClickAdd} onClickEditar={onClickEditar} />;
}
