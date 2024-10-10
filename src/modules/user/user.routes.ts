import { Router } from "express";
import * as ua from "../../middlewares/auth";
import * as uc from "../user/user.controller";
import { Roles } from "./Roles";
import { verfifyToken } from "../../middlewares/verifiyToken";

export const userRouter = Router();
userRouter
  .post("/auth/signup", ua.signUp)
  .post("/auth/login", ua.login)
  .use(verfifyToken)
  .patch("/users/:id", ua.allowedTo(Roles.ADMIN), uc.updateUser)
  .delete("/users/:id", ua.allowedTo(Roles.ADMIN), uc.deleteUser)
  .get("/users", uc.getAllUsers)
  .get("/users/:id", uc.getUser);
