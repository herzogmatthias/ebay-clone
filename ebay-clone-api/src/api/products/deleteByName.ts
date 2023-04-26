import Express, { Request } from "express";
import { deleteProductByName } from "../../db/EbayCloneDB";

const router = Express.Router({ mergeParams: true });

router.delete("/", async (req: Request<{ name: string }>, res) => {
  const name = req.params.name;

  try {
    await deleteProductByName(name, req.email);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e, success: false });
  }
});

export default router;
