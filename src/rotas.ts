import { Router } from "express";

// Controllers
import usuarioController from "./usuarios/usuario.controller.js";
import carrinhoController from "./carrinho/carrinho.controller.js"; 
import produtosController from "./produtos/produtos.controller.js"; 
const rotas = Router();






// Rotas de usuários
rotas.post('/usuarios', usuarioController.adicionar);
rotas.get('/usuarios', usuarioController.listar);

// Rotas de carrinhos
rotas.post('/carrinho', carrinhoController.adicionar);
rotas.get('/carrinho', carrinhoController.listar);


// Rotas de produtos
rotas.post('/produtos', produtosController.adicionar);
rotas.get('/produtos', produtosController.listar);

export default rotas;
