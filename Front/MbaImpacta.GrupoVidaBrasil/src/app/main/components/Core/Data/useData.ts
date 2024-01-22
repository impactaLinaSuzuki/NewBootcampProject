import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ValidaData } from "app/utils/Validacoes";
import { ObjectKeys } from "app/interfaces/ObjectKeys";

import ptBrLocale from "date-fns/locale/pt-BR";
import enLocale from "date-fns/locale/en-US";

const localeMap = {
  ["pt-BR"]: ptBrLocale,
  en: enLocale,
} as ObjectKeys;

interface IUseDataProps {
  error?: boolean;
  mensagemErro?: string;
  valueProps?: any;
  onChange?: (value: Date | undefined) => void;
}

export function useData({
  error,
  mensagemErro,
  valueProps,
  onChange,
}: IUseDataProps) {
  const { i18n } = useTranslation();

  const [mensagemErrorData, setMensagemErrorData] = useState(false);

  const hasError = !!error || !!mensagemErro || !!mensagemErrorData;
  const value = valueProps ? new Date(valueProps) : null;
  const adapterLocale = localeMap[i18n.language];

  function handleChange(newDate: any) {
    if (ValidaData(newDate)) {
      setMensagemErrorData(false);
      if (onChange) onChange(new Date(newDate));
    } else if (!newDate) {
      setMensagemErrorData(true);
      if (onChange) onChange(undefined);
    } else {
      setMensagemErrorData(true);
    }
  }

  return { adapterLocale, mensagemErrorData, hasError, value, handleChange };
}
