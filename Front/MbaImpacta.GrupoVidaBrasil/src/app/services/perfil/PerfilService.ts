import i18n from "i18n";
import API from "app/services/axiosAPI";
import { CallAPI } from "app/utils/Utils";
import { ExibirMensagem } from "app/utils/ExibirMensagem";
import { ResponseApi } from "app/interfaces/ResponseApi";

class PerfilService {
  listPerfils = () => {
    return new Promise<IPerfil[]>((resolve, reject) => {
      CallAPI({
        request: API.getAPI(`/api/Profile/GetAll`),
        onSuccess: (response) => {
          resolve(response.data as IPerfil[]);
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

  getPerfilId = (perfilId: number) => {
    return new Promise<IPerfil>((resolve, reject) => {
      CallAPI({
        request: API.getAPI(`/api/Profile/Get/${perfilId}`),
        onSuccess: (response) => {
          resolve(response.data as IPerfil);
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

  addPerfil = (perfil: IPerfil) => {
    return new Promise<ResponseApi<any>>((resolve, reject) => {
      if (!perfil) {
        reject(new Error(i18n.t("Comum.Mensagem.erroBuscandoDados")));
        return;
      }

      CallAPI({
        request: API.postAPI(`/api/Profile/Create`, perfil),
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

  updatePerfil = (perfil: IPerfil, idPerfil: number) => {
    return new Promise<ResponseApi<any>>((resolve, reject) => {
      if (!perfil || !idPerfil) {
        reject(new Error(i18n.t("Comum.Mensagem.erroBuscandoDados")));
        return;
      }

      CallAPI({
        request: API.putAPI(`/api/Profile/Update`, perfil),
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

export default new PerfilService();
