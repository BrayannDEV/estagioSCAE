import AuthMiddleware from "../middlewares/authMiddleware.js";
import ClienteModel from "../models/clienteModel.js";
import LoginModel from "../models/loginModel.js";


export default class LoginController {

    async token(req, res) {
        try {
            if(req.body) {
                let {login, senha, tipo} = req.body;
                let loginModel = new LoginModel(login, senha)

                if(await loginModel.token()) {
                    let cliente = new ClienteModel();
                    cliente = await cliente.obterPorEmailSenha(login, senha);
                    cliente.senha = "";
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