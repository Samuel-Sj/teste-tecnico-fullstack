export default function FiltersBar({ filtros, termoBusca, setTermoBusca, atualizarFiltro, limparFiltros, opcoesFiltro, filtrosAtivos }) {
  return (
    <div className="filters-bar" role="search" aria-label="Filtros de atendimentos">
      <div className="filter-field filter-field--search">
        <label htmlFor="busca">Buscar (cliente, advogado ou área)</label>
        <input
          id="busca"
          type="text"
          placeholder="Digite para buscar…"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
        />
      </div>

      <div className="filter-field">
        <label htmlFor="status">Status</label>
        <select id="status" value={filtros.status} onChange={(e) => atualizarFiltro('status', e.target.value)}>
          <option value="">Todos</option>
          {opcoesFiltro.status.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="area">Área / órgão</label>
        <select id="area" value={filtros.areaJuridica} onChange={(e) => atualizarFiltro('areaJuridica', e.target.value)}>
          <option value="">Todas</option>
          {opcoesFiltro.areas.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="advogado">Advogado(a)</label>
        <select id="advogado" value={filtros.advogado} onChange={(e) => atualizarFiltro('advogado', e.target.value)}>
          <option value="">Todos</option>
          {opcoesFiltro.advogados.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="dataInicio">De</label>
        <input id="dataInicio" type="date" value={filtros.dataInicio} onChange={(e) => atualizarFiltro('dataInicio', e.target.value)} />
      </div>

      <div className="filter-field">
        <label htmlFor="dataFim">Até</label>
        <input id="dataFim" type="date" value={filtros.dataFim} onChange={(e) => atualizarFiltro('dataFim', e.target.value)} />
      </div>

      <button type="button" className="btn btn-secondary" onClick={limparFiltros} disabled={!filtrosAtivos}>
        Limpar filtros
      </button>
    </div>
  );
}
