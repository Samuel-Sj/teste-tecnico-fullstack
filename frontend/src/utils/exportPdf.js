// exportPdf.js
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const formatadorData = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' });

function formatarData(dataBruta) {
  if (!dataBruta) return '—';
  const [data] = dataBruta.split(' ');
  return data;
}

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
    a.name,
    a.cpf,
    formatarData(a.dataAppointment),
    a.responsible || '-',
    a.organization || '-',
    a.status || '-',
  ]);

  autoTable(doc, {
    startY: filtrosResumo ? 36 : 31,
    head: [['Cliente', 'CPF', 'Data', 'Horário', 'Responsável', 'Organização', 'Status']],
    body: linhas,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [27, 37, 56] },
  });

  doc.save(nomeArquivo);
}