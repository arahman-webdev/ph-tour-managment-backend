/* eslint-disable @typescript-eslint/no-non-null-assertion */

// import {  IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs";
import AppError from "../../errorHelper/AppError";
import httpStatus from "http-status-codes"
import {  createNewAccessTokenWithRefreshToken} from "../../utils/usersTokens";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../configue/env";
import jwt from "jsonwebtoken"
import { IsActive } from "../user/user.interface";
import { sendEmail } from "../../utils/sendEmail";
// import { generateToken, verifyToken } from "../utils/jwt";
// import { envVars } from "../configue/env";
// import { JwtPayload } from "jsonwebtoken";
// import { NextFunction, Request, Response } from "express";




// const credentialsLoginService = async (payload: Partial<IUser>) => {
//     const { email, password } = payload;

//     const isExistUser = await User.findOne({ email })

//     if (!isExistUser) {
//         throw new Error("Email does not exist")
//     }

//     const isPasswordMatch = await bcryptjs.compare(password as string, isExistUser.password as string)

//     if (!isPasswordMatch) {
//         throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
//     }

//     // const jwtPayload = {
//     //     userId: isExistUser._id,
//     //     userEmail: isExistUser.email,
//     //     userRole: isExistUser.role
//     // }

//     // // const accessToken = jwt.sign(jwtPayload, "secret", {expiresIn: "1d"})

//     // const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_EXPIRATION);

//     // const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRATION);


//     const userToken = createUserToken(isExistUser)


//     // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
//     const { password: pass, ...rest } = isExistUser.toObject() // .toObject() is for (28-2 model) unneccessary coming data in the postman



//     return {
//         accessToken: userToken.accessToken,
//         refreshToken: userToken.refreshToken,
//         user: rest
//     }



// }


export const getNewAccessToken = async (refreshToken: string) => {
    // const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as JwtPayload

    // console.log("Decoded Refresh Token:", verifiedRefreshToken);
    // const isExistUser = await User.findOne({ email: verifiedRefreshToken.userEmail })

    // if (!isExistUser) {
    //     throw new AppError(httpStatus.BAD_REQUEST, "User does not exist")
    // }

    // if (isExistUser.isActive === IsActive.BLOCKED || isExistUser.isActive === IsActive.INACTIVE) {
    //     throw new AppError(httpStatus.BAD_REQUEST, `User is ${isExistUser.isActive}`)
    // }

    // if (isExistUser.isDeleted) {
    //     throw new AppError(httpStatus.BAD_REQUEST, "User is deleted")
    // }

    // const jwtPayload = {
    //     userId: isExistUser._id,
    //     userEmail: isExistUser.email,
    //     userRole: isExistUser.role
    // }

    // const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_EXPIRATION)

    // return accessToken

    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

   return {
    accessToken: newAccessToken
   }
    // const accessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

    // return accessToken


}


// const resetNewPassword = async( oldPassword: string, newPassword: string, decodedToken:JwtPayload)=>{

//     const user = await User.findById(decodedToken.userId)


//     if(!user){
//         throw new AppError(httpStatus.NOT_FOUND, "User does not exist")
//     }
    
//     const isOldPasswordMatch  = await bcryptjs.compare(oldPassword, user!.password as string)

//     if(!isOldPasswordMatch){
//         throw new AppError(httpStatus.BAD_REQUEST, "Old password does not match")
//     }

   

//     user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUNDS))

//    await user!.save()

//     return true
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resetPassword = async (payload: Record<string, any>, decodedToken: JwtPayload) => {
    if (payload.id != decodedToken.userId) {
        throw new AppError(401, "You can not reset your password")
    }




    console.log("from auth service",payload, decodedToken.uerId)

    const isUserExist = await User.findById(decodedToken.userId)
    if (!isUserExist) {
        throw new AppError(401, "User does not exist")
    }

    const hashedPassword = await bcryptjs.hash(
        payload.newPassword,
        Number(envVars.BCRYPT_SALT_ROUNDS)
    )

    isUserExist.password = hashedPassword;

    await isUserExist.save()
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODk3ZjAzNDFhYjk2NjVhNjUxNTMzNjMiLCJ1c2VyRW1haWwiOiJ1cHdvcmthYmR1cnJhaG1hbkBnbWFpbC5jb20iLCJ1c2VyUm9sZSI6IlVTRVIiLCJpYXQiOjE3NTQ4MDY3OTksImV4cCI6MTc1NDgwNzM5OX0.n58P24ZLlrHAOjaRjcCQkMf56Z0zrIIZKOmmJGhJ65k


const forgotPassword = async (email: string) => {
    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist")
    }
    if (!isUserExist.isVerified) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is not verified")
    }
    if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
        throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.isActive}`)
    }
    if (isUserExist.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is deleted")
    }

    const jwtPayload = {
        userId: isUserExist._id,
        userEmail: isUserExist.email,
        userRole: isUserExist.role
    }

    const resetToken = jwt.sign(jwtPayload, envVars.JWT_ACCESS_SECRET, {
        expiresIn: "10m"
    })

    const resetUILink = `${envVars.FRONTEND_URL}/reset-password?id=${isUserExist._id}&token=${resetToken}`

    sendEmail({
        to: isUserExist.email,
        subject: "Password Reset",
        templateName: "forgetPassword",
        templateData: {
            name: isUserExist.name,
            resetUILink
        }
    })
}

export const authService = {

    // credentialsLoginService,
    getNewAccessToken,
    resetPassword,
    forgotPassword
}

/**
 * They are for user registration 
 */