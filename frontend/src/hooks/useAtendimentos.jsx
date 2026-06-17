import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchClientes } from '../services/api';

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


  const [todosAtendimentos, setTodosAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const debounceRef = useRef(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setFiltros((atual) => ({ ...atual, search: termoBusca }));
      setPage(1);
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [termoBusca]);

  const carregarLista = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchClientes(1, 999999);
      if (res && res.data) {
        setTodosAtendimentos(res.data);
      }
    } catch (err) {
      setError(mensagemDeErro(err));
      setTodosAtendimentos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarLista();
  }, [carregarLista]);


  const dadosFiltrados = useMemo(() => {
    return todosAtendimentos.filter((item) => {
      if (filtros.search) {
        const termo = filtros.search.toLowerCase();
        const nomeBate = item.name?.toLowerCase().includes(termo);
        const cpfBate = String(item.cpf || '').includes(termo);
        const codigoBate = String(item.code || '').toLowerCase().includes(termo);

        if (!nomeBate && !cpfBate && !codigoBate) return false;
      }

      if (filtros.status && item.status !== filtros.status) {
        return false;
      }

      return true;
    });
  }, [todosAtendimentos, filtros]);

  const stats = useMemo(() => {
    const total = dadosFiltrados.length;

    const concluidos = dadosFiltrados.filter(i => i.appointmentRealized === 'Sim').length;
    const cancelados = dadosFiltrados.filter(i => i.appointmentRealized === 'Não').length;

    const totalAvaliados = concluidos + cancelados;
    const taxaConclusao = totalAvaliados > 0 ? Math.round((concluidos / totalAvaliados) * 100) / 100 : 0;


    const statusDistribution = [
      { status: 'Concluído', total: concluidos },
      { status: 'Cancelado', total: cancelados }
    ];


    const agrupadoPorMes = dadosFiltrados.reduce((acc, item) => {

      if (!item.dataAppointment) return acc;

      let chaveMes = '';

      if (item.dataAppointment.includes('-')) {

        chaveMes = item.dataAppointment.substring(0, 7);
      } else if (item.dataAppointment.includes('/')) {

        const partes = item.dataAppointment.split(' ')[0].split('/');
        if (partes.length === 3) {
          chaveMes = `${partes[2]}-${partes[1]}`;
        }
      }

      if (chaveMes) {
        acc[chaveMes] = (acc[chaveMes] || 0) + 1;
      }
      return acc;
    }, {});

    const monthlyEvolution = Object.keys(agrupadoPorMes)
      .sort()
      .map(mes => ({
        mes: mes,
        total: agrupadoPorMes[mes]
      }));

    return {
      totalAtendimentos: total,
      totalConcluidos: concluidos,
      totalCancelados: cancelados,
      taxaConclusao: taxaConclusao,
      statusDistribution: statusDistribution,
      monthlyEvolution: monthlyEvolution,
    };
  }, [dadosFiltrados]);


  const atendimentosPaginados = useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return dadosFiltrados.slice(start, end);
  }, [dadosFiltrados, page, limit]);


  const pagination = useMemo(() => {
    const totalItems = dadosFiltrados.length;
    return {
      page: page,
      limit: limit,
      total: totalItems,
      totalPages: Math.ceil(totalItems / limit),
      totalRealized: stats.totalConcluidos
    };
  }, [dadosFiltrados, page, limit, stats.totalConcluidos]);

  const opcoesFiltro = useMemo(() => {
    const statusSet = new Set(todosAtendimentos.map(i => i.status).filter(Boolean));
    return {
      status: Array.from(statusSet),
      organizacoes: [],
      responsaveis: []
    };
  }, [todosAtendimentos]);

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
    atendimentos: atendimentosPaginados,
    pagination,
    loading,
    error,
    stats,
    statsLoading: false,
    statsError: null,
    todosFiltrados: dadosFiltrados,
    recarregar: carregarLista,
  };
}

function mensagemDeErro(err) {
  if (err.response?.data?.message) return err.response.data.message;
  if (err.message === 'Network Error') {
    return 'Não foi possível conectar à API. Verifique se o back-end está em execução.';
  }
  return 'Ocorreu um erro inesperado. Tente novamente.';
}