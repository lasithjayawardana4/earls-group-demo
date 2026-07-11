import mongoose, { Schema, Document } from "mongoose";

export interface IRoom extends Document {
  hotel: mongoose.Types.ObjectId;
  slug: string;
  name: string;
  description: string;
  size: string;
  bedType: string;
  occupancy: { adults: number; children: number };
  price: number;
  amenities: string[];
  images: string[];
}

const RoomSchema: Schema = new Schema(
  {
    hotel: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
    slug: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: String, required: true },
    bedType: { type: String, required: true },
    occupancy: {
      adults: { type: Number, required: true },
      children: { type: Number, required: true },
    },
    price: { type: Number, required: true },
    amenities: [{ type: String }],
    images: [{ type: String }],
  },
  { timestamps: true }
);

// Add unique index on hotel + slug combined
RoomSchema.index({ hotel: 1, slug: 1 }, { unique: true });

export default mongoose.models.Room || mongoose.model<IRoom>("Room", RoomSchema);
