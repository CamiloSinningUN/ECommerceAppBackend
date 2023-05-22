import { testProducts } from '../utils';
import { productController } from '@controllers';
import { Product } from '@models';
import { Request, Response } from 'express';

const [newProduct, ...prevProducts] = testProducts;
let insertedProducts: any[] = [];

describe('Product controller', () => {
  beforeEach(async () => {
    jest.clearAllMocks();

    insertedProducts = await Product.insertMany(prevProducts);
  });

  afterEach(async () => {
    await Product.deleteMany({});
  });

  describe('Create product', () => {
    it('should create a product', async () => {
      const req = {
        body: newProduct,
        userId: '5f8d0a7d8b0c0a2a1c9d4c9d',
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await productController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should not create a product with invalid data', async () => {
      const req = {
        body: {},
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await productController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith();
    });
  });

  describe('Get product', () => {
    it('should get a product', async () => {
      const req = {
        params: {
          id: insertedProducts[0]._id,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await productController.getProduct(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should not get a product with invalid id', async () => {
      const req = {
        params: {
          id: '5f8d0a7d8b0c0a2a1c9d4c9d',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await productController.getProduct(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith();
    });
  });

  describe('Get products', () => {
    it('should get products', async () => {
      const req = {
        query: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await productController.getProducts(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.any(Object));
    });

    // TODO - el invalido
  });

  describe('Update product', () => {
    it('should update a product', async () => {
      const req = {
        params: {
          id: insertedProducts[0]._id,
        },
        body: {
          name: 'test',
          price: 123,
        },
        userId: '5f8d0a7d8b0c0a2a1c9d4c9d',
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await productController.updateProduct(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should not update a product with invalid id', async () => {
      const req = {
        params: {
          id: '5fed0a7d8b0c0a2a1c9d4c9d',
        },
        body: {
          name: 'test',
          price: 123,
        },
        userId: '5f8d0a7d8b0c0a2a1c9d4c9d',
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await productController.updateProduct(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith();
    });
  });

  describe('Delete product', () => {
    it('should delete a product', async () => {
      const req = {
        params: {
          id: insertedProducts[0]._id,
        },
        userId: '5f8d0a7d8b0c0a2a1c9d4c9d',
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await productController.deleteProduct(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should not delete a product with invalid id', async () => {
      const req = {
        params: {
          id: '5f8e0a7d8b0c0a2a1c9d4c9d',
        },
        userId: '5f8d0a7d8b0c0a2a1c9d4c9d',
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await productController.deleteProduct(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith();
    });
  });
});
