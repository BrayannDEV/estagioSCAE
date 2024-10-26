import ClienteModel from "../models/clienteModel.js";

export default class ClienteController {

    async listar(req, res) {
        try{
            let cliente = new ClienteModel();
            let lista = await cliente.listar();
            res.status(200).json(lista);
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    async obter(req, res) {
        try{
            let {id} = req.params;
            let cliente = new ClienteModel();
            cliente = await cliente.obter(id);
            if(cliente) {
                res.status(200).json(cliente)
            }
            else{
                res.status(404).json({msg: "Cliente não encontrado!"});
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    async alterar(req, res) {
        try {
            let {id, nome, login, senha, fone} = req.body;
            if(id && nome && login && senha && fone) {

                let clienteModel = new ClienteModel(id, nome, login, senha, fone);
                
                if(await clienteModel.obter(id)){
                    let result = await clienteModel.alterar();

                    if(result) {
                        res.status(200).json({msg: "Alteração realizada com sucesso!"});
                    }
                    else
                        throw new Error("Erro ao executar o comando update!");
                }
                else{
                    res.status(404).json({msg: "Cliente não encontrado para alteração"});
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
            let clienteModel = new ClienteModel();
            if(await clienteModel.obter(id)) {
                let result = await clienteModel.deletar(id);

                if(result)
                    res.status(200).json({msg: "Cliente deletado!"});
                else
                    throw new Error("Erro ao executar o comando de deleção");
            }
            else {
                res.status(404).json({msg: "Cliente não encontrado para a deleção!"})
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    async gravar(req, res) {

        try {
            let {nome, login, senha, fone } = req.body;
            console.log(nome)
            console.log(login)
            console.log(senha)
            console.log(fone)
            if(nome && login && senha && fone) {
                
                let cliente = new ClienteModel(0, nome, login, senha, fone);
                
                let result = await cliente.gravar()
                if(result)
                    res.status(201).json({msg: "Cliente gravado com sucesso!"});
                else
                    throw new Error("Erro ao inserir o cliente no banco de dados");
            }
            else {
                res.status(400).json({msg: "Parâmetros não informados corretamente!1"});
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        } 
    }

}