import { Request } from "express";
interface  query{
    page: string;
    limit: string;
    search:string
}
export class ApiFeatuers {
   limit: number;
  page: number;
    constructor(public mongooseQuery:any,public searchQuery:query) {
   
    }
    pagination() {
      let page = Math.abs(parseInt(this.searchQuery.page)) || 1;
      let limit = parseInt(this.searchQuery.limit )|| 5;
      let offset = (page - 1) * limit;
      this.mongooseQuery.skip(offset).limit(limit);
      this.page = page;
      this.limit=limit
      return this;
    }
    filter() {
      let qualifiedQuery = structuredClone(this.searchQuery); // deep req.query copy
      qualifiedQuery = JSON.stringify(qualifiedQuery).replace(
        // make the query qualified to run  as mongo query
        /gt|gte|lt|lte/g,
        value => '$' + value
      );
      qualifiedQuery = JSON.parse(qualifiedQuery); // parse the string into object
      let excludedFields = ['page', 'sort', 'fields', 'search']; // exclude these fields as they are not properties in product model
      excludedFields.forEach(ele => delete qualifiedQuery[ele]);
      this.mongooseQuery.find(qualifiedQuery);
      return this;
    }
    sort() {
      if (this.searchQuery.sort) {
        this.searchQuery.sort = this.searchQuery.sort.replaceAll(',', ' ');
  
        this.mongooseQuery.sort(this.searchQuery.sort);
      }
      return this;
    }
    select() {
      if (this.searchQuery.fields) {
        this.searchQuery.fields = this.searchQuery.fields.replaceAll(',', ' ');
        this.mongooseQuery.select(this.searchQuery.fields);
      }
      return this;
    }
    search() {
   
        if (this.searchQuery.search) {
          this.searchQuery.search = this.searchQuery.search.replaceAll(","," ");
          this.mongooseQuery.find({
            
            $or: [
              { tags: { $regex: this.searchQuery.search, $options: 'i' } },
              { category: { $regex: this.searchQuery.search, $options: 'i' } },
              { content: { $regex: this.searchQuery.search, $options: 'i' } },
             
            ]
          });
        }
        return this
      }
}