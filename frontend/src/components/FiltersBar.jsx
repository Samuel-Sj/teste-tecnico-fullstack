export default function FiltersBar({ filtros, termoBusca, setTermoBusca, atualizarFiltro, limparFiltros, opcoesFiltro, filtrosAtivos }) {
  return (
    <div className="filters-bar" role="search" aria-label="Filtros de atendimentos">
      <div className="filter-field filter-field--search">
        <label htmlFor="busca">Buscar por nome ou CPF</label>
        <input
          id="busca"
          type="text"
          placeholder="Digite o nome ou CPF do cliente…"
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
        <label htmlFor="organizacao">Organização</label>
        <select id="organizacao" value={filtros.organizacao} onChange={(e) => atualizarFiltro('organizacao', e.target.value)}>
          <option value="">Todas</option>
          {opcoesFiltro.organizacoes.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="responsavel">Responsável</label>
        <select id="responsavel" value={filtros.responsavel} onChange={(e) => atualizarFiltro('responsavel', e.target.value)}>
          <option value="">Todos</option>
          {opcoesFiltro.responsaveis.map((r) => (
            <option key={r} value={r}>{r}</option>
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