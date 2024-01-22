import { RetornoConsultaCep } from "app/interfaces/RetornoConsultaCep";
import API from "app/services/axiosAPI";
import { ExibirMensagem } from "app/utils/ExibirMensagem";
import i18n from "i18n";

class CepService {
  consultaCep(cep: string): Promise<RetornoConsultaCep> {
    return new Promise((resolve, reject) => {
      const valorTratado = (cep || "").replace(/[-./,]/g, "");

      if (valorTratado.length !== 8) reject();

      API.getAPI(`https://viacep.com.br/ws/${valorTratado}/json/`)
        .then((response) => {
          if (response.data && response.status === 200) {
            const {
              uf,
              localidade: cidade,
              bairro,
              logradouro,
              siafi,
              erro,
            } = response.data;

            let tipoLogradouro = null;
            if (logradouro && logradouro.indexOf(" "))
              tipoLogradouro = logradouro.substr(0, logradouro.indexOf(" "));

            //Para CEPs que retornam somente UF e Localidade exemplo o CEP 69700-000 que equivale a Região como um todo
            if ((!bairro || !logradouro) && !erro) {
              ExibirMensagem("", i18n.t("Comum.cepInvalido"), "warning");
            }

            resolve({
              zipCode: valorTratado,
              state: uf ? String(uf).toUpperCase() : null,
              city: cidade ? String(cidade).toUpperCase() : null,
              district: bairro ? String(bairro).toUpperCase() : null,
              tipoLogradouro: tipoLogradouro
                ? String(tipoLogradouro).toUpperCase()
                : null,
              address: logradouro ? String(logradouro).toUpperCase() : null,
              siafi: siafi ? String(Number(siafi)).toUpperCase() : null,
              erro,
            } as RetornoConsultaCep);

            return;
          }
          reject();
        })
        .catch(() => reject());
    });
  }
}

export default new CepService();
