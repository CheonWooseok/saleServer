import { Request, Response, Router } from "express";
import { userAuth, userRegister } from "../controllers/user.controllers";

const router = Router();

router.post("/signup", userRegister);
router.post("/signin", userAuth);

export default router;
