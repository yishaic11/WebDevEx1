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

router.get("/all", getAllPosts);
router.get("/:id", getPostById);
router.get("/", getPostsBySenderId);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
