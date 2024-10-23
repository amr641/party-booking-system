import { Schema, Types, model } from "mongoose";
import { Status } from "./status";

const bookingSchema= new Schema({
    user:{
        type:Types.ObjectId,
        ref:"User"
    },
    venue:{
        type:Types.ObjectId,
        ref:"Venue"
    },
    date:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:Object.values(Status),
    }

})
export let Booking= model("Booking",bookingSchema)