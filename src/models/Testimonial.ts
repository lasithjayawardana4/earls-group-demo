import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  role: string;
  hotelName: string;
  content: string;
  rating: number;
  avatar?: string;
}

const TestimonialSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    hotelName: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true, default: 5 },
    avatar: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
