import { testApp } from '../utils';
import { Request, Response } from 'express';

jest.mock('@controllers/order.controller', () => {
  const mockFunctions: Record<string, jest.Mock> = {};

  const mockModule = jest.requireActual('@controllers/order.controller');

  Object.keys(mockModule).forEach((key) => {
    mockFunctions[key as string] = jest.fn((_req: Request, res: Response) => {
      res.send('Mocked order controller');
    });
  });

  return {
    ...mockFunctions,
  };
});

describe('Order routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Create order', () => {
    // test the POST /orders route - success
    it('should return a success post message', async () => {
      const response = await testApp
        .post('/api/orders')
        .set('Authorization', `Bearer ${process.env.TEST_USER_TOKEN}`)
        .send({
          user: 'test',
          product: 'test',
          quantity: 1,
          comment: 'test',
          rating: 1,
          orderDate: '2021-01-01',
        })
        .expect(201);

      expect(response.text).toBe('Mocked order controller');
    });

    // test the POST /orders route - failure
    it('should return a failure post message', async () => {
      const response = await testApp
        .post('/api/orders')
        .send({
          user: 'test',
          product: 'test',
          quantity: 1,
          comment: 'test',
          rating: 1,
          orderDate: '2021-01-01',
        })
        .expect(403);
    });
  });

  describe('Get order', () => {
    // test the GET /orders/:id route - success
    it('should return a success get message', async () => {
      const response = await testApp
        .get('/api/orders/1')
        .set('Authorization', `Bearer ${process.env.TEST_USER_TOKEN}`)
        .expect(200);

      expect(response.text).toBe('Mocked order controller');
    });

    // test the GET /orders/:id route - failure
    it('should return a failure get message', async () => {
      const response = await testApp.get('/api/orders/1').expect(403);
    });
  });

  describe('Get orders', () => {
    // test the GET /orders route - success
    it('should return a success get message', async () => {
      const response = await testApp
        .get('/api/orders')
        .set('Authorization', `Bearer ${process.env.TEST_USER_TOKEN}`)
        .expect(200);

      expect(response.text).toBe('Mocked order controller');
    });

    // test the GET /order route - failure
    it('should return a failure get message', async () => {
      const response = await testApp.get('/api/orders').expect(403);
    });
  });

  describe('Update order', () => {
    // test the PATCH /orders/:id route - success
    it('should return a success patch message', async () => {
      const response = await testApp
        .patch('/api/orders/1')
        .set('Authorization', `Bearer ${process.env.TEST_USER_TOKEN}`)
        .send({
          user: 'test',
          product: 'test',
          quantity: 1,
          comment: 'test',
          rating: 1,
          orderDate: '2021-01-01',
        })
        .expect(200);

      expect(response.text).toBe('Mocked order controller');
    });

    // test the PATCH /orders/:id route - failure
    it('should return a failure patch message', async () => {
      const response = await testApp
        .patch('/api/orders/1')
        .send({
          user: 'test',
          product: 'test',
          quantity: 1,
          comment: 'test',
          rating: 1,
          orderDate: '2021-01-01',
        })
        .expect(403);
    });
  });
});
