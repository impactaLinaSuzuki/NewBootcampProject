import { DropDown as AutoComplete } from '../DropDown';
import { styled } from '@mui/material/styles';

export const DropDown = styled(AutoComplete)(() => ({
	'& .MuiInputBase-root': {
		overflowY: 'auto',
		maxHeight: 206,
	},
	'& .groupLabel': {
		fontWeight: 'bold',
		color: 'black',
		background: 'white',
		top: '-8px',
	},
}));
