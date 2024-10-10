import Database from "../db/database.js";
import BaseModel from "./baseModel.js";

const banco = new Database();

export default class ClienteModel extends BaseModel {

    #id;
    #nome;
    #login;
    #senha;
    #fone;

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }

    get nome() {
        return this.#nome;
    }
    set nome(value) {
        this.#nome = value;
    }

    get login() {
        return this.#login;
    }
    set login(value) {
        this.#login = value;
    }

    get senha() {
        return this.#senha;
    }
    set senha(value) {
        this.#senha = value;
    }

    get fone() {
        return this.#fone;
    }
    set fone(value) {
        this.#fone = value;
    }

    constructor(id, nome, login, senha, fone) {
        super();
        this.#id = id;
        this.#nome = nome;
        this.#login = login;
        this.#senha = senha;
        this.#fone = fone;
    }

    async validarAcesso(login, senha) {

        let sql = "select * from tb_cliente where cli_login = ? and cli_senha = ?";
        let valores = [login, senha];

        let row = await banco.ExecutaComando(sql, valores);

        return this.toMap(row);
    }

    async listar() {
        let sql = "select * from tb_cliente";
        let lista = [];
        let rows = await banco.ExecutaComando(sql);

        return this.toMap(rows);
    }

    async deletar(id) {
        let sql = "delete from tb_cliente where cli_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async gravar() {
        
        let sql = "insert into tb_cliente (cli_nome, cli_login, cli_senha, cli_fone) values (?, ?, ?, ?)";
        let valores = [this.#nome, this.#login, this.#senha, this.#fone];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async obter(id) {
        let sql = "select * from tb_cliente where cli_id = ?";
        let valores = [id];

        let row = await banco.ExecutaComando(sql, valores);

        return this.toMap(row);
    }

    async alterar() {
        let sql = "update tb_cliente set cli_nome = ?, cli_login = ?, cli_senha = ?, cli_fone = ? where cli_id = ?";
        let valores = [this.#nome, this.#login, this.#senha, this.#fone, this.#id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async obterPorEmailSenha(email, senha) {

        let sql = "select * from tb_cliente where cli_login = ? and cli_senha = ?";

        let valores = [email, senha];

        let row = await banco.ExecutaComando(sql, valores);

        return this.toMap(row);
    }

    toMap(rows) {
        let lista = [];

        for(let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let cliente = new ClienteModel();
            cliente.#id = row["cli_id"];
            cliente.#nome = row["cli_nome"];
            cliente.#login = row["cli_login"];
            cliente.#senha = row["cli_senha"];
            cliente.#fone = row["cli_fone"];
            lista.push(cliente);
        }

        if(rows.length > 1)
            return lista;
        else
            return lista[0];
    }

    toJSON() {
        return {
            "id": this.#id,
            "nome": this.#nome,
            "login": this.#login,
            "senha": this.#senha,
            "fone": this.#fone,
        }
    }

}