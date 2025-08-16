
/* eslint-disable no-unused-vars */
import express, { Request, Response } from "express"
import { UserRoutes } from "./app/modules/user/uesr.router"
import cors from "cors"
import cookieParser from 'cookie-parser'
import { notFound } from "./app/middleware/notFound"
import { authRoutes } from "./app/modules/auth/auth.router"
import { globalErrorHandler } from "./app/middleware/globalErrHandler"
import passport from "passport"
import expressSession from "express-session"
import "./app/configue/passport"
import { tourRoutes } from "./app/modules/tour/tour.router"
import { divisionRoutes } from "./app/modules/division/division.router"
import { BookingRoutes } from "./app/modules/booking/booking.router"
import { OtpRoutes } from "./app/modules/otp/otp.router"


export const app = express()

app.use(expressSession({
    secret: "my secret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))
app.use('/api/v1/user/', UserRoutes)
app.use('/api/v1/auth/', authRoutes)
app.use('/api/v1/otp/', OtpRoutes)
app.use('/api/v1/tour/', tourRoutes)
app.use('/api/v1/division/', divisionRoutes)
app.use('/api/v1/booking/' , BookingRoutes)

// app.use('/api/v1/user', UserRoutes)



app.get('/', (req:Request, res:Response)=>{
    res.json({
        message: 'Hi, world!'
    })
})





app.use(globalErrorHandler)

app.use(notFound)