const xlsx = require('xlsx');

function renameColumns(row) {
    const data = {
        code: row["Código do agendamento"],
        dataAppointment: row["Data do agendamento"],
        startTime: row["Hora início"],
        endTime: row["Hora fim"],
        cpf: row["CPF do assistido"],
        name: row["Nome do assistido"],
        organization: row["Organização"],
        service: row["Serviço"],
        local: row["Local"],
        responsible: row["Responsável pelo agendamento"],
        createdBy: row["Criado por"],
        createdAt: row["Data de criação"],
        updatedBy: row["Atualizado por"],
        updatedAt: row["Data de atualização"],
        type: row["Tipo"],
        status: row["Status"]
    };

    data.dataAppointment = excelSerialToISO(data.dataAppointment);
    data.createdAt = excelSerialToISO(data.createdAt);
    data.updatedAt = excelSerialToISO(data.updatedAt);

    return data;
}

function excelSerialToISO(serial) {
    if (!serial) return null;
    const parsed = xlsx.SSF.parse_date_code(serial);
    const date = new Date(Date.UTC(parsed.y, parsed.m - 1, parsed.d, parsed.H, parsed.M, parsed.S));
    return date.toLocaleString().replace(',','')
}

module.exports = renameColumns;