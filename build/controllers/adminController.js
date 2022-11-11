"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdmin = exports.blockAdmin = exports.changeAccess = exports.updateAdmin = exports.singleAdmin = exports.allAdmin = exports.loginAdmin = exports.addAdmin = void 0;
const adminService_1 = require("../services/adminService");
const addAdmin = async (req, res) => {
    try {
        const response = await (0, adminService_1.addAdminService)(req.body);
        return res.status(response.status).json(response);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.addAdmin = addAdmin;
const loginAdmin = async (req, res) => {
    try {
        const response = await (0, adminService_1.loginAdminService)(req.body);
        return res.status(response.status).json(response);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.loginAdmin = loginAdmin;
const allAdmin = async (req, res) => {
    try {
        const response = await (0, adminService_1.getAllAdminService)();
        return res.status(response.status).json(response);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.allAdmin = allAdmin;
const singleAdmin = async (req, res) => {
    try {
        const { id: adminId } = req.params;
        const response = await (0, adminService_1.getSingleAdminService)(adminId);
        return res.status(response.status).json(response);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.singleAdmin = singleAdmin;
const updateAdmin = async (req, res) => {
    try {
        const { id: adminId } = req.params;
        const response = await (0, adminService_1.updateAdminService)(adminId, req.body);
        return res.status(response.status).json(response);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.updateAdmin = updateAdmin;
const changeAccess = async (req, res) => {
    try {
        const { id: adminId } = req.params;
        const response = await (0, adminService_1.changeAccessService)(adminId, req.body);
        return res.status(response.status).json(response);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.changeAccess = changeAccess;
const blockAdmin = async (req, res) => {
    try {
        const { id: adminId } = req.params;
        const response = await (0, adminService_1.blockAdminService)(adminId);
        return res.status(response.status).json(response);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.blockAdmin = blockAdmin;
const deleteAdmin = async (req, res) => {
    try {
        const { id: adminId } = req.params;
        const response = await (0, adminService_1.deleteAdminService)(adminId);
        return res.status(response.status).json(response);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.deleteAdmin = deleteAdmin;
//# sourceMappingURL=adminController.js.map