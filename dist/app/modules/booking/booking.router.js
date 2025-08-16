"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../../middleware/checkAuth");
const booking_controller_1 = require("./booking.controller");
const user_interface_1 = require("../user/user.interface");
const router = express_1.default.Router();
router.post('/create-booking', (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), booking_controller_1.bookingController.createBooking);
exports.BookingRoutes = router;
