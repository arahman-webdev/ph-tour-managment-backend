import express from "express"
import { divisionController } from "./division.controller"

const router = express.Router()

router.post('/create', divisionController.createDivision)

router.get('/', divisionController.getDivision)

router.get('/:id', divisionController.getSingleDivision)
router.patch('/:id', divisionController.updateDivision)
router.delete('/:id', divisionController.deleteDivision)

export const divisionRoutes = router