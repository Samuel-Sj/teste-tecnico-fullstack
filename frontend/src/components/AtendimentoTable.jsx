const formatadorMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}

const COLUNAS = ['Cliente', 'Data', 'Horário', 'Advogado(a)', 'Área / órgão', 'Status', 'Valor'];

export default function AtendimentosTable({ atendimentos, loading, error }) {
  return (
    <div className="table-scroll">
      <table className="atendimentos">
        <thead>
          <tr>
            {COLUNAS.map((c) => (
              <th key={c} style={c === 'Valor' ? { textAlign: 'right' } : undefined}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {error && (
            <tr>
              <td colSpan={COLUNAS.length}>
                <div className="state-message state-message--error">{error}</div>
              </td>
            </tr>
          )}

          {!error && loading &&
            Array.from({ length: 5 }).map((_, i) => (
              <tr className="skeleton-row" key={i}>
                {COLUNAS.map((c) => (
                  <td key={c}><span className="skeleton-bar" /></td>
                ))}
              </tr>
            ))}

          {!error && !loading && atendimentos.length === 0 && (
            <tr>
              <td colSpan={COLUNAS.length}>
                <div className="state-message">Nenhum atendimento encontrado para os filtros selecionados.</div>
              </td>
            </tr>
          )}

          {!error && !loading && atendimentos.map((a) => (
            <tr key={a.id}>
              <td className="cliente-cell">{a.cliente}</td>
              <td>{formatarData(a.data)}</td>
              <td className="muted-cell">{a.horaInicio} – {a.horaFim}</td>
              <td>{a.advogado}</td>
              <td className="muted-cell">{a.areaJuridica}</td>
              <td>
                <span className={`status-pill status-pill--${a.status === 'Concluído' ? 'concluido' : 'cancelado'}`}>
                  {a.status}
                </span>
              </td>
              <td className="valor-cell">{a.valor > 0 ? formatadorMoeda.format(a.valor) : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
