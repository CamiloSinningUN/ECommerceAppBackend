import { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  quantity: number;
  comment: string;
  rating: number;
  orderDate: Date;
}
