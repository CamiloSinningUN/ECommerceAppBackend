import { Request, Response } from 'express';
import { Order } from '@models';
import { GetOrdersQueryParams } from 'src/shared/types/queries/orderQueries';
import { updateOrderBody } from '@shared/dto/order';

export const createOrder = async (req: Request, res: Response) => {
  try {
    if (!req.body.user || !req.body.product || !req.body.quantity) {
      return res.status(400).send();
    }

    if (req.body.user !== req.userId) {
      return res.status(403).send({
        message: 'User ID in token does not match user ID in request body.',
      });
    }

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

    if (order.user.toString() !== req.userId!) {
      return res
        .status(403)
        .send({ message: 'You do not have permission to view this order.' });
    }

    res.status(200).send(order);
  } catch (error) {
    if ((<Error>error).name === 'CastError') {
      return res.status(404).send();
    }
    res.status(500).send(error);
  }
};

export const getOrders = async (
  req: Request<{}, {}, {}, GetOrdersQueryParams>,
  res: Response,
) => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.userId!;
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

    if (!orders || orders.length === 0) {
      return res.status(404).send();
    }

    res.status(200).send(orders);
  } catch (error) {
    if ((<Error>error).name === 'CastError') {
      return res.status(404).send({
        message: 'Invalid product ID.',
      });
    }
    res.status(500).send(error);
  }
};

export const updateOrder = async (
  req: Request<any, any, updateOrderBody>,
  res: Response,
) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['rating', 'comment'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    return res.status(400).send();
  }

  const body = req.body;

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send();
    }

    if (order.user.toString() !== req.userId!) {
      return res.status(403).send({
        message: 'You do not have permission to update this order.',
      });
    }

    updates.forEach((update) => ((<any>order[update]) = body[update]));

    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};
