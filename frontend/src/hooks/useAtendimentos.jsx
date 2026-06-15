import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchClientes } from '../services/api'; // Importa a função real do seu backend

export const FILTROS_INICIAIS = {
  search: '',
  status: '',
  organizacao: '',
  responsavel: '',
  dataInicio: '',
  dataFim: '',
};

const LIMIT_PADRAO = 10;

export function useAtendimentos() {
  const [filtros, setFiltros] = useState(FILTROS_INICIAIS);
  const [termoBusca, setTermoBusca] = useState(''); 
  const [page, setPage] = useState(1);
  const [limit] = useState(LIMIT_PADRAO);

  // Mantemos o nome 'atendimentos' para o componente visual não quebrar,
  // mas aqui dentro ele vai guardar a lista de Usuários do Excel.
  const [atendimentos, setAtendimentos] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: LIMIT_PADRAO, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [todosFiltrados, setTodosFiltrados] = useState([]);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState(null);

  const [opcoesFiltro, setOpcoesFiltro] = useState({ status: [], organizacoes: [], responsaveis: [] });

  // Debounce para busca
  const debounceRef = useRef(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setFiltros((atual) => ({ ...atual, search: termoBusca }));
      setPage(1);
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [termoBusca]);

  // Função principal que liga o Frontend ao seu userController.js
  const carregarLista = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Chama a rota /api/users/names do seu backend
      const res = await fetchClientes(page, limit);
      
      if (res) {
        // Alimenta o estado com o array 'data' do controller
        setAtendimentos(res.data);
        
        // Mapeia a paginação do seu backend para o formato do hook
        setPagination({
          page: res.currentPage,      // veio do backend
          limit: limit,
          total: res.totalItems,       // veio do backend
          totalPages: res.totalPages   // veio do backend
        });
      }
    } catch (err) {
      setError(mensagemDeErro(err));
      setAtendimentos([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    carregarLista();
  }, [carregarLista]);

  // Como o backend de usuários não tem gráficos/KPIs, criamos um objeto seguro
  // para que os cards de "Stats" do painel não quebrem (ficando zerados).
  const stats = useMemo(() => {
    return {
      totalAtendimentos: pagination.total, // Mostra o total de usuários do Excel
      totalConcluidos: 0,
      totalCancelados: 0,
      taxaConclusao: 0,
      statusDistribution: [],
      monthlyEvolution: [],
    };
  }, [pagination.total]);

  function atualizarFiltro(campo, valor) {
    setFiltros((atual) => ({ ...atual, [campo]: valor }));
    setPage(1);
  }

  function limparFiltros() {
    setFiltros(FILTROS_INICIAIS);
    setTermoBusca('');
    setPage(1);
  }

  const filtrosAtivos = Object.values(filtros).some((v) => v !== '');

  return {
    filtros,
    termoBusca,
    setTermoBusca,
    atualizarFiltro,
    limparFiltros,
    filtrosAtivos,
    opcoesFiltro,
    page,
    setPage,
    limit,
    atendimentos, // O componente vai ler isso e renderizar as linhas com os Usuários
    pagination,
    loading,
    error,
    stats,
    statsLoading,
    statsError,
    todosFiltrados,
    recarregar: () => {
      carregarLista();
    },
  };
}

function mensagemDeErro(err) {
  if (err.response?.data?.message) return err.response.data.message;
  if (err.message === 'Network Error') {
    return 'Não foi possível conectar à API. Verifique se o back-end está em execução.';
  }
  return 'Ocorreu um erro inesperado. Tente novamente.';
}