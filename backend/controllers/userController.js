const convertExceltoJson = require('../data/exceltoJson');


exports.getUserByName = (req,res) => {
    let data = convertExceltoJson();


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
};

exports.getUserByCPF = (req, res) => {
    const data = convertExceltoJson();

    const user = data.find((u) => u.cpf == req.params.cpf);
  
    if (!user) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }
  
    res.json(user);
  };