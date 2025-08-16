import { NextFunction, Request, Response } from "express";

import { tourService } from "./tour.service";




/*--------------------------------- Tour Types  --------------------------------- */

const createTourType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newTourType = req.body
        const result = await tourService.createTourTypeService(newTourType)


        res.json({
            statusCode: 201,
            success: true,
            message: 'Tour type created successfully',
            data: result,
        })
    } catch (error) {
        next(error)
    }
}
const getTourType = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const getTourType = await tourService.getTourTypeService()



        res.json({
            statusCode: 201,
            success: true,
            message: 'Tour type retrieved successfully',
            data: getTourType,
        })
    } catch (error) {
        next(error)
    }
}


const deleteTourType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tourTypeId = req.params.id
        await tourService.deleteTourTypeService(tourTypeId)

        res.json({
            statusCode: 201,
            success: true,
            message: 'Tour type deleted successfully',
            data: null,
        })
    } catch (error) {
        next(error)
    }
}



/*--------------------------------- Tour --------------------------------- */



const createTour = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const newTour = await tourService.createTourService(req.body)

        const savedTour = await newTour.save()

        console.log(savedTour)

        res.status(200).json({
            success: true,
            message: "Created successfully",
            data: newTour
        })

    } catch (error) {

        next(error)
    }
}


// get all tours

const getAllTours = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const filter = req.query

        const result = await tourService.getAllTours(filter as Record<string, string>)

        res.json({
            statusCode: 201,
            success: true,
            message: 'Tour retrieved successfully',
            data: result.allTours,
            meta: result.meta
        })
    } catch (error) {
        next(error)
    }
}

const getSingleTour = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const slug = req.params.slug;

        const tour = await tourService.getSingleTour(slug)

        console.log(tour)

        res.json({
            success: true,
            data: tour
        })
    } catch (error) {
        next(error)
    }
}


// Update tour 





export const tourController = {
    createTour,
    createTourType,
    getAllTours,
    getSingleTour,
    getTourType,
    deleteTourType
}