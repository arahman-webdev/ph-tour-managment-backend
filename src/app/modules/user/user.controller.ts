/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";

import { userSerivice } from "./user.service";
import { JwtPayload } from "jsonwebtoken";
import statusCode from "http-status-codes"

/**
 * const createUser = async (req:Request, res:Response, next:NextFunction)=>{
    try {
    //    const newUser = new User(req.body) // directly using req.body

        const user = await userSerivice.createUserService(req.body)
        // if(email){
        //     return "email is already provided"
        // }
        // const user = await User.create({
        //     name,
        //     email
        // })

        const savedData = await user.save()
        // await user.save()

        res.status(httpStatus.CREATED).json({
            success: true,
            message: "user created successfully",
            data: savedData
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        next(error)
    }
}
 * 
 */



const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await userSerivice.createUserService(req.body)

        res.status(200).json({
            success: true,
            message: "Created successfully",
            data: newUser
        })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.log(err)
        next(err)
    }
}

const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;

    // ✅ Correct way to access decoded token
    const verifiedToken = req.user;

    const payload = req.body;

    const user = await userSerivice.updateUser(userId, payload, verifiedToken as JwtPayload)

    res.status(200).json({

        success: true,
        statusCode: statusCode.CREATED,
        message: "User Updated Successfully",
        data: user,

    })


}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const user = await userSerivice.getAllUsers()

        res.status(201).json({
            success: true,
            data: user
        })
    } catch (error) {
        console.log(error)
    }
}

export const UserController = {
    createUser,
    getAllUsers,
    updateUser
}






/**
 * 
 * export const validateRequest = (zodShema: ZodObject) => async(req:Request, res:Response, next:NextFunction) =>{
     try {
        
         req.body = await zodShema.parseAsync(req.body)
      
         next()
     } catch (error) {
         next(error)
     }
 }
 */