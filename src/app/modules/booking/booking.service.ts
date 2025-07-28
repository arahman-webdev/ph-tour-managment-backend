/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errorHelper/AppError";
import { User } from "../user/user.model";
import { IBooking } from "./booking.interface";
import httpStatus from "http-status-codes"
import { Booking } from "./booking.model";
import { Payment } from "../payment/payment.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Tour } from "../tour/tour.model";
import { ISslCommerz } from "../sslCommerz/sslCommerz.interface";
import { sslCommerzService } from "../sslCommerz/sllCommerz.service";

const getTransactionId = () => {
    return `tran_${Date.now()}_${Math.floor(Math.random() * 1000)}`
}

const createBookingService = async (payload: Partial<IBooking>, userId: string) => {

    const transactionId = getTransactionId()

    const session = await Booking.startSession();

    session.startTransaction()

    console.log(payload)


    try {
        const user = await User.findById(userId)

        if (!user?.phone || !user?.address) { throw new AppError(httpStatus.BAD_REQUEST, "Please Update Your Profile to Book a Tour") }


        const tour = await Tour.findById(payload.tour).select("costFrom")

        console.log(tour)

        if (!tour?.costFrom) {
            throw new AppError(httpStatus.BAD_REQUEST, "No Tour Cost Found!")
        }

        const amount = Number(tour.costFrom) * Number(payload.guestCount)



        const booking = await Booking.create([{
            user: userId,
            ...payload
        }], { session })

        const payment = await Payment.create([{
            booking: booking[0]._id,
            status: PAYMENT_STATUS.UNPAID,
            transactionId: transactionId,
            amount: amount
        }], { session })

        const updatedBooking = await Booking.
            findByIdAndUpdate(
                booking[0]._id,
                { payment: payment[0]._id },
                { new: true, runValidators: true, session }
            )
            .populate("user", "name email phone address")
            .populate("tour", "title costFrom")
            .populate("payment")

        const userAddress = (updatedBooking?.user as any).address
        const userEmail = (updatedBooking?.user as any).email
        const userPhoneNumber = (updatedBooking?.user as any).phone
        const userName = (updatedBooking?.user as any).name

        const sslPayload: ISslCommerz = {
            address: userAddress,
            email: userEmail,
            phone: userPhoneNumber,
            name: userName,
            transactionId: transactionId,
            amount: amount
        }

        const sslPayment = await sslCommerzService.sslPaymentInit(sslPayload)

        console.log(sslPayment)

        await session.commitTransaction()
        session.endSession()

        return {
            updatedBooking,
            sslPayment

        }
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        throw error
    }

}


const getBooking = async () => {

    return {}
}

const getBookingById = async () => {

    return {}
}



export const bookingService = {
    createBookingService,
    getBooking,
    getBookingById
}