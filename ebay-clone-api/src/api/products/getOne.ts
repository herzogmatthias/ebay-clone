import Express, { Request } from "express";
import { getProductByName } from "../../db/EbayCloneDB";

const router = Express.Router({ mergeParams: true });

router.get("/", async (req: Request<{ name: string }>, res) => {
  console.log(req.params);
  const name = req.params.name;
  const product = await getProductByName(name, req.email);
  res.json(product);
});

export default router;
