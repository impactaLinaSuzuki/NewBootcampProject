import { ChangeEvent } from "react";
import { IDropDownProps } from "../DropDown";
import { IDropDown } from "app/interfaces/IDropDown";

import { useDropDownMultSelect } from "./useDropDownMultSelect";

import { Option } from "./Option";
import { Group } from "./Group";

import { DropDown } from "./styles";

export interface IDropDownMultSelectProps
  extends Omit<IDropDownProps, "onChange"> {
  inTodos?: boolean;
  limitTagsVisiveis?: number;
  onChange: (listSelected: (number | string)[]) => void;
}

export function DropDownMultSelect({
  md,
  listaItem: propsListaItem,
  inTodos,
  error,
  label,
  mensagemErro,
  id,
  value,
  onChange,
  children = null,
  grid,
  limitTagsVisiveis = 6,
  ...rest
}: IDropDownMultSelectProps) {
  const { listaItem, onChangeCheckGroup, onChangeLocal, valorTratado } =
    useDropDownMultSelect({
      inTodos,
      propsListaItem,
      onChange,
      value,
    });

  return (
    <DropDown
      grid={grid}
      md={md}
      error={Boolean(error)}
      mensagemErro={mensagemErro}
      listaItem={listaItem}
      label={label}
      id={id}
      value={valorTratado}
      valueJaTratado
      limitTags={limitTagsVisiveis}
      onChange={(values, e) =>
        onChangeLocal(values as IDropDown[], e as ChangeEvent<HTMLInputElement>)
      }
      disableCloseOnSelect
      multiple
      size="small"
      renderOption={(props, option, { selected }) => (
        <Option
          key={(option as IDropDown).id}
          option={option}
          props={props}
          selected={selected}
        />
      )}
      renderGroup={(option) => (
        <Group
          key={option.key}
          option={option}
          onChangeCheckGroup={onChangeCheckGroup}
          valorTratado={valorTratado}
          listaItem={listaItem}
        />
      )}
      {...rest}
    >
      {children}
    </DropDown>
  );
}
