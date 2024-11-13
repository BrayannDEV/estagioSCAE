import Database from "../db/database.js";
import BaseModel from "./baseModel.js";
import ClienteModel from "./clienteModel.js";
import ProcedimentoModel from "./procedimentoModel.js";

const banco = new Database();

export default class AgendaModel extends BaseModel {

    #id;
    #data;
    #horaInicial;
    #horaFinal;
    #cliente;
    #procedimento;

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }

    get data() {
        return this.#data;
    }
    set data(value) {
        this.#data = value;
    }

    get horaInicial() {
        return this.#horaInicial;
    }
    set horaInicial(value) {
        this.#horaInicial = value;
    }

    get horaFinal() {
        return this.#horaFinal;
    }
    set horaFinal(value) {
        this.#horaFinal = value;
    }

    get cliente() {
        return this.#cliente;
    }
    set cliente(value) {
        this.#cliente = value;
    }

    get procedimento() {
        return this.#procedimento;
    }
    set procedimento(value) {
        this.#procedimento = value;
    }

    constructor(id, data, horaInicial, horaFinal, cliente, procedimento) {
        super();
        this.#id = id;
        this.#data = data;
        this.#horaInicial = horaInicial;
        this.#horaFinal = horaFinal;
        this.#cliente = cliente;
        this.#procedimento = procedimento;
    }


    async listar() {
        let sql = "select * from tb_agenda a inner join tb_cliente c on a.cliente = c.cli_id inner join tb_procedimento p on a.procedimento = p.pro_id";
        let lista = [];
        let rows = await banco.ExecutaComando(sql);

        return this.toMap(rows);
    }

    async deletar(id) {
        let sql = "delete from tb_agenda where age_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async gravar() {
        
        let sql = "insert into tb_agenda (age_data, hora_inicial, hora_final, cliente, procedimento) values (?, ?, ?, ?, ?)";
        let valores = [this.#data, this.#horaInicial, this.#horaFinal, this.#cliente.id, this.#procedimento.id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async obter(id) {
        let sql = "select * from tb_agenda where age_id = ?";
        let valores = [id];

        let row = await banco.ExecutaComando(sql, valores);

        return this.toMap(row);
    }

    async alterar() {
        let sql = "update tb_agenda set age_data = ?, hora_inicial = ?, hora_final = ?, cliente = ?, procedimento = ? where age_id = ?";
        let valores = [this.#data, this.#horaInicial, this.#horaFinal, this.#cliente, this.#procedimento, this.#id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }


    toMap(rows) {
        let lista = [];

        for(let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let agenda = new AgendaModel();
            agenda.#id = row["age_id"];
            agenda.#data = row["age_data"];
            agenda.#horaInicial = row["hora_inicial"];
            agenda.#horaFinal = row["hora_final"];
            agenda.#cliente = new ClienteModel(row["cli_id"], row["cli_nome"]);
            agenda.#procedimento = new ProcedimentoModel(row["pro_id"], row["pro_nome"]);
            lista.push(agenda);
        }

        
        return lista;
    }

    toJSON() {
        return {
            "id": this.#id,
            "data": this.#data,
            "horaInicial": this.#horaInicial,
            "horaFinal": this.#horaFinal,
            "cliente": this.#cliente.toJSON(),
            "procedimento": this.#procedimento.toJSON(),
        }
    }

}