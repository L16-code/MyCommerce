import  express from "express"
import HandleErrors from "../../middleware/handleErrors"
import { UserCreate, UserLogin, UserUpdate } from "./controllers";
const UserRouter=express.Router()
UserRouter.post('/user-create', HandleErrors(UserCreate))
UserRouter.post('/user-login', HandleErrors(UserLogin))
UserRouter.put('/user-update/:id', HandleErrors(UserUpdate))

export default UserRouter;