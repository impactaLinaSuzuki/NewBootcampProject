import { memo, useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { AutoSizer, List, CellMeasurerCache, CellMeasurer } from 'react-virtualized';

function VirtualizedList({ linhas, CardItem, onClick, campoID }) {
	const linhaRecalculada = useRef([]);

	const [qtdLinhas, setQtdLinhas] = useState(linhas.length);

	const _cache = useRef(new CellMeasurerCache({ fixedWidth: true, minHeight: 50 }));

	useEffect(() => {
		setQtdLinhas(linhas.length);
		linhaRecalculada.current = [];
	}, [linhas]);

	function recalculaTamanho(measure) {
		setTimeout(() => {
			try {
				measure();
			} catch (error) {}
		}, 1);
	}

	function _rowRenderer({ index, key, style, parent, isScrolling, isVisible }) {
		const item = linhas[index];

		if (!item) return null;

		// Tratativa para impedir alguns bugs de remoção do item da listagem
		const newKey = campoID ? item[campoID] : key;

		const _onClick = !onClick
			? null
			: () => {
					if (campoID) {
						onClick(item[campoID], item);
					} else {
						onClick(item, item);
					}
			  };

		return (
			<CellMeasurer key={newKey} cache={_cache.current} columnIndex={0} rowIndex={index} parent={parent}>
				{({ measure, registerChild }) => {
					if (!linhaRecalculada.current[index]) {
						linhaRecalculada.current[index] = true;
						recalculaTamanho(measure);
					}

					return (
						<div ref={registerChild} style={style}>
							<CardItem
								item={item}
								onClick={_onClick}
								recalculaTamanho={() => recalculaTamanho(measure)}
								isScrolling={isScrolling}
								isVisible={isVisible}
							/>
						</div>
					);
				}}
			</CellMeasurer>
		);
	}

	return (
		<AutoSizer>
			{({ width, height }) => (
				<List
					height={height}
					width={width}
					overscanRowCount={2}
					noRowsRenderer={() => (
						<div className="w-full text-center items-center pt-12">Sem dados para exibição</div>
					)}
					rowCount={qtdLinhas}
					rowRenderer={_rowRenderer}
					deferredMeasurementCache={_cache.current}
					rowHeight={_cache.current.rowHeight}
				/>
			)}
		</AutoSizer>
	);
}

export default VirtualizedList;
