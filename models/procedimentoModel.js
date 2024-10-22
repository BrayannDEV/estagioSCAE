import Database from "../db/database.js";
import BaseModel from "./baseModel.js";

const banco = new Database();

export default class ProcedimentoModel extends BaseModel {

    #id;
    #nome;
    #descricao;
    #tempo;
    #valor;

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

    get descricao() {
        return this.#descricao;
    }
        set descricao(value) {
    this.#descricao = value;
    }

    get tempo() {
        return this.#tempo;
    }
    set tempo(value) {
        this.#tempo = value;
    }

    get valor() {
        return this.#valor;
    }
    set valor(value) {
        this.#valor = value;
    }

    constructor(id, nome, descricao, tempo, valor) {
        super();
        this.#id = id;
        this.#nome = nome;
        this.#descricao = descricao;
        this.#tempo = tempo;
        this.#valor = valor;
    }

    async listar() {
        let sql = "select * from tb_procedimento";
        let lista = [];
        let rows = await banco.ExecutaComando(sql);

        return this.toMap(rows);
    }

    async obter(id) {
        let sql = "select * from tb_procedimento where pro_id = ?";
        let valores = [id];

        let row = await banco.ExecutaComando(sql, valores);

        return this.toMap(row);
    }

    async gravar() {
        
        let sql = "insert into tb_procedimento (pro_nome, pro_desc, pro_tempo, pro_valor) values (?, ?, ?, ?)";
        let valores = [this.#nome, this.#descricao, this.#tempo, this.#valor];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async deletar(id) {
        let sql = "delete from tb_procedimento where pro_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async alterar() {
        let sql = "update tb_procedimento set pro_nome = ?, pro_desc = ?, pro_tempo = ?, pro_valor = ? where pro_id = ?";
        let valores = [this.#nome, this.#descricao, this.#tempo, this.#valor, this.#id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    toMap(rows) {
        let lista = [];

        for(let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let procedimento = new ProcedimentoModel();
            procedimento.#id = row["pro_id"];
            procedimento.#nome = row["pro_nome"];
            procedimento.#descricao = row["pro_desc"];
            procedimento.#tempo = row["pro_tempo"];
            procedimento.#valor = row["pro_valor"];
            lista.push(procedimento);
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
            "descricao": this.#descricao,
            "tempo": this.#tempo,
            "valor": this.#valor,
        }
    }

}