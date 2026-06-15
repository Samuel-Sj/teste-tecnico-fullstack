import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://localhost:3000/api'
});

// ==========================================
//   CLIENTES / USUÁRIOS (Alinhado com seu Backend)
// ==========================================

export const fetchClientes = async (page = 1, limit = 10) => {
	try {
		// Ajustado para bater com o router.get('/names') do seu backend
		const response = await api.get(`/names?page=${page}&limit=${limit}`);
		return response.data;
	} catch (err) {
		console.error(`Erro ao retornar dados da API: ${err.message}`);
		return null;
	}
};

export const fetchClientByCPF = async (cpf) => {
	try {
		// Ajustado para bater com o router.get('/cpf/:cpf') do seu backend
		const response = await api.get(`/cpf/${cpf}`);
		return response.data;
	} catch (err) {
		console.error(`Erro ao retornar cpf do cliente: ${err.message}`);
		return null;
	}
};

export const fetchClienteByName = async (name) => {
	try {
		// Ajustado para bater com o router.get('/name/:name') do seu backend
		const response = await api.get(`/name/${name}`);
		return response.data;
	} catch (err) {
		console.error(`Erro ao retornar nome do cliente: ${err.message}`);
		return null;
	}
}; 

// ==========================================
//   ATENDIMENTOS (Exports exigidos pelo Hook)
// ==========================================

/**
 * Busca atendimentos paginados e filtrados.
 * Mapeado para seguir o mesmo padrão de resposta do userController.js
 */
export const fetchAtendimentos = async (filtrosEPagina) => {
	try {
		const params = new URLSearchParams(filtrosEPagina).toString();
		// Assumindo que seu backend possui a rota /atendimentos
		const response = await api.get(`/atendimentos?${params}`);
		return response.data; 
	} catch (err) {
		console.error(`Erro ao buscar atendimentos: ${err.message}`);
		throw err;
	}
};

/**
 * Busca TODOS os atendimentos que respeitam os filtros (sem paginação).
 */
export const fetchTodosAtendimentos = async (filtros = {}) => {
	try {
		const params = new URLSearchParams(filtros).toString();
		// Assumindo que seu backend possui a rota /atendimentos/todos
		const response = await api.get(`/atendimentos/todos?${params}`);
		return response.data;
	} catch (err) {
		console.error(`Erro ao buscar todos os atendimentos: ${err.message}`);
		throw err;
	}
};