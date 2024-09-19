import AuthMiddleware from "../middlewares/authMiddleware.js";
import ClienteModel from "../models/clienteModel.js";


export default class AutenticacaoController {

    async token(req, res) {
        try {
            let {login, senha, tipo} = req.body;

            if(login && senha) {
                //preciso instanciar a modelo e carregar um cliente baseado no login e senha
                let cliente = new ClienteModel();
                cliente = await cliente.validarAcesso(login, senha);
                if(cliente) {
                    let auth = new AuthMiddleware();
                    let token = auth.gerarToken(cliente.id, cliente.nome, cliente.login);  //o que faz esse let Token?

                    res.cookie("token", token, {
                        httpOnly: true
                    })

                    res.status(200).json({token: token});
                }
                else {
                    res.status(404).json({msg: "Credenciais inválidas!"});
                }
            }
            else{
                res.status(400).json({msg: "As credenciais não foram fornecidas corretamente!"})
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }
}