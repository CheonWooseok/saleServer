import { Router } from "express";
import { getProductById } from "../../controllers/product.controller";

const router = Router();

router.get("/", getProductById);

export default router;
