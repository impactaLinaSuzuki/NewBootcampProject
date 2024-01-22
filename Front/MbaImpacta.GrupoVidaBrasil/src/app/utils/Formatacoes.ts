import { format } from "date-fns";
import { ValidaData } from "./Validacoes";

export function FormatarMoeda(
  value: number,
  thousandSeparator: string = ".",
  decimalScale: number = 2,
  prefix: string = "R$ "
): string {
  return (
    prefix +
    (Math.round(value * 100) / 100)
      .toFixed(decimalScale)
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, `${thousandSeparator}`)
  );
}

function formataDataHoraCore(
  data: string | number | Date,
  comHora: boolean,
  comSegundos?: boolean,
  formatoPersonalizado?: string
): string {
  if (!ValidaData(data)) return "";

  if (formatoPersonalizado) return format(new Date(data), formatoPersonalizado);

  return format(
    new Date(data),
    `dd/MM/yyyy${comHora === true ? " HH:mm" : ""}${comSegundos ? ":ss" : ""}`
  );
}

export function formataData(data: string | number | Date): string {
  return formataDataHoraCore(data, false);
}

export function formataDataHora(
  data: string | number | Date,
  comSegundos?: boolean
): string {
  return formataDataHoraCore(data, true, comSegundos);
}

export function formataDataSortable(
  data: string | number | Date,
  comHora?: boolean
): string {
  return formataDataHoraCore(
    data,
    false,
    false,
    `yyyy-MM-dd${comHora ? "-HH-mm-ss" : ""}`
  );
}

export function formataCpfCnpj(documento: string): string {
  if (!documento) return "";

  if (documento.length === 11) {
    return documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  if (documento.length === 14) {
    return documento.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }

  return "";
}

export function formatPrimeirasLetrasMaiusculas(value: string): string | null {
  if (!value) return null;

  return value.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
}

export function formataTelefone(telefone: string): string {
  if (!telefone) return "";

  if (telefone.length === 10) {
    return telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }

  if (telefone.length === 11) {
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  return "";
}

export function removeQuebraDeLinha(texto: string): string {
  if (!texto) return "";

  return texto.replace(/\n|\r/g, " ");
}

export function formataCep(cep: string): string {
  if (!cep) return "";

  return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
}
