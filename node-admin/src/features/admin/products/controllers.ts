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
export const EditProduct = async (req: Request, res:Response) => {
    try {
        const result = await ProductService.EditProduct(req.params.id)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
};
export const UpdateProduct = async (req: Request, res:Response) => {
    try {
        const result = await ProductService.UpdateProduct(req.params.id,req.body)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
};