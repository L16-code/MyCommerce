import  express from "express"
import HandleErrors from "../../middleware/handleErrors"
import { verifyToken, checkPermission } from "../../middleware/authMiddleware";
import { CREATE_PRODUCT_PERMISSIONS } from "../../utils/CommonConstants";
import { CreateProduct } from "./controllers";
const ProductRouter=express.Router()
ProductRouter.post('/create', verifyToken ,checkPermission(CREATE_PRODUCT_PERMISSIONS), HandleErrors(CreateProduct))
export default ProductRouter;

