"use strict";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.getNewAccessToken = void 0;
// import {  IUser } from "../user/user.interface";
const user_model_1 = require("../user/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const usersTokens_1 = require("../../utils/usersTokens");
const env_1 = require("../../configue/env");
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
//     const { password: pass, ...rest } = isExistUser.toObject()
//     return {
//         accessToken: userToken.accessToken,
//         refreshToken: userToken.refreshToken,
//         user: rest
//     }
// }
const getNewAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
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
    const newAccessToken = yield (0, usersTokens_1.createNewAccessTokenWithRefreshToken)(refreshToken);
    return {
        accessToken: newAccessToken
    };
    // const accessToken = await createNewAccessTokenWithRefreshToken(refreshToken)
    // return accessToken
});
exports.getNewAccessToken = getNewAccessToken;
const resetNewPassword = (oldPassword, newPassword, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(decodedToken.userId);
    const isOldPasswordMatch = yield bcryptjs_1.default.compare(oldPassword, user.password);
    if (!isOldPasswordMatch) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Old password does not match");
    }
    user.password = yield bcryptjs_1.default.hash(newPassword, Number(env_1.envVars.BCRYPT_SALT_ROUNDS));
    yield user.save();
    return true;
});
exports.authService = {
    // credentialsLoginService,
    getNewAccessToken: exports.getNewAccessToken,
    resetNewPassword
};
