import { Request, Response } from "express";
import Comment, { IComment } from "../models/comment";
import { CreateCommentDto, UpdateCommentDto } from "../dtos/comment.dto";

export const createComment = async (
  req: Request,
  res: Response,
): Promise<IComment> => {
  const newCommentData: CreateCommentDto = req.body;
  try {
    // TODO: Check that post with provided postId exists

    const comment = await Comment.create(newCommentData);

    res.status(201).json(comment);
    return comment;
  } catch (error) {
    res.status(500).json({
      message: `Failed to create comment with data: ${JSON.stringify(
        newCommentData,
      )}`,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
};

export const getAllComments = async (
  req: Request,
  res: Response,
): Promise<IComment[]> => {
  try {
    const comments = await Comment.find();

    res.json(comments);
    return comments;
  } catch (err) {
    res.status(500).json({
      message: `Failed to get all comments`,
      error: err instanceof Error ? err.message : String(err),
    });
    throw err;
  }
};

export const getCommentById = async (
  req: Request,
  res: Response,
): Promise<IComment> => {
  const id = req.params.id;
  try {
    const comment = await Comment.findById(id);
    if (!comment) throw new Error(`Comment not found for id: ${id}`);

    res.json(comment);
    return comment;
  } catch (error) {
    res.status(500).json({
      message: `Failed to get comment with id: ${id}`,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
};

export const getCommentsByPostId = async (
  req: Request,
  res: Response,
): Promise<IComment[]> => {
  const postId = req.params.id;
  try {
    // TODO: Check that post with provided postId exists

    const comments = await Comment.find({ postId });

    res.json(comments);
    return comments;
  } catch (error) {
    res.status(500).json({
      message: `Failed to get comments for post with id: ${postId}`,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
};

export const updateComment = async (
  req: Request,
  res: Response,
): Promise<IComment> => {
  const id = req.params.id;
  const updatedCommentData: UpdateCommentDto = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      updatedCommentData,
      { new: true },
    );
    if (!updatedComment) throw new Error(`Comment not found for id: ${id}`);

    res.json(updatedComment);
    return updatedComment;
  } catch (error) {
    res.status(500).json({
      message: `Failed to update comment with id ${id} using data: ${JSON.stringify(
        updatedCommentData,
      )}`,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
): Promise<IComment> => {
  const id = req.params.id;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) throw new Error(`Comment not found for id: ${id}`);

    res.send(deletedComment);
    return deletedComment;
  } catch (err) {
    res.status(500).json({
      message: `Failed to delete comment with id: ${id}`,
      error: err instanceof Error ? err.message : String(err),
    });
    throw err;
  }
};
