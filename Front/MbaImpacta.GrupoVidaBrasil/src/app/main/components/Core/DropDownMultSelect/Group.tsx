import { ChangeEvent, useMemo } from "react";
import Checkbox from "@mui/material/Checkbox";
import { AutocompleteRenderGroupParams } from "@mui/material/Autocomplete";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import { IconPersonalizado } from "app/main/components/Icon";
import { IDropDown } from "app/interfaces/IDropDown";

interface IGroupProps {
  option: AutocompleteRenderGroupParams;
  listaItem: IDropDown[];
  valorTratado: IDropDown[];
  onChangeCheckGroup: (
    e: ChangeEvent<HTMLInputElement>,
    checked: boolean,
    group: string
  ) => void;
}

export function Group({
  option,
  valorTratado,
  listaItem,
  onChangeCheckGroup,
}: IGroupProps) {
  const isCheckedGroup = useMemo(() => {
    const listaGroupSelected = valorTratado.filter(
      (x) => x.grupo === option.group
    );
    const listaGroupFull = listaItem.filter((x) => x.grupo === option.group);

    return listaGroupFull.length === listaGroupSelected.length;
  }, [valorTratado, listaItem]);

  return (
    <List key={`${option.key}_${option.group}`}>
      {option.group && (
        <ListSubheader className="MuiListSubheader-root MuiAutocomplete-groupLabel MuiListSubheader-sticky MuiListSubheader-gutters px-0 groupLabel">
          <Checkbox
            icon={<IconPersonalizado iconName="check_box_outline_blank" />}
            checkedIcon={<IconPersonalizado iconName="check_box" />}
            checked={isCheckedGroup}
            id={`${option.group}`}
            onChange={(e, valueProps) =>
              onChangeCheckGroup(e, valueProps, option.group)
            }
          />
          {option.group}
        </ListSubheader>
      )}

      {!!option && !!option.children && (
        <ul className="MuiAutocomplete-groupUl">{option.children}</ul>
      )}
    </List>
  );
}
