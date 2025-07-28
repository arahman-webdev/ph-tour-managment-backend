import { Query } from "mongoose";
import { exludedFields } from "../constant";

// export class queryBuilder<T>{
//     public modelQuery: Query<T[], T>
//     public readonly query: Record<string, string>

//     constructor(modelQuery: Query<T[], T>, query: Record<string, string>){
//         this.modelQuery = modelQuery
//         this.query = query
//     }

// }

export class queryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public readonly query: Record<string, string>;


    constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
        this.modelQuery = modelQuery
        this.query = query
    }


    filter(): this {
        const filter = { ...this.query }

        for (const filed of exludedFields) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete filter[filed]
        }

        this.modelQuery = this.modelQuery.find(filter) // Tour.find().find(filter)

        return this
    }

    search(searchableField: string[]): this {
        const searchTerm = this.query.searchTerm || "";
        const searchQuery = {
            $or: searchableField.map(field => ({ [field]: { $regex: searchTerm, $options: "i" } }))
        }

        this.modelQuery = this.modelQuery.find(searchQuery) // Tour.find().find(searchQuery)

        return this
    }

    sort(): this {

        const sort = this.query.sort || "createdAt";

        this.modelQuery = this.modelQuery.sort(sort)

        return this
    }

    select(): this {

        const fields = this.query.fields?.split(",").join(" ") || "";

        console.log("from query builder---------------", fields)

        this.modelQuery = this.modelQuery.select(fields)

        return this
    }

    paginate(): this {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 1;
        const skip = (page - 1) * 1
        this.modelQuery = this.modelQuery.limit(limit).skip(skip)

        return this
    }


    // async mainly sits before (). like async() but here it is a mothod that's why async+method +()

    async getMeta(){

        // modelQuery.model why? because we have called awai before a time in the tour service for this have to call again
        const totalDocuments = await this.modelQuery.model.countDocuments()
        console.log(totalDocuments)
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 1;
        const totalPages = Math.ceil(totalDocuments / limit)

        
        return {page, limit, total:totalDocuments, totalPages}
    }
}




