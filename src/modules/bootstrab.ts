import { globalHandeling } from "../middlewares/globalHandeling"
import { userRouter } from "./user/user.routes"

export const bootstrab= function(app:any){
    app.use(userRouter)
app.use(globalHandeling)
}