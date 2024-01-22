import { ReactElement, ReactNode, SyntheticEvent } from "react";

import { AutocompleteProps } from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import { MensagemErro } from "app/main/components/MensagemErro";
import Grid from "app/main/components/Grid";

import { useDropDown } from "./useDropDown";

import { IDropDown } from "app/interfaces/IDropDown";
import { ObjectKeys } from "app/interfaces/ObjectKeys";

import { InputDropDown } from "./InputDropDown";
import { Option } from "./Option";

import { AutoComplete } from "./styles";

export interface IDropDownProps
  extends Partial<Omit<AutocompleteProps<any, any, any, any>, "onChange">> {
  grid?: boolean;
  md?: number;
  onChange?: (
    valor: IDropDown | IDropDown[],
    event: SyntheticEvent<Element, Event>
  ) => void;
  listaItem: IDropDown[];
  error?: boolean;
  label: string;
  mensagemErro?: string;
  valueJaTratado?: boolean;
  children?: ReactNode;
  inputProps?: ObjectKeys;
  idModuloCadastrosDropDown?: number;
  ComponenteEdicao?: ReactElement;
  RecarregaDropDown?: () => void;
  variant?: "standard" | "filled" | "outlined";
}

export function DropDown({
  grid,
  md,
  listaItem,
  error,
  label,
  mensagemErro,
  value,
  valueJaTratado,
  children = null,
  onChange,
  inputProps = {},
  loading,
  ComponenteEdicao,
  RecarregaDropDown,
  variant,
  ...rest
}: IDropDownProps) {
  const { onChangeLocal, valueTratado } = useDropDown({
    onChange,
    valueJaTratado,
    listaItem,
    value,
  });

  const hasError = !!error || !!mensagemErro;

  const RetornaCampo = (
    <div className="flex flex-col flex-1">
      <div className="flex">
        <FormControl fullWidth error={hasError}>
          <AutoComplete
            options={listaItem}
            getOptionLabel={(option: any) =>
              (option as IDropDown).descricao ||
              (option as IDropDown).text ||
              ""
            }
            groupBy={(option: any) => (option as IDropDown).grupo || ""}
            renderInput={(params) => (
              <InputDropDown
                {...params}
                ref={params.InputProps.ref}
                label={label}
                variant={variant}
                error={hasError}
                loading={loading}
                InputProps={{
                  ...params.InputProps,
                  ...inputProps,
                }}
              />
            )}
            renderOption={(props, option) => (
              <Option
                key={(option as IDropDown).id}
                props={props}
                option={option as IDropDown}
              />
            )}
            onChange={onChangeLocal}
            value={valueTratado}
            loading={loading}
            {...rest}
          />
        </FormControl>

        {children}
      </div>

      <MensagemErro mensagem={mensagemErro} />
    </div>
  );

  return grid ? (
    <Grid item md={md}>
      {RetornaCampo}
    </Grid>
  ) : (
    RetornaCampo
  );
}
