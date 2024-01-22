import { useState, useCallback } from "react";
import User from "./User";
import UserCadastro from "./UserCadastro";

export default function UserSPA() {
  const [cadastrando, setCadastrando] = useState<boolean>(false);
  const [userEditando, setUserEditando] = useState<IUser | null>(null);

  const onClickAdd = useCallback(() => {
    setCadastrando(true);
    setUserEditando(null);
  }, []);

  const onClickEditar = useCallback((user: IUser) => {
    setCadastrando(true);
    setUserEditando(user);
  }, []);

  const onVoltarParaLista = useCallback(() => {
    setCadastrando(false);
    setUserEditando(null);
  }, []);

  if (cadastrando) {
    return (
      <UserCadastro
        userProps={userEditando}
        onVoltarParaLista={onVoltarParaLista}
      />
    );
  }
  return <User onClickAdd={onClickAdd} onClickEditar={onClickEditar} />;
}
