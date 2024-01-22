import i18n from "i18n";
import API from "app/services/axiosAPI";
import { CallAPI } from "app/utils/Utils";
import { ExibirMensagem } from "app/utils/ExibirMensagem";
import { ResponseApi } from "app/interfaces/ResponseApi";

class HistoricoService {
  listHistoricosByPaciente = (pacienteId: number) => {
    return new Promise<IHistorico[]>((resolve, reject) => {
      CallAPI({
        request: API.getAPI(`/api/Historic/GetAllByPatient/${pacienteId}`),
        onSuccess: (response) => {
          resolve(response.data as IHistorico[]);
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

  getHistoricoId = (historicoId: number) => {
    return new Promise<IHistorico>((resolve, reject) => {
      CallAPI({
        request: API.getAPI(`/api/Historic/Get/${historicoId}`),
        onSuccess: (response) => {
          resolve(response.data as IHistorico);
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

  addHistorico = (historico: IHistorico) => {
    return new Promise<ResponseApi<any>>((resolve, reject) => {
      if (!historico) {
        reject(new Error(i18n.t("Comum.Mensagem.erroBuscandoDados")));
        return;
      }

      CallAPI({
        request: API.postAPI(`/api/Historic/Create`, historico),
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

  updateHistorico = (historico: IHistorico, idHistorico: number) => {
    return new Promise<ResponseApi<any>>((resolve, reject) => {
      if (!historico || !idHistorico) {
        reject(new Error(i18n.t("Comum.Mensagem.erroBuscandoDados")));
        return;
      }

      CallAPI({
        request: API.putAPI(`/api/Historic/Update`, historico),
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

  deleteHistorico = (idHistorico: number) => {
    return new Promise<ResponseApi<any>>((resolve, reject) => {
      if (!idHistorico) {
        reject(new Error(i18n.t("Comum.Mensagem.erroBuscandoDados")));
        return;
      }

      CallAPI({
        request: API.deleteAPI(`/api/Historic/Delete/${idHistorico}`),
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

export default new HistoricoService();
