import { ChangeEvent } from "react";
import { Input, InputProps } from "app/main/components/Core/Input/Input";
import CepService from "app/services/cep/CepService";
import { RetornoConsultaCep } from "app/interfaces/RetornoConsultaCep";

type InputCepProps = InputProps & {
  onChange: (
    value: any,
    e: ChangeEvent<HTMLInputElement>,
    nomeCampo: string,
    result?: RetornoConsultaCep
  ) => void;
};

export function InputCep({ onChange, mensagemErro, ...rest }: InputCepProps) {
  function onChangeLocal(
    value: any,
    e: ChangeEvent<HTMLInputElement>,
    nomeCampo: string
  ): void {
    if (value.length === 8) {
      CepService.consultaCep(value).then((result) => {
        onChange(value, e, nomeCampo, result);
      });
    }

    onChange(value, e, nomeCampo);
  }

  return (
    <Input
      {...rest}
      onChange={onChangeLocal}
      mascara="00000-000"
      mensagemErro={mensagemErro}
    />
  );
}
