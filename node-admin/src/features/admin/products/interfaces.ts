export interface IProductsAdd{
    name: string;
    price: number;
    quantity: number;
    category_id: string;
    description: string;
    image: string;
    createdAt: Date;
}
export interface IUpdateStatus{
    status:"Completed"|"Pending" |"Rejected"|"Shipped"
}