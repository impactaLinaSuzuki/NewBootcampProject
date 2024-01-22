import { Mask } from "app/interfaces/Mask";

export function ReturnMask(mascara: string): any[] | null {
  if (!mascara) return null;

  const retorno = [];

  for (let i = 0; i < mascara.length; i++) {
    const key = mascara.substring(i, 1);
    switch (key) {
      case "9":
      case "0":
        retorno.push(/\d/);
        break;

      default:
        retorno.push(key);
        break;
    }
  }

  return retorno;
}

export function ReturnIMask(mascara: string | Mask[]): Mask[] {
  // Realizado replace de 9 para 0, para se adequar ao que o novo componente de Mask espera

  // Pode receber um array com u objecto de cada mascara
  if (typeof mascara === "object") {
    return mascara.map((m) => ({
      mask: m.mask.replaceAll("9", "0"),
    }));
  }

  return [{ mask: mascara.replaceAll("9", "0") }];
}

export const TrataValorMascara = (
  mascara: string | Mask[] | undefined | null,
  valor: any
): any => {
  if (!mascara || !valor) return valor;

  if (typeof mascara === "object") {
    mascara = JSON.stringify(mascara);
  }

  let retorno = valor;

  if (mascara.indexOf("-") >= 0) retorno = retorno.replace(/[-]/g, "");
  if (mascara.indexOf(".") >= 0) retorno = retorno.replace(/[.]/g, "");
  if (mascara.indexOf("/") >= 0) retorno = retorno.replace(/[,/]/g, "");
  if (mascara.indexOf("(") >= 0) retorno = retorno.replace(/[(]/g, "");
  if (mascara.indexOf(")") >= 0) retorno = retorno.replace(/[)]/g, "");

  retorno = retorno.replace(/[_]/g, "");

  return retorno;
};

export function MascaraTelefone(rawValue: string): string {
  if (
    rawValue
      .replace(/[(]/g, "")
      .replace(/[)]/g, "")
      .replace(/[-]/g, "")
      .replace(/[_]/g, "").length > 10
  )
    return "(00) 00000-0000";

  return "(00) 0000-0000";
}

export function MascaraDocumento(rawValue: string): string {
  if (
    rawValue
      .replace(/[.]/g, "")
      .replace(/[-]/g, "")
      .replace(/[,/]/g, "")
      .replace(/[_]/g, "").length > 11
  )
    return "00.000.000/0000-00";

  return "000.000.000-00";
}
