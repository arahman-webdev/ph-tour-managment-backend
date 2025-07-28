import AppError from "../../errorHelper/AppError";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";
import httpsCode from "http-status-codes"
const createDivisionService = async (payload: IDivision) => {


    const existingDivision = await Division.findOne({ name: payload.name })

    if (existingDivision) {
        throw new AppError(httpsCode.BAD_REQUEST, "A division with this name already exists.")
    }

    console.log(payload)

    const createDivision = await Division.create(payload)

    createDivision.save()

    return createDivision

}


// get division ----------------

const getDivisionService = async () => {

    const getDivision = await Division.find({})

    const totalDivisions = await Division.countDocuments()



    return {
        getDivision,
        meta: { totalDivisions }
    }
}


// get a single data 

const getSingleDivision = async (id: string) => {

    const existingDivision = await Division.findById(id)

    if (!existingDivision) {
        throw new Error("Division is not found")
    }

    const singleData = await Division.findById(id)

    return singleData
}





// update a data 

const updateDivisionService = async (id: string, payload: Partial<IDivision>) => {


    const existingDivision = await Division.findById(id)

    if (!existingDivision) {
        throw new Error("Division is not found")
    }

    const duplicateDivision = await Division.findOne({
        name: payload.name,
        _id: { $ne: id }
    })

    if (duplicateDivision) {
        throw new Error("A division with this name already exists.")
    }


    const updateDivision = await Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true })

    return updateDivision
}


// delete a document 

const deleteDivisionService = async (id: string) => {

    const deleteDivision = await Division.findByIdAndDelete(id)

    return deleteDivision
}

export const divisionService = {
    createDivisionService,
    getDivisionService,
    getSingleDivision,
    updateDivisionService,
    deleteDivisionService

}
