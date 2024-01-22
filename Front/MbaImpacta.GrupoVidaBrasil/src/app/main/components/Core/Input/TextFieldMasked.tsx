import { forwardRef, useEffect, useRef } from "react";
import { IMaskInput } from "react-imask";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import {
  ReturnIMask,
  TrataValorMascara,
  ReturnMask,
} from "app/utils/mascaraCampo";

import { Mask } from "app/interfaces/Mask";

interface TextMasKedProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mascara: string | Mask[];
}

const TextMasKed = forwardRef<HTMLInputElement, TextMasKedProps>((props) => {
  const { onChange, mascara, name, ...other } = props;

  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    }
  }, []);

  return (
    <IMaskInput
      {...other}
      mask={ReturnIMask(mascara)}
      onChange={() => {}}
      onAccept={(value: any) => {
        if (!firstRenderRef.current && onChange) {
          onChange({
            target: {
              name,
              value: TrataValorMascara(ReturnMask(value as string), value),
            },
          });
        }
      }}
    />
  );
});

type TextFieldMasKedProps = TextFieldProps & {
  maxLength?: number;
  mascara: string | Mask[];
};

export function TextFieldMasKed({
  mascara,
  maxLength,
  InputProps,
  value,
  ...rest
}: TextFieldMasKedProps) {
  return (
    <TextField
      size="small"
      variant="outlined"
      autoComplete="off"
      {...rest}
      value={value}
      type="text"
      InputProps={{
        ...(InputProps || {}),
        inputComponent: TextMasKed as any,
        inputProps: {
          mascara: mascara,
        },
      }}
      InputLabelProps={{ shrink: !!value }}
    />
  );
}
