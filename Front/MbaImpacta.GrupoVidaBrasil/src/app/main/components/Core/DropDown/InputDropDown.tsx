import { forwardRef } from "react";
import TextField from "@mui/material/TextField";
import { Carregando } from "app/main/components/Carregando";
import { ObjectKeys } from "app/interfaces/ObjectKeys";

interface InputDropDownProps {
  variant?: "standard" | "filled" | "outlined";
  label: string;
  error?: boolean;
  InputProps?: ObjectKeys;
  loading?: boolean;
}

export const InputDropDown = forwardRef<HTMLDivElement, InputDropDownProps>(
  (
    { variant, label, error, InputProps, loading, ...rest }: InputDropDownProps,
    ref
  ) => {
    return (
      <TextField
        {...rest}
        ref={ref}
        size="small"
        variant={variant || "outlined"}
        label={label}
        placeholder="Selecione..."
        className="w-full"
        autoComplete="off"
        error={error}
        InputProps={{
          ...(InputProps || {}),
          endAdornment: (
            <>
              {loading && (
                <div>
                  <Carregando small />
                </div>
              )}

              {!!InputProps && InputProps.endAdornment}
            </>
          ),
        }}
      />
    );
  }
);
