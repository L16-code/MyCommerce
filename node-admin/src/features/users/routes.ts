import  express from "express"
import HandleErrors from "../../middleware/handleErrors"
import { UserCreate, UserLogin } from "./controllers";
const UserRouter=express.Router()
UserRouter.post('/user-create', HandleErrors(UserCreate))
UserRouter.post('/user-login', HandleErrors(UserLogin))

export default UserRouter;