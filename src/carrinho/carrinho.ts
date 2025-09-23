import { Request, Response } from "express";
import { db } from "../database/banco-mongo.js";

class Carrinhos {
  async adicionar(req: Request, res: Response) {
    const carrinho = req.body;
    const resultado = await db.collection('carrinhos').insertOne(carrinho);
    res.status(201).json({ ...carrinho, _id: resultado.insertedId });
  }

  async listar(req: Request, res: Response) {
    const carrinhos = await db.collection('carrinhos').find().toArray();
    res.status(200).json(carrinhos);
  }
}

export default new Carrinhos();
