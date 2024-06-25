import  express from "express"
import HandleErrors from "../../middleware/handleErrors"
import { CreateRole, GetAllRoles, GetRoleById } from "./controllers"
const RoleRouter=express.Router()
RoleRouter.post('/create', HandleErrors(CreateRole))
RoleRouter.get('/get-all-roles', HandleErrors(GetAllRoles))
RoleRouter.get('/get-role/:roleId', HandleErrors(GetRoleById))

export default RoleRouter;


