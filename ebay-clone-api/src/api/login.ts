import express from "express";
import LoginRequest from "../interfaces/LoginRequest";
import LoginResponse from "../interfaces/LoginResponse";
import { findUser } from "../db/EbayCloneDB";
import MessageResponse from "../interfaces/MessageResponse";
import { generateAccessToken } from "../utils/generateAccessToken";

const router = express.Router();

router.post<LoginRequest, LoginResponse | MessageResponse>(
  "/",
  async (req, res) => {
    const { email, password } = req.body;
    const user = await findUser(email, password);
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
    } else {
      res.json({ token: generateAccessToken(user.email) });
    }
  }
);

export default router;
