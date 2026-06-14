import { useState } from 'react';
import { fetchAtendimentosParaExportacao } from '../services/api';
import { exportarCsv } from '../utils/exportCsv';
import { exportarPdf } from '../utils/exportPdf';

const LABELS_FILTRO = {
  search: 'busca',
  status: 'status',
  areaJuridica: 'área/órgão',
  advogado: 'advogado(a)',
  dataInicio: 'a partir de',
  dataFim: 'até',
};

function resumoFiltros(filtros) {
  const partes = Object.entries(filtros)
    .filter(([, valor]) => valor)
    .map(([chave, valor]) => `${LABELS_FILTRO[chave] || chave} = "${valor}"`);
  return partes.length ? partes.join(', ') : 'nenhum (todos os atendimentos)';
}

export default function ExportButtons({ filtros, totalFiltrado }) {
  const [exportando, setExportando] = useState(null); // 'csv' | 'pdf' | null
  const [erro, setErro] = useState(null);

  async function handleExport(tipo) {
    setExportando(tipo);
    setErro(null);
    try {
      const res = await fetchAtendimentosParaExportacao(filtros);
      if (res.data.length === 0) {
        setErro('Nenhum registro para exportar com os filtros atuais.');
        return;
      }
      if (tipo === 'csv') {
        exportarCsv(res.data, 'atendimentos.csv');
      } else {
        exportarPdf(res.data, resumoFiltros(filtros), 'atendimentos.pdf');
      }
    } catch {
      setErro('Falha ao exportar os dados. Tente novamente.');
    } finally {
      setExportando(null);
    }
  }

  return (
    <div className="table-actions">
      <button
        type="button"
        className="btn btn-outline-teal"
        onClick={() => handleExport('csv')}
        disabled={exportando !== null || totalFiltrado === 0}
      >
        {exportando === 'csv' ? 'Gerando CSV…' : 'Exportar CSV'}
      </button>
      <button
        type="button"
        className="btn btn-outline-gold"
        onClick={() => handleExport('pdf')}
        disabled={exportando !== null || totalFiltrado === 0}
      >
        {exportando === 'pdf' ? 'Gerando PDF…' : 'Exportar PDF'}
      </button>
      {erro && <span className="state-message state-message--error" style={{ padding: 0 }}>{erro}</span>}
    </div>
  );
}

