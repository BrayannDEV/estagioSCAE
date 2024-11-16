import swaggerAutogen from "swagger-autogen";
import ClienteModel from "./models/clienteModel.js";
import ProcedimentoModel from "./models/procedimentoModel.js";
import HorarioModel from "./models/horarioModel.js";
import AgendaModel from "./models/agendaModel.js";

const doc = {
    info: {
        title: "Estagio - SCAE",
        description: "Sistema de Controle de Agendamento para Esmalteria"
    },
    host: 'localhost:5000',
    components: {
        schemas: {
            clienteModel: new ClienteModel(0,  "Fulano", "fulano@email.com", "12345", "18 998888888").toJSON(),
            procedimentoModel: new ProcedimentoModel(0,  "Mao em Gel", "pintar unhas da mão em gel", 30, 50.00).toJSON(),
            horarioModel: new HorarioModel( 0, "08:00:00", "08:30:00", "Segunda-feira").toJSON(),
            agendaModel: new AgendaModel(0, "2024/11/15", "08:00:00", "08:30:00", 1, 1).toJSON()
        },
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
}

const outputJson = "./swagger-output.json";
const routes = ['./server.js']

swaggerAutogen({openapi: '3.0.0'})(outputJson, routes, doc)
.then( async () => {
    await import('./server.js');
})