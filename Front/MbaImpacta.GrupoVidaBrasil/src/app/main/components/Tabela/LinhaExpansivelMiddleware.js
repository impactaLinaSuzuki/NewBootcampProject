import { memo, useCallback } from 'react';

function LinhaExpansivelMiddleware({
	colunas,
	recalculaTamanho: recalculaTamanhoProp,
	measure,
	LinhaExpansivel,
	datum,
}) {
	const recalculaTamanho = useCallback(() => recalculaTamanhoProp(measure), [recalculaTamanhoProp, measure]);

	return <LinhaExpansivel colunas={colunas} recalculaTamanho={recalculaTamanho} {...datum} />;
}

export default memo(LinhaExpansivelMiddleware);
