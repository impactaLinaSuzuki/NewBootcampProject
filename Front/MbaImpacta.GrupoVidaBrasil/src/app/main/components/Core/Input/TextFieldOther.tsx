import TextField, { TextFieldProps } from '@mui/material/TextField';

type TextFielOtherProps = TextFieldProps & {
	maxLength?: number;
	multiple?: boolean;
	accept?: string;
};

export function TextFieldOther({ maxLength, multiple, accept, onChange, value, type, ...rest }: TextFielOtherProps) {
	const newValue = type === 'file' ? null : value;

	return (
		<TextField
			size="small"
			variant="outlined"
			value={newValue}
			onChange={onChange}
			type={type}
			inputProps={{
				...(maxLength && { maxLength }),
				...(multiple && { multiple }),
				...(accept && { accept }),
			}}
			{...rest}
		/>
	);
}
