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