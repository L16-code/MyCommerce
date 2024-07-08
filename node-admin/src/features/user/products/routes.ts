import  express from "express"
import HandleErrors from "../../../middleware/handleErrors"
import { AddAddress, AddCart, AddOrder, DeleteCart, GetAllOrder, GetCart, GetOrder, GetProducts, UpdateCart } from "./controllers"
import { verifyToken } from "../../../middleware/authMiddleware"
const UserProductRouter=express.Router()
UserProductRouter.get('/get-product', HandleErrors(GetProducts))
UserProductRouter.post('/addCart', verifyToken ,HandleErrors(AddCart))
UserProductRouter.get('/GetCart/:id', verifyToken ,HandleErrors(GetCart))
UserProductRouter.put('/update-cart/:id', verifyToken ,HandleErrors(UpdateCart))
UserProductRouter.delete('/delete-cart-item/:id', verifyToken ,HandleErrors(DeleteCart))
// chechout
UserProductRouter.get('/get-order/:id', verifyToken,HandleErrors(GetOrder))
// orders
UserProductRouter.post('/add-order', verifyToken ,HandleErrors(AddOrder))
UserProductRouter.get('/get-order', verifyToken ,HandleErrors(GetAllOrder))
// address
UserProductRouter.post('/add-address', verifyToken ,HandleErrors(AddAddress))
export default UserProductRouter