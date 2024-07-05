import  express from "express"
import HandleErrors from "../../../middleware/handleErrors"
import { AddCart, DeleteCart, GetCart, GetProducts, UpdateCart } from "./controllers"
import { verifyToken } from "../../../middleware/authMiddleware"
const UserProductRouter=express.Router()
UserProductRouter.get('/get-product', HandleErrors(GetProducts))
UserProductRouter.post('/addCart', verifyToken ,HandleErrors(AddCart))
UserProductRouter.get('/GetCart/:id', verifyToken ,HandleErrors(GetCart))
UserProductRouter.put('/update-cart/:id', verifyToken ,HandleErrors(UpdateCart))
UserProductRouter.delete('/delete-cart-item/:id', verifyToken ,HandleErrors(DeleteCart))

export default UserProductRouter