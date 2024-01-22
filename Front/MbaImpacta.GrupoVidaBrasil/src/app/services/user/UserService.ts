import i18n from "i18n";
import API from "app/services/axiosAPI";
import { CallAPI } from "app/utils/Utils";
import { ExibirMensagem } from "app/utils/ExibirMensagem";
import { ResponseApi } from "app/interfaces/ResponseApi";

class UserService {
  listUsers = () => {
    return new Promise<IUser[]>((resolve, reject) => {
      CallAPI({
        request: API.getAPI(`/api/People/GetAll`),
        onSuccess: (response) => {
          resolve(response.data as IUser[]);
        },
        onFail: () => {
          ExibirMensagem(
            "",
            i18n.t("Comum.Mensagem.erroBuscandoDados"),
            "warning"
          );
          reject(new Error(i18n.t("Comum.Mensagem.erroBuscandoDados")));
        },
        onError: () =>
          reject(new Error(i18n.t("Comum.Mensagem.erroBuscandoDados"))),
        mensagemErro: "Comum.Mensagem.erroBuscandoDados",
      });
    });
  };

  getUserId = (userId: number) => {
    return new Promise<IUser>((resolve, reject) => {
      CallAPI({
        request: API.getAPI(`/api/People/Get/${userId}`),
        onSuccess: (response) => {
          resolve(response.data as IUser);
        },
        onFail: () => {
          ExibirMensagem(
            "",
            i18n.t("Comum.Mensagem.erroBuscandoDados"),
            "warning"
          );
          reject(new Error(i18n.t("Comum.Mensagem.erroBuscandoDados")));
        },
        onError: () =>
          reject(new Error(i18n.t("Comum.Mensagem.erroBuscandoDados"))),
        mensagemErro: "Comum.Mensagem.erroBuscandoDados",
      });
    });
  };

  addUser = (user: IUser) => {
    return new Promise<ResponseApi<any>>((resolve, reject) => {
      if (!user) {
        reject(new Error(i18n.t("Comum.Mensagem.erroBuscandoDados")));
        return;
      }

      CallAPI({
        request: API.postAPI(`/api/People/Create`, user),
        onSuccess: (response) => {
          ExibirMensagem("", i18n.t("Comum.Mensagem.sucessoSalvando"));
          resolve(response);
        },
        onFail: () => {
          ExibirMensagem(
            "",
            i18n.t("Comum.Mensagem.erroSalvandoDados"),
            "warning"
          );
          reject(new Error(i18n.t("Comum.Mensagem.erroSalvandoDados")));
        },
        onError: () =>
          reject(new Error(i18n.t("Comum.Mensagem.erroSalvandoDados"))),
        mensagemErro: "Comum.Mensagem.erroSalvandoDados",
      });
    });
  };

  updateUser = (user: IUser, idUser: number) => {
    return new Promise<ResponseApi<any>>((resolve, reject) => {
      if (!user || !idUser) {
        reject(new Error(i18n.t("Comum.Mensagem.erroBuscandoDados")));
        return;
      }

      CallAPI({
        request: API.putAPI(`/api/People/Update`, user),
        onSuccess: (response) => {
          ExibirMensagem("", i18n.t("Comum.Mensagem.sucessoSalvando"));
          resolve(response);
        },
        onFail: () => {
          ExibirMensagem(
            "",
            i18n.t("Comum.Mensagem.erroSalvandoDados"),
            "warning"
          );
          reject(new Error(i18n.t("Comum.Mensagem.erroSalvandoDados")));
        },
        onError: () =>
          reject(new Error(i18n.t("Comum.Mensagem.erroSalvandoDados"))),
        mensagemErro: "Comum.Mensagem.erroSalvandoDados",
      });
    });
  };
}

export default new UserService();
