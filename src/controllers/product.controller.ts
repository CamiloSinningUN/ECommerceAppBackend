import { Product } from '@models';
import { Request, Response } from 'express';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({
      user: req.params.userId,
      name: { $regex: req.query.search, $options: 'i' },
      category: req.query.category,
      isActive: true,
    });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getProductCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Product.find({ user: req.params.userId }).distinct(
      'category',
    );
    res.send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true },
    );
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};
