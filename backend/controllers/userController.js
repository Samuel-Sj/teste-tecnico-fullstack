const convertExceltoJson = require('../data/exceltoJson');

const data = convertExceltoJson();

exports.getUsers = (req,res) => {
try{    
 
   if (!data){
	return res.status(500).json({message: 'erro ao consultar dados'}
)
    let {page = 1, limit = 10} = req.query;

    
    page = parseInt(page);
    limit = parseInt(limit);

    const start = (page - 1) * limit;
    const end = (page * limit); 

    const paginated = data.slice(start,end);

    res.json({
        totalItems: data.length,
        totalPages: Math.ceil(data.length / limit),
        currentPage: page,
        data: paginated
    })
} catch (err) {return res.status(500).json({message:'erro interno do servidor'})
}
exports.getUserByCPF = (req, res) => {

    const user = data.find((u) => u.cpf == req.params.cpf);
  
    if (!user) {
      return res.status(404).json({ message: "CPF do clientr não encontrado" });
    }
  
    res.json(user);
  };


exports.getUserByName = (req,res) => {

try {

const user = data.find((u) => u.name ==req.params.name);
if (!user){
	return res.status(404).json({message:'Nome do cliente não encontrado'})

}
res.status(200).json(user);
}
} catch (err){
return res.status(500).json({message:'Erro interno do servidor',error: err.message});

