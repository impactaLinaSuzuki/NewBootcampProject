import { styled } from '@mui/material/styles';

interface HeaderProps {
	headerbackground?: string;
	headercolor?: string;
}

export const Header = styled('div')<HeaderProps>(({ theme, headerbackground, headercolor }) => ({
	backgroundColor: headerbackground ? headerbackground : theme.palette.secondary.main,
	color: headercolor ? headercolor : theme.palette.secondary.contrastText,

	'& .iconeAction': {
		color: headercolor ? headercolor : theme.palette.secondary.contrastText,
		padding: 0,
	},
}));
