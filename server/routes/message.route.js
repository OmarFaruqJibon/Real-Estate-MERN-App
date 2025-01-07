import express from "express";
import {
    addMessages
} from "../controllers/message.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/:chatId", verifyToken, addMessages);

export default router;
