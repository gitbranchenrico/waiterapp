import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function createProduct(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename;
    const { category, name, description, ingredients, price } = req.body;

    const product = await Product.create({
      category,
      name,
      description,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
      price: Number(price),
      imagePath
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
