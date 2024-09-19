import Database from "../db/database.js";
import BaseModel from "./baseModel.js";

const banco = new Database();

export default class HorarioModel extends BaseModel {

    #id;
    #horaInicial;
    #horaFinal;
    #diaSemana;

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
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

    get diaSemana() {
        return this.#diaSemana;
    }
    set diaSemana(value) {
        this.#diaSemana = value;
    }

    constructor(id, horaInicial, horaFinal, diaSemana) {
        super();
        this.#id = id;
        this.#horaInicial = horaInicial;
        this.#horaFinal = horaFinal;
        this.#diaSemana = diaSemana;
    }

    //obterDiaSemana -> vai retornar horários do dia



    toMap(rows) {
        let lista = [];

        for(let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let horario = new HorarioModel();
            horario.#id = row["hora_id"];
            horario.#horaInicial = row["hora_inicial"];
            horario.#horaFinal = row["hora_final"];
            horario.#diaSemana = row["dia_semana"];
            lista.push(horario);
        }

        if(rows.length > 1)
            return lista;
        else
            return lista[0];
    }

    toJSON() {
        return {
            "id": this.#id,
            "horaInicial": this.#horaInicial,
            "horaFinal": this.#horaFinal,
            "diaSemana": this.#diaSemana,
        }
    }

}