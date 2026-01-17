import { Router } from "express";
import {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  getCommentsByPostId,
} from "../controllers/comments";

const router: Router = Router();

router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.get("/post/:id", getCommentsByPostId);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
