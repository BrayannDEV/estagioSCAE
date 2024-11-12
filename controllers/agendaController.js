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
}