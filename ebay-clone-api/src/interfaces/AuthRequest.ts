import { Request } from "express";

export default interface AuthRequest extends Request {
  email: string;
}
