import express from 'express'
import routerClientes from './routes/clienteRoute.js'
import routerProcedimento from './routes/procedimentoRoute.js'
import routerLogin from './routes/loginRoute.js'
import routerHorario from './routes/horarioRoute.js'
import routerAgenda from './routes/agendaRoute.js'
import swaggerUi from 'swagger-ui-express'
import cookieParser from 'cookie-parser'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");
const cors = require('cors');
import path from 'path';
import { fileURLToPath } from 'url';

// Definir __dirname 
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // Substitua pela origem do seu frontend
    credentials: true // Permite o envio de cookies e cabeçalhos de autorização
}));

// Middleware para servir arquivos estáticos 
app.use(express.static(path.join(__dirname, 'public')));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson))
app.use("/cliente", routerClientes);
app.use("/procedimento", routerProcedimento);
app.use("/horario", routerHorario);
app.use("/login", routerLogin);
app.use("/agenda", routerAgenda);

app.listen(5000, function() {
    console.log("servidor web em funcionamento!");
});