import { traduzir } from "app/utils/Traducao";
import { ExibirMensagem } from "./ExibirMensagem";
import { ResponseApi } from "app/interfaces/ResponseApi";
import { ResponseValidation } from "app/interfaces/ResponseValidation";
import { ErroApi } from "app/interfaces/ErroApi";

export function TrataErroAPI(
  response: ResponseApi<ResponseValidation | any>,
  mensagemErroPadrao: string = "Comum.mensagemErroSalvando",
  SetErrosAPI?: (errors: ErroApi[]) => void,
  duration?: number
): boolean {
  if (
    (!response.data && response.data !== 0) ||
    response.data.isValid === false ||
    response.data.status === 400
  ) {
    if (!response || !response.data || !response.data.errors) {
      ExibirMensagem("", traduzir(mensagemErroPadrao), "error");
    } else {
      if (SetErrosAPI) SetErrosAPI(response.data.errors);

      for (let index = 0; index < response.data.errors.length; index++) {
        ExibirMensagem(
          "",
          response.data.errors[index].errorMessage,
          "warning",
          duration
        );
      }
    }

    return false;
  }

  return true;
}

interface CallAPIProps {
  request: Promise<ResponseApi<ResponseValidation | any>>;
  onSuccess: (response: ResponseApi<ResponseValidation | any>) => void;
  onFail?: (error?: any) => void;
  onError?: (error?: any) => void;
  onFinish?: () => void;
  mensagemSucesso?: string;
  mensagemErro?: string;
  SetErrosAPI?: (errors: ErroApi[]) => void;
  duration?: number;
}

export function CallAPI({
  request,
  onSuccess,
  onFail,
  onError,
  onFinish,
  mensagemSucesso,
  mensagemErro,
  SetErrosAPI,
  duration,
}: CallAPIProps): void {
  request
    .then((response: ResponseApi<ResponseValidation | any>) => {
      if (TrataErroAPI(response, mensagemErro, SetErrosAPI, duration)) {
        onSuccess(response);
        if (mensagemSucesso) ExibirMensagem("", traduzir(mensagemSucesso));
      } else if (onFail) onFail(response);
    })
    .catch((error) => {
      if (mensagemErro) ExibirMensagem("", traduzir(mensagemErro), "error");

      if (onError) onError(error);
    })
    .finally(() => {
      if (onFinish) onFinish();
    });
}

export function RemoveCaracterEspecial(value: string): string {
  const regex =
    /[ã|â|á|à|ê|é|è|í|ì|î|õ|ô|ó|ò|ú|ù|û|Ã|Â|Á|À|Ê|É|È|Í|Ì|Î|Õ|Ô|Ó|Ò|Ú|Ù|Û|ç|Ç]/g;

  return value.replace(regex, (match) => {
    switch (match) {
      case "ã":
      case "â":
      case "á":
      case "à":
        return "a";
      case "Ã":
      case "Â":
      case "Á":
      case "À":
        return "A";
      case "ê":
      case "é":
      case "è":
        return "e";
      case "Ê":
      case "É":
      case "È":
        return "E";
      case "í":
      case "ì":
      case "î":
        return "i";
      case "Í":
      case "Ì":
      case "Î":
        return "I";
      case "õ":
      case "ô":
      case "ó":
      case "ò":
        return "o";
      case "Õ":
      case "Ô":
      case "Ó":
      case "Ò":
        return "O";
      case "ú":
      case "ù":
      case "û":
        return "u";
      case "Ú":
      case "Ù":
      case "Û":
        return "U";
      case "ç":
        return "c";
      case "Ç":
        return "C";
      default:
        return "";
    }
  });
}

export const Colors = Object.freeze({
  Yellow: "#ffc83d",
  Green: "#0c9b2c",
  Red: "#fd2f2f",
  info: "#2196f3", // Azul
  success: "#26a69a", // Verde
  warning: "#f44336", // Vermelho
  default: "#607d8b", // cinza
  waiting: "#ed8936", // laranja
});
