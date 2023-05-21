import { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { Mode } from 'fs';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  const user = this;

  return bcrypt.compare(password, user.password);
};

export const User = model<
  typeof userSchema & {
    comparePassword: typeof userSchema.methods.comparePassword;
  }
>('User', userSchema);
