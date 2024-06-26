import  express from "express"
import HandleErrors from "../../middleware/handleErrors"
import { UserCreate, UserLogin, UserUpdate } from "./controllers";
import {checkPermission, verifyToken} from "../../middleware/authMiddleware";
import { CREATE_USER_PERMISSIONS, UPDATE_USER_PERMISSIONS } from "../../utils/CommonConstants";
const UserRouter=express.Router()
UserRouter.post('/user-create', verifyToken,checkPermission(CREATE_USER_PERMISSIONS), HandleErrors(UserCreate))
UserRouter.post('/user-login',  HandleErrors(UserLogin))
UserRouter.put('/user-update/:id', verifyToken,checkPermission(UPDATE_USER_PERMISSIONS), HandleErrors(UserUpdate))

export default UserRouter;