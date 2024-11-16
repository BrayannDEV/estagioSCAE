import AgendaModel from "../models/agendaModel.js";

export default class AgendaController {

    async listar(req, res) {
        try{
            let agenda = new AgendaModel();
            let lista = await agenda.listar();
            res.status(200).json(lista);
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    async obter(req, res) {
        try{
            let {id} = req.params;
            let agenda = new AgendaModel();
            agenda = await agenda.obter(id);
            if(agenda) {
                res.status(200).json(agenda)
            }
            else{
                res.status(404).json({msg: "Agendamento não encontrado!"});
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    async obterPorData(req, res) {
        try{
            let {data} = req.params;
            let agenda = new AgendaModel();
            agenda = await agenda.obterPorData(data);
            if(agenda) {
                res.status(200).json(agenda)
            }
            else{
                res.status(404).json({msg: "data não encontrada!"});
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    async gravar(req, res) {

        try {
            let {data, horaInicial, horaFinal, cliente, procedimento} = req.body;
            console.log(data)
            console.log(horaInicial)
            console.log(horaFinal)
            console.log(cliente)
            console.log(procedimento)
            
            if(data && horaInicial && horaFinal && cliente && procedimento) {

                // Obtém os agendamentos para a data especificada
                let agendaModel = new AgendaModel();
                let agendamentos = await agendaModel.obterPorData(data);

                // Verifica se já existe um agendamento no mesmo horário
                const existeAgendamento = agendamentos.some(agendamento => {
                    return (
                        (horaInicial >= agendamento.horaInicial && horaInicial < agendamento.horaFinal) ||
                        (horaFinal > agendamento.horaInicial && horaFinal <= agendamento.horaFinal) ||
                        (horaInicial <= agendamento.horaInicial && horaFinal >= agendamento.horaFinal)
                    );
                });

                if (existeAgendamento) {
                    return res.status(400).json({msg: "Já existe um agendamento para esse horário!"});
                }

                let agenda = new AgendaModel(0, data, horaInicial, horaFinal, cliente, procedimento);
                let result = await agenda.gravar()
                if(result)
                    res.status(201).json({msg: "Agendamento gravado com sucesso!"});
                else
                    throw new Error("Erro ao inserir o agendamento no banco de dados");
            }
            else {
                res.status(400).json({msg: "Parâmetros não informados corretamente!1"});
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        } 
    }

    async alterar(req, res) {
        try {
            let {id, data, horaInicial, horaFinal, cliente, procedimento} = req.body;
            if(id && data && horaInicial && horaFinal && cliente && procedimento) {

                let agendaModel = new AgendaModel(id, data, horaInicial, horaFinal, cliente, procedimento);
                if(await agendaModel.obter(id)){
                    let result = await agendaModel.alterar();

                    if(result) {
                        res.status(200).json({msg: "Alteração realizada com sucesso!"});
                    }
                    else
                        throw new Error("Erro ao executar o comando update!");
                }
                else{
                    res.status(404).json({msg: "Agendamento não encontrado para alteração"});
                }
            }
            else{
                res.status(400).json({msg: "Informe os parâmetros corretamente!"});
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    async deletar(req, res) {
        try{
            let {id} = req.params;
            let agendaModel = new AgendaModel();
            if(await agendaModel.obter(id)) {
                let result = await agendaModel.deletar(id);

                if(result)
                    res.status(200).json({msg: "Agendamento deletado!"});
                else
                    throw new Error("Erro ao executar o comando de deleção");
            }
            else {
                res.status(404).json({msg: "Agendamento não encontrado para a deleção!"})
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }
}