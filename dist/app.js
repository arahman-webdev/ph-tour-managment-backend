"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
/* eslint-disable no-unused-vars */
const express_1 = __importDefault(require("express"));
const uesr_router_1 = require("./app/modules/user/uesr.router");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const notFound_1 = require("./app/middleware/notFound");
const auth_router_1 = require("./app/modules/auth/auth.router");
const globalErrHandler_1 = require("./app/middleware/globalErrHandler");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
require("./app/configue/passport");
const tour_router_1 = require("./app/modules/tour/tour.router");
const division_router_1 = require("./app/modules/division/division.router");
const booking_router_1 = require("./app/modules/booking/booking.router");
exports.app = (0, express_1.default)();
exports.app.use((0, express_session_1.default)({
    secret: "my secret",
    resave: false,
    saveUninitialized: false
}));
exports.app.use(passport_1.default.initialize());
exports.app.use(passport_1.default.session());
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)());
exports.app.use('/api/v1/user/', uesr_router_1.UserRoutes);
exports.app.use('/api/v1/auth/', auth_router_1.authRoutes);
exports.app.use('/api/v1/tour/', tour_router_1.tourRoutes);
exports.app.use('/api/v1/division/', division_router_1.divisionRoutes);
exports.app.use('/api/v1/booking/', booking_router_1.BookingRoutes);
// app.use('/api/v1/user', UserRoutes)
exports.app.get('/', (req, res) => {
    res.json({
        message: 'Hi, world!'
    });
});
exports.app.use(globalErrHandler_1.globalErrorHandler);
exports.app.use(notFound_1.notFound);
