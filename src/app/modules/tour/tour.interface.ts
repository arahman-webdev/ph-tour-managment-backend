/**
 * slug: String (unique)
tourType: ObjectId (references TourType)


included: Array of Strings (e.g., Meals, Transport)


excluded: Array of Strings (e.g., Insurance)


amenities: Array of Strings


tourPlan: Array of Strings (daily itinerary)
 */

import { Types } from "mongoose"

export interface ITourType {
    name: string
}

export interface ITour {
    title: string;
    slug: string;
    description?: string;
    images?: string[];
    location?: string[];
    costFrom?: number;
    startDate?: Date;
    endDate?: Date;
    departureLocation: string;
    arrivalLocation: string;
    included?: string[];
    excluded?: string[];
    amenities?: string[];
    tourPlan?: string[];
    minAge?: number;
    maxGuest?: number;
    division: Types.ObjectId;
    tourType: Types.ObjectId;
}



