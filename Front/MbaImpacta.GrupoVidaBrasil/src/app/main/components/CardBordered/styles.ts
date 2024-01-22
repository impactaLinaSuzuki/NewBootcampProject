import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

export const Container = styled(Card)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: theme.palette.background.paper,
	border: '1px solid #ddd',
	boxShadow: theme.shadows[2],
	borderRadius: '8px',
}));
