import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const MESES_PT = {
  '01': 'Jan', '02': 'Fev', '03': 'Mar', '04': 'Abr', '05': 'Mai', '06': 'Jun',
  '07': 'Jul', '08': 'Ago', '09': 'Set', '10': 'Out', '11': 'Nov', '12': 'Dez',
};

function formatarMes(mesISO) {
  const [ano, mes] = mesISO.split('-');
  return `${MESES_PT[mes] || mes}/${ano.slice(2)}`;
}

export default function MonthlyChart({ stats, loading, error }) {
  const dadosBrutos = stats?.monthlyEvolution ?? [];
  const dados = dadosBrutos.map((d) => ({ ...d, label: formatarMes(d.mes) }));
  const semDados = !loading && !error && dados.length === 0;

  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Evolução mensal de atendimentos</h3>
      {error && <div className="alert-banner">{error}</div>}
      {!error && loading && <div className="chart-empty">Carregando gráfico…</div>}
      {!error && !loading && semDados && <div className="chart-empty">Nenhum atendimento encontrado para os filtros atuais.</div>}
      {!error && !loading && !semDados && (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={dados} margin={{ top: 10, right: 18, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#e3ddd0" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={{ stroke: '#e3ddd0' }} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} width={32} />
            <Tooltip formatter={(value) => [`${value} atendimento(s)`, 'Total']} />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#3a5a8c"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#3a5a8c' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
