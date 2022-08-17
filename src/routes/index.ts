import { Router } from "express";
import signRouter from "./sign";
import productRouter from "./product/product";
import { verifyToken } from "../middlewares/auth";
import paymentRouter from "./payment";

const router = Router();

router.use("/sign", signRouter);
router.use("/product", verifyToken, productRouter);
router.use("/payment", verifyToken, paymentRouter);

export default router;
