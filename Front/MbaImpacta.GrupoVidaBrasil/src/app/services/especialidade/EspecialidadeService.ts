import i18n from "i18n";
import API from "app/services/axiosAPI";
import { CallAPI } from "app/utils/Utils";
import { ExibirMensagem } from "app/utils/ExibirMensagem";
import { ResponseApi } from "app/interfaces/ResponseApi";

class EspecialidadeService {
  listEspecialidades = () => {
    return new Promise<IEspecialidade[]>((resolve, reject) => {
      CallAPI({
        request: API.getAPI(`/api/Speciality/GetAll`),
        onSuccess: (response) => {
          resolve(response.data as IEspecialidade[]);
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

  getEspecialidadeId = (especialidadeId: number) => {
    return new Promise<IEspecialidade>((resolve, reject) => {
      CallAPI({
        request: API.getAPI(`/api/Speciality/Get/${especialidadeId}`),
        onSuccess: (response) => {
          resolve(response.data as IEspecialidade);
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

  addEspecialidade = (especialidade: IEspecialidade) => {
    return new Promise<ResponseApi<any>>((resolve, reject) => {
      if (!especialidade) {
        reject(new Error(i18n.t("Comum.Mensagem.erroBuscandoDados")));
        return;
      }

      CallAPI({
        request: API.postAPI(`/api/Speciality/Create`, especialidade),
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

  updateEspecialidade = (
    especialidade: IEspecialidade,
    idEspecialidade: number
  ) => {
    return new Promise<ResponseApi<any>>((resolve, reject) => {
      if (!especialidade || !idEspecialidade) {
        reject(new Error(i18n.t("Comum.Mensagem.erroBuscandoDados")));
        return;
      }

      CallAPI({
        request: API.putAPI(`/api/Speciality/Update`, especialidade),
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

export default new EspecialidadeService();
