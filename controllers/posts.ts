import { Request, Response } from "express";
import Post, { IPost } from "../models/post";
import { CreatePostDto, UpdatePostDto } from "../dtos/post.dto";
import Comment from "../models/comment";

export const createPost = async (
  req: Request,
  res: Response,
): Promise<IPost> => {
  const newPostData: CreatePostDto = req.body;

  try {
    const createdPost = await Post.create(newPostData);

    res.status(201).json(createdPost);
    return createdPost;
  } catch (error) {
    res.status(500).json({
      message: `Failed to create post`,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response,
): Promise<IPost[]> => {
  try {
    const posts = await Post.find();

    res.json(posts);
    return posts;
  } catch (error) {
    res.status(500).json({
      message: `Failed to get all posts`,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
): Promise<IPost> => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id);
    if (!post) throw new Error(`Post not found for Id: ${id}`);

    res.json(post);
    return post;
  } catch (error) {
    res.status(500).json({
      message: `Failed to get post by Id: ${id}`,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
};

export const getPostsBySenderId = async (
  req: Request,
  res: Response,
): Promise<IPost[]> => {
  const { sender: senderId } = req.query;

  try {
    const posts = await Post.find({ senderId });

    res.json(posts);
    return posts;
  } catch (error) {
    res.status(500).json({
      message: `Failed to get posts by sender Id: ${senderId}`,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
): Promise<IPost> => {
  const id = req.params.id;
  const updatedPostData: UpdatePostDto = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, updatedPostData, {
      new: true,
    });
    if (!updatedPost) throw new Error(`Post not found for id: ${id}`);

    res.json(updatedPost);
    return updatedPost;
  } catch (error) {
    res.status(500).json({
      message: `Failed to update post with id: ${id}`,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
): Promise<IPost> => {
  const id = req.params.id;

  try {
    await Comment.deleteMany({ postId: id });

    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) throw new Error(`Post not found for id: ${id}`);

    res.send(deletedPost);
    return deletedPost;
  } catch (error) {
    res.status(500).json({
      message: `Failed to delete post with id: ${id}`,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
};
