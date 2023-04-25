import express, { Request, Response } from "express";
import Product from "../../interfaces/Product";
import { insertProductForUser } from "../../db/EbayCloneDB";

const router = express.Router();

router.post("/", async (req: Request<{}, Product>, res: Response<Product>) => {
  const { name, description, price, image, startDate, endDate } = req.body;
  const product = await insertProductForUser(
    name,
    description,
    price,
    image,
    startDate,
    endDate,
    req.email
  );
  res.json(product);
});

export default router;
