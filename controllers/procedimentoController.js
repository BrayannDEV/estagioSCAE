import ProcedimentoModel from "../models/procedimentoModel.js";

export default class ProcedimentoController{

    async listar(req, res) {
        try{
            let procedimento = new ProcedimentoModel();
            let lista = await procedimento.listar();
            res.status(200).json(lista);
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    async obter(req, res) {
        try{
            let {id} = req.params;
            let procedimento = new ProcedimentoModel();
            procedimento = await procedimento.obter(id);
            if(procedimento) {
                res.status(200).json(procedimento)
            }
            else{
                res.status(404).json({msg: "Procedimento não encontrado!"});
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

}