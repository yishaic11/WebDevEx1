import { Router } from "express";
import {
  getAllPosts,
  getPostById,
  getPostsBySenderId,
  createPost,
  deletePost,
  updatePost,
} from "../controllers/posts";

const router: Router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/sender/:id", getPostsBySenderId);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;