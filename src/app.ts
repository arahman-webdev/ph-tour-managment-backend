
/* eslint-disable no-unused-vars */
import express, { Request, Response } from "express"
import { UserRoutes } from "./app/user/uesr.router"
import cors from "cors"
import cookieParser from 'cookie-parser'
import { notFound } from "./app/middleware/notFound"
import { authRoutes } from "./app/auth/auth.router"
import { globalErrorHandler } from "./app/middleware/globalErrHandler"




export const app = express()

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use('/api/v1/user/', UserRoutes)
app.use('/api/v1/auth/', authRoutes)
// app.use('/api/v1/user', UserRoutes)



app.get('/', (req:Request, res:Response)=>{
    res.json({
        message: 'Hi, world!'
    })
})





app.use(globalErrorHandler)

app.use(notFound)