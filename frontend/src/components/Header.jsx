export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div>
          <h1 className="app-header__title">
            Painel de Atendimentos
            <span className="tag">Jurídico · Interno</span>
          </h1>
          <p className="app-header__subtitle">
            Visão geral, busca e exportação dos agendamentos do escritório
          </p>
        </div>
      </div>
    </header>
  );
}
