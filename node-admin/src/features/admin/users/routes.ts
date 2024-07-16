import  express from "express"
import HandleErrors from "../../../middleware/handleErrors"
import { CustomerRead, UserCreate, UserEdit, UserLogin, UserRead, UserStatusUpdate, UserUpdate } from "./controllers";
import {checkPermission, verifyToken} from "../../../middleware/authMiddleware";
import { CREATE_USER_PERMISSIONS, GET_USER_PERMISSIONS, READ_CUSTOMER_PERMISSIONS, UPDATE_USER_PERMISSIONS } from "../../../utils/CommonConstants";
const UserRouter=express.Router()
UserRouter.post('/user-create', verifyToken,checkPermission(CREATE_USER_PERMISSIONS), HandleErrors(UserCreate))
UserRouter.post('/user-login',  HandleErrors(UserLogin))
UserRouter.get('/user-edit/:id', verifyToken,checkPermission(UPDATE_USER_PERMISSIONS), HandleErrors(UserEdit))
UserRouter.put('/user-update/:id', verifyToken,checkPermission(UPDATE_USER_PERMISSIONS), HandleErrors(UserUpdate))
UserRouter.get('/user-read', verifyToken,checkPermission(GET_USER_PERMISSIONS), HandleErrors(UserRead))
UserRouter.post('/user-status-update', verifyToken,checkPermission(UPDATE_USER_PERMISSIONS), HandleErrors(UserStatusUpdate))
// END USER (CUSTOMERS) ROUTES
UserRouter.get('/customers-read', verifyToken,checkPermission(READ_CUSTOMER_PERMISSIONS), HandleErrors(CustomerRead))
// FOR DASHBOARD INTERFACE

export default UserRouter;