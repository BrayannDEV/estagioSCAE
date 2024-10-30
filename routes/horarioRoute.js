import express from 'express'
import HorarioController from '../controllers/horarioController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

let ctrl = new HorarioController();
let auth = new AuthMiddleware();

router.post("/", auth.validar, (req, res) => [
    //#swagger.tags = ['Horario']
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    //#swagger.summary = 'Cadastra um horario para um dia da semana'
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/horarioModel"
                    }  
                }
            }
        } 
    */
    ctrl.gravar(req, res)
]);

router.get("/", auth.validar, (req, res) => {

    // #swagger.tags = ['Horario']
    // #swagger.summary = 'Endpoint para retornar todos os Horarios'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    ctrl.listar(req, res);
});

router.get("/:diaSemana", (req, res) => {
    /*#swagger.security = [{
        "bearerAuth": []
    }]*/
    //#swagger.tags = ['Horario']
    //#swagger.summary = 'Retorna os horários de determinado dia da semana'
    ctrl.obterPorDia(req, res);
});

router.put("/", auth.validar, (req, res) => {
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    //#swagger.tags = ['Horario']
    //#swagger.summary = 'Altera um horario'
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/horarioModel"
                    }  
                }
            }
        } 
    */
    ctrl.alterar(req, res);
});

router.delete("/:id", auth.validar, (req, res) => {
    //#swagger.tags = ['Horario']
    //#swagger.summary = 'Deletar um Horario'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    ctrl.deletar(req, res);
});

export default router;