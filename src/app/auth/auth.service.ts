/* eslint-disable @typescript-eslint/no-non-null-assertion */

import {  IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs";
import AppError from "../errorHelper/AppError";
import httpStatus from "http-status-codes"
import {  createNewAccessTokenWithRefreshToken, createUserToken } from "../utils/usersTokens";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../configue/env";
// import { generateToken, verifyToken } from "../utils/jwt";
// import { envVars } from "../configue/env";
// import { JwtPayload } from "jsonwebtoken";
// import { NextFunction, Request, Response } from "express";




const credentialsLoginService = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const isExistUser = await User.findOne({ email })

    if (!isExistUser) {
        throw new Error("Email does not exist")
    }

    const isPasswordMatch = await bcryptjs.compare(password as string, isExistUser.password as string)

    if (!isPasswordMatch) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }

    // const jwtPayload = {
    //     userId: isExistUser._id,
    //     userEmail: isExistUser.email,
    //     userRole: isExistUser.role
    // }

    // // const accessToken = jwt.sign(jwtPayload, "secret", {expiresIn: "1d"})

    // const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_EXPIRATION);

    // const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRATION);


    const userToken = createUserToken(isExistUser)


    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password: pass, ...rest } = isExistUser.toObject()



    return {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user: rest

    }



}


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


const resetNewPassword = async( oldPassword: string, newPassword: string, decodedToken:JwtPayload)=>{

    const user = await User.findById(decodedToken.userId)

    
    const isOldPasswordMatch  = await bcryptjs.compare(oldPassword, user!.password as string)

    if(!isOldPasswordMatch){
        throw new AppError(httpStatus.BAD_REQUEST, "Old password does not match")
    }

   

    user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUNDS))

   

   

   await user!.save()

    return true
}


export const authService = {

    credentialsLoginService,
    getNewAccessToken,
    resetNewPassword
}