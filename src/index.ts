import express from "express";
import { dbConn } from "../Database/dbConnection";
import { bootstrab } from "./modules/bootstrab";
import 'dotenv/config'
const app = express();
const port = 3000;
app.use(express.json());
app.use('/uploads', express.static('uploads'));
dbConn();
bootstrab(app);
app.listen(port, () => console.log(` app listening on port ${port}!`));
