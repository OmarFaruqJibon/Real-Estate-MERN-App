import express from "express";
import { adminLogIn, logIn } from "../controllers/check.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/login", verifyToken, logIn);
router.post("/admin-login", adminLogIn);


export default router;