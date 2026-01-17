export type CreateCommentDto = {
  content: string;
  postId: string;
  senderId: string;
};

export type UpdateCommentDto = {
  content: string;
};
