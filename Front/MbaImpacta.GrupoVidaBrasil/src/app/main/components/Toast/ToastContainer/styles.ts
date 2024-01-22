import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
	overflowY: 'auto',
	minWidth: '20%',
	maxWidth: '60%',
	right: 10,
	zIndex: 99999,
	position: 'absolute',
	marginTop: theme.spacing(15),
	'& > * + *': {
		marginTop: theme.spacing(1),
	},
	'& .alertRoot': {
		padding: '10px 15px',
		'&.MuiAlert-standardInfo': {
			border: '1px rgb(41, 182, 246) solid',
		},
		'&.MuiAlert-standardWarning': {
			border: '1px rgb(255, 167, 38) solid',
		},
		'&.MuiAlert-standardError': {
			border: '1px rgb(244, 67, 54) solid',
		},
		'&.MuiAlert-standardSuccess': {
			border: '1px rgb(102, 187, 106) solid',
		},
	},
	'& .icon': {
		'&.MuiAlert-icon': {
			padding: 0,
			margin: 0,
		},
	},
	'& .message': {
		fontSize: '12px',
	},
}));
