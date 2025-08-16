import express from "express"
import { divisionController } from "./division.controller"
import { checkAuth } from "../../middleware/checkAuth"
import { Role } from "../user/user.interface"

const router = express.Router()

router.post('/create', divisionController.createDivision)

router.get('/',checkAuth(Role.ADMIN, Role.SUPER_ADMIN), divisionController.getDivision)

router.get('/:id', divisionController.getSingleDivision)
router.patch('/:id', divisionController.updateDivision)
router.delete('/:id', divisionController.deleteDivision)

export const divisionRoutes = router