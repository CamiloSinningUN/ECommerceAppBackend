import { testOrders } from '../utils';
import { orderController } from '@controllers';
import { Order } from '@models';
import { Request, Response } from 'express';

const [newOrder, ...prevOrders] = testOrders;
let insertedOrders: any[] = [];

describe('Order Controller', () => {
  beforeEach(async () => {
    jest.clearAllMocks();

    insertedOrders = await Order.insertMany(prevOrders);
  });

  afterEach(async () => {
    await Order.deleteMany({});
  });

  describe('Create order', () => {
    it('should create a new order', async () => {
      const req = {
        body: newOrder,
        userId: '5f8d0a7d8b0c0a2a1c9d4c9d',
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await orderController.createOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should not create a new order with invalid data', async () => {
      const req = { body: {}, userId: '5f8d0a7d8b0c0a2a1c9d4c9d' } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await orderController.createOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith();
    });
  });

  describe('Get orders', () => {
    it('should get all orders', async () => {
      const req = { userId: '5f8d0a7d8b0c0a2a1c9d4c9d', query: {} } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await orderController.getOrders(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should return 404 when empty', async () => {
      const req = {
        query: {
          userId: 'invalid',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await orderController.getOrders(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith();
    });
  });

  describe('Get order', () => {
    it('should get order by id', async () => {
      const req = {
        params: { id: insertedOrders[0]._id },
        userId: '5f8d0a7d8b0c0a2a1c9d4c9d',
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await orderController.getOrder(req as any, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should not get order by invalid id', async () => {
      const req = {
        params: { id: 'invalid' },
        userId: '5f8d0a7d8b0c0a2a1c9d4c9d',
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await orderController.getOrder(req as any, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith();
    });
  });

  describe('Update order', () => {
    it('should update order by id', async () => {
      const req = {
        params: { id: insertedOrders[0]._id },
        body: {
          rating: newOrder.rating,
          comment: newOrder.comment,
        },
        userId: '5f8d0a7d8b0c0a2a1c9d4c9d',
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await orderController.updateOrder(req as any, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should not update order by invalid id', async () => {
      const req = { params: { id: 'invalid' }, body: newOrder };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await orderController.updateOrder(req as any, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith();
    });
  });
});
