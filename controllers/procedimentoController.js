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

    async gravar(req, res) {

        try {
            let {nome, descricao, tempo, valor } = req.body;
            console.log(nome)
            console.log(descricao)
            console.log(tempo)
            console.log(valor)
            if(nome && descricao && tempo && valor) {
                
                let procedimento = new ProcedimentoModel(0, nome, descricao, tempo, valor);
                
                let result = await procedimento.gravar()
                if(result)
                    res.status(201).json({msg: "procedimento gravado com sucesso!"});
                else
                    throw new Error("Erro ao inserir o procedimento no banco de dados");
            }
            else {
                res.status(400).json({msg: "Parâmetros não informados corretamente!1"});
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        } 
    }

    async deletar(req, res) {
        try{
            let {id} = req.params;
            let procedimentoModel = new ProcedimentoModel();
            if(await procedimentoModel.obter(id)) {
                let result = await procedimentoModel.deletar(id);

                if(result)
                    res.status(200).json({msg: "Procedimento deletado!"});
                else
                    throw new Error("Erro ao executar o comando de deleção");
            }
            else {
                res.status(404).json({msg: "Procedimento não encontrado para a deleção!"})
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    async alterar(req, res) {
        try {
            let {id, nome, descricao, tempo, valor} = req.body;
            if(id && nome && descricao && tempo && valor) {

                let procedimentoModel = new ProcedimentoModel(id, nome, descricao, tempo, valor);
                
                if(await procedimentoModel.obter(id)){
                    let result = await procedimentoModel.alterar();

                    if(result) {
                        res.status(200).json({msg: "Alteração realizada com sucesso!"});
                    }
                    else
                        throw new Error("Erro ao executar o comando update!");
                }
                else{
                    res.status(404).json({msg: "Procedimento não encontrado para alteração"});
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

}