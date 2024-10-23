import { Router } from "express";
import { bookVenue, cancelBooking, getUserBookings } from "./booking.controller";
import { allowedTo } from "../../middlewares/auth";
import { Roles } from "../user/Roles";

export const bookingRouter =Router()
bookingRouter.post("/book-venue/:id",allowedTo(Roles.USER),bookVenue)
bookingRouter.patch("/cancel-booking/:id",allowedTo(Roles.USER),cancelBooking)
bookingRouter.get("/get-user-bookings",allowedTo(Roles.USER),getUserBookings)