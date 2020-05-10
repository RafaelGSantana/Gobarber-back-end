import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validação token JWT
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token is missing');
  }

  // Bearer token
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayLoad;

    return next();
  } catch {
    throw new Error('Invalid Token');
  }
}
