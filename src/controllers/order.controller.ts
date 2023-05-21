import { Request, Response } from 'express';
import { Order } from '@models';
import { GetOrdersQueryParams } from '@interfaces/order';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send();
    }
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getOrders = async (
  req: Request<{}, {}, {}, GetOrdersQueryParams>,
  res: Response,
) => {
  try {
    const { userId, startDate, endDate } = req.query;
    const conditions = {
      user: userId,
      ...((startDate || endDate) && {
        orderDate: {
          ...(startDate && { $gte: new Date(startDate) }),
          ...(endDate && { $lte: new Date(endDate) }),
        },
      }),
    };

    const orders = await Order.find(conditions);
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['rating', 'comment'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      return res.status(404).send();
    }
    res.send(order);
  } catch (error) {
    res.status(400).send(error);
  }
};
