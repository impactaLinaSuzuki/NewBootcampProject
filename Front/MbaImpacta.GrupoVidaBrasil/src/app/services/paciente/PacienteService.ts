import i18n from "i18n";
import API from "app/services/axiosAPI";
import { CallAPI } from "app/utils/Utils";
import { ExibirMensagem } from "app/utils/ExibirMensagem";
import { ResponseApi } from "app/interfaces/ResponseApi";

class PacienteService {
  listPacientes = () => {
    return new Promise<IPaciente[]>((resolve, reject) => {
      CallAPI({
        request: API.getAPI(`/api/Patient/GetAll`),
        onSuccess: (response) => {
          resolve(response.data as IPaciente[]);
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

  getPacienteId = (pacienteId: number) => {
    return new Promise<IPaciente>((resolve, reject) => {
      CallAPI({
        request: API.getAPI(`/api/Patient/Get/${pacienteId}`),
        onSuccess: (response) => {
          resolve(response.data as IPaciente);
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

  addPaciente = (paciente: IPaciente) => {
    return new Promise<ResponseApi<any>>((resolve, reject) => {
      if (!paciente) {
        reject(new Error(i18n.t("Comum.Mensagem.erroBuscandoDados")));
        return;
      }

      CallAPI({
        request: API.postAPI(`/api/Patient/Create`, paciente),
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

  updatePaciente = (paciente: IPaciente, idPaciente: number) => {
    return new Promise<ResponseApi<any>>((resolve, reject) => {
      if (!paciente || !idPaciente) {
        reject(new Error(i18n.t("Comum.Mensagem.erroBuscandoDados")));
        return;
      }

      CallAPI({
        request: API.putAPI(`/api/Patient/Update`, paciente),
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

export default new PacienteService();
