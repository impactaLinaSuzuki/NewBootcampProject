export function multiSort(sortBy: any[], list: any[]): any[] {
	return list.sort((a, b) => {
		for (let i = 0; i < sortBy.length; i++) {
			if (typeof a[sortBy[i].dataKey] === 'number') {
				if (a[sortBy[i].dataKey] > b[sortBy[i].dataKey]) return sortBy[i].direction === 'DESC' ? -1 : 1;

				if (a[sortBy[i].dataKey] < b[sortBy[i].dataKey]) return sortBy[i].direction === 'DESC' ? 1 : -1;
			} else {
				const result = String(a[sortBy[i].dataKey] || ' ').localeCompare(b[sortBy[i].dataKey] || ' ');

				if (result === 1) {
					return sortBy[i].direction === 'DESC' ? -1 : 1;
				}

				if (result === -1) {
					return sortBy[i].direction === 'DESC' ? 1 : -1;
				}
			}
		}

		return 0;
	});
}
