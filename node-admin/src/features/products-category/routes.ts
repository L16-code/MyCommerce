import  express from "express"
import HandleErrors from "../../middleware/handleErrors"
import { verifyToken, checkPermission } from "../../middleware/authMiddleware";
import { CREATE_PRODUCT_PERMISSIONS, READ_PRODUCT_PERMISSIONS, UPDATE_PRODUCT_PERMISSIONS } from "../../utils/CommonConstants";
import { CreateCategory, ReadCategory, UpdateCategory } from "./controllers";

const ProductCategoryRouter=express.Router()
ProductCategoryRouter.post('/create', verifyToken ,checkPermission(CREATE_PRODUCT_PERMISSIONS), HandleErrors(CreateCategory))
ProductCategoryRouter.get('/read', verifyToken ,checkPermission(READ_PRODUCT_PERMISSIONS), HandleErrors(ReadCategory))
ProductCategoryRouter.put('/update/:id', verifyToken ,checkPermission(UPDATE_PRODUCT_PERMISSIONS), HandleErrors(UpdateCategory))
export default ProductCategoryRouter;