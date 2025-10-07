import { Request, Response } from "express";
import { db } from "../database/banco-mongo.js";
import { ObjectId } from "mongodb";

interface ItemCarrinho {
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
  nome: string;
}

interface Carrinho {
  usuarioId: string;
  itens: ItemCarrinho[];
  dataAtualizacao: Date;
}

class CarrinhoController {
  async adicionar(req: Request, res: Response) {
    const { usuarioId, produtoId, quantidade, precoUnitario, nome } = req.body;

    let carrinho = await db.collection("carrinhos").findOne({ usuarioId });

    const item: ItemCarrinho = { produtoId, quantidade, precoUnitario, nome };

    if (!carrinho) {
      const novoCarrinho = {
        usuarioId,
        itens: [item],
        dataAtualizacao: new Date(),
      };

      await db.collection("carrinhos").insertOne(novoCarrinho);
      return res.status(201).json(novoCarrinho);
    } else {
      carrinho.itens.push(item);
      carrinho.dataAtualizacao = new Date();

      await db.collection("carrinhos").updateOne({ usuarioId }, { $set: carrinho });

      return res.status(200).json(carrinho);
    }
  }

  async listar(req: Request, res: Response) {
    const carrinhos = await db.collection("carrinhos").find().toArray();
    res.status(200).json(carrinhos);
  }

  async removerItem(req: Request, res: Response) {
    const { id } = req.params;
    const { produtoId } = req.body;

    if (!id) return res.status(400).json({ message: "ID do carrinho é obrigatório" });
    if (!produtoId) return res.status(400).json({ message: "ID do produto é obrigatório" });

    const filtro = ObjectId.isValid(id)
      ? { _id: new ObjectId(id) }
      : { _id: id as any };

    const carrinho = await db.collection("carrinhos").findOne(filtro);
    if (!carrinho) return res.status(404).json({ message: "Carrinho não encontrado" });

    const novosItens = carrinho.itens.filter((i: ItemCarrinho) => i.produtoId !== produtoId);

    if (novosItens.length === carrinho.itens.length) {
      return res.status(404).json({ message: "Produto não encontrado no carrinho" });
    }

    await db.collection("carrinhos").updateOne(filtro, {
      $set: { itens: novosItens, dataAtualizacao: new Date() },
    });

    res.status(200).json({
      message: "Produto removido com sucesso",
      carrinho: { ...carrinho, itens: novosItens },
    });
  }

  async atualizarQuantidade(req: Request, res: Response) {
    const { id } = req.params;
    const { produtoId, quantidade } = req.body;
    if (!id) return res.status(400).json({ message: "ID é obrigatório" });

    const filtro = ObjectId.isValid(id)
      ? { _id: new ObjectId(id) }
      : { _id: id as any };

    const carrinho = await db.collection("carrinhos").findOne(filtro);
    if (!carrinho) return res.status(404).json({ message: "Carrinho não encontrado" });

    const item = carrinho.itens.find((i: ItemCarrinho) => i.produtoId === produtoId);
    if (!item) return res.status(404).json({ message: "Produto não encontrado no carrinho" });

    item.quantidade = quantidade;
    carrinho.dataAtualizacao = new Date();

    await db.collection("carrinhos").updateOne(filtro, { $set: carrinho });

    res.status(200).json({ message: "Quantidade atualizada com sucesso", carrinho });
  }

  async remover(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "ID é obrigatório" });

    const filtro = ObjectId.isValid(id)
      ? { _id: new ObjectId(id) }
      : { _id: id as any };

    const resultado = await db.collection("carrinhos").deleteOne(filtro);

    if (resultado.deletedCount === 0)
      return res.status(404).json({ message: "Carrinho não encontrado" });

    res.status(200).json({ message: "Carrinho removido com sucesso" });
  }
}

export default new CarrinhoController();