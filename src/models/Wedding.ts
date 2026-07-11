import mongoose, { Schema, Document } from "mongoose";

export interface IWedding extends Document {
  venueName: string;
  capacity: string;
  price: number;
  description: string;
  images: string[];
  inclusions: string[];
}

const WeddingSchema: Schema = new Schema(
  {
    venueName: { type: String, required: true },
    capacity: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    inclusions: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Wedding || mongoose.model<IWedding>("Wedding", WeddingSchema);
