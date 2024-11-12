import express from 'express'
import AuthMiddleware from '../middlewares/authMiddleware.js';
import AgendaController from '../controllers/agendaController.js';

const router = express.Router();

let ctrl = new AgendaController();
let auth = new AuthMiddleware();

router.get("/", (req, res) => {

    // #swagger.tags = ['Agenda']
    // #swagger.summary = 'Endpoint para retornar todos os Agendamentos'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    ctrl.listar(req, res);
});

export default router;