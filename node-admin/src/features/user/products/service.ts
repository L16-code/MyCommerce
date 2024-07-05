import mongoose from "mongoose";
import { ProductModal } from "../../admin/products/model";
import { QueryParams } from "../auth/interface";
import { IAddCartData } from "./interface";
import { CartModel } from "./modal/cartModal";
const response: {
    message: string;
    data?: unknown;
    success: boolean;
} = { message: "", success: false };
interface IQuantity{
    quantity: number;
}
class UserProducts {
    async GetProducts({ page, limit }: QueryParams) {
        try {
            const offset = (page - 1) * limit;
            const products = await ProductModal.aggregate([
                {
                    $lookup: {
                        from: "products_catgeories",
                        localField: "category_id",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        price: 1,
                        quantity: 1,
                        description: 1,
                        image: 1,
                        category: { $first: "$category.name" }
                    }
                }
            ]).skip(offset).limit(limit);
            const totalUsers = await ProductModal.countDocuments();
            return {
                success: true,
                message: "Products found",
                data: products,
                totalPages: Math.ceil(totalUsers / limit),
                currentPage: page,
            }
        } catch (error) {
            response.success = false;
            response.message = "An error occurred while fetching products";
        }
        return response;
    }
    async AddCart(data: IAddCartData) {
        const { product_id, user_id } = data
        const product = await ProductModal.findById(product_id);
        if (!product) {
            throw new Error('Product not found');
        }
        const productPrice = product.price;
        const checkProduct = await CartModel.findOne({ product_id, user_id });
        if (checkProduct) {
            if (checkProduct.status === '0') {
                // Increment the quantity and update the total price
                checkProduct.quantity += 1;
                checkProduct.total_price = checkProduct.quantity * productPrice;
                await checkProduct.save();
                response.success = true;
                response.message = "Product added to cart successfully";
                response.data = null;
            } else if (checkProduct.status === '1') {
                // Update the status to '0', set quantity to 1, and update the total price
                checkProduct.status = '0';
                checkProduct.quantity = 1;
                checkProduct.total_price = productPrice;
                await checkProduct.save();
                response.success = true;
                response.message = "Product added to cart successfully";
                response.data = null;
            }
        } else {
            // Create a new cart item
            const newCart = new CartModel({
                product_id,
                user_id,
                quantity: 1,
                total_price: productPrice,
                status: '0'
            });
            await newCart.save();
            response.success = true;
            response.message = "Product added to cart successfully";
            response.data = null;
        }
        return response
    }
    async GetCart(user_id: string) {
        try {
            const cartItems = await CartModel.find({ user_id });
            const products = await Promise.all(cartItems.map(async (item) => {
                const product = await ProductModal.findById(item.product_id);
                if (product) {
                    return {
                        _id: item._id,
                        product_id: product._id,
                        name: product.name,
                        price: product.price,
                        quantity: item.quantity,
                        total_price: item.total_price,
                        image: product.image
                    }
                }
            }));
            return {
                success: true,
                message: "Cart fetched successfully",
                data: products
            }
        } catch (error) {
            response.success = false;
            response.message = "An error occurred while fetching cart";
        }
        return response;
    }
    async UpdateCart(id: string, quantity: IQuantity) {
        try {
            console.log(id)
            console.log(quantity.quantity)
            const cartItem = await CartModel.findById(id);
            // console.log(cartItem)
            if (!cartItem) {
                response.message = 'Cart item not found';
                return response;
            }

            // Find the product price by product ID
            const product = await ProductModal.findById(cartItem.product_id);
            // console.log(product)
            if (!product) {
                response.message = 'Product not found';
                return response;
            }

            cartItem.quantity = quantity.quantity;
            cartItem.total_price = quantity.quantity * product.price;
            console.log(cartItem)
            // Save the updated cart item
            await cartItem.save()

            response.success = true;
            response.message = "Cart updated successfully";
            response.data = cartItem;
        } catch (error:any) {
            response.success = false;
            response.message = error.message;;
        }
        return response;
    }
    async DeleteCart(id: string) {
        try {
            const cartItem = await CartModel.findByIdAndDelete(id);
            if (!cartItem) {
                response.message = 'Cart item not found';
                return response;
            }
            response.success = true;
            response.message = "Cart item deleted successfully";
            response.data = null;
        } catch (error:any) {
            response.success = false;
            response.message = error.message;
        }
        return response;
    }
}
export default new UserProducts