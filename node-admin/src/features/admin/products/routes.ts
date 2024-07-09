import  express from "express"
import HandleErrors from "../../../middleware/handleErrors"
import { verifyToken, checkPermission } from "../../../middleware/authMiddleware";
import { CREATE_PRODUCT_PERMISSIONS, READ_PRODUCT_PERMISSIONS, UPDATE_PRODUCT_PERMISSIONS } from "../../../utils/CommonConstants";
import { CreateProduct, EditProduct, ReadProduct, UpdateProduct } from "./controllers";
const ProductRouter=express.Router()
ProductRouter.post('/create', verifyToken ,checkPermission(CREATE_PRODUCT_PERMISSIONS), HandleErrors(CreateProduct))
ProductRouter.get('/read', verifyToken ,checkPermission(READ_PRODUCT_PERMISSIONS), HandleErrors(ReadProduct))
ProductRouter.get('/edit/:id', verifyToken ,checkPermission(UPDATE_PRODUCT_PERMISSIONS), HandleErrors(EditProduct))
ProductRouter.put('/update/:id', verifyToken ,checkPermission(UPDATE_PRODUCT_PERMISSIONS), HandleErrors(UpdateProduct  ))
export default ProductRouter;

