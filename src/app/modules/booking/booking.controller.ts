import { NextFunction, Request, Response } from "express";

import { JwtPayload } from "jsonwebtoken";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const decodedToken = req.user as JwtPayload
        const booking = await bookingService.createBookingService(req.body, decodedToken.userId)
        console.log(booking)

        res.json({
            statusCode: 201,
            success: true,
            message: "Booking created successfully",
            data: booking,
        })

    } catch (error) {
        next(error)
    }
}


const getBooking = async (req: Request, res: Response, next: NextFunction) => {

    return {}
}

const getBookingById = async (req: Request, res: Response, next: NextFunction) => {

    return {}
}

export const bookingController = {
    createBooking,
    getBooking,
    getBookingById
}