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
      const req = { body: newOrder } as Request;
      const res = { json: jest.fn() } as unknown as Response;

      await orderController.createOrder(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining(newOrder));
    });

    it('should not create a new order with invalid data', async () => {
      const req = { body: {} } as Request;
      const res = { json: jest.fn() } as unknown as Response;

      await orderController.createOrder(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: 'Invalid data' }),
      );
    });
  });

  describe('Get orders', () => {
    it('should get all orders', async () => {
      const req = {} as Request;
      const res = { json: jest.fn() } as unknown as Response;

      await orderController.getOrders(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.arrayContaining(prevOrders));
    });

    // TODO - invalid
  });

  describe('Get order', () => {
    it('should get order by id', async () => {
      const req = { params: { id: insertedOrders[0]._id } };
      const res = { json: jest.fn() } as unknown as Response;

      await orderController.getOrder(req as any, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining(insertedOrders[0]),
      );
    });

    it('should not get order by invalid id', async () => {
      const req = { params: { id: 'invalid' } };
      const res = { json: jest.fn() } as unknown as Response;

      await orderController.getOrder(req as any, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: 'Invalid id' }),
      );
    });
  });

  describe('Update order', () => {
    it('should update order by id', async () => {
      const req = { params: { id: insertedOrders[0]._id }, body: newOrder };
      const res = { json: jest.fn() } as unknown as Response;

      await orderController.updateOrder(req as any, res);

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining(newOrder));
    });

    it('should not update order by invalid id', async () => {
      const req = { params: { id: 'invalid' }, body: newOrder };
      const res = { json: jest.fn() } as unknown as Response;

      await orderController.updateOrder(req as any, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: 'Invalid id' }),
      );
    });
  });
});
