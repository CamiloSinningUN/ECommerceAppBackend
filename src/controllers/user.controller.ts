import { Request, Response } from 'express';
import { User } from '@models';
import jwt from 'jsonwebtoken';

export const createUser = async (req: Request, res: Response) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.name) {
      return res.status(400).send();
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    if ((<Error>error).name === 'CastError') {
      return res.status(404).send();
    }

    res.status(500).send(error);
  }
};

export const getUserToken = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).send();
    }

    const isPasswordMatch = await user.comparePassword(req.body.password);
    if (!isPasswordMatch) {
      return res.status(402).send();
    }
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.SECRET_KEY!,
    );
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const updates = Object.keys(req.body) as string[];
  const allowedUpdates = ['email', 'password', 'name'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const userId = req.params.id;
    const userTokenId = req.userId!;
    if (userId !== userTokenId) {
      return res.status(401).send();
    }

    const user = User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send();
    }

    res.status(200).send(user);
  } catch (error) {
    if ((<Error>error).name === 'CastError') {
      return res.status(404).send();
    }
    res.status(400).send(error);
  }
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const userId = req.params.id;
    const userTokenId = req.userId!;
    if (userId !== userTokenId) {
      return res.status(401).send();
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send();
    }

    await user.delete();
    res.status(200).send(user);
  } catch (error) {
    console.error(error);

    if ((<Error>error).name === 'CastError') {
      return res.status(404).send();
    }
    res.status(500).send(error);
  }
};
