"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFeatuers = void 0;
class ApiFeatuers {
    mongooseQuery;
    searchQuery;
    constructor(mongooseQuery, searchQuery) {
        this.mongooseQuery = mongooseQuery;
        this.searchQuery = searchQuery;
    }
    search() {
        if (this.searchQuery.search) {
            this.searchQuery.search = this.searchQuery.search.replaceAll(",", " ");
            this.mongooseQuery.find({
                $or: [
                    { tags: { $regex: this.searchQuery.search, $options: 'i' } },
                    { category: { $regex: this.searchQuery.search, $options: 'i' } },
                    { content: { $regex: this.searchQuery.search, $options: 'i' } },
                ]
            });
        }
        return this;
    }
}
exports.ApiFeatuers = ApiFeatuers;
