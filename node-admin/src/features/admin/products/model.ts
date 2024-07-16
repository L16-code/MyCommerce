import mongoose, { ObjectId, Schema } from 'mongoose';
export interface IProductSchema{
    name: string;
    price: number;
    category_id:ObjectId;
    quantity: number;
    description:string;
    image:string;
    review_id:ObjectId;
    admin_user_id:ObjectId;
    status:string;
    createdAt:string;
}
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    review_id: {
        type: Schema.Types.ObjectId,
    },
    admin_user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        default:"667b9e8904fdce67c119c046"
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'deleted','archived','inactive'],
        default: 'active'  // active, inactive, deleted, archived etc.  // for future use in product status tracking system.  // status can be updated using status update API.  // status update API will require admin user id and product id.  // status update API will also require status.  // status update API will return updated product with new status.  // status update API will also return error if product is not found or if admin user is not authorized.  // status update API will also return error if status is not valid.  // status update API will also return error if admin user is not found.  // status update API will also return error if product is already in the requested status.  // status update API will also return error if admin user does not have the necessary permissions to update product status.  // status update API will also return error if admin user does not have the necessary permissions to update product
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export const ProductModal = mongoose.model<IProductSchema>('products', productSchema);
