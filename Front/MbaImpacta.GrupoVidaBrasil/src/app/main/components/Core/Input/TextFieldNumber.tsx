import { ChangeEvent, forwardRef } from 'react';
import { NumericFormat } from 'react-number-format';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { InputBaseComponentProps } from '@mui/material/InputBase';

const TextNumberFormat = forwardRef<HTMLInputElement, InputBaseComponentProps>((props, ref) => {
	const { onChange, negative, type, maxLength, name, defaultValue, ...other } = props;

	const campoDecimal = type === 'decimal';

	return (
		<NumericFormat
			{...other}
			getInputRef={ref}
			onValueChange={(values: { floatValue: number | undefined }) => {
				if (onChange) {
					onChange({
						target: {
							name: name || '',
							value: values.floatValue,
						},
					} as unknown as ChangeEvent<HTMLInputElement>);
				}
			}}
			allowNegative={negative}
			thousandSeparator={campoDecimal ? '.' : false}
			decimalSeparator=","
			decimalScale={campoDecimal ? 2 : 0}
			fixedDecimalScale={!!campoDecimal}
			isAllowed={(values: { value: string | any[] }) => {
				return !maxLength || values.value.length <= maxLength;
			}}
		/>
	);
});

type TextFieldNumberProps = TextFieldProps & {
	maxLength?: number;
	negative?: boolean;
};

export function TextFieldNumber({ maxLength, negative, type, ...rest }: TextFieldNumberProps) {
	return (
		<TextField
			size="small"
			variant="outlined"
			type={type}
			{...rest}
			InputProps={{
				inputComponent: TextNumberFormat,
				inputProps: {
					maxLength,
					negative,
				},
			}}
		/>
	);
}
