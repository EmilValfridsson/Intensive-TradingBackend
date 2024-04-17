import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

interface DecodedToken extends JwtPayload {
  userId: string;
}

export default function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["x-auth-token"] as string;

  if (!token) return res.status(401).send("No token provided");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(400).send("invalid token");
  }
}
