import { PermissionModel } from "../permissions/model";
import { IRoleCreate } from "./interfaces";
import { RoleHasPermission } from "./model/roleHasPermission";
import { RoleModel } from "./model/roleModel";
import { ObjectId } from "mongoose";
import mongoose from "mongoose";
const response: {
    message: string;
    data?: unknown;
    success: boolean;
} = { message: "", success: false };
class RoleService {
    async CreateRole(data: IRoleCreate) {
        try {
            const { name, permission } = data;
            const role = new RoleModel({
                name
            });
            const savedRole = await role.save();
            const validPermissions = await PermissionModel.find({
                _id: { $in: permission }
            })
            // assigning permissions with the role
            const rolePermissions = validPermissions.map(permission => ({
                role_id: savedRole._id,
                permission_id: permission._id
            }));
            await RoleHasPermission.insertMany(rolePermissions);
            response.message = "Role created successfully with permissions";
            response.data = {};
            response.success = true;
            return response;
        } catch (error) {
            response.message = "Failed to create role";
            response.success = false;
            response.data = {};
            return response;
        }
    }
    async GetAllRoles() {
        try {
            const roles = await RoleModel.aggregate([
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
                        as: "permission_details"
                    }
                },
                {
                    $unwind: {
                        path: "$permission_details",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        name: { $first: "$name" },
                        permissions: {
                            $push: {
                                _id: "$permission_details._id",
                                name: "$permission_details.name"
                            }
                        }
                    }
                },
            ]);
            response.message = "Roles fetched successfully";
            response.data = roles;
            response.success = true;
            return response;
        } catch (error) {
            response.message = "Failed to fetch roles";
            response.success = false;
            response.data = {};
            return response;
        }
    }
    async GetRoleById(id: string) {
        try {
            const check = await RoleModel.findById(id);
            if (check) {
                const roleId = new mongoose.Types.ObjectId(id);
                const role = await RoleModel.aggregate([
                    {
                        $match: {
                            _id: roleId
                        }
                    },
                    {
                        $lookup: {
                            from: "rolehaspermissions",
                            localField: "_id",
                            foreignField: "role_id",
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
                        $lookup: {
                            from: "permissions",
                            localField: "permissions.permission_id",
                            foreignField: "_id",
                            as: "permissions.permission_details"
                        }
                    },
                    {
                        $unwind: {
                            path: "$permissions.permission_details",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $group: {
                            _id: "$_id",
                            name: { $first: "$name" },
                            permissions: {
                                $push: {
                                    _id: "$permissions.permission_details._id",
                                    name: "$permissions.permission_details.name"
                                }
                            }
                        }
                    }
                ]);
                response.message = "Roles fetched successfully";
                response.data = role;
                response.success = true;
                return response;
            } else {
                response.message = "Role not found";
                response.success = false;
                response.data = {};
                return response;
            }

        } catch (error) {
            response.message = "Failed to fetch roles";
            response.success = false;
            response.data = {};
            return response;
        }
    }
}
export default new RoleService