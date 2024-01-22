import { useToastContainer } from './useToastContainer';
import { ToastMessage } from '../ToastMessage';

import { Container } from './styles';

export function ToastContainer() {
	const { listMessage, handleRemoveMessage } = useToastContainer();

	return (
		<Container>
			{listMessage.map(item => (
				<ToastMessage key={item.id} message={item} onRemoveMessage={handleRemoveMessage} />
			))}
		</Container>
	);
}
