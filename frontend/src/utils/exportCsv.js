// exportCsv.js
function formatarData(dataBruta) {
  if (!dataBruta) return '—';
  const [data] = dataBruta.split(' ');
  return data;
}

const COLUNAS = [
  { chave: 'name', titulo: 'Cliente' },
  { chave: 'cpf', titulo: 'CPF' },
  { chave: 'dataAppointment', titulo: 'Data' },
  { chave: 'startTime', titulo: 'Hora início' },
  { chave: 'endTime', titulo: 'Hora fim' },
  { chave: 'responsible', titulo: 'Responsável' },
  { chave: 'organization', titulo: 'Organização' },
  { chave: 'status', titulo: 'Status' },
];

function falarCampoCsv(valor) {
  const texto = String(valor ?? '');
  if (/[",;\n]/.test(texto)) {
    return `"${texto.replace(/"/g, '""')}"`;
  }
  return texto;
}

export function exportarCsv(atendimentos, nomeArquivo = 'atendimentos.csv') {
  const cabecalho = COLUNAS.map((c) => c.titulo).join(';');
  const linhas = atendimentos.map((a) =>
    COLUNAS.map((c) => {
      let valor = a[c.chave];
      if (c.chave === 'dataAppointment') {
        valor = formatarData(valor);
      }
      return falarCampoCsv(valor);
    }).join(';')
  );

  const conteudo = [cabecalho, ...linhas].join('\r\n');
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