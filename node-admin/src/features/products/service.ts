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
    }
}
export default new ProductService