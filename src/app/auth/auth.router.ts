import { Router } from "express";
import { AuthControllers } from "./auth.controller";


const router = Router()


router.post('/login', AuthControllers.credentialsLogin)
router.post('/refresh-token', AuthControllers.getNewAccessToken)
router.post('/logout', AuthControllers.logoutUser)


export const authRoutes = router;


/**
 *     "email": "arahim22@gmail.com"
        "password": "123456A2a"
 */