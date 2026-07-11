import mongoose, { Schema, Document } from "mongoose";

export interface ISpa extends Document {
  name: string;
  description: string;
  duration: string;
  price: number;
  category: string;
  images: string[];
}

const SpaSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Spa || mongoose.model<ISpa>("Spa", SpaSchema);
