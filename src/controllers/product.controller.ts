import { Product } from '@models';
import { getProductCategoriesParams } from '@shared/types/params/productParams';
import { GetProductsQueryParams } from '@shared/types/queries/productQueries';
import { Request, Response } from 'express';

export const createProduct = async (req: Request, res: Response) => {
  try {
    if (
      !req.body.user ||
      !req.body.name ||
      !req.body.price ||
      !req.body.description ||
      !req.body.category
    ) {
      return res.status(400).send();
    }

    if (req.body.user !== req.userId) {
      return res.status(403).send({
        message: 'User ID in token does not match user ID in request body.',
      });
    }

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
    res.status(200).send(product);
  } catch (error) {
    if ((<Error>error).name === 'CastError') {
      return res.status(404).send();
    }

    res.status(500).send(error);
  }
};

export const getProducts = async (
  req: Request<any, any, any, GetProductsQueryParams>,
  res: Response,
) => {
  // - ussing aggregate to get the products
  // - the products also must be ordered by rating

  try {
    const { userId, search, category } = req.query;
    const conditions = {
      ...(userId && { user: userId }),
      ...((search || category) && {
        $or: [
          ...((category && [{ category }]) || []),
          ...((search && [{ name: { $regex: search, $options: 'i' } }]) || []),
        ],
      }),
      deleted: false,
    };

    const products = await Product.aggregate([
      { $match: conditions },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          category: 1,
          rating: 1,
        },
      },
      {
        $sort: {
          rating: -1,
        },
      },
    ]);

    if (!products || products.length === 0) {
      return res.status(404).send();
    }

    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getProductCategories = async (
  req: Request<getProductCategoriesParams>,
  res: Response,
) => {
  try {
    const categories = await Product.find({ user: req.params.userId }).distinct(
      'category',
    );

    if (!categories || categories.length === 0) {
      return res.status(404).send();
    }

    res.status(200).send(categories);
  } catch (error) {
    if ((<Error>error).name === 'CastError') {
      return res.status(404).send();
    }

    console.error(error);
    res.status(500).send(error);
  }
};

export const updateProduct = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send();
    }
    if (product.user.toString() !== req.userId!) {
      return res.status(403).send({
        message: 'You do not have permission to update this product.',
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).send(updatedProduct);
  } catch (error) {
    if ((<Error>error).name === 'CastError') {
      return res.status(404).send();
    }

    res.status(400).send(error);
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send();
    }

    if (product.user.toString() !== req.userId!) {
      return res.status(403).send({
        message: 'You do not have permission to delete this product.',
      });
    }

    product.delete();

    res.status(200).send(product);
  } catch (error) {
    if ((<Error>error).name === 'CastError') {
      return res.status(404).send();
    }
    // DocumentNotFoundError
    if ((<Error>error).name === 'DocumentNotFoundError') {
      return res.status(404).send();
    }

    res.status(500).send(error);
  }
};
