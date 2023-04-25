import Express from "express";
import { getAllProducts } from "../../db/EbayCloneDB";

const router = Express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.json(products);
});

export default router;
