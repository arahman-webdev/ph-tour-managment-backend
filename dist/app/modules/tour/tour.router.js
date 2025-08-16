"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tourRoutes = void 0;
const express_1 = __importDefault(require("express"));
const tour_controller_1 = require("./tour.controller");
const checkAuth_1 = require("../../middleware/checkAuth");
const user_interface_1 = require("../user/user.interface");
const router = express_1.default.Router();
/**-----------------------------------Tour Types---------------------------------- */
router.post('/create-tour-type', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), tour_controller_1.tourController.createTourType);
/*--------------------------------- Tour  --------------------------------- */
router.post('/create', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), tour_controller_1.tourController.createTour);
router.get('/', tour_controller_1.tourController.getAllTours);
router.get('/:slug', tour_controller_1.tourController.getSingleTour);
exports.tourRoutes = router;
