import { ChangeEvent } from "react";
import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";
import { MensagemErro } from "app/main/components/MensagemErro";
import Grid from "app/main/components/Grid";

interface CheckBoxProps extends Omit<CheckboxProps, "onChange"> {
  md?: number;
  grid?: boolean;
  mensagemErro?: string;
  label?: string;
  onChange?: (checked: boolean, event?: ChangeEvent<HTMLInputElement>) => void;
}

export function CheckBox({
  md,
  checked,
  onChange,
  mensagemErro,
  grid,
  id,
  disabled,
  label,
  classes,
  ...rest
}: CheckBoxProps) {
  function onChangeLocal(event: ChangeEvent<HTMLInputElement>) {
    event.persist();

    if (onChange) onChange(event.target.checked, event);
  }

  const RetornaCheckBox = (
    <div className="flex flex-col justify-center">
      <div className="flex items-center">
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              id={id}
              checked={checked || false}
              onChange={onChangeLocal}
              onClick={(ev) => ev.stopPropagation()}
              disabled={disabled}
              {...rest}
            />
          }
          classes={classes}
          label={label || ""}
          onClick={(ev) => ev.stopPropagation()}
        />
      </div>

      <MensagemErro mensagem={mensagemErro} />
    </div>
  );

  const checkGrid = (
    <Grid item md={md}>
      {RetornaCheckBox}
    </Grid>
  );

  return grid ? checkGrid : RetornaCheckBox;
}
