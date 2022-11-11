"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdminService = exports.blockAdminService = exports.changeAccessService = exports.updateAdminService = exports.getSingleAdminService = exports.getAllAdminService = exports.loginAdminService = exports.addAdminService = void 0;
const addAdminValidate_1 = require("../validate/addAdminValidate");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_1 = require("../models/admin");
const bcrypt_1 = __importDefault(require("bcrypt"));
require('dotenv').config();
const JWT_SECRET = process.env.FEDOK_SECRET;
const addAdminService = async function (body) {
    try {
        const res = (0, addAdminValidate_1.validateAdmin)(body);
        if (res.success === false) {
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            };
        }
        const { fullname, email, access, phoneNumber, password } = body;
        const exist = await admin_1.Admin.findOne({ email });
        if (exist) {
            return {
                status: 400,
                message: 'Error',
                data: 'Email already exists',
            };
        }
        const newAdmin = new admin_1.Admin({
            fullname: fullname,
            email: email,
            access: access,
            phoneNumber: phoneNumber,
            password: password
        });
        const hashedPassword = await bcrypt_1.default.hash(newAdmin.password, +process.env.SALT_ROUNDS);
        newAdmin.password = hashedPassword;
        await newAdmin.save();
        return {
            status: 201,
            message: 'Success',
            data: newAdmin
        };
    }
    catch (err) {
        return {
            status: 400,
            message: 'Error',
            data: err.message
        };
    }
};
exports.addAdminService = addAdminService;
const loginAdminService = async function (body) {
    try {
        const res = (0, addAdminValidate_1.validateAdminLogin)(body);
        if (res.success === false) {
            return {
                status: 500,
                message: 'Validation failed',
                data: res.data
            };
        }
        const { email, password } = body;
        const exist = await admin_1.Admin.findOne({ email }).select("+password").exec();
        if (!exist) {
            return {
                status: 400,
                message: 'Error',
                data: 'Admin Email does not exist. Please Check the Email And try again'
            };
        }
        if (exist.isActive === "Deleted") {
            return {
                status: 400,
                message: 'Error',
                data: 'Admin Email does not exist.'
            };
        }
        if (exist.isActive === "Blocked") {
            return {
                status: 400,
                message: 'Error',
                data: 'Admin Email is blocked. Please Contact The Administrator'
            };
        }
        const isMatch = await bcrypt_1.default.compare(password, exist.password);
        if (!isMatch) {
            return {
                status: 400,
                message: 'Error',
                data: 'Invalid Email or Password'
            };
        }
        let fakepassword = undefined;
        exist.password = fakepassword;
        const token = jsonwebtoken_1.default.sign({ id: exist._id }, JWT_SECRET, { expiresIn: '1h' });
        return {
            status: 200,
            message: 'Success',
            userToken: token,
            data: exist
        };
    }
    catch (err) {
        return {
            status: 400,
            message: 'Error',
            data: err.message
        };
    }
};
exports.loginAdminService = loginAdminService;
const getAllAdminService = async () => {
    try {
        const admin = await admin_1.Admin.find();
        return {
            status: 200,
            message: 'Success',
            data: admin,
        };
    }
    catch (err) {
        return {
            status: 500,
            message: 'Failed to get admin Data',
            data: err.message,
        };
    }
};
exports.getAllAdminService = getAllAdminService;
const getSingleAdminService = async (adminId) => {
    try {
        let admin = await admin_1.Admin.findById(adminId).exec();
        if (!admin) {
            return {
                status: 404,
                message: 'Failure',
                data: "No Admin found",
            };
        }
        return {
            status: 200,
            message: 'Success',
            data: admin,
        };
    }
    catch (err) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get an Admin with the specified id',
                data: err.message,
            };
        }
        return {
            status: 500,
            message: 'Failed to get an Admin',
            data: err.message,
        };
    }
};
exports.getSingleAdminService = getSingleAdminService;
const updateAdminService = async (adminId, body) => {
    try {
        let admin = await admin_1.Admin.findById(adminId).exec();
        if (!admin) {
            return {
                status: 404,
                message: 'Failure',
                data: "No Admin found",
            };
        }
        let updatedAdmin = await admin_1.Admin.findOneAndUpdate({ _id: adminId }, body, {
            new: true
        });
        return {
            status: 200,
            message: 'Success',
            data: updatedAdmin,
        };
    }
    catch (err) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get an Admin with the specified id',
                data: err.message,
            };
        }
        return {
            status: 500,
            message: 'Failed to get an Admin',
            data: err.message,
        };
    }
};
exports.updateAdminService = updateAdminService;
const changeAccessService = async (adminId, body) => {
    try {
        let admin = await admin_1.Admin.findById(adminId).exec();
        if (!admin) {
            return {
                status: 404,
                message: 'Failure',
                data: "No Admin found",
            };
        }
        else if (admin.access === 'Super') {
            return {
                status: 400,
                data: "Sorry! A Super Admin Cannot Access",
            };
        }
        else {
            await admin_1.Admin.findOneAndUpdate({ _id: adminId }, body, {
                new: true
            });
            return {
                status: 200,
                message: 'Success',
                data: "Access Changed",
            };
        }
    }
    catch (err) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get an Admin with the specified id',
                data: err.message,
            };
        }
        return {
            status: 500,
            message: 'Failed to get an Admin',
            data: err.message,
        };
    }
};
exports.changeAccessService = changeAccessService;
const blockAdminService = async (adminId) => {
    try {
        let admin = await admin_1.Admin.findById(adminId).exec();
        if (!admin) {
            return {
                status: 404,
                message: 'Failure',
                data: "No Admin found",
            };
        }
        else if (admin.access === 'Super') {
            return {
                status: 400,
                data: "Sorry! A Super Admin Cannot Be Blocked",
            };
        }
        else {
            if (admin.isActive === 'Active') {
                await admin_1.Admin.findOneAndUpdate({ _id: adminId }, { isActive: "Blocked" }, {
                    new: true
                });
            }
            else if (admin.isActive === 'Blocked') {
                await admin_1.Admin.findOneAndUpdate({ _id: adminId }, { isActive: "Active" }, {
                    new: true
                });
            }
            return {
                status: 200,
                message: 'Success',
                data: "Operation Executed successfully",
            };
        }
    }
    catch (err) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get an Admin with the specified id',
                data: err.message,
            };
        }
        return {
            status: 500,
            message: 'Failed to get an Admin',
            data: err.message,
        };
    }
};
exports.blockAdminService = blockAdminService;
const deleteAdminService = async (adminId) => {
    try {
        let admin = await admin_1.Admin.findById(adminId).exec();
        if (!admin) {
            return {
                status: 404,
                message: 'Failure',
                data: "No Admin found",
            };
        }
        else if (admin.access === 'Super') {
            return {
                status: 400,
                data: "Sorry! A Super Admin Cannot Be Deleted",
            };
        }
        else {
            if (admin.isActive != "Deleted") {
                await admin_1.Admin.findOneAndUpdate({ _id: adminId }, { isActive: "Deleted" }, {
                    new: true
                });
            }
            else if (admin.isActive === 'Deleted') {
                await admin_1.Admin.findOneAndUpdate({ _id: adminId }, { isActive: "Active" }, {
                    new: true
                });
            }
            return {
                status: 200,
                message: 'Success',
                data: "Operation Executed successfully",
            };
        }
    }
    catch (err) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get an Admin with the specified id',
                data: err.message,
            };
        }
        return {
            status: 500,
            message: 'Failed to get an Admin',
            data: err.message,
        };
    }
};
exports.deleteAdminService = deleteAdminService;
//# sourceMappingURL=adminService.js.map