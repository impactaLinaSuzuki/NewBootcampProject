import { SyntheticEvent, useMemo } from "react";

import { IDropDown } from "app/interfaces/IDropDown";

interface IUseDropDownProps {
  valueJaTratado?: boolean;
  listaItem: IDropDown[];
  value: any;
  onChange?: (
    valor: IDropDown | IDropDown[],
    event: SyntheticEvent<Element, Event>
  ) => void;
}

export function useDropDown({
  onChange,
  valueJaTratado,
  listaItem,
  value,
}: IUseDropDownProps) {
  function onChangeLocal(
    event: SyntheticEvent<Element, Event>,
    valor: unknown
  ) {
    if (onChange) onChange(valor as IDropDown | IDropDown[], event);
  }

  const valueTratado = useMemo(() => {
    if (valueJaTratado) return value;

    return Array.from(listaItem).find((x) => x.id === value) || null;
  }, [listaItem, value, valueJaTratado]);

  return {
    onChangeLocal,
    valueTratado,
  };
}
