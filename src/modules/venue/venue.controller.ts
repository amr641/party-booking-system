import { NextFunction, Request, Response } from "express";
import { catchError } from "../../middlewares/catchErrors";
import { Venue } from "./venue.model";
import { AppError } from "../../utils/appError";
import path from "path";
import fs from "fs";
import { Roles } from "../user/Roles";

const addVenue = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    req.body.user = req.user?.userId;
    if (req.files) {
      let photosArray = (
        req.files as { [fieldname: string]: Express.Multer.File[] }
      )["photos"];
      req.body.photos = photosArray?.map((img) => img.filename);
    }
    req.body.owner = req.user?.userId;
    let venue = await Venue.create(req.body);
    res.status(200).json({ message: "success", venue });
  }
);
const getAllVenues = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    let venues = await Venue.find();
    res.status(200).json({ message: "success", venues });
  }
);
const getVenue = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    let venue = await Venue.findById(req.params.id);
    venue || next(new AppError("venue not found", 404));
    !venue || res.status(200).json({ message: "success", venue });
  }
);
const updateVenue = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    let venue = await Venue.findById(req.params.id);
    if (!venue) return next(new AppError("venue not found", 404));
    if (venue.owner !== req.user?.userId)
      return next(new AppError("not authorized", 403));
    // if the owner provide a photes in Update endpoint
    if (req.files) {
      const oldPhotos = venue?.photos;
      oldPhotos.forEach((photo) => {
        const photoPath = path.resolve() + "/src/uploads/venues/" + photo;
        if (fs.existsSync(photoPath)) {
          fs.unlinkSync(photoPath); // Deletes the file
          let photosArray = (
            req.files as { [fieldname: string]: Express.Multer.File[] }
          )["photos"];
          req.body.photos = photosArray?.map((img) => img.filename);
        }
      });
    }
    await Venue.updateOne({ _id: venue._id }, req.body);
    res.status(200).json({ message: "success" });
  }
);
const deleteVenue = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    let venue = await Venue.findById(req.params.id);
    if (!venue) return next(new AppError("venue not found", 404));
    // if this user is not an admin then he is an owner based on my authorization middleware
    if (req.user?.role !== Roles.ADMIN) {
      if (venue.owner != req.user?.userId)
        return next(new AppError("un authorized", 403));
    }

    await Venue.deleteOne({ _id: venue._id });
    // remove the old images 
    const oldPhotos = venue?.photos;
    oldPhotos.forEach((photo) => {
      const photoPath = path.resolve() + "/src/uploads/venues/" + photo;
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath); // Deletes the file
      }
    });
    res.status(200).json({ message: "deleted successfully", venue });
  }
);
export { addVenue, getAllVenues, getVenue, updateVenue, deleteVenue };
