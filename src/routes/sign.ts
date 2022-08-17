import { Request, Response, Router } from "express";
import { userAuth, userRegister } from "../controllers/auth.controllers";
import response from "../modules/utils/response";

const router = Router();

router.post("/signup", userRegister, response);
router.post("/signin", userAuth, response);

export default router;
