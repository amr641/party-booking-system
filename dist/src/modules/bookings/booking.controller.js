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
exports.getUserBookings = exports.cancelBooking = exports.bookVenue = void 0;
const catchErrors_1 = require("../../middlewares/catchErrors");
const booking_model_1 = require("./booking.model");
const venue_model_1 = require("../venue/venue.model");
const appError_1 = require("../../utils/appError");
const status_1 = require("./status");
const datehandeling_1 = require("./datehandeling");
const bookVenue = (0, catchErrors_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // first get the venue and check if it exsist or not
    let venue = yield venue_model_1.Venue.findById(req.params.id);
    if (!venue)
        return next(new appError_1.AppError("venue not found", 404));
    // then check the date
    let { date } = req.body;
    let availableDates = venue.availability.map((ele) => (ele = (0, datehandeling_1.formatDateToMMDDYY)(ele)));
    if (!availableDates.includes(date))
        return next(new appError_1.AppError("no such date", 400));
    // set the status depending on the date
    if (new Date(date) > new Date())
        req.body.status = status_1.Status.pending;
    let dateIndex = availableDates.indexOf(date);
    if (dateIndex >= 0)
        venue === null || venue === void 0 ? void 0 : venue.availability.splice(dateIndex, 1);
    else
        return next(new appError_1.AppError("date not found", 404));
    // remove the date from the venue
    yield (venue === null || venue === void 0 ? void 0 : venue.save());
    // finally book the venue
    req.body.venue = venue === null || venue === void 0 ? void 0 : venue._id;
    req.body.user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    let book = yield booking_model_1.Booking.create(req.body);
    // send the response
    res.status(201).json({ message: "success", book });
}));
exports.bookVenue = bookVenue;
const cancelBooking = (0, catchErrors_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let booking = yield booking_model_1.Booking.findById(req.params.id);
    if (!booking)
        return next(new appError_1.AppError("bookin not found", 404));
    else if (booking.user != ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId))
        return next(new appError_1.AppError("un authorized", 403));
    else if (new Date() == booking.date)
        return next(new appError_1.AppError("you cannot cancel", 400));
    booking.status = status_1.Status.canceld;
    yield booking.save();
    res.status(200).json({ message: "canceld successfully" });
}));
exports.cancelBooking = cancelBooking;
const getUserBookings = (0, catchErrors_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let bookings = yield booking_model_1.Booking.find({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId });
    if (!bookings.length)
        return next(new appError_1.AppError("You Did not book any venue Yet", 404));
    bookings.forEach((ele) => __awaiter(void 0, void 0, void 0, function* () {
        if ((0, datehandeling_1.formatDateToMMDDYY)(new Date()) >= (0, datehandeling_1.formatDateToMMDDYY)(ele.date))
            ele.status = status_1.Status.confirmed;
        yield ele.save();
    }));
    res.status(200).json({ message: "success", bookings });
}));
exports.getUserBookings = getUserBookings;
