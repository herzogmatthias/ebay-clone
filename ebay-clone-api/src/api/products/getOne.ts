import Express, { Request } from "express";
import { getProductByName } from "../../db/EbayCloneDB";

const router = Express.Router({ mergeParams: true });

router.post("/", async (req: Request<{ name: string }>, res) => {
  console.log(req.params);
  const { supplierEmail } = req.body;
  const name = req.params.name;
  const product = await getProductByName(name, supplierEmail);
  res.json(product);
});

export default router;
