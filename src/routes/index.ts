import { Router } from "express";
import signRoute from "./sign";

const router = Router();

router.use("/sign", signRoute);

export default router;
