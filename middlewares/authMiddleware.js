import jwt from 'jsonwebtoken';
import ClienteModel from '../models/clienteModel.js';

const SEGREDO = "1BA1B2@@@@@&&&;;;;;;&&&B3C4D5";

export default class AuthMiddleware {

    gerarToken(id, nome, login) {
        return jwt.sign({
            id: id,
            nome: nome,
            login: login
        }, SEGREDO);
    }

    async validar(req, res, next) {
        //procurar chave no cabeçalho;
        let {token} = req.cookies;
        if(token){
            try {
                let objCliente = jwt.verify(token, SEGREDO);
                let cliente = new ClienteModel();
                cliente = await cliente.obter(objCliente.id);
                if(cliente) {
                    let auth = new AuthMiddleware();
                    let tokenNovo = auth.gerarToken(objCliente.id, objCliente.nome, objCliente.login)
                    res.cookie("token", tokenNovo, {
                        httpOnly:true
                    })
                    next();
                }
                else{
                    res.status(401).json({msg: "Não autorizado!(1)"});
                }
            }
            catch(ex) {
                //não foi possível validar o token
                res.status(401).json({msg: "Não autorizado!(2)"});
            }
        }
        else{
            res.status(401).json({msg: "Não autorizado!(3)"});
        }
    }

}