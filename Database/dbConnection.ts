import mongoose from "mongoose";
export const dbConn=  ( ):void => {
    mongoose.connect("mongodb://localhost:27017/booking-party")
    .then(()=>{
    console.log('DB connected');
}).catch(()=>{
    console.log('Err DB Connection');
})
}