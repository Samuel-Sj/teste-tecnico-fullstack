import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const CORES = {
  Concluído: '#2f6f5e',
  Cancelado: '#c2785c',
};

export default function StatusChart({ stats, loading, error }) {
  const dados = stats?.statusDistribution ?? [];
  const semDados = !loading && !error && dados.every((d) => d.total === 0);
  // Remove categorias com total 0: evita "buracos" no donut quando 100% dos
  // registros filtrados pertencem a um único status.
  const dadosComValor = dados.filter((d) => d.total > 0);

  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Distribuição por status</h3>
      {error && <div className="alert-banner">{error}</div>}
      {!error && loading && <div className="chart-empty">Carregando gráfico…</div>}
      {!error && !loading && semDados && <div className="chart-empty">Nenhum atendimento encontrado para os filtros atuais.</div>}
      {!error && !loading && !semDados && (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={dadosComValor}
              dataKey="total"
              nameKey="status"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
            >
              {dadosComValor.map((entry) => (
                <Cell key={entry.status} fill={CORES[entry.status] || '#999'} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} atendimento(s)`, name]} />
            <Legend verticalAlign="bottom" height={32} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
