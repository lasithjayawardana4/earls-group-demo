import mongoose, { Schema, Document } from "mongoose";

export interface IHotel extends Document {
  slug: string;
  name: string;
  location: string;
  description: string;
  longDescription: string;
  rating: number;
  startingPrice: number;
  images: string[];
  facilities: string[];
  nearbyAttractions: { name: string; distance: string; description: string }[];
  gallery: string[];
  reviews: { author: string; rating: number; comment: string; date: string }[];
  faqs: { question: string; answer: string }[];
  policies: string[];
  mapCoordinates: { lat: number; lng: number };
  featured: boolean;
}

const HotelSchema: Schema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    rating: { type: Number, default: 5 },
    startingPrice: { type: Number, required: true },
    images: [{ type: String }],
    facilities: [{ type: String }],
    nearbyAttractions: [
      {
        name: { type: String },
        distance: { type: String },
        description: { type: String },
      },
    ],
    gallery: [{ type: String }],
    reviews: [
      {
        author: { type: String },
        rating: { type: Number },
        comment: { type: String },
        date: { type: String },
      },
    ],
    faqs: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],
    policies: [{ type: String }],
    mapCoordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Hotel || mongoose.model<IHotel>("Hotel", HotelSchema);
