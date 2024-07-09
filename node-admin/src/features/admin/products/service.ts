import { IProductsAdd } from "./interfaces";
import { ProductModal } from "./model";

const response: {
    message: string;
    data?: unknown;
    success: boolean;
} = { message: "", success: false };
class ProductService {
    async CreateProduct(data:IProductsAdd){
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
    async ReadProduct(){
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
                        status:1,
                        category:{$first:"$category.name"}
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
    async EditProduct(id:string){
        try {
            const product = await ProductModal.findById(id,{
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
    async UpdateProduct(id:string, data:IProductsAdd){
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
}
export default new ProductService