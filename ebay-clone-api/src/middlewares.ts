import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import ErrorResponse from "./interfaces/ErrorResponse";

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.headers);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ message: "Unauthorized" });

  try {
    const payload: any = jwt.verify(token, process.env.SECRET as string);
    req.email = payload.email;
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
}
