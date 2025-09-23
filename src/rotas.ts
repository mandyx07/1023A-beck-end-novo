import { Router } from "express";

// Controllers
import usuarioController from "./usuarios/usuario.controller.js";
import carrinhos from "./carrinho/carrinho.js"; 
import produtosController from "./produtos/produtos.controller.js"; 
const rotas = Router();

// Rotas de usuários
rotas.post('/usuarios', usuarioController.adicionar);
rotas.get('/usuarios', usuarioController.listar);

// Rotas de carrinhos
rotas.post('/carrinhos', carrinhos.adicionar);
rotas.get('/carrinhos', carrinhos.listar);

// Rotas de produtos
rotas.post('/produtos', produtosController.adicionar);
rotas.get('/produtos', produtosController.listar);

export default rotas;
