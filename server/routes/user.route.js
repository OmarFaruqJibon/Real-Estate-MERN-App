import express from "express";
import {
  deleteUser,
  getUsers,
  getUser,
  updateUser,
  profilePosts,
  getNotificationNumber,
  updateUserRole,
} from "../controllers/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import authorizeRole from "../middleware/authorizeRole.js";

const router = express.Router();

// router.get("/", verifyToken, authorizeRole(["ADMIN"]), getUsers);
router.get("/", verifyToken, getUsers);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/profilePosts", verifyToken, profilePosts);
router.get("/notification", verifyToken, getNotificationNumber);
router.put("/role/:id", verifyToken, authorizeRole(["ADMIN"]), updateUserRole);

router.get("/:id", verifyToken, getUser);

// router.post("/save", verifyToken, savePost);
export default router;
