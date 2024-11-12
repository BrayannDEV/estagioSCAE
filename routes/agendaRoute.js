import express from 'express'
import AuthMiddleware from '../middlewares/authMiddleware.js';
import AgendaController from '../controllers/agendaController.js';

const router = express.Router();

let ctrl = new AgendaController();
let auth = new AuthMiddleware();

router.post("/", (req, res) => [
    //#swagger.tags = ['Agenda']
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    //#swagger.summary = 'Cadastra um agendamento'
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/agendaModel"
                    }  
                }
            }
        } 
    */
    ctrl.gravar(req, res)
]);

router.get("/", auth.validar, (req, res) => {

    // #swagger.tags = ['Agenda']
    // #swagger.summary = 'Endpoint para retornar todos os Agendamentos'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    ctrl.listar(req, res);
});

router.get("/:id", (req, res) => {
    /*#swagger.security = [{
        "bearerAuth": []
    }]*/
    //#swagger.tags = ['Agenda']
    //#swagger.summary = 'Retorna um agendamento baseado em um código'
    ctrl.obter(req, res);
});

router.put("/", auth.validar, (req, res) => {
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    //#swagger.tags = ['Agenda']
    //#swagger.summary = 'Altera um agendamento'
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/agendaModel"
                    }  
                }
            }
        } 
    */
    ctrl.alterar(req, res);
});

router.delete("/:id", auth.validar, (req, res) => {
    //#swagger.tags = ['Agenda']
    //#swagger.summary = 'Deletar um Agendamento'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    ctrl.deletar(req, res);
});

export default router;