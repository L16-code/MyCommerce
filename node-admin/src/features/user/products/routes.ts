import  express from "express"
import HandleErrors from "../../../middleware/handleErrors"
import { AddAddress, AddCart, AddOrder, DeleteCart, GetAddress, GetAllOrder, GetCart, GetCategory, GetOrder, GetProducts, GetProductsCart, UpdateAddressStatus, UpdateCart } from "./controllers"
import { verifyToken } from "../../../middleware/authMiddleware"
const UserProductRouter=express.Router()


// home page
UserProductRouter.get('/get-product', HandleErrors(GetProducts))
UserProductRouter.get('/get-category', HandleErrors(GetCategory))
UserProductRouter.get('/get-product-cart', verifyToken,HandleErrors(GetProductsCart))

// cart
UserProductRouter.post('/addCart', verifyToken ,HandleErrors(AddCart))
UserProductRouter.get('/GetCart/:id', verifyToken ,HandleErrors(GetCart))
UserProductRouter.put('/update-cart/:id', verifyToken ,HandleErrors(UpdateCart))
UserProductRouter.delete('/delete-cart-item/:id', verifyToken ,HandleErrors(DeleteCart))

// chechout
UserProductRouter.get('/get-order/:id', verifyToken,HandleErrors(GetOrder))


// orders
UserProductRouter.post('/add-order', verifyToken ,HandleErrors(AddOrder))
UserProductRouter.get('/get-all-order', verifyToken ,HandleErrors(GetAllOrder))

// address
UserProductRouter.post('/add-address', verifyToken ,HandleErrors(AddAddress))
UserProductRouter.get('/get-address', verifyToken ,HandleErrors(GetAddress))
UserProductRouter.put('/update-address-status/:id', verifyToken ,HandleErrors(UpdateAddressStatus))

export default UserProductRouter