const convertExceltoJson = require('../data/exceltoJson');

const data = convertExceltoJson();

// 1. Buscar todos os usuários (Paginado)
exports.getUsers = (req, res) => {
    try {    
        if (!data) {
            return res.status(500).json({ message: 'erro ao consultar dados' });
        }

        let { page = 1, limit = 10 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const start = (page - 1) * limit;
        const end = (page * limit); 

        const paginated = data.slice(start, end);

        return res.json({
            totalItems: data.length,
            totalPages: Math.ceil(data.length / limit),
            currentPage: page,
            data: paginated
        });
    } catch (err) {
        return res.status(500).json({ message: 'erro interno do servidor', error: err.message });
    }
}; // <-- Chave de fechamento da função adicionada aqui

// 2. Buscar usuário por CPF
exports.getUserByCPF = (req, res) => {
    const user = data.find((u) => u.cpf == req.params.cpf);
  
    if (!user) {
        return res.status(404).json({ message: "CPF do cliente não encontrado" });
    }
  
    return res.json(user);
};

// 3. Buscar usuário por Nome
exports.getUserByName = (req, res) => {
    try {
        const user = data.find((u) => u.name == req.params.name);
        
        if (!user) {
            return res.status(404).json({ message: 'Nome do cliente não encontrado' });
        }
        
        return res.status(200).json(user);
    } catch (err) { // <-- O catch agora está dentro do escopo correto da função
        return res.status(500).json({ message: 'Erro interno do servidor', error: err.message });
    }
}; // <-- Função fechada corretamente aqui