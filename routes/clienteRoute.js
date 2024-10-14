import express from 'express'
import ClienteController from '../controllers/clienteController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

let ctrl = new ClienteController();
let auth = new AuthMiddleware();

router.post("/", (req, res) => [
    //#swagger.tags = ['Cliente']
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    //#swagger.summary = 'Cadastra um cliente'
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/clienteModel"
                    }  
                }
            }
        } 
    */
    ctrl.gravar(req, res)
]);

router.get("/", auth.validar, (req, res) => {

    // #swagger.tags = ['Cliente']
    // #swagger.summary = 'Endpoint para retornar todos os Clientes'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    ctrl.listar(req, res);
});

router.get("/:id", (req, res) => {
    /*#swagger.security = [{
        "bearerAuth": []
    }]*/
    //#swagger.tags = ['Cliente']
    //#swagger.summary = 'Retorna um cliente baseado em um código'
    ctrl.obter(req, res);
});

router.put("/", auth.validar, (req, res) => {
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    //#swagger.tags = ['Cliente']
    //#swagger.summary = 'Altera um cliente'
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/clienteModel"
                    }  
                }
            }
        } 
    */
    ctrl.alterar(req, res);
});

router.delete("/:id", auth.validar, (req, res) => {
    //#swagger.tags = ['Cliente']
    //#swagger.summary = 'Deletar um Cliente'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    ctrl.deletar(req, res);
});


export default router;