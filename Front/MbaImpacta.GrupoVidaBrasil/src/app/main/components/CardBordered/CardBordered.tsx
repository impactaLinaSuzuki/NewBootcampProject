import { ReactNode, MouseEvent } from 'react';
import { Container } from './styles';

interface CardBorderedProps {
	className?: string;
	children: ReactNode;
	onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

export function CardBordered({ className, children, onClick }: CardBorderedProps) {
	return (
		<Container className={className} onClick={onClick}>
			{children}
		</Container>
	);
}
