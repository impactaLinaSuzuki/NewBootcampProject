import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Carregando } from "app/main/components/Carregando";
import UserLista from "./UserLista";
import UserService from "app/services/user/UserService";
import { PageCarded } from "app/main/components/Page";
import { HeaderTela } from "app/main/components/HeaderTela";
import { Adicionar } from "app/main/components/BotaoAcao";

interface IUserProps {
  onClickAdd: () => void;
  onClickEditar: (user: IUser) => void;
}

export default function User({ onClickAdd, onClickEditar }: IUserProps) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState<IUser[]>([] as IUser[]);

  useEffect(() => {
    setLoading(true);
    UserService.listUsers()
      .then((response) => {
        if (!response) {
          return;
        }

        setUsers(response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const RetornaCadastrolista = useMemo(() => {
    if (loading) return <Carregando />;

    return <UserLista users={users} onClickEditar={onClickEditar} />;
  }, [users, loading]);

  return (
    <PageCarded
      header={
        <HeaderTela descricaoTela={t("Usuario.usuario")}>
          <div className="flex flex-row">
            {<Adicionar onClick={onClickAdd} />}
          </div>
        </HeaderTela>
      }
      content={RetornaCadastrolista}
    />
  );
}
