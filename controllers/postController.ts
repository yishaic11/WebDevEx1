import { Request, Response } from "express";
import Post, { IPost } from "../models/postModel";
import { CreatePostDto, UpdatePostDto } from "../dtos/post.dto";

export const createPost = async (
  req: Request,
  res: Response
): Promise<IPost> => {
  const postData: CreatePostDto = req.body;

  try {
    const post = await Post.create(postData);

    res.status(201).json(post);
    return post;
  } catch (error) {
    res.status(500).json({ error });
    throw error;
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response
): Promise<IPost[]> => {
  try {
    const posts = await Post.find();

    res.json(posts);
    return posts;
  } catch (error) {
    res.status(500).json({ error });
    throw error;
  }
};

export const getPostById = async (
  req: Request,
  res: Response
): Promise<IPost> => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id);
    if (!post) throw new Error(`Post not found for id: ${id}`);

    res.json(post);
    return post;
  } catch (error) {
    res.status(500).json({ error });
    throw error;
  }
};

export const getPostsBySenderId = async (
  req: Request,
  res: Response
): Promise<IPost[]> => {
  const senderId = req.params.id;

  try {
    const posts = await Post.find({ senderId });

    res.json(posts);
    return posts;
  } catch (error) {
    res.status(500).json({ error });
    throw error;
  }
};

export const updatePost = async (
  req: Request,
  res: Response
): Promise<IPost> => {
  const id = req.params.id;
  const updatedPostData: UpdatePostDto = req.body;

  try {
    const post = await Post.findByIdAndUpdate(id, updatedPostData, {
      new: true,
    });
    if (!post) throw new Error(`Post not found for id: ${id}`);

    res.json(post);
    return post;
  } catch (error) {
    res.status(500).json({ error });
    throw error;
  }
};

export const deletePost = async (
  req: Request,
  res: Response
): Promise<IPost> => {
  const id = req.params.id;

  try {
    // TODO: delete all connected comments
    const post = await Post.findByIdAndDelete(id);
    if (!post) throw new Error(`Post not found for id: ${id}`);

    res.send(post);
    return post;
  } catch (error) {
    res.status(500).json({ error });
    throw error;
  }
};