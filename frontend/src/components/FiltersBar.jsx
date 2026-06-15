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

      {/* Correção no select de Organização */}
      <div className="filter-field">
        <label htmlFor="organizacao">Organização</label>
        <select id="organizacao" value={filtros.organization} onChange={(e) => atualizarFiltro('organization', e.target.value)}>
          <option value="">Todas</option>
          {opcoesFiltro.organizacoes.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      {/* Correção no select de Responsável */}
      <div className="filter-field">
        <label htmlFor="responsavel">Responsável</label>
        <select id="responsavel" value={filtros.responsible} onChange={(e) => atualizarFiltro('responsible', e.target.value)}>
          <option value="">Todos</option>
          {opcoesFiltro.responsaveis.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      <button type="button" className="btn btn-secondary" onClick={limparFiltros} disabled={!filtrosAtivos}>
        Limpar filtros
      </button>
    </div>
  );
}