const formatadorNumero = new Intl.NumberFormat('pt-BR');
const formatadorPercentual = new Intl.NumberFormat('pt-BR', {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const CARDS = [
  { chave: 'totalAtendimentos', label: 'Total de Atendimentos', tab: 'Total', variante: 'total', formato: 'numero' },
  { chave: 'totalConcluidos', label: 'Total Concluídos', tab: 'Concluído', variante: 'concluido', formato: 'numero' },
  { chave: 'totalCancelados', label: 'Total Cancelados', tab: 'Cancelado', variante: 'cancelado', formato: 'numero' },
  { chave: 'taxaConclusao', label: 'Taxa de Conclusão', tab: 'Conclusão', variante: 'receita', formato: 'percentual' },
];

export default function KpiCards({ stats, loading, error }) {
  return (
    <section aria-label="Indicadores gerais">
      <h2 className="section-title">Indicadores</h2>

      {error && <div className="alert-banner">Não foi possível carregar os indicadores: {error}</div>}

      {!error && (
        <div className="kpi-grid">
          {CARDS.map((card) => (
            <div key={card.chave} className={`kpi-card kpi-card--${card.variante}`}>
              <span className="kpi-card__tab">{card.tab}</span>
              <div className="kpi-card__value">
                {loading || !stats ? (
                  <span className="skeleton-bar" style={{ width: '70%', display: 'inline-block', height: '1.6rem' }} />
                ) : card.formato === 'percentual' ? (
                  formatadorPercentual.format(stats[card.chave])
                ) : (
                  formatadorNumero.format(stats[card.chave])
                )}
              </div>
              <div className="kpi-card__label">{card.label}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}