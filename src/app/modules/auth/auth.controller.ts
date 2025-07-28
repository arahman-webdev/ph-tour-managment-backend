/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import httpStatus from "http-status-codes"
import AppError from "../../errorHelper/AppError";
import { setAuthCookie } from "../../utils/setCookies";
import { JwtPayload } from "jsonwebtoken";
import { createUserToken } from "../../utils/usersTokens";
import { envVars } from "../../configue/env";
import passport from "passport";




// this is mannual login and it is coming from auth.service.ts
// const credentialsLogin = async (req: Request, res: Response, next: NextFunction) => {
//     try {

//         const loginInfo = await authService.credentialsLoginService(req.body)

//         // It will come from setCookies.ts

//         // res.cookie("refreshToken", loginInfo.refreshToken, {
//         //     httpOnly: true,
//         //     secure: false
//         // })

//         setAuthCookie(res, loginInfo)

//         res.status(200).json({
//             success: true,
//             statusCode: httpStatus.OK,
//             message: "User Logged In Successfully",
//             data: loginInfo,
//         })
//     } catch (error) {
//         console.log(error)
//         next(error)
//     }
// }

// This is passport js login service and it is coming from passport.ts
const credentialsLogin = async (req: Request, res: Response, next: NextFunction) => {

    passport.authenticate("local", async (err: any, user: any, info: any) => {

        console.log(user)

        try {
            if (err) {
                // ❌❌❌❌❌
                // throw new AppError(401, "Some error")
                // next(err)
                // return new AppError(401, err)

                // ✅✅✅✅
                // return next(err)
                // console.log("from err");
                return next(new AppError(401, err))
            }

            if (!user) {
                // console.log("from !user");
                // return new AppError(401, info.message)
                 return next(new AppError(401, info?.message || "Authentication failed"));
            }

            // They are created in the auth.service.ts but this is coming from passport.ts and that's why it is being written here
            // Create access & refresh tokens
            const userToken = createUserToken(user);

            // We can hide password in 2 ways

            // One is deleted

            delete user.toObject().password

            // the second is
            const { password: pass, ...userWithoutPassword } = user.toObject()

            setAuthCookie(res, userToken)

            res.status(200).json({
                success: true,
                statusCode: httpStatus.OK,
                message: "User Logged In Successfully",

                // They are created in the auth.service.ts but this is coming from passport.ts and that's why it is being written here
                data: {
                    accessToken: userToken.accessToken,
                    refreshToken: userToken.refreshToken,
                    user: userWithoutPassword
                }
            })
        } catch (error) {
            next(error)
        }

    })(req, res, next) // << ✅ This is necessary to run the passport middleware

}


const getNewAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            throw new AppError(httpStatus.BAD_REQUEST, "No refresh token recieved from cookies")
        }

        // const tokenInfo = await authService.getNewAccessToken(refreshToken as string)
        const tokenInfo = await authService.getNewAccessToken(refreshToken as string)



        // res.cookie("refreshToken", tokenInfo, {
        //     httpOnly: true,
        //     secure: false
        // })

        setAuthCookie(res, tokenInfo)

        res.status(200).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "User Logged In Successfully",
            data: tokenInfo,
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}


// logout only below and router.post('/logout', controler.logut)

const logoutUser = (req: Request, res: Response) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    })

    res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged out successfully",
        data: null
    })
}



const resetPassword = async (req: Request, res: Response, next: NextFunction) => {

    console.log("request body", req.body)

    const newPassword = req.body.newPassword
    const oldPassword = req.body.oldPassword
    const decodedToken = req.user;

    await authService.resetNewPassword(oldPassword, newPassword, decodedToken as JwtPayload)



    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: "Password Changed Successfully",
        data: null,
    })

}



const googleCallbackController = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    console.log(user)

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found")
    }

    const tokenInfo = createUserToken(user)

    setAuthCookie(res, tokenInfo)

    res.redirect(envVars.FRONTEND_URL)
}






export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken,
    logoutUser,
    resetPassword,
    googleCallbackController

}