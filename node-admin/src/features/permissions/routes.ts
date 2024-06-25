import  express from "express"
import HandleErrors from "../../middleware/handleErrors"
import { CreatePermission, GetPermission } from "./controllers"
const PermissionRouter=express.Router()
PermissionRouter.post('/create', HandleErrors(CreatePermission))
PermissionRouter.get('/get', HandleErrors(GetPermission))

export default PermissionRouter;
