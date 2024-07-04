import  express from "express"
import HandleErrors from "../../../middleware/handleErrors"
import { userLogin, UserRegister } from "./controllers"
const UserPanelRouter=express.Router()
UserPanelRouter.post('/register',  HandleErrors(UserRegister))
UserPanelRouter.post('/login',  HandleErrors(userLogin))
export default UserPanelRouter