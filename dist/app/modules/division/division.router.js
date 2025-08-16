"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.divisionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const division_controller_1 = require("./division.controller");
const router = express_1.default.Router();
router.post('/create', division_controller_1.divisionController.createDivision);
router.get('/', division_controller_1.divisionController.getDivision);
router.get('/:id', division_controller_1.divisionController.getSingleDivision);
router.patch('/:id', division_controller_1.divisionController.updateDivision);
router.delete('/:id', division_controller_1.divisionController.deleteDivision);
exports.divisionRoutes = router;
