import express from "express"
import { checkAuth } from "../../middleware/checkAuth"
import { bookingController } from "./booking.controller"
import { Role } from "../user/user.interface"

const router = express.Router()


router.post('/create-booking', checkAuth(...Object.values(Role)), bookingController.createBooking)


export const BookingRoutes = router