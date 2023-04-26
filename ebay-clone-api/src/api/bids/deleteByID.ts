import Express, { Request, Response } from "express";
import { deleteBidByID } from "../../db/EbayCloneDB";

const router = Express.Router({ mergeParams: true });

router.delete("/", async (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;

  try {
    await deleteBidByID(id, req.email);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e, success: false });
  }
});

export default router;
