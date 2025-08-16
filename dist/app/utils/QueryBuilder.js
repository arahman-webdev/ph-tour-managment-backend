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
exports.queryBuilder = void 0;
const constant_1 = require("../constant");
// export class queryBuilder<T>{
//     public modelQuery: Query<T[], T>
//     public readonly query: Record<string, string>
//     constructor(modelQuery: Query<T[], T>, query: Record<string, string>){
//         this.modelQuery = modelQuery
//         this.query = query
//     }
// }
class queryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    filter() {
        const filter = Object.assign({}, this.query);
        for (const filed of constant_1.exludedFields) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete filter[filed];
        }
        this.modelQuery = this.modelQuery.find(filter); // Tour.find().find(filter)
        return this;
    }
    search(searchableField) {
        const searchTerm = this.query.searchTerm || "";
        const searchQuery = {
            $or: searchableField.map(field => ({ [field]: { $regex: searchTerm, $options: "i" } }))
        };
        this.modelQuery = this.modelQuery.find(searchQuery); // Tour.find().find(searchQuery)
        return this;
    }
    sort() {
        const sort = this.query.sort || "createdAt";
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    select() {
        var _a;
        const fields = ((_a = this.query.fields) === null || _a === void 0 ? void 0 : _a.split(",").join(" ")) || "";
        console.log("from query builder---------------", fields);
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 1;
        const skip = (page - 1) * 1;
        this.modelQuery = this.modelQuery.limit(limit).skip(skip);
        return this;
    }
    // async mainly sits before (). like async() but here it is a mothod that's why async+method +()
    getMeta() {
        return __awaiter(this, void 0, void 0, function* () {
            // modelQuery.model why? because we have called awai before a time in the tour service for this have to call again
            const totalDocuments = yield this.modelQuery.model.countDocuments();
            console.log(totalDocuments);
            const page = Number(this.query.page) || 1;
            const limit = Number(this.query.limit) || 1;
            const totalPages = Math.ceil(totalDocuments / limit);
            return { page, limit, total: totalDocuments, totalPages };
        });
    }
}
exports.queryBuilder = queryBuilder;
