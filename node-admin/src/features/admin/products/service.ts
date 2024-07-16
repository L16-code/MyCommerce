import mongoose from "mongoose";
import { OrdersModel } from "../../user/products/modal/OrderModel";
import { IProductsAdd, IUpdateStatus } from "./interfaces";
import { ProductModal } from "./model";

const response: {
    message: string;
    data?: unknown;
    success: boolean;
} = { message: "", success: false };
class ProductService {
    async CreateProduct(data: IProductsAdd) {
        try {
            const { name, price, quantity, category_id, description, image } = data;
            const product = new ProductModal({ name, price, quantity, category_id, description, image });
            const result = await product.save();
            if (result) {
                response.success = true;
                response.message = "Product created successfully";
                response.data = '';
            } else {
                response.message = "Failed to create product";
                response.success = false;
                response.data = {};
            }
        } catch (error) {
            response.message = "Failed to create product";
            response.success = false;
            response.data = {};
        }
        return response;
    }
    async ReadProduct() {
        try {
            const result = await ProductModal.aggregate([
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
                        status: 1,
                        category: { $first: "$category.name" }
                    }
                },
                {
                    $sort: {
                        _id: -1
                    }
                }
            ]);
            if (result) {
                response.success = true;
                response.message = "Product fetched successfully";
                response.data = result;
            } else {
                response.success = false;
                response.message = "Product can not fetched";
                response.data = '';
            }
        } catch (error) {
            response.success = false;
            response.message = "An error occurred while fetching the product";
            response.data = '';
        }
        return response;
    }
    async EditProduct(id: string) {
        try {
            const product = await ProductModal.findById(id, {
                name: 1,
                price: 1,
                quantity: 1,
                category_id: 1,
                description: 1,
                image: 1
            });
            if (product) {
                response.success = true;
                response.message = "Product updated successfully";
                response.data = product;
            } else {
                response.success = false;
                response.message = "Product can not updated";
                response.data = '';
            }
        } catch (error) {
            response.success = false;
            response.message = "An error occurred while updating the product";
            response.data = '';
        }
        return response;
    }
    async UpdateProduct(id: string, data: IProductsAdd) {
        try {
            const result = await ProductModal.findByIdAndUpdate(id, data, { new: true });
            if (result) {
                response.success = true;
                response.message = "Product updated successfully";
                response.data = '';
            } else {
                response.success = false;
                response.message = "Product can not updated";
                response.data = '';
            }
        } catch (error) {
            response.success = false;
            response.message = "An error occurred while updating the product";
            response.data = '';
        }
        return response;
    }
    async UpdateProductStatus(id: string) {
        const product_id = new mongoose.Types.ObjectId(id);
        const product = await ProductModal.findById(product_id);
        if (product) {
            const newStatus = product.status === 'active' ? 'inactive' : 'active';
            const updatedProducts = await ProductModal.findByIdAndUpdate(
                product_id,
                { status: newStatus }
            );
            response.success = true;
            response.message = "Products status updated successfully";
            response.data = updatedProducts;
        }else{
            response.message = "Product not found";
            response.success = false;
        }
        return response;
    }
    async ReadOrder() {
        try {
            const orders = await OrdersModel.aggregate([
                { $unwind: '$cart_id' },
                {
                    $addFields: {
                        cart_id: { $toObjectId: '$cart_id' }
                    }
                },
                {
                    $lookup: {
                        from: 'carts',
                        localField: 'cart_id',
                        foreignField: '_id',
                        as: 'cart_items'
                    }
                },
                { $unwind: '$cart_items' },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'cart_items.product_id',
                        foreignField: '_id',
                        as: 'product_details'
                    }
                },
                { $unwind: '$product_details' },
                {
                    $lookup: {
                        from: 'addresses',
                        localField: 'address_id',
                        foreignField: '_id',
                        as: 'address_details'
                    }
                },
                { $unwind: '$address_details' },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'users_details'
                    }
                },
                { $unwind: '$users_details' },
                {
                    $group: {
                        _id: '$_id',
                        total_price: { $first: '$total_price' },
                        status: { $first: '$status' },
                        createdAt: { $first: '$createdAt' },
                        address: { $first: '$address_details' },
                        users: { $first: '$users_details' },
                        products: {
                            $addToSet: {
                                name: '$product_details.name',
                                price: '$product_details.price',
                                total_price: '$cart_items.total_price',
                                quantity: '$cart_items.quantity'
                            }
                        }
                    }
                },
                {
                    $project: {
                        total_price: 1,
                        status: 1,
                        createdAt: 1,
                        address: {
                            pin: '$address.pin',
                            house_no: '$address.house_no',
                            city: '$address.city',
                            state: '$address.state'
                        },
                        user_name: '$users.username',
                        products: 1
                    }
                }, {
                    $sort: {
                        _id: -1
                    }
                }
            ]);
            if (orders) {
                response.success = true;
                response.message = "Orders fetched successfully";
                response.data = orders;
            } else {
                response.success = false;
                response.message = "Orders can not fetched";
                response.data = '';
            }

        } catch (error) {
            response.success = false;
            response.message = "An error occurred while fetching the orders";
            response.data = '';
        }
        return response;
    }
    async UpdateOrder(id: string, status: IUpdateStatus) {
        try {
            const order = await OrdersModel.findByIdAndUpdate(id, status, { new: true });
            if (order) {
                response.success = true;
                response.message = "Order updated successfully";
                response.data = {};
            } else {
                response.success = false;
                response.message = "Order can not updated";
                response.data = '';
            }
        } catch (error) {
            response.success = false;
            response.message = "An error occurred while updating the order";
            response.data = '';
        }
        return response;
    }
}
export default new ProductService