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
exports.divisionService = void 0;
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const division_model_1 = require("./division.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createDivisionService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingDivision = yield division_model_1.Division.findOne({ name: payload.name });
    if (existingDivision) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "A division with this name already exists.");
    }
    console.log(payload);
    const createDivision = yield division_model_1.Division.create(payload);
    createDivision.save();
    return createDivision;
});
// get division ----------------
const getDivisionService = () => __awaiter(void 0, void 0, void 0, function* () {
    const getDivision = yield division_model_1.Division.find({});
    const totalDivisions = yield division_model_1.Division.countDocuments();
    return {
        getDivision,
        meta: { totalDivisions }
    };
});
// get a single data 
const getSingleDivision = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingDivision = yield division_model_1.Division.findById(id);
    if (!existingDivision) {
        throw new Error("Division is not found");
    }
    const singleData = yield division_model_1.Division.findById(id);
    return singleData;
});
// update a data 
const updateDivisionService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingDivision = yield division_model_1.Division.findById(id);
    if (!existingDivision) {
        throw new Error("Division is not found");
    }
    const duplicateDivision = yield division_model_1.Division.findOne({
        name: payload.name,
        _id: { $ne: id }
    });
    if (duplicateDivision) {
        throw new Error("A division with this name already exists.");
    }
    const updateDivision = yield division_model_1.Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return updateDivision;
});
// delete a document 
const deleteDivisionService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteDivision = yield division_model_1.Division.findByIdAndDelete(id);
    return deleteDivision;
});
exports.divisionService = {
    createDivisionService,
    getDivisionService,
    getSingleDivision,
    updateDivisionService,
    deleteDivisionService
};
