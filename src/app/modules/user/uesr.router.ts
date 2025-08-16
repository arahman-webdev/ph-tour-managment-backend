/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middleware/validationRequest";
import { userZodSchema } from "./user.validation";
import  { JwtPayload } from "jsonwebtoken"

import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../configue/env";
import AppError from "../../errorHelper/AppError";
import { Role } from "./user.interface";
import { checkAuth } from "../../middleware/checkAuth";





const router = Router()

router.post('/register', validateRequest(userZodSchema), 
UserController.createUser,
)




router.get('/all-users', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserController.getAllUsers)
router.get('/me', checkAuth(...Object.values(Role)), UserController.getSingleUser)

router.get('/:id', checkAuth(...Object.values(Role)), UserController.updateUser)
router.patch('/:id', checkAuth(...Object.values(Role)), UserController.updateUser)







// router.get('/register', UserController.getAllUser)

export const UserRoutes = router