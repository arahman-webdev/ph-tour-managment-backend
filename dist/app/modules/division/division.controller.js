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
exports.divisionController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const division_service_1 = require("./division.service");
// create data
const createDivision = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const division = req.body;
        const newDivision = yield division_service_1.divisionService.createDivisionService(division);
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: "Division created successfully",
            data: newDivision
        });
    }
    catch (error) {
        next(error);
    }
});
// get all data---------
const getDivision = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allDivisions = yield division_service_1.divisionService.getDivisionService();
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: "Division retrived successfully",
            data: allDivisions.getDivision,
            meta: allDivisions.meta
        });
    }
    catch (error) {
        next(error);
    }
});
// get a single data 
const getSingleDivision = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const singleDivision = yield division_service_1.divisionService.getSingleDivision(userId);
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: "Single Division retrived successfully",
            data: singleDivision
        });
    }
    catch (error) {
        next(error);
    }
});
//  I have to do it later ---------------------------------------------------------------
// const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
//     const slug = req.params.slug
//     const result = await DivisionService.getSingleDivision(slug);
//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Divisions retrieved",
//         data: result.data,
//     });
// });
// update a data 
const updateDivision = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const divisionId = req.params.id;
        const payload = req.body; // It can be put in fir bracket 
        const update = yield division_service_1.divisionService.updateDivisionService(divisionId, payload);
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: "Single Division updated successfully",
            data: update
        });
    }
    catch (error) {
        next(error);
    }
});
// delete a document using id
const deleteDivision = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const divisionId = req.params.id;
        const deleteData = yield division_service_1.divisionService.deleteDivisionService(divisionId);
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: "Single Division deleted successfully",
            data: deleteData
        });
    }
    catch (error) {
        next(error);
    }
});
exports.divisionController = {
    createDivision,
    getDivision,
    getSingleDivision,
    updateDivision,
    deleteDivision
};
