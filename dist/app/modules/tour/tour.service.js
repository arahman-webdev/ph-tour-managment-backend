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
exports.tourService = void 0;
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const tour_model_1 = require("./tour.model");
const tourConstant_1 = require("./tourConstant");
/*---------------------------------- Tyour Types  ------------------------------------- */
const createTourTypeService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTourType = yield tour_model_1.TourType.findOne({ name: payload.name });
    if (existingTourType) {
        throw new Error("Tour type already exists.");
    }
    const createTourType = yield tour_model_1.TourType.create(payload);
    return createTourType;
    //-------------OR -----------------
    // return await TourType.create(payload)
});
/*---------------------------------- Tyour   ------------------------------------- */
const createTourService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTour = yield tour_model_1.Tour.findOne({ title: payload.title });
    if (existingTour) {
        throw new Error("A tour with this title already exists.");
    }
    const baseSlug = payload.title.toLowerCase().split(" ").join("-");
    const slug = `${baseSlug}`;
    console.log(baseSlug);
    // let counter = 0;
    // while (await Tour.exists({ slug })) {
    //     slug = `${slug}-${counter++}` // dhaka-division-2
    // }
    payload.slug = slug;
    const createTour = yield tour_model_1.Tour.create(payload);
    return createTour;
});
// get all tour 
// export const getAllToursOld = async (query: Record<string, string>) => {
//     const filter = query
//     const searchTerm = query.searchTerm || "";
//     const sort = query.sort || "createdAt";
//     const page = Number(query.page) || 1;
//     const limit = Number(query.limit) || 2;
//     const skip = (page - 1) * 1
//     // field filtering. split for removing , - etc. join for adding , = etc
//     const fields = query.fields?.split(",").join(" ") || ""
//     // ?field= -title, -location mean they are not showed
//     // delete filter["searchTerm"] // it need to get data from filter
//     // delete filter["sort"] // it need to get data from filter
//     const exludedFields = ["searchTerm", "sort", "fields", "page", "limit"]
//     for (const field of exludedFields) {
//         // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
//         delete filter[field]
//     }
//     // const searchField = tourSearchAbleField.map(field => ({[field]: {$regex: searchTerm, $options: "i"}}))
//     // another way 
//     const searchQuery = {
//         $or: tourSearchAbleField.map(field => ({ [field]: { $regex: searchTerm, $options: "i" } }))
//     }
//     // [][][](skip)[][][][][][][][] remove from at the first. Show from
//     // [][][](limit){remove[][][][][][][][]remove} remove from at the last. Show from frist
//     // .sort("-departureLocation") It works in this way or like below
//     // .sort({ "departureLocation": 1 }) 
//     // .select("title") only show this filed can use -title then all show without title
//     // const filterTour = Tour.find(filter)
//     // const tours = filterTour.find(filterTour)
//     // const allTours = await tours.sort(sort).select(fields).skip(skip).limit(limit)
//     const tours = await Tour.find(searchQuery).find(filter).sort(sort).select(fields).skip(skip).limit(limit)
//     const totalTours = await Tour.countDocuments(tours)
//     // console.log("Tour.find result =>", getTour);
//     // console.log("Tour.countDocuments =>", totalTours);
//     const meta = {
//         page: page,
//         limit: limit,
//         total: totalTours,
//         totalPages: Math.ceil(totalTours / limit)
//     }
//     return {
//         tours,
//         meta: { meta }
//     }
// }
const getAllTours = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const tour = new QueryBuilder_1.queryBuilder(tour_model_1.Tour.find(), query);
    const allTours = yield tour
        .filter()
        .search(tourConstant_1.tourSearchAbleField)
        .sort()
        .select()
        .paginate()
        .modelQuery;
    // console.log(allTours)
    const meta = yield tour.getMeta();
    return {
        allTours,
        meta
    };
});
// get single touor 
const getSingleTour = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const singleTour = yield tour_model_1.Tour.findOne({ slug });
    return singleTour;
});
exports.tourService = {
    createTourService,
    createTourTypeService,
    getAllTours,
    getSingleTour
};
