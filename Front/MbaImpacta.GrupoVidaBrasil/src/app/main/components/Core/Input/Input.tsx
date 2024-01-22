import { useCallback, useMemo, ChangeEvent, InputHTMLAttributes } from "react";
import FormControl from "@mui/material/FormControl";
import { TextFieldProps } from "@mui/material/TextField";
import { MensagemErro } from "app/main/components/MensagemErro";
import Grid from "app/main/components/Grid";
import { Mask } from "app/interfaces/Mask";

import { TextFieldMasKed } from "./TextFieldMasked";
import { TextFieldNumber } from "./TextFieldNumber";
import { TextFieldOther } from "./TextFieldOther";

export type InputProps = Omit<TextFieldProps, "onChange"> &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof TextFieldProps> & {
    maxLength?: number;
    mascara?: string | Mask[];
    md?: number;
    grid?: boolean;
    mensagemErro?: string;
    multiple?: boolean;
    negative?: boolean;
    onChange: (
      value: any,
      e: ChangeEvent<HTMLInputElement>,
      nomeCampo: string
    ) => void;
    value: any;
  };

export function Input({
  value,
  onChange,
  md,
  error,
  mensagemErro,
  mascara,
  children,
  grid,
  maxLength,
  multiple,
  type,
  negative = false,
  ...rest
}: InputProps) {
  const hasError = useMemo(
    () => !!error || !!mensagemErro,
    [error, mensagemErro]
  );

  const valorTratado = useMemo(
    () =>
      value === undefined || value === null
        ? ""
        : type === "textUpperCase"
        ? String(value).toUpperCase()
        : value,
    [value]
  );

  const onChangelocal = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return;

      const nomeCampo = e.target.name;
      const valorOriginal = e.target.value;

      if (type === "file") {
        onChange(e, e, nomeCampo);
        return;
      }

      const valorTratadoRetorno =
        type === "textUpperCase" ? valorOriginal.toUpperCase() : valorOriginal;

      onChange(valorTratadoRetorno, e, nomeCampo);
    },
    [onChange, type]
  );

  const RetornaTextField = useMemo(() => {
    if (mascara) {
      return (
        <TextFieldMasKed
          error={hasError}
          value={valorTratado}
          onChange={onChangelocal}
          mascara={mascara}
          {...rest}
        />
      );
    }

    if (type === "number" || type === "decimal") {
      return (
        <TextFieldNumber
          error={hasError}
          value={valorTratado}
          onChange={onChangelocal}
          maxLength={maxLength}
          negative={negative}
          type={type}
          {...rest}
        />
      );
    }

    return (
      <TextFieldOther
        error={hasError}
        value={valorTratado}
        onChange={onChangelocal}
        type={type}
        maxLength={maxLength}
        multiple={multiple}
        {...rest}
      />
    );
  }, [
    mascara,
    hasError,
    onChangelocal,
    rest,
    maxLength,
    type,
    multiple,
    valorTratado,
  ]);

  const RetornaPrincipal = children ? (
    <div>
      {RetornaTextField}
      {children}
    </div>
  ) : (
    RetornaTextField
  );

  return grid ? (
    <Grid item md={md}>
      <FormControl fullWidth error={hasError}>
        {RetornaPrincipal}
        <MensagemErro mensagem={mensagemErro} />
      </FormControl>
    </Grid>
  ) : (
    <FormControl fullWidth error={hasError}>
      {RetornaPrincipal}
      <MensagemErro mensagem={mensagemErro} />
    </FormControl>
  );
}
