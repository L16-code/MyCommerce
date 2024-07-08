export interface ICartData{
    _id: string;
    product_id: string;
    quantity: number;
    price: number;
    total_price: number;
    total: number;
    image: string;
    name: string;
}
export interface GetCheckoutData{
    _id: string;
    name:string;
    image:string;
    total_price:number;
    quantity: number;
}
export interface AddAddressData{
    pin:number;
    state:string;
    city:string;
    house_no:string
}
export interface GetOrderData{
    _id: string;
    product:ProductArrayOfOrder[];
    address: string;
    total_price: number;
    status: string;
    createdAt: string;
}
export interface ProductArrayOfOrder{
    product_id: string;
    quantity: number;
    price: number;
    name: string;
    image: string;
}