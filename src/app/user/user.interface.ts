/* eslint-disable no-unused-vars */
import { Types } from "mongoose"

export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    GUIDE = "GUIDE",
    USER = "USER"
}

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}


export interface IAuthProvider {
    provider: "google" | "credentials",
    providerId: string
}

export interface IUser {
    _id?: Types.ObjectId
    name: string,
    email: string,
    password?:string,
    phone?:string,
    role: Role,
    picture?: string,
    address?:string,
    isActive?: IsActive,
    isVerified?: boolean,
    isDeleted?: boolean,
    auth: IAuthProvider[],
    booking?: Types.ObjectId[],
    guide?: Types.ObjectId[]
}


