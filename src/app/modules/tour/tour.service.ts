
import { queryBuilder } from "../../utils/QueryBuilder";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";
import { tourSearchAbleField } from "./tourConstant";



/*---------------------------------- Tyour Types  ------------------------------------- */



const createTourTypeService = async (payload: ITourType) => {

    const existingTourType = await TourType.findOne({ name: payload.name })


    if (existingTourType) {
        throw new Error("Tour type already exists.")
    }

    const createTourType = await TourType.create(payload)

    return createTourType

    //-------------OR -----------------

    // return await TourType.create(payload)
}



/*---------------------------------- Tyour   ------------------------------------- */



const createTourService = async (payload: ITour) => {

    const existingTour = await Tour.findOne({ title: payload.title })
    if (existingTour) {
        throw new Error("A tour with this title already exists.")
    }

    const baseSlug = payload.title.toLowerCase().split(" ").join("-")
    const slug = `${baseSlug}`

    console.log(baseSlug)

    // let counter = 0;
    // while (await Tour.exists({ slug })) {
    //     slug = `${slug}-${counter++}` // dhaka-division-2
    // }

    payload.slug = slug;


    const createTour = await Tour.create(payload)

    return createTour
}


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


const getAllTours = async (query: Record<string, string>) => {


    const tour = new queryBuilder<ITour>(Tour.find(), query);

    const allTours = await tour
        .filter()
        .search(tourSearchAbleField)
        .sort()
        .select()
        .paginate()
        .modelQuery;

    // console.log(allTours)

    const meta = await tour.getMeta()

    return {
        allTours,
        meta

    }
}


// get single touor 

const getSingleTour = async(slug: string)=>{
    const singleTour = await Tour.findOne({slug})

    return singleTour
}

export const tourService = {
    createTourService,
    createTourTypeService,
    getAllTours,
    getSingleTour
}