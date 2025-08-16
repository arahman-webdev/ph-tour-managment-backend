"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const booking_service_1 = require("./booking.service");
const createBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = req.user;
        const booking = yield booking_service_1.bookingService.createBookingService(req.body, decodedToken.userId);
        console.log(booking);
        res.json({
            statusCode: 201,
            success: true,
            message: "Booking created successfully",
            data: booking,
        });
    }
    catch (error) {
        next(error);
    }
});
// const getBooking = async (req: Request, res: Response, next: NextFunction) => {
//     return {}
// }
// const getBookingById = async (req: Request, res: Response, next: NextFunction) => {
//     return {}
// }
exports.bookingController = {
    createBooking,
    // getBooking,
    // getBookingById
};
