import { testApp } from '../utils';
import { Request, Response } from 'express';

jest.mock('@controllers/product.controller', () => {
  const mockFunctions: Record<string, jest.Mock> = {};

  const mockModule = jest.requireActual('@controllers/product.controller');

  Object.keys(mockModule).forEach((key) => {
    mockFunctions[key as string] = jest.fn((_req: Request, res: Response) => {
      res.send('Mocked product controller');
    });
  });

  return {
    ...mockFunctions,
  };
});

describe('Product routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Create product', () => {
    // test the POST /products route - success
    it('should return a success post message', async () => {
      const response = await testApp
        .post('/api/products')
        .set('Authorization', `Bearer ${process.env.TEST_USER_TOKEN}`)
        .send({
          user: 'test',
          name: 'test',
          category: 'test',
          description: 'test',
          rating: 5,
        })
        .expect(201);

      expect(response.text).toBe('Mocked product controller');
    });

    // test the POST /products route - failure
    it('should return a failure post message', async () => {
      const response = await testApp
        .post('/api/products')
        .send({
          user: 'test',
          name: 'test',
          category: 'test',
          description: 'test',
          rating: 5,
        })
        .expect(403);
    });
  });

  describe('Update product', () => {
    // test the PATCH /products route - success
    it('should return a success patch message', async () => {
      const response = await testApp
        .patch('/api/products/1')
        .set('Authorization', `Bearer ${process.env.TEST_USER_TOKEN}`)
        .send({
          user: 'test',
          name: 'test',
          category: 'test',
          description: 'test',
          rating: 5,
        })
        .expect(200);

      expect(response.text).toBe('Mocked product controller');
    });

    // test the PATCH /products route - failure
    it('should return a failure patch message', async () => {
      const response = await testApp
        .patch('/api/products/1')
        .send({
          user: 'test',
          name: 'test',
          category: 'test',
          description: 'test',
          rating: 5,
        })
        .expect(403);
    });
  });

  describe('Delete product', () => {
    // test the DELETE /products route - success
    it('should return a success delete message', async () => {
      const response = await testApp
        .delete('/api/products/1')
        .set('Authorization', `Bearer ${process.env.TEST_USER_TOKEN}`)
        .expect(200);

      expect(response.text).toBe('Mocked product controller');
    });

    // test the DELETE /products route - failure
    it('should return a failure delete message', async () => {
      const response = await testApp.delete('/api/products/1').expect(403);
    });
  });
});
