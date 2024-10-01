import express from 'express'
import routerClientes from './routes/clienteRoute.js'
import routerProcedimento from './routes/procedimentoRoute.js'
import routerAutenticacao from './routes/autenticacaoRoute.js'
import routerHorario from './routes/horarioRoute.js'
import swaggerUi from 'swagger-ui-express'
import cookieParser from 'cookie-parser'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors(cors({
    origin: 'http://localhost:3000', // Substitua pela origem do seu frontend
    credentials: true // Permite o envio de cookies e cabeçalhos de autorização
})));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson))
app.use("/cliente", routerClientes);
app.use("/procedimento", routerProcedimento);
app.use("/horario", routerHorario);
app.use("/auth", routerAutenticacao);

app.listen(5000, function() {
    console.log("servidor web em funcionamento!");
});