import usuarioController from "./usuarios/usuario.controller";
import { Router } from "express";

const rotas = Router();
//criando rotas para o usiario
rotas.post('/usuarios', usuarioController.adicionar);
rotas.get('/usuarios', usuarioController.listar);

//ainda vamos ter que criar as rotas para carrinho e produtos
//tarefa para casa
export default rotas;