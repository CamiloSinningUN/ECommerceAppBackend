import { Schema, model, Document } from 'mongoose';

export interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  quantity: number;
  comment: string;
  rating: number;
  orderDate: Date;
}

export const orderSchema = new Schema<IOrder>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

export const Order = model<IOrder>('Order', orderSchema);
