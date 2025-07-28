import express from "express"
import { tourController } from "./tour.controller"
import { checkAuth } from "../../middleware/checkAuth"
import { Role } from "../user/user.interface"

const router = express.Router()


/**-----------------------------------Tour Types---------------------------------- */

router.post('/create-tour-type', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), tourController.createTourType)




/*--------------------------------- Tour  --------------------------------- */
router.post('/create', checkAuth(Role.ADMIN,Role.SUPER_ADMIN), tourController.createTour)

router.get('/', tourController.getAllTours)

router.get('/:slug', tourController.getSingleTour)




export const tourRoutes = router