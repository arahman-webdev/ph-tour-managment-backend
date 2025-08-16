"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const auth_service_1 = require("./auth.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const setCookies_1 = require("../../utils/setCookies");
const usersTokens_1 = require("../../utils/usersTokens");
const env_1 = require("../../configue/env");
const passport_1 = __importDefault(require("passport"));
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
const credentialsLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("local", (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(user);
        try {
            if (err) {
                // ❌❌❌❌❌
                // throw new AppError(401, "Some error")
                // next(err)
                // return new AppError(401, err)
                // ✅✅✅✅
                // return next(err)
                // console.log("from err");
                return next(new AppError_1.default(401, err));
            }
            if (!user) {
                // console.log("from !user");
                // return new AppError(401, info.message)
                return next(new AppError_1.default(401, (info === null || info === void 0 ? void 0 : info.message) || "Authentication failed"));
            }
            // They are created in the auth.service.ts but this is coming from passport.ts and that's why it is being written here
            // Create access & refresh tokens
            const userToken = (0, usersTokens_1.createUserToken)(user);
            // We can hide password in 2 ways
            // One is deleted
            delete user.toObject().password;
            // the second is
            const _a = user.toObject(), { password: pass } = _a, userWithoutPassword = __rest(_a, ["password"]);
            (0, setCookies_1.setAuthCookie)(res, userToken);
            res.status(200).json({
                success: true,
                statusCode: http_status_codes_1.default.OK,
                message: "User Logged In Successfully",
                // They are created in the auth.service.ts but this is coming from passport.ts and that's why it is being written here
                data: {
                    accessToken: userToken.accessToken,
                    refreshToken: userToken.refreshToken,
                    user: userWithoutPassword
                }
            });
        }
        catch (error) {
            next(error);
        }
    }))(req, res, next); // << ✅ This is necessary to run the passport middleware
});
const getNewAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "No refresh token recieved from cookies");
        }
        // const tokenInfo = await authService.getNewAccessToken(refreshToken as string)
        const tokenInfo = yield auth_service_1.authService.getNewAccessToken(refreshToken);
        // res.cookie("refreshToken", tokenInfo, {
        //     httpOnly: true,
        //     secure: false
        // })
        (0, setCookies_1.setAuthCookie)(res, tokenInfo);
        res.status(200).json({
            success: true,
            statusCode: http_status_codes_1.default.OK,
            message: "User Logged In Successfully",
            data: tokenInfo,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
// logout only below and router.post('/logout', controler.logut)
const logoutUser = (req, res) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });
    res.status(http_status_codes_1.default.OK).json({
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "User logged out successfully",
        data: null
    });
};
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("request body", req.body);
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user;
    yield auth_service_1.authService.resetNewPassword(oldPassword, newPassword, decodedToken);
    res.status(http_status_codes_1.default.OK).json({
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Password Changed Successfully",
        data: null,
    });
});
const googleCallbackController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log(user);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    const tokenInfo = (0, usersTokens_1.createUserToken)(user);
    (0, setCookies_1.setAuthCookie)(res, tokenInfo);
    res.redirect(env_1.envVars.FRONTEND_URL);
});
exports.AuthControllers = {
    credentialsLogin,
    getNewAccessToken,
    logoutUser,
    resetPassword,
    googleCallbackController
};
