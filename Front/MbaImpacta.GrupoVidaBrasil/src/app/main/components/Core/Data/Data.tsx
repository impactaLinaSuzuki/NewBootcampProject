import { FormControl } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";

import Grid from "app/main/components/Grid";

import { useData } from "./useData";
import { ButtonClear, Message } from "./components";

export interface DataProps extends Omit<DatePickerProps<any>, "onChange"> {
  md?: number;
  grid?: boolean;
  error?: boolean;
  mensagemErro?: string;
  onChange?: (value: Date | undefined) => void;
  onFocus?: () => void;
  readOnly?: boolean;
}

export function Data({
  md,
  error,
  mensagemErro,
  grid,
  value: valueProps,
  className,
  onChange,
  onFocus,
  readOnly,
  ...rest
}: DataProps) {
  const { adapterLocale, value, hasError, mensagemErrorData, handleChange } =
    useData({
      error,
      mensagemErro,
      valueProps,
      onChange,
    });

  const campo = (
    <>
      <FormControl
        fullWidth
        error={hasError}
        className={className}
        onFocus={onFocus}
      >
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={adapterLocale}
        >
          <DatePicker
            {...rest}
            format="dd/MM/yyyy"
            onChange={handleChange}
            value={value}
            showDaysOutsideCurrentMonth
            readOnly={readOnly}
            openTo="day"
            slotProps={{
              inputAdornment: {
                position: "start",
              },
              textField: { size: "small" },
            }}
          />

          {readOnly ? null : (
            <ButtonClear value={value} onChange={handleChange} />
          )}
        </LocalizationProvider>
      </FormControl>

      <Message
        mensagemErro={mensagemErro}
        mensagemErrorData={mensagemErrorData}
      />
    </>
  );

  return grid ? (
    <Grid item md={md}>
      {campo}
    </Grid>
  ) : (
    campo
  );
}
