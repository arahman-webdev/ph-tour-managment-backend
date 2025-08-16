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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tourController = void 0;
const tour_service_1 = require("./tour.service");
/*--------------------------------- Tour Types  --------------------------------- */
const createTourType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTourType = req.body;
        const result = yield tour_service_1.tourService.createTourTypeService(newTourType);
        res.json({
            statusCode: 201,
            success: true,
            message: 'Tour type created successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
/*--------------------------------- Tour --------------------------------- */
const createTour = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTour = yield tour_service_1.tourService.createTourService(req.body);
        const savedTour = yield newTour.save();
        console.log(savedTour);
        res.status(200).json({
            success: true,
            message: "Created successfully",
            data: newTour
        });
    }
    catch (error) {
        next(error);
    }
});
// get all tours
const getAllTours = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query;
        const result = yield tour_service_1.tourService.getAllTours(filter);
        res.json({
            statusCode: 201,
            success: true,
            message: 'Tour retrieved successfully',
            data: result.allTours,
            meta: result.meta
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleTour = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slug;
        const tour = yield tour_service_1.tourService.getSingleTour(slug);
        console.log(tour);
        res.json({
            success: true,
            data: tour
        });
    }
    catch (error) {
        next(error);
    }
});
// Update tour 
exports.tourController = {
    createTour,
    createTourType,
    getAllTours,
    getSingleTour
};
