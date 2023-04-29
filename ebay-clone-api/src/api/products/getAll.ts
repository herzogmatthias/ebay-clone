import Express from "express";
import { getAllProducts, getLastPriceForProduct } from "../../db/EbayCloneDB";

const router = Express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();

  for (const product of products) {
    product.latestPrice = await getLastPriceForProduct(
      product.name,
      product.email
    );
  }

  res.json(products);
});

export default router;
