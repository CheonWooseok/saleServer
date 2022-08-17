import { Router } from "express";
import { getAllPaymentHistory } from "../controllers/payment.controller";
import { adminCheck } from "../middlewares/permission.middleware";

const router = Router();

router.get("/history", adminCheck, getAllPaymentHistory);

router.post("/");

export default router;
