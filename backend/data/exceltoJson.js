const xlsx = require('xlsx');
const path = require('path');
const renameColumns = require('../utils/renameExcelColumns');



const filePath = path.join(__dirname,"./agendamento_202606121322_formatado.xlsx");

function convertExceltoJson() {
    const workbook = xlsx.readFile(filePath);

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const jsonData = xlsx.utils.sheet_to_json(sheet);

    return jsonData.map(renameColumns);
}

module.exports = convertExceltoJson;