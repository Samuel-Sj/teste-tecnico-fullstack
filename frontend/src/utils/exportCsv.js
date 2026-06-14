const COLUNAS = [
  { chave: 'cliente', titulo: 'Cliente' },
  { chave: 'data', titulo: 'Data' },
  { chave: 'horaInicio', titulo: 'Hora início' },
  { chave: 'horaFim', titulo: 'Hora fim' },
  { chave: 'advogado', titulo: 'Advogado(a)' },
  { chave: 'areaJuridica', titulo: 'Área / órgão' },
  { chave: 'status', titulo: 'Status' },
  { chave: 'valor', titulo: 'Valor (R$)' },
];

function escaparCampoCsv(valor) {
  const texto = String(valor ?? '');
  if (/[",;\n]/.test(texto)) {
    return `"${texto.replace(/"/g, '""')}"`;
  }
  return texto;
}

/**
 * Gera um arquivo CSV (separado por ponto-e-vírgula, padrão Excel BR) a partir
 * da lista de atendimentos e inicia o download no navegador.
 */
export function exportarCsv(atendimentos, nomeArquivo = 'atendimentos.csv') {
  const cabecalho = COLUNAS.map((c) => c.titulo).join(';');
  const linhas = atendimentos.map((a) =>
    COLUNAS.map((c) => escaparCampoCsv(c.chave === 'valor' ? a.valor.toFixed(2).replace('.', ',') : a[c.chave])).join(';')
  );

  const conteudo = [cabecalho, ...linhas].join('\r\n');
  // BOM no início para o Excel reconhecer corretamente os acentos em UTF-8
  const blob = new Blob(['\uFEFF' + conteudo], { type: 'text/csv;charset=utf-8;' });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = nomeArquivo;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

