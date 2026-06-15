# Painel de Atendimentos Jurídicos — Teste Técnico Fullstack

Aplicação fullstack composta por uma API em **Node.js/Express** (que lê os dados de uma planilha Excel e os expõe via REST) e um **dashboard em React** para visualização, busca, filtros, gráficos e exportação dos atendimentos.

## 🛠 Tecnologias

### Backend
- Node.js + Express 5
- CORS
- `xlsx` (leitura da planilha de agendamentos e conversão para JSON)

### Frontend
- React 19 + Vite
- Axios (consumo da API)
- Recharts (gráficos de status e evolução mensal)
- jsPDF + jspdf-autotable (exportação em PDF)

## 📁 Estrutura do projeto

```
teste-tecnico-fullstack-master/
├── backend/
│   ├── app.js                  # bootstrap do servidor Express
│   ├── controllers/
│   │   └── userController.js   # regras das rotas (listagem, busca por CPF/nome)
│   ├── routes/
│   │   └── UserRoutes.js        # definição das rotas /api
│   ├── data/
│   │   ├── agendamento_*.xlsx   # planilha usada como "banco de dados"
│   │   └── exceltoJson.js       # leitura/conversão da planilha
│   └── utils/
│       └── renameExcelColumns.js
├── frontend/
│   └── src/
│       ├── components/          # Header, KPIs, gráficos, tabela, filtros, paginação, exportação
│       ├── hooks/
│       │   └── useAtendimentos.jsx
│       ├── services/
│       │   └── api.jsx          # configuração do Axios (baseURL)
│       └── utils/                # exportação em CSV/PDF
└── package.json                  # dependências e script do backend
```

## ✅ Pré-requisitos

- Node.js 18 ou superior (testado com Node 22)
- npm

## 🚀 Como rodar localmente

### 1. Backend (API)

Na raiz do projeto:

```bash
npm install
npm start
```

Isso executa `node ./backend/app.js`, que sobe o servidor em:

```
http://localhost:3000
```

Todas as rotas ficam disponíveis sob o prefixo `/api`. A planilha em `backend/data/agendamento_*.xlsx` já está incluída no projeto e é lida automaticamente ao iniciar o servidor.

### 2. Frontend (Dashboard)

Em outro terminal, dentro da pasta `frontend`:

```bash
cd frontend
npm install
npm run dev
```

A aplicação abre por padrão em:

```
http://localhost:5173
```

> ⚠️ O frontend está configurado em `frontend/src/services/api.jsx` para consumir a API em `http://localhost:3000/api`. Garanta que o backend esteja rodando **antes** de abrir o frontend, caso contrário a listagem e os gráficos não carregarão dados.

### 3. Build de produção do frontend (opcional)

```bash
cd frontend
npm run build
npm run preview
```

## 📡 Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/names?page=1&limit=10` | Lista paginada dos atendimentos |
| GET | `/api/cpf/:cpf` | Busca um atendimento pelo CPF |
| GET | `/api/name/:name` | Busca um atendimento pelo nome |

## 📊 Funcionalidades do Dashboard

- Listagem paginada dos atendimentos
- Busca por nome/CPF com debounce
- Filtros por status, organização e responsável
- Cards de KPIs e gráficos (distribuição por status e evolução mensal)
- Exportação dos dados filtrados em CSV e PDF

## 🔮 Melhorias futuras

- **Tratamento de erros mais robusto**: padronizar as respostas de erro da API (status codes e mensagens consistentes), validar parâmetros de entrada (ex.: `page`, `limit`, `cpf`), tratar falhas na leitura/ausência da planilha de forma mais clara e melhorar o feedback visual de erros no frontend (mensagens amigáveis, opção de tentar novamente).
- **Inclusão de adição e remoção de atendimentos**: implementar rotas de API para criar (`POST`) e excluir (`DELETE`) atendimentos, persistindo as alterações (planilha, banco de dados ou arquivo JSON), além de um formulário no frontend para cadastrar novos atendimentos e ações na tabela para removê-los, com confirmação antes da exclusão.
- Edição de atendimentos existentes (`PUT`/`PATCH`).
- Migração da fonte de dados da planilha Excel para um banco de dados (ex.: SQLite/PostgreSQL).
- Filtros e paginação aplicados diretamente no backend (atualmente os filtros do dashboard dependem dos dados já carregados).
- Testes automatizados (unitários e de integração) para backend e frontend.
- Variáveis de ambiente para configuração de portas e URLs (ex.: `.env`), em vez de valores fixos no código.