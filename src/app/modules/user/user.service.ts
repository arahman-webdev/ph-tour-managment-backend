import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../configue/env";
import AppError from "../../errorHelper/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcryptjs";
import statusCodes from "http-status-codes";


const createUserService = async (payload: Partial<IUser>) => {

    const { email, password, ...rest } = payload;

    const isExistUser = await User.findOne({ email })

    // if (isExistUser) {
    //     throw new AppError(statusCodes.BAD_REQUEST, "Email already existed")
    // }

    // const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password as string, Number(envVars.BCRYPT_SALT_ROUNDS));

    console.log(password, hashPassword)

    const authProvider: IAuthProvider = { provider: "credentials", providerId: email as string }

    const user = await User.create({
        email,
        password: hashPassword,
        auth: [authProvider],
        ...rest
    })

    return user
}


const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

    const isUser = await User.findById(userId)

    if (!isUser) {
        throw new AppError(statusCodes.NOT_FOUND, "User not found")
    }


    if (payload.role) {
        if (decodedToken.userRole === Role.USER || decodedToken.userRole === Role.GUIDE) {
            throw new AppError(statusCodes.FORBIDDEN, "You are not authorized");
        }

        if (payload.role === Role.SUPER_ADMIN && decodedToken.userRole === Role.ADMIN) {
            throw new AppError(statusCodes.FORBIDDEN, "You are not authorized");
        }
    }

    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.userRole === Role.USER || decodedToken.userRole === Role.GUIDE) {
            throw new AppError(statusCodes.FORBIDDEN, "You are not authorized");
        }
    }

    if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, Number(envVars.BCRYPT_SALT_ROUNDS))
    }

    const updateUser = await User.findByIdAndUpdate(userId, payload, {new: true, runValidators: true})


    return updateUser

}

// const getAllUsers = async(filter: Partial<IUser> = {})=>{

//     const getUser = await User.find(filter)

//     return getUser
// }

const getAllUsers = async () => {
    const getUser = await User.find()

    return getUser
}





export const userSerivice = {
    createUserService,
    getAllUsers,
    updateUser

}