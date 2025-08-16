
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../configue/env";
import { IsActive, IUser } from "../modules/user/user.interface";

import { generateToken, verifyToken } from "./jwt";

import httpStatus from "http-status-codes"
import { User } from "../modules/user/user.model";
import AppError from "../errorHelper/AppError";
// export const createUserToken = (user: Partial<IUser>) =>{


//         const jwtPayload = {
//             userId: user._id,
//             userEmail: user.email,
//             userRole: user.role
//         }

//         // const accessToken = jwt.sign(jwtPayload, "secret", {expiresIn: "1d"})

//         const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_EXPIRATION);

//         const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRATION);

//         return {
//             accessToken,
//             refreshToken
//         }
// }


export const createUserToken = (user: Partial<IUser>) => {
    const jwtPayload = {
        userId: user._id,
        userEmail: user.email,
        userRole: user.role
    }


    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_EXPIRATION)

    const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRATION)


    return {
        accessToken,
        refreshToken
    }
}


export const createNewAccessTokenWithRefreshToken = async (refreshToken: string) => {

    const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as JwtPayload

    const isExistUser = await User.findOne({ email: verifiedRefreshToken.userEmail })

    if (!isExistUser) {
        throw new AppError(httpStatus.NOT_FOUND, "Usre not found")
    }

    if (isExistUser.isActive === IsActive.BLOCKED || isExistUser.isActive === IsActive.INACTIVE) {
        throw new AppError(httpStatus.BAD_REQUEST, `User is ${isExistUser.isActive}`)
    }

    if (isExistUser.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, `User is deleted`)
    }

    const jwtPayload = {
        userId: isExistUser._id,
        userEmail: isExistUser.email,
        userRole: isExistUser.role
    }

    const userAccessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_EXPIRATION)


    return userAccessToken
}




