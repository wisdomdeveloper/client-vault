import mongoose, { Document, models, Schema } from "mongoose";

export interface IFile extends Document {
  name: string;
  size: number;
  type: string;
  createdAt: Date;
}

const fileSchema = new Schema<IFile>(
  {
    name: { type: String, required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Files || mongoose.model<IFile>("Files", fileSchema);
