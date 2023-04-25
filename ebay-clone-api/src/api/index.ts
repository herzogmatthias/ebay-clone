import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import emojis from "./emojis";
import login from "./login";
import getAll from "./products/getAll";
import add from "./products/add";
import getOne from "./products/getOne";
import { authenticateToken } from "../middlewares";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/login", login);
router.use("/products/add", authenticateToken, add);
router.use("/products/getAll", authenticateToken, getAll);
router.use("/emojis", emojis);
router.use("/products/getOne/:name", authenticateToken, getOne);

export default router;
