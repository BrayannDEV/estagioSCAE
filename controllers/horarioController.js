import HorarioModel from "../models/horarioModel.js";

export default class HorarioController {

    async listar(req, res) {
        try{
            let horario = new HorarioModel();
            let lista = await horario.listar();
            res.status(200).json(lista);
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    async obterPorDia(req, res) {
        try{
            let {diaSemana} = req.params;
            let horario = new HorarioModel();
            horario = await horario.obterPorDia(diaSemana);
            if(horario) {
                res.status(200).json(horario)
            }
            else{
                res.status(404).json({msg: "horario não encontrado!"});
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    async gravar(req, res) {

        try {
            let {horaInicial, horaFinal, diaSemana} = req.body;
            console.log(horaInicial)
            console.log(horaFinal)
            console.log(diaSemana)
            
            if(horaInicial && horaFinal && diaSemana) {

                let horarioConsult = new HorarioModel(); 
                let horariosExistentes = await horarioConsult.obterPorDia(diaSemana);

                // Verificar se o novo horário proposto está entre algum horário já existente 
                //const horaInicialDate = new Date(`1970-01-01T${horaInicial}`); 
                //const horaFinalDate = new Date(`1970-01-01T${horaFinal}`); 
                
                const conflito = horariosExistentes.some(horario => { 
                    return ( 
                        (horaInicial >= horario.horaInicial && horaInicial < horario.horaFinal) || 
                        (horaFinal > horario.horaInicial && horaFinal <= horario.horaFinal) || 
                        (horaInicial <= horario.horaInicial && horaFinal >= horario.horaFinal) 
                    ); 
                }); 
                
                if (conflito) { 
                    return res.status(400).json({ msg: "O horário proposto conflita com um horário já existente." });
                }

                let horario = new HorarioModel(0, horaInicial, horaFinal, diaSemana);
                let result = await horario.gravar()
                if(result)
                    res.status(201).json({msg: "horario gravado com sucesso!"});
                else
                    throw new Error("Erro ao inserir o horario no banco de dados");
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
            let {id, horaInicial, horaFinal, diaSemana} = req.body;
            if(id && horaInicial && horaFinal && diaSemana) {

                let horarioModel = new HorarioModel(id, horaInicial, horaFinal, diaSemana);
                if(await horarioModel.obter(id)){
                    let result = await horarioModel.alterar();

                    if(result) {
                        res.status(200).json({msg: "Alteração realizada com sucesso!"});
                    }
                    else
                        throw new Error("Erro ao executar o comando update!");
                }
                else{
                    res.status(404).json({msg: "horario não encontrado para alteração"});
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
            let horarioModel = new HorarioModel();
            if(await horarioModel.obter(id)) {
                let result = await horarioModel.deletar(id);

                if(result)
                    res.status(200).json({msg: "horario deletado!"});
                else
                    throw new Error("Erro ao executar o comando de deleção");
            }
            else {
                res.status(404).json({msg: "horario não encontrado para a deleção!"})
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

}