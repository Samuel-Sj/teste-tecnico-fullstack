import { useState } from 'react';
import { exportarCsv } from '../utils/exportCsv';
import { exportarPdf } from '../utils/exportPdf';

const LABELS_FILTRO = {
  search: 'nome/CPF',
  status: 'status',
  organizacao: 'organização',
  responsavel: 'responsável',
  dataInicio: 'a partir de',
  dataFim: 'até',
};

function resumoFiltros(filtros) {
  const partes = Object.entries(filtros)
    .filter(([, valor]) => valor)
    .map(([chave, valor]) => `${LABELS_FILTRO[chave] || chave} = "${valor}"`);
  return partes.length ? partes.join(', ') : 'nenhum (todos os atendimentos)';
}

/**
 * Exporta exatamente os registros já carregados em `dados`, que
 * correspondem aos filtros/busca ativos no momento (ver useAtendimentos).
 */
export default function ExportButtons({ filtros, dados, carregando }) {
  const [exportando, setExportando] = useState(null); // 'csv' | 'pdf' | null
  const [erro, setErro] = useState(null);

  function handleExport(tipo) {
    setErro(null);

    if (!dados || dados.length === 0) {
      setErro('Nenhum registro para exportar com os filtros atuais.');
      return;
    }

    setExportando(tipo);
    try {
      if (tipo === 'csv') {
        exportarCsv(dados, 'atendimentos.csv');
      } else {
        exportarPdf(dados, resumoFiltros(filtros), 'atendimentos.pdf');
      }
    } catch {
      setErro('Falha ao exportar os dados. Tente novamente.');
    } finally {
      setExportando(null);
    }
  }

  const desabilitado = carregando || exportando !== null || !dados || dados.length === 0;

  return (
    <div className="table-actions">
      <button
        type="button"
        className="btn btn-outline-teal"
        onClick={() => handleExport('csv')}
        disabled={desabilitado}
      >
        {exportando === 'csv' ? 'Gerando CSV…' : 'Exportar CSV'}
      </button>
      <button
        type="button"
        className="btn btn-outline-gold"
        onClick={() => handleExport('pdf')}
        disabled={desabilitado}
      >
        {exportando === 'pdf' ? 'Gerando PDF…' : 'Exportar PDF'}
      </button>
      {erro && <span className="state-message state-message--error" style={{ padding: 0 }}>{erro}</span>}
    </div>
  );
}