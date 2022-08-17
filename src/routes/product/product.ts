import { Router } from "express";
import {
  getProductAll,
  getProductById,
  postProduct,
} from "../../controllers/product.controller";
import { verifyToken } from "../../middlewares/auth";
import { storeCheck } from "../../middlewares/permission.middleware";
import indexRouter from "./index";
import byIdRouter from "./byId";

const router = Router();

router.use("/", indexRouter);
router.use("/:productId", byIdRouter);

export default router;
