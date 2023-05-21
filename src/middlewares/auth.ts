import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(
    token,
    process.env.SECRET_KEY!,
    (err: VerifyErrors | null, decoded: any | undefined) => {
      if (err) {
        res.status(401).send({ message: 'Unauthorized!' });
        return;
      }
      req.userId = Number(decoded?._id);
      next();
    },
  );
}
