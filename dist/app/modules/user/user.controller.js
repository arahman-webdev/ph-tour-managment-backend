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
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
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
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield user_service_1.userSerivice.createUserService(req.body);
        res.status(200).json({
            success: true,
            message: "Created successfully",
            data: newUser
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    // ✅ Correct way to access decoded token
    const verifiedToken = req.user;
    const payload = req.body;
    const user = yield user_service_1.userSerivice.updateUser(userId, payload, verifiedToken);
    res.status(200).json({
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "User Updated Successfully",
        data: user,
    });
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.userSerivice.getAllUsers();
        res.status(201).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.UserController = {
    createUser,
    getAllUsers,
    updateUser
};
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
