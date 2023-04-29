import Express, { Request, Response } from "express";
import { getLastPriceForProduct } from "../../db/EbayCloneDB";

const router = Express.Router({ mergeParams: true });

router.post(
  "/",
  async (
    req: Request<{}, { supplierEmail: string; productName: string }>,
    res: Response
  ) => {
    try {
      const { supplierEmail, productName } = req.body;
      const price = await getLastPriceForProduct(supplierEmail, productName);
      res.json({ price, success: true });
    } catch (e) {
      res.status(500).json({ error: e, success: false });
    }
  }
);

export default router;
