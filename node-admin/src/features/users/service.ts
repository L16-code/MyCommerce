import { IuserData, IuserLoginData } from "./interfaces";
import bcrypt from 'bcrypt';
import { UserModel } from "./model/userModel";
import { UserHasRoleModel } from "./model/userHasRoles";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { ObjectId } from "mongoose";
import EnvConfig from "../../config/envConfig";
import { RoleModel } from "../roles/model/roleModel";
const response: {
    message: string;
    data?: unknown;
    success: boolean;
} = { message: "", success: false };
class UserService {
    async UserCreate(userdata: IuserData){
        try {
            const { username, password, email, dob, gender,role_id } = userdata;
            const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] }); // checks if user already exists or not by email or username beacause both are unique
            if (existingUser) {
                response.success = false;
                response.message = "User already exists";
                return response;
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new UserModel({
                username,
                email,
                password: hashedPassword,
                dob,
                gender,
            });
            const userSaved = await user.save();
            const roleId = new mongoose.Types.ObjectId(role_id);// converting the string into object id
            if (userSaved) {
                const userhasrole={
                    role_id:roleId,
                    user_id:userSaved._id
                }
                await UserHasRoleModel.insertMany(userhasrole)
                response.success = true;
                response.message = "User registered successfully";
                response.data = '';
            } else {
                response.success = false;
                response.message = "User not registered";
                response.data = '';
            }
            return response
        } catch (error) {
            response.success = false;
            response.message = "There is Problem in server Please Contact with the developer ";
            response.data = '';
        }
    }
    async UserLogin(data:IuserLoginData){
        try {
            const { email, password } = data;
            const user = await UserModel.findOne({ email });
            if (!user) {
                response.success = false;
                response.message = "User not found";
                response.data = '';
                return response;
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                response.success = false;
                response.message = "Incorrect password";
                response.data = '';
                return response;
            }
            // fetching user's role id
            const userRole = await UserHasRoleModel.findOne({ user_id: user._id });
            if (!userRole) {
                response.success = false;
                response.message = "User has no role assigned";
                response.data = '';
                return response;
            }
            const rolePermissions = await RoleModel.aggregate([
                {
                    $match: {
                        _id: userRole.role_id
                    }
                },
                {
                    $lookup: {
                        from: "rolehaspermissions",
                        localField: "_id",
                        foreignField: "role_id",
                        as: "role_permissions"
                    }
                },     
                {
                    $unwind: {
                        path: "$role_permissions",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: "permissions",
                        localField: "role_permissions.permission_id",
                        foreignField: "_id",
                        as: "permissions"
                    }
                },
                {
                    $unwind: {
                        path: "$permissions",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        name: { $first: "$name" },
                        permissions: {
                            $push: {
                                _id: "$permissions._id",
                                name: "$permissions.name"
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        permissions: {
                            $filter: {
                                input: "$permissions",
                                as: "permission",
                                cond: { $ne: ["$$permission._id", null] }
                            }
                        }
                    }
                }
            ]);
            const env = EnvConfig();
            const SecretKey = env.secretKey;
            const token = jwt.sign({ userEmail: user.email,UserId:user._id ,RoleId: userRole.role_id }, process.env.JWT_SECRET || SecretKey, {
                expiresIn: '1h',
            });
            response.success = true;
            response.message = "User logged in successfully";
            response.data = {
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    token:token
                },
                role: rolePermissions[0],
            };
            return response;
            
        } catch (error) {
            response.success = false;
            response.message = "An error occurred during login";
            response.data ={};
            return response;
        }
    }
    async UserUpdate(id: string, data: IuserData) {
        try {
            const { username, password, email, dob, gender, role_id } = data;
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const updatedUser = await UserModel.findOneAndUpdate(
                { _id: id },
                {
                    username,
                    email,
                    password: hashedPassword,
                    dob,
                    gender
                },
                { new: true } // To return the updated document
            );
    
            const roleId = new mongoose.Types.ObjectId(role_id); // Converting the string into ObjectId
    
            if (updatedUser) {
                await UserHasRoleModel.updateOne(
                    { user_id: updatedUser._id },
                    { role_id: roleId },
                    { upsert: true } // To create a new document if none exists
                );
                response.success = true;
                response.message = "User updated successfully";
                response.data = updatedUser;
            } else {
                response.success = false;
                response.message = "User not found";
                response.data = '';
            }
            return response;
        } catch (error) {
            response.success = false;
            response.message = "There is a problem with the server. Please contact the developer.";
            response.data = error;
            return response;
        }
    }
    
}
export default new UserService