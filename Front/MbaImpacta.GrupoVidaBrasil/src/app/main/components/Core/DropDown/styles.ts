import { styled } from '@mui/material/styles';
import DropDown from '@mui/material/Autocomplete';

export const AutoComplete = styled(DropDown)(() => ({
	groupLabel: {
		fontWeight: 'bold',
		color: 'black',
	},
}));
