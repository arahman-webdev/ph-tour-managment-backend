import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/AppError";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../configue/env";
import { User } from "../modules/user/user.model";
import httpStatus from "http-status-codes"
import { IsActive } from "../modules/user/user.interface";
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


export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization || req.cookies.accessToken;

    if (!token) {
      throw new AppError(403, "No token received");
    }

    const verifiedToken = verifyToken(token, envVars.JWT_ACCESS_SECRET) as JwtPayload;
    // console.log("✅ Decoded Token:", verifiedToken);
    // console.log("✅ Required Roles:", authRoles);

    const isUserExist = await User.findOne({ email: verifiedToken.userEmail });

    if (!isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
    }

    if (!isUserExist.isVerified) {
      throw new AppError(httpStatus.BAD_REQUEST, "User is not verified")
    }

    if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
      throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.isActive}`);
    }

    if (isUserExist.isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
    }



    if (!authRoles.includes(verifiedToken.userRole)) {
      throw new AppError(403, "You are not permitted to view this route!!!");
    }

    req.user = verifiedToken;
    next();
  } catch (error) {
    console.log("❌ Auth error:", error);
    next(error);
  }
};
