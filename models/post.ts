import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  content: string;
  senderId: string;
}

const postSchema: Schema<IPost> = new mongoose.Schema({
  content: { type: String, required: true },
  senderId: { type: String, required: true },
});

export default mongoose.model<IPost>("Post", postSchema);