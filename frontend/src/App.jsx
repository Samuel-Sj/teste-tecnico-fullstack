import Header from './components/Header';
import KpiCards from './components/KpiCards';
import StatusChart from './components/StatusChart';
import MonthlyChart from './components/MonthlyCharts';
import FiltersBar from './components/FiltersBar';
import AtendimentosTable from './components/AtendimentosTable';
import Pagination from './components/Pagination';
import ExportButtons from './components/ExportButtons';
import { useAtendimentos } from './hooks/useAtendimentos';

export default function App() {
  const {
    filtros,
    termoBusca,
    setTermoBusca,
    atualizarFiltro,
    limparFiltros,
    filtrosAtivos,
    opcoesFiltro,
    page,
    setPage,
    atendimentos,
    pagination,
    loading,
    error,
    stats,
    statsLoading,
    statsError,
  } = useAtendimentos();

  return (
    <div className="app">
      <Header />

      <main className="app-main">
        <KpiCards stats={stats} loading={statsLoading} error={statsError} />

        <section aria-label="Gráficos">
          <h2 className="section-title">Análises</h2>
          <div className="charts-grid">
            <StatusChart stats={stats} loading={statsLoading} error={statsError} />
            <MonthlyChart stats={stats} loading={statsLoading} error={statsError} />
          </div>
        </section>

        <section aria-label="Agendamentos">
          <h2 className="section-title">Agendamentos</h2>

          <FiltersBar
            filtros={filtros}
            termoBusca={termoBusca}
            setTermoBusca={setTermoBusca}
            atualizarFiltro={atualizarFiltro}
            limparFiltros={limparFiltros}
            opcoesFiltro={opcoesFiltro}
            filtrosAtivos={filtrosAtivos}
          />

          <div className="table-section" style={{ marginTop: 16 }}>
            <div className="table-section__header">
              <h3 className="section-title">Resultados</h3>
              <ExportButtons filtros={filtros} totalFiltrado={pagination.total} />
            </div>

            <AtendimentosTable atendimentos={atendimentos} loading={loading} error={error} />

            <Pagination pagination={pagination} page={page} setPage={setPage} />
          </div>
        </section>
      </main>

      <footer className="app-footer">
        Painel interno de atendimentos · dados de demonstração
      </footer>
    </div>
  );
}
