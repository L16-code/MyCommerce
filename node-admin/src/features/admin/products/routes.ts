import  express from "express"
import HandleErrors from "../../../middleware/handleErrors"
import { verifyToken, checkPermission } from "../../../middleware/authMiddleware";
import { CREATE_PRODUCT_PERMISSIONS, READ_ORDER_PERMISSIONS, READ_PRODUCT_PERMISSIONS, UPDATE_ORDER_PERMISSIONS, UPDATE_PRODUCT_PERMISSIONS } from "../../../utils/CommonConstants";
import { CreateProduct, EditProduct, ExportProducts, ExportSampleExcel, ImportExcel, ReadOrder, ReadProduct, UpdateOrder, UpdateProduct, UpdateProductStatus } from "./controllers";
const ProductRouter=express.Router()
ProductRouter.post('/create', verifyToken ,checkPermission(CREATE_PRODUCT_PERMISSIONS), HandleErrors(CreateProduct))
ProductRouter.get('/read', verifyToken ,checkPermission(READ_PRODUCT_PERMISSIONS), HandleErrors(ReadProduct))
ProductRouter.get('/edit/:id', verifyToken ,checkPermission(UPDATE_PRODUCT_PERMISSIONS), HandleErrors(EditProduct))
ProductRouter.put('/update/:id', verifyToken ,checkPermission(UPDATE_PRODUCT_PERMISSIONS), HandleErrors(UpdateProduct))
ProductRouter.post('/update-status', verifyToken ,checkPermission(UPDATE_PRODUCT_PERMISSIONS), HandleErrors(UpdateProductStatus))

// import export products
ProductRouter.get('/export-products', verifyToken ,checkPermission(READ_PRODUCT_PERMISSIONS), HandleErrors(ExportProducts))
ProductRouter.get('/export-sample-excel', verifyToken ,checkPermission(READ_PRODUCT_PERMISSIONS), HandleErrors(ExportSampleExcel))
ProductRouter.post('/import-products', verifyToken ,checkPermission(CREATE_PRODUCT_PERMISSIONS), HandleErrors(ImportExcel))


// Orders api routes
ProductRouter.get('/read-orders', verifyToken ,checkPermission(READ_ORDER_PERMISSIONS), HandleErrors(ReadOrder))
ProductRouter.put('/update-orders/:id', verifyToken ,checkPermission(UPDATE_ORDER_PERMISSIONS), HandleErrors(UpdateOrder))

export default ProductRouter;

