import { ReactNode } from 'react';
import clsx from 'clsx';

interface FusePageCardedHeaderProps {
	header?: ReactNode;
	noPadding?: boolean;
}

function FusePageCardedHeader({ header, noPadding }: FusePageCardedHeaderProps) {
	return (
		<div className={clsx('FusePageCarded-header flex justify-center', !noPadding && 'p-8 pt-10')}>
			{!!header && header}
		</div>
	);
}

export default FusePageCardedHeader;
