import {Request,Response} from "express";

export const UserRegister = async (req:Request, res:Response) => {
    try {
        const { username, email, password, dob, gender } = req.body;
        const registerData = { username, email, password, dob, gender };
        // const result = await UserService.userRegister(registerData)
        // res.status(201).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
};