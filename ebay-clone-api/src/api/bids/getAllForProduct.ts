import Express, { Request, Response } from "express";
import { getAllBidsForProduct } from "../../db/EbayCloneDB";

const router = Express.Router({ mergeParams: true });

router.get(
  "/",
  async (
    req: Request<{}, { supplierEmail: string; productName: string }>,
    res: Response
  ) => {
    try {
      const { supplierEmail, productName } = req.body;
      const bids = await getAllBidsForProduct(productName, supplierEmail);
      res.json({ bids, success: true });
    } catch (e) {
      res.status(500).json({ error: e, success: false });
    }
  }
);

export default router;
