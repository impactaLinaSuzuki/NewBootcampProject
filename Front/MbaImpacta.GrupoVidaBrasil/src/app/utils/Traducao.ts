import i18n from 'i18n';

export function RetornaDescricao(t: (value: string) => string, descricao: string): string {
	if (t && descricao && descricao.toUpperCase().startsWith('TRADUZIR.')) return t(descricao.substring(9));

	return descricao;
}

export function traduzir(pathTraducao: string): string {
	return i18n.t(pathTraducao) as string;
}
