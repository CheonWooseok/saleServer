import { Router } from "express";
import {
  getProductAll,
  postProduct,
} from "../../controllers/product.controller";
import { storeCheck } from "../../middlewares/permission.middleware";

const router = Router();

router.get("/", getProductAll);
router.post("/", storeCheck, postProduct);

export default router;
