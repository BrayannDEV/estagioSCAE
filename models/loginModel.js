import Database from "../db/database.js";

const banco = new Database();

export default class LoginModel {

    #login;
    #senha;

    get login() {
        return this.#login;
    }
    set login(login) {
        this.#login = login;
    }
    get senha() {
        return this.#senha;
    }
    set senha(senha) {
        this.#senha = senha;
    }

    constructor(login, senha) {
        this.#login = login;
        this.#senha = senha;
    }

    async token() {

        let sql = "select cli_id from tb_cliente where cli_login = ? and cli_senha = ?";

        let valores = [this.#login, this.#senha];

        let rows = await banco.ExecutaComando(sql, valores);

        return rows.length > 0;
    }

    toJSON() {
        return {
            "email": this.#login,
            "senha": this.#senha
        }
    }
}