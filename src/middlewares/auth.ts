import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  console.log(token);
  jwt.verify(
    token.split(' ')[1],
    process.env.SECRET_KEY! || 'secret',
    (err: VerifyErrors | null, decoded: any | undefined) => {
      if (err) {
        console.log(err);
        res.status(401).send({ message: 'Unauthorized!' });
        return;
      }
      req.userId = decoded?._id;
      next();
    },
  );
}
