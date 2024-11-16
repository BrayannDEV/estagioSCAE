import express from 'express'
import AuthMiddleware from '../middlewares/authMiddleware.js';
import ProcedimentoController from '../controllers/procedimentoController.js';

const router = express.Router();

let ctrl = new ProcedimentoController();
let auth = new AuthMiddleware();

router.get("/", (req, res) => {

    // #swagger.tags = ['Procedimento']
    // #swagger.summary = 'Endpoint para retornar todos os Procedimentos'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    ctrl.listar(req, res);
});

router.get("/:id", (req, res) => {
    /*#swagger.security = [{
        "bearerAuth": []
    }]*/
    //#swagger.tags = ['Procedimento']
    //#swagger.summary = 'Retorna um procedimento baseado em um código'
    ctrl.obter(req, res);
});

router.post("/", auth.validar, (req, res) => [
    //#swagger.tags = ['Procedimento']
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    //#swagger.summary = 'Cadastra um procedimento'
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/procedimentoModel"
                    }  
                }
            }
        } 
    */
    ctrl.gravar(req, res)
]);

router.put("/", auth.validar, (req, res) => {
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    //#swagger.tags = ['Procedimento']
    //#swagger.summary = 'Altera um procedimento'
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/procedimentoModel"
                    }  
                }
            }
        } 
    */
    ctrl.alterar(req, res);
});

router.delete("/:id", auth.validar, (req, res) => {
    //#swagger.tags = ['Procedimento']
    //#swagger.summary = 'Deletar um Procedimento'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    ctrl.deletar(req, res);
});


export default router;