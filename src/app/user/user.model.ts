import mongoose, { Schema } from "mongoose"
import { IAuthProvider, IsActive, IUser, Role } from "./user.interface"


const authShema = new Schema<IAuthProvider>({
    provider: {type: String},
    providerId: {type: String}
},{
    _id: false,
    versionKey: false
})

const userSchema = new Schema<IUser>({
    name: {type:String, required: true},
    email: {type:String, required: true, unique:true},
    password: {type: String},
    phone: {type: String},
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER
    },
    picture: {type: String},
    address: {type: String},
    isActive: {
        type: String,
        enum: Object.values(IsActive),
        default: IsActive.ACTIVE
    },
    isVerified: {type: Boolean, default: false},
    isDeleted: {type: Boolean, default: false},
    auth: [authShema]
},{versionKey:false, timestamps:true})



export const User = mongoose.model('User', userSchema)

// export interface IUser {
//     name: string,
//     email: string,
//     password?:string,
//     phone?:string,
//     role: Role,
//     picture: string,
//     address?:string,
//     isActive?: ISactive,
//     isVerified?: boolean,
//     isDeleted?: boolean,
//     auth: IAuthProvider,
//     booking?: Types.ObjectId[],
//     guide?: Types.ObjectId[]
// }

