import { memo, useCallback, useRef, useEffect } from 'react';
import { AutoSizer, Masonry, CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { Typography } from '@mui/material';
import createCellPositioner from './createCellPositioner';

function TabelaMansory({
	linhas,
	columnWidth,
	CardItem,
	onClick,
	campoID,
	spacer = 10,
	overscanByPixels = 10,
	minHeightCard = 160,
}) {
	const _masonry = useRef(null);
	const _columnCount = useRef(0);
	const _width = useRef(0);
	const _cellPositioner = useRef();
	const _cache = useRef(
		new CellMeasurerCache({
			minHeight: minHeightCard,
			fixedHeight: true,
		})
	);

	const _initCellPositioner = useCallback(() => {
		_cellPositioner.current = createCellPositioner({
			cellMeasurerCache: _cache.current,
			columnCount: _columnCount.current,
			columnWidth: columnWidth || _width.current,
			spacer,
		});
	}, [columnWidth, spacer]);

	useEffect(() => {
		_initCellPositioner();
	}, [_initCellPositioner]);

	function _calculateColumnCount() {
		_columnCount.current = columnWidth ? Math.floor(_width.current / (columnWidth + spacer)) : 1;
	}

	const _resetCellPositioner = useCallback(() => {
		if (_cellPositioner && _cellPositioner.current) {
			_cellPositioner.current.reset({
				columnCount: _columnCount.current,
				columnWidth,
				spacer,
			});
		}
	}, [columnWidth, spacer]);

	useEffect(() => {
		if (_cache && _cache.current) {
			_cache.current.clearAll();
		}

		_resetCellPositioner();

		if (_masonry && _masonry.current) {
			_masonry.current.clearCellPositions();
		}
	}, [linhas, _resetCellPositioner]);

	function _onResize({ width }) {
		_width.current = width;

		_calculateColumnCount();
		_resetCellPositioner();

		if (_masonry && _masonry.current) _masonry.current.recomputeCellPositions();
	}

	function _onClick(item) {
		if (!onClick) return null;

		if (campoID) {
			onClick(item[campoID], item);
		} else {
			onClick(item, item);
		}
	}

	function _cellRenderer({ index, key, parent, style }) {
		const item = linhas[index];

		if (!item) return null;

		// Tratativa para impedir alguns bugs de remoção do item da listagem
		const newKey = campoID ? item[campoID] : key;

		return (
			<CellMeasurer cache={_cache.current} index={index} key={newKey} parent={parent}>
				<div style={{ ...style, width: columnWidth || '100%' }}>
					<CardItem item={item} onClick={() => _onClick(item)} />
				</div>
			</CellMeasurer>
		);
	}

	function _renderMasonry({ width, height }) {
		_width.current = width;

		_calculateColumnCount();
		_initCellPositioner();

		return (
			<>
				{linhas.length > 0 ? (
					<Masonry
						cellCount={linhas.length}
						cellMeasurerCache={_cache.current}
						cellPositioner={_cellPositioner.current}
						cellRenderer={_cellRenderer}
						overscanByPixels={overscanByPixels}
						ref={_masonry}
						width={width}
						height={height}
					/>
				) : (
					<div className="pt-12 text-center" style={{ width }}>
						<Typography variant="body1">Sem dados para exibição</Typography>
					</div>
				)}
			</>
		);
	}

	return (
		<AutoSizer onResize={_onResize} overscanByPixels={overscanByPixels}>
			{({ width, height }) => _renderMasonry({ width, height })}
		</AutoSizer>
	);
}

export default TabelaMansory;
