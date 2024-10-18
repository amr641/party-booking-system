import { Router } from "express";
import { allowedTo } from "../../middlewares/auth";
import { Roles } from "../user/Roles";
import { verfifyToken } from "../../middlewares/verifiyToken";
import * as vc from "./venue.controller";
import { uploadPhotos } from "../../fileUpload/fileUpload";

export const venueRouter = Router();
venueRouter
  .use(verfifyToken)
  .post(
    "/venues",
    allowedTo(Roles.OWNER),
    uploadPhotos("venues", "photos"),
    vc.addVenue
  )
  .get("/venues", vc.getAllVenues)
  .get("/venues/:id", vc.getVenue)
  .patch(
    "/venues/:id",
    allowedTo(Roles.OWNER),
    uploadPhotos("venues", "photos"),
    vc.updateVenue
  )
  .delete("/venues/:id", allowedTo(Roles.OWNER, Roles.ADMIN), vc.deleteVenue);
