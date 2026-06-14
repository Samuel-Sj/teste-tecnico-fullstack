import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchAtendimentos, fetchFiltros, fetchStats } from '../services/api';

export const FILTROS_INICIAIS = {
  search: '',
  status: '',
  areaJuridica: '',
  advogado: '',
  dataInicio: '',
  dataFim: '',
};

const LIMIT_PADRAO = 10;

export function useAtendimentos() {
  const [filtros, setFiltros] = useState(FILTROS_INICIAIS);
  const [termoBusca, setTermoBusca] = useState(''); // valor "ao vivo" do campo de busca
  const [page, setPage] = useState(1);
  const [limit] = useState(LIMIT_PADRAO);

  const [atendimentos, setAtendimentos] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: LIMIT_PADRAO, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState(null);

  const [opcoesFiltro, setOpcoesFiltro] = useState({ areas: [], advogados: [], status: [] });

  // Debounce: aplica o termo digitado no campo de busca após 350ms de inatividade
  const debounceRef = useRef(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setFiltros((atual) => ({ ...atual, search: termoBusca }));
      setPage(1);
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [termoBusca]);

  // Carrega as opções de filtro (áreas/advogados/status) uma única vez
  useEffect(() => {
    fetchFiltros()
      .then((res) => setOpcoesFiltro(res.data))
      .catch(() => {
        /* opções de filtro são auxiliares; falha silenciosa não bloqueia o painel */
      });
  }, []);

  const carregarLista = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAtendimentos({ ...filtros, page, limit });
      setAtendimentos(res.data);
      setPagination(res.pagination);
    } catch (err) {
      setError(mensagemDeErro(err));
      setAtendimentos([]);
    } finally {
      setLoading(false);
    }
  }, [filtros, page, limit]);

  const carregarStats = useCallback(async () => {
    setStatsLoading(true);
    setStatsError(null);
    try {
      const res = await fetchStats(filtros);
      setStats(res.data);
    } catch (err) {
      setStatsError(mensagemDeErro(err));
    } finally {
      setStatsLoading(false);
    }
  }, [filtros]);

  useEffect(() => {
    carregarLista();
  }, [carregarLista]);

  useEffect(() => {
    carregarStats();
  }, [carregarStats]);

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
    atendimentos,
    pagination,
    loading,
    error,
    stats,
    statsLoading,
    statsError,
    recarregar: () => {
      carregarLista();
      carregarStats();
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
