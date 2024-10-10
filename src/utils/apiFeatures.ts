import { Request } from "express";
interface  query{
    search:string
}
export class ApiFeatuers {
    constructor(public mongooseQuery:any,public searchQuery:query) {
   
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