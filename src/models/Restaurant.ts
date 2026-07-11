import mongoose, { Schema, Document } from "mongoose";

export interface IRestaurant extends Document {
  hotel: mongoose.Types.ObjectId;
  name: string;
  description: string;
  cuisine: string;
  openingHours: string;
  chefName: string;
  chefBio: string;
  chefImage: string;
  images: string[];
  menu: {
    category: string;
    items: { name: string; price: string; description: string }[];
  }[];
}

const RestaurantSchema: Schema = new Schema(
  {
    hotel: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    cuisine: { type: String, required: true },
    openingHours: { type: String, required: true },
    chefName: { type: String, required: true },
    chefBio: { type: String, required: true },
    chefImage: { type: String },
    images: [{ type: String }],
    menu: [
      {
        category: { type: String },
        items: [
          {
            name: { type: String },
            price: { type: String },
            description: { type: String },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Restaurant || mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);
