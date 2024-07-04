import { Request,Response } from "express";
import ProductService from "./service"
export const CreateProduct = async (req: Request, res:Response) => {
    try {
        const result = await ProductService.CreateProduct(req.body)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
};
export const ReadProduct = async (req: Request, res:Response) => {
    try {
        const result = await ProductService.ReadProduct()
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
};