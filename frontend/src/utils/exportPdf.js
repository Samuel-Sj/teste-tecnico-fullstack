import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const formatadorMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const formatadorData = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' });

function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}

/**
 * Gera um PDF com a listagem atual de atendimentos (respeitando os
 * filtros/busca ativos) e inicia o download.
 */
export function exportarPdf(atendimentos, filtrosResumo, nomeArquivo = 'atendimentos.pdf') {
  const doc = new jsPDF({ orientation: 'landscape' });

  doc.setFontSize(14);
  doc.text('Painel de Atendimentos Jurídicos', 14, 16);

  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text(`Gerado em ${formatadorData.format(new Date())}`, 14, 22);
  if (filtrosResumo) {
    doc.text(`Filtros aplicados: ${filtrosResumo}`, 14, 27);
  }
  doc.text(`Total de registros: ${atendimentos.length}`, 14, filtrosResumo ? 32 : 27);

  const linhas = atendimentos.map((a) => [
    a.cliente,
    formatarData(a.data),
    `${a.horaInicio} - ${a.horaFim}`,
    a.advogado,
    a.areaJuridica,
    a.status,
    a.valor > 0 ? formatadorMoeda.format(a.valor) : '-',
  ]);

  autoTable(doc, {
    startY: filtrosResumo ? 36 : 31,
    head: [['Cliente', 'Data', 'Horário', 'Advogado(a)', 'Área / órgão', 'Status', 'Valor']],
    body: linhas,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [27, 37, 56] },
    columnStyles: { 6: { halign: 'right' } },
  });

  doc.save(nomeArquivo);
}
