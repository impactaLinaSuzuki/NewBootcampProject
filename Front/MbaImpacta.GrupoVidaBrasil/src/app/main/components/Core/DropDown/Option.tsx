import { HTMLAttributes } from "react";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { IDropDown } from "app/interfaces/IDropDown";

interface IOptionProps {
  option: IDropDown;
  props: HTMLAttributes<HTMLLIElement>;
}

export function Option({ option, props }: IOptionProps) {
  return (
    <li {...props}>
      {option.tooltip && option.descricao ? (
        <Tooltip title={option.tooltip}>
          <Typography
            style={{
              color: option.color || "",
            }}
          >
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
