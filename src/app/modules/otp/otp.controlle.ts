import { NextFunction, Request, Response } from "express";
import { OTPService } from "./otp.service";




const sendOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, name } = req.body;
         await OTPService.sendOTP(email, name)

        res.json({
            statusCode: 200,
            success: true,
            message: "OTP sent successfully",
            data: null,
        })
    } catch (error) {
        next(error)
    }
}


const verifyOTP = async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    await OTPService.verifyOTP(email, otp)
    res.json({
        statusCode: 200,
        success: true,
        message: "OTP verified successfully",
        data: null,
    });
}

export const OTPController = {
    sendOTP,
    verifyOTP
};