import { HTMLAttributes } from "react";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { IconPersonalizado } from "app/main/components/Icon";
import { IDropDown } from "app/interfaces/IDropDown";

interface IOptionProps {
  option: IDropDown;
  props: HTMLAttributes<HTMLLIElement>;
  selected: boolean;
}

export function Option({ option, props, selected }: IOptionProps) {
  return (
    <li {...props}>
      <Checkbox
        icon={<IconPersonalizado iconName="check_box_outline_blank" />}
        checkedIcon={<IconPersonalizado iconName="check_box" />}
        style={{ marginRight: 8 }}
        checked={selected}
        id={`${option.id}`}
      />
      {option.tooltip && option.descricao ? (
        <Tooltip title={option.tooltip}>
          <Typography style={{ color: option.color || "" }}>
            {option.descricao || option.text}
          </Typography>
        </Tooltip>
      ) : (
        <Typography style={{ color: option.color || "" }}>
          {option.descricao || option.text}
        </Typography>
      )}
    </li>
  );
}
