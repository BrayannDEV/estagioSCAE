import express from 'express'
import HorarioController from '../controllers/horarioController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

let ctrl = new HorarioController();
let auth = new AuthMiddleware();



export default router;