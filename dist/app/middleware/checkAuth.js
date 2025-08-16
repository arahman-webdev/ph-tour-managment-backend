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
exports.checkAuth = void 0;
const AppError_1 = __importDefault(require("../errorHelper/AppError"));
const jwt_1 = require("../utils/jwt");
const env_1 = require("../configue/env");
const user_model_1 = require("../modules/user/user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_interface_1 = require("../modules/user/user.interface");
// export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const token = req.headers.authorization;
//         if (!token) {
//             throw new AppError(403, "No token recieved")
//         }
//         const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload
//         // const verifiedToken = jwt.verify(token as string, "secret")
//         // if((verifiedToken as JwtPayload).userRole !== Role.ADMIN){
//         //     throw new Error("You are not permitted to view them")
//         // }
//         const isUserExist = await User.findOne({ email: verifiedToken.userEmail })
//         if (!isUserExist) {
//             throw new AppError(httpStatus.BAD_REQUEST, "User does not exist")
//         }
//         if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
//             throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.isActive}`)
//         }
//         if (isUserExist.isDeleted) {
//             throw new AppError(httpStatus.BAD_REQUEST, "User is deleted")
//         }
//         if (!authRoles.includes(verifiedToken.userRole)) {
//             throw new AppError(403, "You are not permitted to view this route!!!")
//         }
//         console.log(verifiedToken);
//         console.log("✅ Decoded Token:", verifiedToken);
//         console.log("✅ Required Roles:", authRoles);
//         // ✅ Attach the token payload to req.user
//         req.user = verifiedToken;
//         next()
//     } catch (error) {
//         console.log(error)
//         next(error)
//     }
// }
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.default(403, "No token received");
        }
        const verifiedToken = (0, jwt_1.verifyToken)(token, env_1.envVars.JWT_ACCESS_SECRET);
        // console.log("✅ Decoded Token:", verifiedToken);
        // console.log("✅ Required Roles:", authRoles);
        const isUserExist = yield user_model_1.User.findOne({ email: verifiedToken.userEmail });
        if (!isUserExist) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User does not exist");
        }
        if (isUserExist.isActive === user_interface_1.IsActive.BLOCKED || isUserExist.isActive === user_interface_1.IsActive.INACTIVE) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `User is ${isUserExist.isActive}`);
        }
        if (isUserExist.isDeleted) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User is deleted");
        }
        if (!authRoles.includes(verifiedToken.userRole)) {
            throw new AppError_1.default(403, "You are not permitted to view this route!!!");
        }
        req.user = verifiedToken;
        next();
    }
    catch (error) {
        console.log("❌ Auth error:", error);
        next(error);
    }
});
exports.checkAuth = checkAuth;
