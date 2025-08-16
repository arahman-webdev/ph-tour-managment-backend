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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewAccessTokenWithRefreshToken = exports.createUserToken = void 0;
const env_1 = require("../configue/env");
const user_interface_1 = require("../modules/user/user.interface");
const jwt_1 = require("./jwt");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_model_1 = require("../modules/user/user.model");
const AppError_1 = __importDefault(require("../errorHelper/AppError"));
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
const createUserToken = (user) => {
    const jwtPayload = {
        userId: user._id,
        userEmail: user.email,
        userRole: user.role
    };
    const accessToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVars.JWT_ACCESS_SECRET, env_1.envVars.JWT_EXPIRATION);
    const refreshToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVars.JWT_REFRESH_SECRET, env_1.envVars.JWT_REFRESH_EXPIRATION);
    return {
        accessToken,
        refreshToken
    };
};
exports.createUserToken = createUserToken;
const createNewAccessTokenWithRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedRefreshToken = (0, jwt_1.verifyToken)(refreshToken, env_1.envVars.JWT_REFRESH_SECRET);
    const isExistUser = yield user_model_1.User.findOne({ email: verifiedRefreshToken.userEmail });
    if (!isExistUser) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Usre not found");
    }
    if (isExistUser.isActive === user_interface_1.IsActive.BLOCKED || isExistUser.isActive === user_interface_1.IsActive.INACTIVE) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `User is ${isExistUser.isActive}`);
    }
    if (isExistUser.isDeleted) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `User is deleted`);
    }
    const jwtPayload = {
        userId: isExistUser._id,
        userEmail: isExistUser.email,
        userRole: isExistUser.role
    };
    const userAccessToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVars.JWT_ACCESS_SECRET, env_1.envVars.JWT_EXPIRATION);
    return userAccessToken;
});
exports.createNewAccessTokenWithRefreshToken = createNewAccessTokenWithRefreshToken;
