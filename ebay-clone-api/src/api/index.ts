import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import emojis from "./emojis";
import login from "./login";
import getAll from "./products/getAll";
import add from "./products/add";
import getAllForProduct from "./bids/getAllForProduct";
import addBid from "./bids/add";
import deleteByID from "./bids/deleteByID";
import getOne from "./products/getOne";
import deleteByName from "./products/deleteByName";
import { authenticateToken } from "../middlewares";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});
router.use("/emojis", emojis);
router.use("/login", login);

router.use("/products/add", authenticateToken, add);
router.use("/products/getAll", authenticateToken, getAll);
router.use("/products/getOne/:name", authenticateToken, getOne);
router.use("/products/deleteByName/:name", authenticateToken, deleteByName);

router.use("/bids/getAllForProduct", authenticateToken, getAllForProduct);
router.use("/bids/add", authenticateToken, addBid);
router.use("/bids/delete/:id", authenticateToken, deleteByID);

export default router;
