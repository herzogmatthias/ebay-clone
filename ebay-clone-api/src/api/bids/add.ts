import Express, { Request, Response } from "express";
import { addBid } from "../../db/EbayCloneDB";
import Bid from "../../interfaces/Bid";

const router = Express.Router({ mergeParams: true });

router.post("/", async (req: Request<{}, Bid>, res: Response) => {
  const { productName, price, date, supplierEmail } = req.body;
  try {
    const bid = await addBid(
      productName,
      req.email,
      price,
      supplierEmail,
      date
    );
    res.json({ bid, success: true });
  } catch (e) {
    res.status(500).json({ error: e, success: false });
  }
});

export default router;
