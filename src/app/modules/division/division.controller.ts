import { NextFunction, Request, Response } from "express";

import httpStatusCode from "http-status-codes"
import { divisionService } from "./division.service";


// create data

const createDivision = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const division = req.body;

        const newDivision = await divisionService.createDivisionService(division)

        res.status(httpStatusCode.OK).json({
            success: true,
            message: "Division created successfully",
            data: newDivision
        })
    } catch (error) {
        next(error)
    }
}

// get all data---------

const getDivision = async (req: Request, res: Response, next: NextFunction) => {
    try {

        
        const allDivisions = await divisionService.getDivisionService()

        

        res.status(httpStatusCode.OK).json({
            success: true,
            message: "Division retrived successfully",
            data: allDivisions.getDivision,
            meta: allDivisions.meta
        })
    } catch (error) {
        next(error)
    }
}



// get a single data 

const getSingleDivision = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id
        const singleDivision = await divisionService.getSingleDivision(userId)

        res.status(httpStatusCode.OK).json({
            success: true,
            message: "Single Division retrived successfully",
            data: singleDivision
        })
    } catch (error) {
        next(error)
    }
}


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

const updateDivision = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const divisionId = req.params.id;
        const payload = req.body // It can be put in fir bracket 
        const update = await divisionService.updateDivisionService(divisionId, payload)

        res.status(httpStatusCode.OK).json({
            success: true,
            message: "Single Division updated successfully",
            data: update
        })
    } catch (error) {
        next(error)
    }
}


// delete a document using id

const deleteDivision = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const divisionId = req.params.id;

        const deleteData = await divisionService.deleteDivisionService(divisionId)

        res.status(httpStatusCode.OK).json({
            success: true,
            message: "Single Division deleted successfully",
            data: deleteData
        })
    } catch (error) {
        next(error)
    }
}


export const divisionController = {
    createDivision,
    getDivision,
    getSingleDivision,
    updateDivision,
    deleteDivision
}