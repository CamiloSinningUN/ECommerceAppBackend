import { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  user: Schema.Types.ObjectId;
  name: string;
  category: string;
  description: string;
}
