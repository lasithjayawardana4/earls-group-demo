import mongoose, { Schema, Document } from "mongoose";

export interface IFAQ extends Document {
  question: string;
  answer: string;
  category: string;
}

const FAQSchema: Schema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, required: true, default: "General" },
  },
  { timestamps: true }
);

export default mongoose.models.FAQ || mongoose.model<IFAQ>("FAQ", FAQSchema);
