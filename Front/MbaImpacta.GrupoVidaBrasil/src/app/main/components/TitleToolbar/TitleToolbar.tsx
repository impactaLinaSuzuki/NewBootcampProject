import Typography from '@mui/material/Typography';

import { useTitleToolbar } from './useTitleToolbar';

export function TitleToolbar() {
	const { description } = useTitleToolbar();

	return (
		<div className="flex flex-1 flex-col mx-4 overflow-x-auto overflow-y-auto">
			{!!description.title && (
				<>
					{typeof description.title === 'string' ? (
						<Typography className="text-18 font-bold">{description.title}</Typography>
					) : (
						description.title
					)}
				</>
			)}

			{!!description.subtitle && (
				<>
					{typeof description.subtitle === 'string' ? (
						<Typography className="text-14">{description.subtitle}</Typography>
					) : (
						description.subtitle
					)}
				</>
			)}
		</div>
	);
}
