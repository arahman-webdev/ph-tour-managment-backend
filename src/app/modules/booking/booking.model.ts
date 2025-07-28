import { model, Schema } from "mongoose";
import { BOOKING_STATUS, IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tour: {
        type: Schema.Types.ObjectId,
        ref: "Tour",
        required: true
    },
    payment: {type: Schema.Types.ObjectId},
    guestCount: {type: Number, required: true},
    status: {type: String, default: BOOKING_STATUS.PENDING}
})

export const Booking = model<IBooking>('Booking', bookingSchema)