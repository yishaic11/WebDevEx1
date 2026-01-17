import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  content: string;
  postId: mongoose.Types.ObjectId;
  senderId: string;
}

const commentSchema: Schema<IComment> = new mongoose.Schema({
  content: { type: String, required: true },
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  senderId: { type: String, required: true },
});

export default mongoose.model<IComment>("Comment", commentSchema);
