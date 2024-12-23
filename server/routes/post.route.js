import express from 'express';
import { singlePost } from '../controllers/post.controller.js';

const router = express.Router();


// router.post("/singlePost", singlePost);
router.get("/", singlePost);

export default router;