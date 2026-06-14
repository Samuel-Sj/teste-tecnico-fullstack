export default function Pagination({ pagination, page, setPage }) {
  const { total, totalPages, limit } = pagination;

  if (total === 0) return null;

  const inicio = (page - 1) * limit + 1;
  const fim = Math.min(page * limit, total);

  return (
    <div className="pagination">
      <span className="pagination__info">
        Mostrando {inicio}–{fim} de {total} atendimento(s)
      </span>
      <div className="pagination__controls">
        <button className="btn btn-secondary" onClick={() => setPage(1)} disabled={page === 1}>
          «
        </button>
        <button className="btn btn-secondary" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          Anterior
        </button>
        <span>{page} / {totalPages}</span>
        <button className="btn btn-secondary" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
          Próxima
        </button>
        <button className="btn btn-secondary" onClick={() => setPage(totalPages)} disabled={page === totalPages}>
          »
        </button>
      </div>
    </div>
  );
}
