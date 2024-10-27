import { Sequelize } from "sequelize";
import mongoose from "mongoose";
export const dbConn = (): void => {
  mongoose
    .connect("mongodb://localhost:27017/booking-party")
    .then(() => {
      console.log("DB connected");
    })
    .catch(() => {
      console.log("Err DB Connection");
    });
};
const sequelize = new Sequelize("party-booking system", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
// test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => console.error("Unable to connect to the database:"));
export default sequelize;
