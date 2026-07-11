import mongoose, { Schema, Document } from "mongoose";

export interface IGallery extends Document {
  title: string;
  type: "image" | "video" | "360";
  url: string;
  category: string;
}

const GallerySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["image", "video", "360"], required: true },
    url: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model<IGallery>("Gallery", GallerySchema);
