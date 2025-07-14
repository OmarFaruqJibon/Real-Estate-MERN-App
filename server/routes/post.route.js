import express from "express";
import {
    addPost,
    deletePost,
    getPost,
    getPosts,
    updatePost,
    updatePostStatus,
    getPostsByUser,
    getPostById,
} from "../controllers/post.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", verifyToken, addPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);
router.put("/status/:id", verifyToken, updatePostStatus);

router.get("/user/:userId", getPostsByUser); // TO GET USERS POST

router.get("/:id", getPostById);


export default router;