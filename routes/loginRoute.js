import express from 'express';
import LoginController from '../controllers/loginController.js';

const router = express.Router();

let ctrl = new LoginController();
router.post("/", (req, res) => {
    // #swagger.tags = ['Login']
    ctrl.token(req, res);
});

export default router;