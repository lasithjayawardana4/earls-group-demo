import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  guestName: string;
  email: string;
  phone: string;
  hotel: mongoose.Types.ObjectId;
  room: mongoose.Types.ObjectId;
  adults: number;
  children: number;
  checkIn: Date;
  checkOut: Date;
  price: number;
  bookingStatus: "Pending" | "Confirmed" | "Cancelled";
  specialRequests?: string;
  promoCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    guestName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    hotel: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    adults: { type: Number, required: true, default: 1 },
    children: { type: Number, required: true, default: 0 },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    price: { type: Number, required: true },
    bookingStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Confirmed", // auto-confirm for demo
    },
    specialRequests: { type: String },
    promoCode: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
