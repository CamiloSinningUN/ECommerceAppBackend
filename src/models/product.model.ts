import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  user: Schema.Types.ObjectId;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
}

export const productSchema = new Schema<IProduct>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
});

export const Product = model<IProduct>('Product', productSchema);
