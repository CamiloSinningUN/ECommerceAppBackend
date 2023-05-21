import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  comparePassword: (password: string) => Promise<boolean>;
}
