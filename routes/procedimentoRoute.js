import express from 'express'
import AuthMiddleware from '../middlewares/authMiddleware.js';
import ProcedimentoController from '../controllers/procedimentoController.js';

const router = express.Router();

let ctrl = new ProcedimentoController();
let auth = new AuthMiddleware();

router.get("/", auth.validar, (req, res) => {

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

export default router;